#!/usr/bin/env tsx
/**
 * Test Instagram Graph API.
 * Usage: npx tsx scripts/test/test-instagram.ts
 */

import { config } from 'dotenv'

config({ path: '.env.local' })

const token = process.env.META_ACCESS_TOKEN
const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID

if (!token || !accountId) {
  console.error('FAIL: Missing META_ACCESS_TOKEN or INSTAGRAM_BUSINESS_ACCOUNT_ID')
  console.error('Get token at: https://developers.facebook.com/tools/explorer/')
  console.error('Get account ID at: https://business.facebook.com/settings/instagram-account/')
  process.exit(1)
}

async function main() {
  // Test 1: Get account info
  const res = await fetch(
    `https://graph.facebook.com/v18.0/${accountId}?fields=username,followers_count&access_token=${token}`
  )

  if (!res.ok) {
    const err = await res.text()
    console.error('FAIL: Instagram API error:', err)
    console.error('Make sure:')
    console.error('  1. Token has instagram_basic and instagram_content_publish permissions')
    console.error('  2. Account is a Business Account (not personal)')
    console.error('  3. Account is linked to a Facebook Page')
    process.exit(1)
  }

  const data = await res.json()
  console.log('PASS: Instagram connected')
  console.log(`  Username: @${data.username}`)
  console.log(`  Followers: ${data.followers_count}`)

  // Test 2: Get recent media
  const mediaRes = await fetch(
    `https://graph.facebook.com/v18.0/${accountId}/media?fields=id,caption,media_type&access_token=${token}&limit=3`
  )

  if (!mediaRes.ok) {
    const err = await mediaRes.text()
    console.error('FAIL: Cannot fetch media:', err)
    process.exit(1)
  }

  const mediaData = await mediaRes.json()
  console.log('PASS: Can fetch media')
  console.log(`  Recent posts: ${mediaData.data?.length ?? 0}`)
  mediaData.data?.forEach((post: { id: string; caption?: string; media_type: string }) => {
    console.log(`    - ${post.media_type}: ${post.caption?.slice(0, 40) ?? 'no caption'}...`)
  })

  console.log('\nInstagram is READY')
}

main().catch((err) => {
  console.error('FAIL: Unexpected error:', err)
  process.exit(1)
})
