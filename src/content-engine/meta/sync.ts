import { supabaseServer } from '@/lib/supabase/server'
import { env } from '@/config/env'

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
  const accountId = env.META_AD_ACCOUNT_ID?.startsWith('act_')
    ? env.META_AD_ACCOUNT_ID
    : `act_${env.META_AD_ACCOUNT_ID}`

  const url = new URL(`https://graph.facebook.com/v18.0/${accountId}/campaigns`)
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
  const url = new URL(`https://graph.facebook.com/v18.0/${campaignId}/insights`)
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

export async function syncCampaigns(): Promise<{
  count: number
  campaigns: MetaCampaignSummary[]
}> {
  const campaigns = await fetchCampaigns()

  for (const campaign of campaigns) {
    const insights = await fetchInsights(campaign.id)
    if (insights) {
      campaign.impressions = insights.impressions
      campaign.clicks = insights.clicks
      campaign.conversions = insights.conversions
    }
  }

  if (campaigns.length > 0) {
    const { error } = await supabaseServer.from('marketing_meta_campaigns').upsert(
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
  }

  return { count: campaigns.length, campaigns }
}
