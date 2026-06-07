import { NextRequest, NextResponse } from 'next/server'
import { runContentPipeline } from '@/content-engine/pipeline'
import { ContentPillar, Platform } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, platform, pillar, topic, tone, scheduledFor } = body

    if (!title || !platform || !pillar) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, platform, pillar' },
        { status: 400 }
      )
    }

    const result = await runContentPipeline({
      title,
      platform: platform as Platform,
      pillar: pillar as ContentPillar,
      topic: topic || title,
      tone: tone || 'warm',
      scheduledFor,
    })

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: result.data })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
