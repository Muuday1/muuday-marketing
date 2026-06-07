import { config } from 'dotenv'
config({ path: '.env.local' })

const apiKey = process.env.KIMI_API_KEY

async function test(maxTokens: number) {
  const res = await fetch('https://api.moonshot.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'kimi-k2.6',
      messages: [{ role: 'user', content: 'Say "hello" in Portuguese. Just the word.' }],
      max_tokens: maxTokens,
      temperature: 1,
    }),
  })

  const data = await res.json()
  const choice = data.choices?.[0]
  console.log(`\n--- max_tokens=${maxTokens} ---`)
  console.log('finish_reason:', choice?.finish_reason)
  console.log('content:', JSON.stringify(choice?.message?.content))
  console.log('reasoning_tokens:', choice?.message?.reasoning_content?.length || 0)
}

async function main() {
  await test(50)
  await test(200)
  await test(500)
  await test(1024)
}

main()
