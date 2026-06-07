#!/usr/bin/env node
/**
 * sync-meta-ads.ts
 * Synchronizes Meta Ads campaign data into the marketing database.
 * Run via: npm run meta:sync
 */

import { syncCampaigns } from '@/content-engine/meta/sync'

async function main() {
  console.log('🔄 Fetching campaigns from Meta Ads API...')
  const result = await syncCampaigns()
  console.log(`📊 Found ${result.count} campaigns`)

  for (const c of result.campaigns) {
    console.log(`  [${c.status}] ${c.name} — spend: $${c.spend}, clicks: ${c.clicks}`)
  }

  console.log('✅ Sync complete. Campaigns upserted to marketing_meta_campaigns.')
}

main().catch((err) => {
  console.error('❌ Sync failed:', err)
  process.exit(1)
})
