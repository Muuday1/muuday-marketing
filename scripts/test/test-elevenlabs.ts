#!/usr/bin/env tsx
/**
 * Test ElevenLabs API.
 * Usage: npx tsx scripts/test/test-elevenlabs.ts
 */

import { config } from 'dotenv'

config({ path: '.env.local' })

const key = process.env.ELEVENLABS_API_KEY

if (!key) {
  console.error('FAIL: Missing ELEVENLABS_API_KEY')
  console.error('Get one at: https://elevenlabs.io/app/settings/api-keys')
  process.exit(1)
}

async function main() {
  // Test 1: List voices
  const res = await fetch('https://api.elevenlabs.io/v1/voices', {
    headers: { 'xi-api-key': key },
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('FAIL: ElevenLabs API error:', err)
    process.exit(1)
  }

  const data = await res.json()
  const voices = data.voices?.slice(0, 5) ?? []

  console.log('PASS: ElevenLabs connected')
  console.log(`  Total voices: ${data.voices?.length ?? 0}`)
  console.log('  Available voices:')
  voices.forEach((v: { name: string; voice_id: string }) => {
    console.log(`    - ${v.name} (${v.voice_id})`)
  })

  // Test 2: Generate audio
  const audioRes = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voices[0]?.voice_id ?? '21m00Tcm4TlvDq8ikWAM'}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': key,
      },
      body: JSON.stringify({
        text: 'Olá! Eu sou a voz da Muuday.',
        model_id: 'eleven_multilingual_v2',
      }),
    }
  )

  if (!audioRes.ok) {
    const err = await audioRes.text()
    console.error('FAIL: TTS generation error:', err)
    process.exit(1)
  }

  const audioBuffer = await audioRes.arrayBuffer()
  console.log('PASS: TTS generation works')
  console.log(`  Audio size: ${(audioBuffer.byteLength / 1024).toFixed(1)} KB`)
  console.log(`  Voice used: ${voices[0]?.name ?? 'default'}`)
  console.log('\nElevenLabs is READY')
}

main().catch((err) => {
  console.error('FAIL: Unexpected error:', err)
  process.exit(1)
})
