import { config } from 'dotenv'
config({ path: '.env.local' })

const apiKey = process.env.KIMI_API_KEY

async function testEndpoint(name: string, url: string, body: object, extraHeaders = {}) {
  console.log(`\n--- Testing ${name} ---`)
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        ...extraHeaders,
      },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    console.log(`Status: ${res.status}`)
    console.log(`Response: ${JSON.stringify(data).slice(0, 300)}`)
    return res.ok
  } catch (e) {
    console.log(`Error: ${(e as Error).message}`)
    return false
  }
}

async function main() {
  console.log('KIMI_API_KEY prefix:', apiKey?.slice(0, 20) + '...')
  console.log('KIMI_API_KEY length:', apiKey?.length)

  // Test 1: Standard Moonshot endpoint
  await testEndpoint(
    'Moonshot v1/chat/completions',
    'https://api.moonshot.cn/v1/chat/completions',
    {
      model: 'kimi-k2-0711',
      messages: [{ role: 'user', content: 'Hi' }],
      max_tokens: 10,
    }
  )

  // Test 2: List models
  console.log('\n--- Testing list models ---')
  const modelsRes = await fetch('https://api.moonshot.cn/v1/models', {
    headers: { Authorization: `Bearer ${apiKey}` },
  })
  console.log('Status:', modelsRes.status)
  console.log('Response:', JSON.stringify(await modelsRes.json()).slice(0, 300))

  // Test 3: Different endpoint format
  await testEndpoint('Moonshot v1 (no model)', 'https://api.moonshot.cn/v1/chat/completions', {
    messages: [{ role: 'user', content: 'Hi' }],
  })
}

main()
