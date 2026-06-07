import 'dotenv/config'
import { publishDuePosts } from '../src/content-engine/publishers/scheduler'

async function main() {
  console.log('⏰ Checking scheduled posts...\n')

  const result = await publishDuePosts()

  if (result.published.length > 0) {
    console.log(`✅ Published ${result.published.length} post(s):`)
    for (const p of result.published) {
      console.log(`   [${p.platform}] Post ID: ${p.postId}`)
    }
  }

  if (result.failed.length > 0) {
    console.log(`\n❌ Failed ${result.failed.length} post(s):`)
    for (const f of result.failed) {
      console.log(`   ${f.id}: ${f.error}`)
    }
  }

  if (result.published.length === 0 && result.failed.length === 0) {
    console.log('✅ No posts to publish right now.')
  }

  console.log('\nDone.')
}

main().catch((e) => {
  console.error('Error:', e)
  process.exit(1)
})
