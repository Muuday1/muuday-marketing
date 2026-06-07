import { NextRequest, NextResponse } from 'next/server'
import { publishToInstagram } from '@/content-engine/publishers'
import { supabaseServer } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { contentPieceId, platform } = body

    if (!contentPieceId || !platform) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: contentPieceId, platform' },
        { status: 400 }
      )
    }

    const { data: contentPiece, error: fetchError } = await supabaseServer
      .from('marketing_content_pieces')
      .select('id, metadata, status')
      .eq('id', contentPieceId)
      .single()

    if (fetchError || !contentPiece) {
      return NextResponse.json(
        { success: false, error: fetchError?.message || 'Content piece not found' },
        { status: 404 }
      )
    }

    const metadata = contentPiece.metadata || {}
    const caption = metadata.caption || ''
    const hashtags = metadata.hashtags || []
    const imageUrls = metadata.imageUrls || []
    const fullCaption = `${caption}\n\n${hashtags.join(' ')}`

    let result: { success: boolean; error?: string; data?: { postId: string } }

    if (platform === 'instagram') {
      result = await publishToInstagram({
        caption: fullCaption,
        imageUrls,
      })
    } else {
      return NextResponse.json(
        { success: false, error: `Platform ${platform} not supported for immediate publish` },
        { status: 400 }
      )
    }

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }

    await supabaseServer
      .from('marketing_content_pieces')
      .update({ status: 'published' })
      .eq('id', contentPieceId)

    await supabaseServer.from('marketing_social_posts').insert({
      content_piece_id: contentPieceId,
      platform,
      status: 'published',
      published_at: new Date().toISOString(),
      external_post_id: result.data?.postId,
    })

    return NextResponse.json({
      success: true,
      data: { postId: result.data?.postId },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
