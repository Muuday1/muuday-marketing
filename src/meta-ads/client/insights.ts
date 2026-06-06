import { metaFetch, buildInsightsPath } from './auth'
import { env } from '@/config/env'
import { ApiResult, MetaCampaign } from '@/types'

interface MetaInsightsResponse {
  data: Array<{
    campaign_id: string
    campaign_name: string
    impressions: string
    clicks: string
    spend: string
    ctr: string
    cpc: string
    cpm: string
    actions?: Array<{ action_type: string; value: string }>
    date_start: string
    date_stop: string
  }>
  paging?: { cursors: { after: string } }
}

/**
 * Fetch campaign performance data from Meta Marketing API.
 */
export async function fetchCampaignInsights(
  datePreset: 'today' | 'yesterday' | 'last_7d' | 'last_30d' = 'last_7d'
): Promise<ApiResult<MetaCampaign[]>> {
  try {
    const accountId = env.META_AD_ACCOUNT_ID
    if (!accountId) {
      return { success: false, error: 'META_AD_ACCOUNT_ID not configured' }
    }

    const fields = [
      'campaign_id',
      'campaign_name',
      'impressions',
      'clicks',
      'spend',
      'ctr',
      'cpc',
      'cpm',
      'actions',
    ]

    const path = buildInsightsPath(accountId, fields, {
      date_preset: datePreset,
      level: 'campaign',
    })

    const data = await metaFetch<MetaInsightsResponse>(path)

    const campaigns: MetaCampaign[] = data.data.map((item) => ({
      id: item.campaign_id,
      name: item.campaign_name,
      objective: 'AWARENESS',
      status: 'ACTIVE',
      dailyBudget: 0,
      spend: parseFloat(item.spend) || 0,
      impressions: parseInt(item.impressions) || 0,
      clicks: parseInt(item.clicks) || 0,
      conversions:
        item.actions?.find((a) => a.action_type === 'purchase')?.value || '0',
      ctr: parseFloat(item.ctr) || 0,
      cpc: parseFloat(item.cpc) || 0,
      cpm: parseFloat(item.cpm) || 0,
      roas: 0,
      startDate: new Date(item.date_start),
    }))

    return { success: true, data: campaigns }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return { success: false, error: message }
  }
}
