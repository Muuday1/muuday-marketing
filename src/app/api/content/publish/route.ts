import { NextRequest, NextResponse } from 'next/server'
import { publishToInstagram } from '@/content-engine/publishers'
import { createClient } from '@supabase/supabase-js'
import { env } from '@/config/env'

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { contentPieceId } = body

    if (!contentPieceId) {
      return NextResponse.json({ success: false, error: 'Missing contentPieceId' }, { status: 400 })
    }

    // Fetch content piece
    const { data: content, error: fetchError } = await supabase
      .from('marketing_content_pieces')
      .select('*')
      .eq('id', contentPieceId)
      .single()

    if (fetchError || !content) {
      return NextResponse.json({ success: false, error: 'Content not found' }, { status: 404 })
    }

    const copy = JSON.parse(content.content || '{}')
    const imageUrls: string[] = content.metadata?.imageUrls || []
    const platform = content.metadata?.platform || 'instagram'

    // Build caption
    const caption = `${copy.body}\n\n${copy.cta}\n\n${(copy.hashtags || []).join(' ')}`

    // Publish based on platform
    let result: { success: boolean; error?: string; data?: { postId: string } }

    if (platform === 'instagram') {
      result = await publishToInstagram({ caption, imageUrls })
    } else {
      return NextResponse.json(
        { success: false, error: `Platform ${platform} not yet supported` },
        { status: 400 }
      )
    }

    if (!result.success) {
      // Update status to failed
      await supabase.from('marketing_social_posts').insert({
        content_piece_id: contentPieceId,
        platform,
        status: 'failed',
        error_message: result.error,
      })

      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }

    // Record successful publish
    await supabase.from('marketing_social_posts').insert({
      content_piece_id: contentPieceId,
      platform,
      external_post_id: result.data?.postId,
      status: 'published',
      published_at: new Date().toISOString(),
    })

    // Update content piece status
    await supabase
      .from('marketing_content_pieces')
      .update({ status: 'published', published_at: new Date().toISOString() })
      .eq('id', contentPieceId)

    return NextResponse.json({
      success: true,
      data: { postId: result.data?.postId },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
