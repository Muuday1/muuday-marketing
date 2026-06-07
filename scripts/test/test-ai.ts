import { config } from 'dotenv'
config({ path: '.env.local' })

async function testProvider(
  name: string,
  url: string,
  apiKey: string | undefined,
  model: string,
  bodyExtra = {}
) {
  if (!apiKey || apiKey.includes('dummy')) {
    console.log(`⏭️  SKIP: ${name} — key not configured`)
    return false
  }
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        ...(url.includes('openrouter')
          ? { 'HTTP-Referer': 'http://localhost:3000', 'X-Title': 'Muuday' }
          : {}),
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: 'Say "API working" in exactly 2 words' }],
        max_tokens: 20,
        ...bodyExtra,
      }),
    })
    const data = await res.json()
    if (!res.ok) {
      const err = data.error?.message || JSON.stringify(data).slice(0, 100)
      console.log(`❌ FAIL: ${name} — ${err}`)
      return false
    }
    const message = data.choices?.[0]?.message
    const reply = message?.content || message?.reasoning_content
    console.log(`✅ PASS: ${name} — "${reply?.trim()?.slice(0, 60)}"`)
    return true
  } catch (e) {
    console.log(`❌ FAIL: ${name} — ${(e as Error).message}`)
    return false
  }
}

async function main() {
  console.log('Testing AI providers...\n')

  const kimiOk = await testProvider(
    'Kimi (Moonshot)',
    'https://api.moonshot.ai/v1/chat/completions',
    process.env.KIMI_API_KEY,
    'kimi-k2.6',
    { temperature: 1, max_tokens: 200 }
  )

  const openaiOk = await testProvider(
    'OpenAI',
    'https://api.openai.com/v1/chat/completions',
    process.env.OPENAI_API_KEY,
    'gpt-4.1'
  )

  const openrouterOk = await testProvider(
    'OpenRouter',
    'https://openrouter.ai/api/v1/chat/completions',
    process.env.OPENROUTER_API_KEY,
    'openai/gpt-4o-mini'
  )

  const deepseekOk = await testProvider(
    'DeepSeek',
    'https://api.deepseek.com/v1/chat/completions',
    process.env.DEEPSEEK_API_KEY,
    'deepseek-chat'
  )

  console.log('\n---')
  const working = [kimiOk, openaiOk, openrouterOk, deepseekOk].filter(Boolean).length
  if (working === 0) {
    console.log('❌ NO AI providers working. You need at least one valid API key.')
    process.exit(1)
  } else {
    console.log(`✅ ${working}/4 AI providers working`)
    if (kimiOk) console.log('   → Kimi is PRIMARY (all tasks will use this)')
    if (openaiOk) console.log('   → OpenAI is FALLBACK')
    if (openrouterOk) console.log('   → OpenRouter is FALLBACK')
    if (deepseekOk) console.log('   → DeepSeek is FALLBACK')
  }
}

main()
