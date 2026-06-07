import { config } from 'dotenv'
config({ path: '.env.local' })

const apiKey = process.env.KIMI_API_KEY

async function testChat(endpoint: string, model: string) {
  console.log(`\n--- ${endpoint} | ${model} ---`)
  const res = await fetch(`${endpoint}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: 'Say "Kimi working" in Portuguese' }],
      max_tokens: 20,
    }),
  })
  const data = await res.json().catch(() => ({}))
  console.log(`Status: ${res.status}`)
  if (res.ok) {
    console.log(`✅ Reply: ${data.choices?.[0]?.message?.content}`)
  } else {
    console.log(`❌ Error: ${JSON.stringify(data).slice(0, 300)}`)
  }
  return res.ok
}

async function main() {
  const models = ['kimi-k2.6', 'moonshot-v1-8k', 'moonshot-v1-128k']
  const endpoints = ['https://api.moonshot.cn', 'https://api.moonshot.ai']

  for (const ep of endpoints) {
    for (const model of models) {
      const ok = await testChat(ep, model)
      if (ok) {
        console.log(`\n🎉 WORKING: ${ep} + ${model}`)
        return
      }
    }
  }
}

main()
