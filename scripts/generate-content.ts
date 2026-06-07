import 'dotenv/config'

import { runContentPipeline } from '../src/content-engine/pipeline'

async function main() {
  const args = process.argv.slice(2)
  const platform = args[0] || 'instagram'
  const topic = args[1] || '5 dicas para brasileiros que acabaram de chegar em Portugal'
  const pillar = args[2] || 'immigration'

  console.log(`\n🚀 Generating content...`)
  console.log(`   Platform: ${platform}`)
  console.log(`   Topic: ${topic}`)
  console.log(`   Pillar: ${pillar}`)
  console.log('')

  const result = await runContentPipeline({
    title: topic,
    platform: platform as any,
    pillar: pillar as any,
    topic,
    tone: 'warm',
  })

  if (!result.success) {
    console.log('❌ FAILED:', result.error)
    process.exit(1)
  }

  const data = result.data
  console.log('✅ Content generated!')
  console.log('')
  console.log(`   ID: ${data.contentPieceId}`)
  console.log(`   Score: ${data.brandVoiceScore}/10 ${data.passed ? '✅' : '⚠️'}`)
  console.log('')
  console.log('   Headline:', data.headline)
  console.log('')
  console.log('   Body:', data.body.slice(0, 300) + (data.body.length > 300 ? '...' : ''))
  console.log('')
  console.log('   CTA:', data.cta)
}

main().catch((e) => {
  console.error('Error:', e)
  process.exit(1)
})
