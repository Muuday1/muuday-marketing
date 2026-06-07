import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { contentPieceId, platform, scheduledFor } = body

    if (!contentPieceId || !platform || !scheduledFor) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: contentPieceId, platform, scheduledFor',
        },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseServer
      .from('marketing_social_posts')
      .insert({
        content_piece_id: contentPieceId,
        platform,
        scheduled_for: scheduledFor,
        status: 'scheduled',
      })
      .select('id')
      .single()

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    // Update content piece status to scheduled
    await supabaseServer
      .from('marketing_content_pieces')
      .update({ status: 'scheduled' })
      .eq('id', contentPieceId)

    return NextResponse.json({ success: true, data: { postId: data.id } })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
