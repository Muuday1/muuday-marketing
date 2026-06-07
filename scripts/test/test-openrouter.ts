import { config } from 'dotenv'
config({ path: '.env.local' })

async function testOpenRouter(model: string) {
  const apiKey = process.env.OPENROUTER_API_KEY!
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'Muuday Marketing',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: 'Say "working" in Portuguese' }],
      max_tokens: 20,
    }),
  })
  const data = await res.json()
  return {
    ok: res.ok,
    model,
    reply: data.choices?.[0]?.message?.content,
    error: data.error?.message,
  }
}

async function main() {
  const models = [
    'moonshotai/kimi-k2',
    'moonshotai/kimi-k2-0711',
    'moonshotai/kimi-k2-0711:free',
    'kimi-ai/kimi-k2-0711',
  ]
  for (const m of models) {
    const r = await testOpenRouter(m)
    console.log(r.ok ? `✅ ${m}: ${r.reply?.trim()}` : `❌ ${m}: ${r.error}`)
  }
}
main()
