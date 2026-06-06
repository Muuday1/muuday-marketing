#!/usr/bin/env tsx
/**
 * Test Meta Ads API.
 * Usage: npx tsx scripts/test/test-meta-ads.ts
 */

import { config } from 'dotenv'

config({ path: '.env.local' })

const token = process.env.META_ACCESS_TOKEN
const adAccountId = process.env.META_AD_ACCOUNT_ID

if (!token || !adAccountId) {
  console.error('FAIL: Missing META_ACCESS_TOKEN or META_AD_ACCOUNT_ID')
  console.error('Get ad account ID at: https://business.facebook.com/adsmanager/')
  console.error('Click the account name — the ID is in the URL (act_123456789)')
  process.exit(1)
}

async function main() {
  // Test 1: Get campaigns
  const res = await fetch(
    `https://graph.facebook.com/v18.0/${adAccountId}/campaigns?fields=id,name,status,objective&access_token=${token}&limit=5`
  )

  if (!res.ok) {
    const err = await res.text()
    console.error('FAIL: Meta Ads API error:', err)
    console.error('Make sure token has ads_read permission')
    process.exit(1)
  }

  const data = await res.json()
  console.log('PASS: Meta Ads connected')
  console.log(`  Ad Account: ${adAccountId}`)
  console.log(`  Campaigns: ${data.data?.length ?? 0}`)
  data.data?.forEach((c: { id: string; name: string; status: string }) => {
    console.log(`    - ${c.name} (${c.status})`)
  })

  // Test 2: Get insights
  if (data.data?.length > 0) {
    const campaignId = data.data[0].id
    const insightsRes = await fetch(
      `https://graph.facebook.com/v18.0/${campaignId}/insights?fields=spend,impressions,clicks,ctr&access_token=${token}`
    )

    if (insightsRes.ok) {
      const insights = await insightsRes.json()
      console.log('PASS: Can fetch insights')
      if (insights.data?.[0]) {
        const i = insights.data[0]
        console.log(`    Spend: ${i.spend}, Impressions: ${i.impressions}, CTR: ${i.ctr}`)
      }
    }
  }

  console.log('\nMeta Ads is READY')
}

main().catch((err) => {
  console.error('FAIL: Unexpected error:', err)
  process.exit(1)
})
