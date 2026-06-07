/**
 * Test script: Send ElevenLabs-generated audio to Auphonic for post-production
 *
 * Usage: npx tsx scripts/test-auphonic.ts <path-to-audio-file>
 */

import { startAuphonicProduction, pollAuphonicUntilDone } from '@/audio/auphonic-client'

async function main() {
  const apiKey = process.env.AUPHONIC_API_KEY
  if (!apiKey) {
    console.error('❌ Missing AUPHONIC_API_KEY in .env.local')
    console.log('   1. Create free account at https://auphonic.com')
    console.log('   2. Generate API key at https://auphonic.com/engine/api')
    console.log('   3. Add AUPHONIC_API_KEY=your_key to .env.local')
    process.exit(1)
  }

  const inputFile = process.argv[2] || 'public/test-audio/story-demo/raw-10seg.mp3'

  console.log('🎙️ Sending to Auphonic:', inputFile)
  console.log('   Target: -16 LUFS (podcast standard)')
  console.log('   Denoise: enabled')

  try {
    const prod = await startAuphonicProduction(apiKey, inputFile, {
      title: 'Muuday Podcast — Test',
      loudnessTarget: -16,
      denoise: true,
    })

    console.log('⏳ Production started:', prod.uuid)
    console.log('   Polling for completion...')

    const result = await pollAuphonicUntilDone(apiKey, prod.uuid, 120)

    console.log('✅ Production complete!')
    console.log('   Status:', result.status_string)

    if (result.output_files && result.output_files.length > 0) {
      const file = result.output_files[0]
      console.log('   Output URL:', file.url)
      console.log('   Format:', file.format, '| Size:', (file.size / 1024).toFixed(1), 'KB')
    }
  } catch (err: unknown) {
    console.error('❌ Error:', err instanceof Error ? err.message : String(err))
    process.exit(1)
  }
}

main()
