import { NextRequest, NextResponse } from 'next/server'
import { runContentPipeline, generateImagesForContent } from '@/content-engine/pipeline'
import { ContentPillar, Platform } from '@/types'
import type { CarouselTheme } from '@/content-engine/templates'
import { after } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      platform,
      pillar,
      topic,
      tone,
      scheduledFor,
      theme,
      generateCoverImage,
      generateAllBackgrounds,
      purpose,
      format,
    } = body

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
      theme: theme as CarouselTheme,
      generateCoverImage: generateCoverImage === true,
      purpose,
      format,
    })

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }

    // Generate images in background after response is sent
    // This avoids Vercel's 10s serverless timeout
    if (result.data.contentPieceId) {
      after(async () => {
        try {
          await generateImagesForContent({
            contentPieceId: result.data.contentPieceId,
            platform: platform as Platform,
            headline: result.data.headline,
            body: result.data.body,
            cta: result.data.cta,
            hashtags: result.data.hashtags || [],
            theme: theme as CarouselTheme,
            generateCoverImage: generateCoverImage === true,
            generateAllBackgrounds: generateAllBackgrounds === true,
            topic: topic || title,
          })
        } catch (err) {
          console.error('[BACKGROUND] Image generation failed:', err)
        }
      })
    }

    return NextResponse.json({ success: true, data: result.data })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
