import { config } from 'dotenv'
config({ path: '.env.local' })

async function testKimi() {
  const apiKey = process.env.KIMI_API_KEY
  if (!apiKey || apiKey === 'dummy-kimi-key') {
    console.log('❌ SKIP: KIMI_API_KEY not configured')
    process.exit(1)
  }

  try {
    const res = await fetch('https://api.moonshot.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'kimi-k2.6',
        messages: [{ role: 'user', content: 'Write one sentence about Brazil in Portuguese' }],
        max_tokens: 200,
        temperature: 1,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.log('❌ FAIL: Kimi API error:', err)
      process.exit(1)
    }

    const data = await res.json()
    const message = data.choices?.[0]?.message
    const reply = message?.content || message?.reasoning_content

    if (!reply || !reply.trim()) {
      console.log('⚠️  Kimi returned empty response')
      process.exit(1)
    }
    console.log('✅ PASS: Kimi API working')
    console.log('   Reply:', reply.trim().split('\n').pop()?.trim() || reply.trim().slice(0, 100))
    process.exit(0)
  } catch (e) {
    console.log('❌ FAIL: Kimi exception:', (e as Error).message)
    process.exit(1)
  }
}

testKimi()
