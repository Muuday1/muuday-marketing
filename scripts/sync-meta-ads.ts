#!/usr/bin/env node
/**
 * sync-meta-ads.ts
 * Synchronizes Meta Ads campaign data into the marketing database.
 * Run via: npm run meta:sync
 */

import { createClient } from '@supabase/supabase-js'
import { env } from '@/config/env'

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  { auth: { persistSession: false } }
)

interface MetaCampaignSummary {
  id: string
  name: string
  status: string
  objective: string
  spend: number
  impressions: number
  clicks: number
  conversions: number
}

async function fetchCampaigns(): Promise<MetaCampaignSummary[]> {
  const url = new URL(
    `https://graph.facebook.com/v18.0/act_${env.META_AD_ACCOUNT_ID}/campaigns`
  )
  url.searchParams.set('fields', 'id,name,status,objective,spend')
  url.searchParams.set('access_token', env.META_ACCESS_TOKEN || '')

  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error(`Meta API error: ${response.status} ${await response.text()}`)
  }

  const data = await response.json()
  return (data.data || []).map((c: Record<string, unknown>) => ({
    id: c.id as string,
    name: c.name as string,
    status: c.status as string,
    objective: c.objective as string,
    spend: parseFloat(c.spend as string) || 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
  }))
}

async function fetchInsights(campaignId: string) {
  const url = new URL(
    `https://graph.facebook.com/v18.0/${campaignId}/insights`
  )
  url.searchParams.set('fields', 'impressions,clicks,conversions')
  url.searchParams.set('access_token', env.META_ACCESS_TOKEN || '')

  const response = await fetch(url.toString())
  if (!response.ok) return null

  const data = await response.json()
  const insight = data.data?.[0]
  if (!insight) return null

  return {
    impressions: parseInt(insight.impressions || '0', 10),
    clicks: parseInt(insight.clicks || '0', 10),
    conversions: parseInt(insight.conversions || '0', 10),
  }
}

async function syncCampaigns() {
  console.log('🔄 Fetching campaigns from Meta Ads API...')
  const campaigns = await fetchCampaigns()
  console.log(`📊 Found ${campaigns.length} campaigns`)

  for (const campaign of campaigns) {
    const insights = await fetchInsights(campaign.id)
    if (insights) {
      campaign.impressions = insights.impressions
      campaign.clicks = insights.clicks
      campaign.conversions = insights.conversions
    }
    console.log(
      `  [${campaign.status}] ${campaign.name} — spend: $${campaign.spend}, clicks: ${campaign.clicks}`
    )
  }

  const { error } = await supabase.from('marketing_meta_campaigns').upsert(
    campaigns.map((c) => ({
      id: c.id,
      name: c.name,
      objective: c.objective.toUpperCase(),
      status: c.status,
      spend: c.spend,
      impressions: c.impressions,
      clicks: c.clicks,
      conversions: c.conversions,
      synced_at: new Date().toISOString(),
    })),
    { onConflict: 'id' }
  )

  if (error) {
    throw new Error(`Supabase upsert failed: ${error.message}`)
  }

  console.log('✅ Sync complete. Campaigns upserted to marketing_meta_campaigns.')
}

syncCampaigns().catch((err) => {
  console.error('❌ Sync failed:', err)
  process.exit(1)
})
