#!/usr/bin/env tsx
/**
 * CLI script to generate content batch.
 * Usage: npm run content:generate -- --topic "vida no UK" --platform instagram --count 5
 */

import { generateCopy } from '@/content-engine/generators/copy-generator'
import { generateImage } from '@/content-engine/generators/image-generator'
import { checkBrandVoice } from '@/content-engine/validators/brand-voice-check'
import { ContentPillar, Platform } from '@/types'

interface Args {
  topic: string
  platform: Platform
  pillar: ContentPillar
  count: number
  generateImages: boolean
}

function parseArgs(): Args {
  const args = process.argv.slice(2)
  const getFlag = (flag: string, defaultValue: string) => {
    const idx = args.indexOf(flag)
    return idx !== -1 ? args[idx + 1] : defaultValue
  }

  return {
    topic: getFlag('--topic', 'vida de brasileiro no exterior'),
    platform: getFlag('--platform', 'instagram') as Platform,
    pillar: getFlag('--pillar', 'culture') as ContentPillar,
    count: parseInt(getFlag('--count', '3'), 10),
    generateImages: args.includes('--images'),
  }
}

async function main() {
  const args = parseArgs()
  console.log(`\n🚀 Generating ${args.count} pieces of content...\n`)

  for (let i = 0; i < args.count; i++) {
    console.log(`--- Piece ${i + 1}/${args.count} ---`)

    // 1. Generate copy
    const copyResult = await generateCopy({
      topic: args.topic,
      platform: args.platform,
      pillar: args.pillar,
    })

    if (!copyResult.success) {
      console.error(`❌ Copy failed: ${copyResult.error}`)
      continue
    }

    console.log(`✅ Headline: ${copyResult.data.headline}`)

    // 2. Brand voice check
    const voiceCheck = checkBrandVoice({
      headline: copyResult.data.headline,
      body: copyResult.data.body,
      cta: copyResult.data.cta,
    })

    if (voiceCheck.success) {
      const { score, passed } = voiceCheck.data
      console.log(`📊 Brand voice score: ${score}/10 ${passed ? '✅' : '⚠️'}`)
      if (!passed) {
        console.log(`   Issues: ${voiceCheck.data.issues.join(', ')}`)
      }
    }

    // 3. Generate image (optional)
    if (args.generateImages) {
      const imageResult = await generateImage({
        prompt: copyResult.data.headline,
        style: 'photographic',
      })

      if (imageResult.success) {
        console.log(`🖼️ Image: ${imageResult.data.url}`)
      } else {
        console.error(`❌ Image failed: ${imageResult.error}`)
      }
    }

    console.log('')
  }

  console.log('✨ Done!')
}

main().catch(console.error)
