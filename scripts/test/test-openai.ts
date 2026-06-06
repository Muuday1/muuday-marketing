#!/usr/bin/env tsx
/**
 * Test OpenAI API.
 * Usage: npx tsx scripts/test/test-openai.ts
 */

import { config } from 'dotenv'

config({ path: '.env.local' })

const key = process.env.OPENAI_API_KEY

if (!key || key === 'sk-dummy') {
  console.error('FAIL: Missing OPENAI_API_KEY in .env.local')
  console.error('Get one at: https://platform.openai.com/api-keys')
  process.exit(1)
}

async function main() {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Você é um copywriter brasileiro.' },
        { role: 'user', content: 'Escreva uma frase curta sobre brasileiros no exterior.' },
      ],
      max_tokens: 50,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('FAIL: OpenAI API error:', err)
    process.exit(1)
  }

  const data = await res.json()
  const text = data.choices?.[0]?.message?.content

  if (!text) {
    console.error('FAIL: No content in OpenAI response')
    process.exit(1)
  }

  console.log('PASS: OpenAI connected')
  console.log(`  Model: ${data.model}`)
  console.log(`  Tokens used: ${data.usage?.total_tokens}`)
  console.log(`  Sample output: "${text.trim()}"`)

  // Test DALL-E
  const imgRes = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt: 'A simple icon of a Brazilian flag, minimalist style',
      size: '1024x1024',
      n: 1,
    }),
  })

  if (!imgRes.ok) {
    const err = await imgRes.text()
    console.error('FAIL: DALL-E API error:', err)
    process.exit(1)
  }

  const imgData = await imgRes.json()
  console.log('PASS: DALL-E connected')
  console.log(`  Image URL: ${imgData.data?.[0]?.url?.slice(0, 60)}...`)
  console.log('\nOpenAI is READY')
}

main().catch((err) => {
  console.error('FAIL: Unexpected error:', err)
  process.exit(1)
})
