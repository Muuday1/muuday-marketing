import { config } from 'dotenv'
config({ path: '.env.local' })

const apiKey = process.env.KIMI_API_KEY
console.log('Key prefix:', apiKey?.slice(0, 15) + '...')

async function test(name: string, url: string, headers: Record<string, string>, body?: object) {
  console.log(`\n--- ${name} ---`)
  try {
    const opts: any = {
      method: body ? 'POST' : 'GET',
      headers: { 'Content-Type': 'application/json', ...headers },
    }
    if (body) opts.body = JSON.stringify(body)
    const res = await fetch(url, opts)
    const data = await res.json().catch(() => ({}))
    console.log(`Status: ${res.status}`)
    console.log(`Response: ${JSON.stringify(data).slice(0, 400)}`)
    return res.ok
  } catch (e) {
    console.log(`Error: ${(e as Error).message}`)
    return false
  }
}

async function main() {
  // Test 1: Standard Bearer
  await test('Bearer auth', 'https://api.moonshot.cn/v1/models', {
    Authorization: `Bearer ${apiKey}`,
  })

  // Test 2: No Bearer prefix
  await test('Raw key auth', 'https://api.moonshot.cn/v1/models', {
    Authorization: apiKey!,
  })

  // Test 3: Different endpoint (api.moonshot.ai)
  await test('moonshot.ai endpoint', 'https://api.moonshot.ai/v1/models', {
    Authorization: `Bearer ${apiKey}`,
  })

  // Test 4: With chat
  await test(
    'Chat completions',
    'https://api.moonshot.cn/v1/chat/completions',
    {
      Authorization: `Bearer ${apiKey}`,
    },
    {
      model: 'kimi-k2-0711',
      messages: [{ role: 'user', content: 'Hi' }],
      max_tokens: 10,
    }
  )

  // Test 5: Different model name
  await test(
    'Model: moonshot-v1-8k',
    'https://api.moonshot.cn/v1/chat/completions',
    {
      Authorization: `Bearer ${apiKey}`,
    },
    {
      model: 'moonshot-v1-8k',
      messages: [{ role: 'user', content: 'Hi' }],
      max_tokens: 10,
    }
  )

  // Test 6: Moonshot v1-128k
  await test(
    'Model: moonshot-v1-128k',
    'https://api.moonshot.cn/v1/chat/completions',
    {
      Authorization: `Bearer ${apiKey}`,
    },
    {
      model: 'moonshot-v1-128k',
      messages: [{ role: 'user', content: 'Hi' }],
      max_tokens: 10,
    }
  )
}

main()
