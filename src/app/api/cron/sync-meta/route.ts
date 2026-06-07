import { NextRequest, NextResponse } from 'next/server'
import { env } from '@/config/env'
import { syncCampaigns } from '@/content-engine/meta/sync'

/**
 * Cron endpoint for Meta Ads sync.
 * Call this from Make.com or any scheduler.
 * Requires x-cron-secret header for security.
 */
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('x-cron-secret')
  if (authHeader !== env.MAKE_WEBHOOK_SECRET) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const result = await syncCampaigns()
    return NextResponse.json({ success: true, data: result })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'POST to /api/cron/sync-meta with x-cron-secret header',
  })
}
