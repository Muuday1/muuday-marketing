const AUPHONIC_API_BASE = 'https://auphonic.com/api'

async function startProduction(apiKey: string, inputFilePath: string) {
  const fs = await import('fs')
  const fileBuffer = fs.readFileSync(inputFilePath)
  const blob = new Blob([fileBuffer], { type: 'audio/mpeg' })

  const form = new FormData()
  form.append('title', 'Muuday Podcast — Pipeline Test')
  form.append('action', 'start')
  form.append('loudnesstarget', '-16')
  form.append('denoise', 'true')
  form.append('input_file', blob, 'input.mp3')

  const res = await fetch(`${AUPHONIC_API_BASE}/simple/productions.json`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form,
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(`Auphonic error: ${JSON.stringify(err)}`)
  }
  const data = await res.json()
  return data.data
}

async function pollUntilDone(apiKey: string, uuid: string) {
  const start = Date.now()
  while (Date.now() - start < 300_000) {
    const res = await fetch(`${AUPHONIC_API_BASE}/production/${uuid}.json`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    })
    const data = await res.json()
    const prod = data.data
    if (prod.status === 3) return prod
    if (prod.status === 2) throw new Error(`Failed: ${prod.status_string}`)
    await new Promise((r) => setTimeout(r, 5000))
  }
  throw new Error('Timeout')
}

async function main() {
  const apiKey = process.env.AUPHONIC_API_KEY
  if (!apiKey) {
    console.error('❌ Missing AUPHONIC_API_KEY')
    process.exit(1)
  }
  const inputFile = process.argv[2] || 'public/test-audio/story-demo/pipeline-mixed.mp3'
  console.log('🎙️ Sending to Auphonic:', inputFile)

  const prod = await startProduction(apiKey, inputFile)
  console.log('⏳ Production:', prod.uuid)

  const result = await pollUntilDone(apiKey, prod.uuid)
  console.log('✅ Done! Status:', result.status_string)

  if (result.output_files?.[0]) {
    const f = result.output_files[0]
    console.log('   Download:', f.download_url)
    console.log('   Size:', f.size_string)

    // Download the file
    const fs = await import('fs')
    const downloadRes = await fetch(f.download_url, {
      headers: { Authorization: `Bearer ${apiKey}` },
      redirect: 'follow',
    })
    const buffer = Buffer.from(await downloadRes.arrayBuffer())
    const outPath = inputFile.replace('.mp3', '-auphonic-final.mp3')
    fs.writeFileSync(outPath, buffer)
    console.log('💾 Saved to:', outPath)
  }
}

main().catch((e) => {
  console.error('❌', e.message)
  process.exit(1)
})
