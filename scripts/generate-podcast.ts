#!/usr/bin/env tsx
/**
 * CLI script to generate a podcast episode.
 * Usage: npm run podcast:generate -- --topic "carreira em Londres" --duration 30
 */

import { generatePodcastScript } from '@/podcast/script/script-writer'
import { synthesizeVoice } from '@/podcast/voice/voice-synth'

interface Args {
  topic: string
  duration: number
  guest?: string
}

function parseArgs(): Args {
  const args = process.argv.slice(2)
  const getFlag = (flag: string, defaultValue: string) => {
    const idx = args.indexOf(flag)
    return idx !== -1 ? args[idx + 1] : defaultValue
  }

  return {
    topic: getFlag('--topic', 'vida de brasileiro no exterior'),
    duration: parseInt(getFlag('--duration', '25'), 10),
    guest: getFlag('--guest', '') || undefined,
  }
}

async function main() {
  const args = parseArgs()
  console.log(`\n🎙️ Generating podcast: "${args.topic}" (${args.duration} min)\n`)

  // 1. Generate script
  const scriptResult = await generatePodcastScript({
    topic: args.topic,
    durationMinutes: args.duration,
    style: args.guest ? 'interview' : 'monologue',
    guest: args.guest,
  })

  if (!scriptResult.success) {
    console.error(`❌ Script failed: ${scriptResult.error}`)
    process.exit(1)
  }

  console.log(`✅ Title: ${scriptResult.data.title}`)
  console.log(`📝 Script generated (${scriptResult.data.totalDurationSeconds}s)`)

  // 2. Synthesize voice (optional)
  const fullScript = [
    scriptResult.data.intro,
    ...scriptResult.data.segments.map((s) => s.content),
    scriptResult.data.outro,
  ].join('\n\n')

  const voiceResult = await synthesizeVoice({
    text: fullScript.slice(0, 5000), // ElevenLabs limit
  })

  if (voiceResult.success) {
    console.log(`🔊 Audio: ${voiceResult.data.audioUrl}`)
    console.log(`⏱️ Duration: ${voiceResult.data.durationSeconds}s`)
  } else {
    console.error(`❌ Voice synthesis failed: ${voiceResult.error}`)
  }

  console.log('\n✨ Done!')
}

main().catch(console.error)
