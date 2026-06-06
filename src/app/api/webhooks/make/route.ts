import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { env } from '@/config/env'

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  { auth: { persistSession: false } }
)

/**
 * Make.com webhook receiver.
 * Triggered by Make.com scenarios to create content, publish posts,
 * or start a podcast pipeline.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const apiKey = request.headers.get('x-api-key')
    if (apiKey !== env.MAKE_WEBHOOK_API_KEY) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    switch (body.action) {
      case 'generate_content': {
        const { data, error } = await supabase.from('marketing_content_pieces').insert({
          type: body.format || 'carousel',
          status: 'draft',
          title: body.topic || 'Untitled',
          content: '',
          metadata: {
            platform: body.platform || 'instagram',
            pillar: body.pillar || 'culture',
            hashtags: body.hashtags || [],
            mentions: [],
            mediaUrls: [],
          },
          author_id: 'make-automation',
        }).select().single()

        if (error) throw error
        console.log('Make.com: content piece created', data.id)
        break
      }

      case 'publish_post': {
        const { data: content, error: fetchError } = await supabase
          .from('marketing_content_pieces')
          .select('*')
          .eq('id', body.contentId)
          .single()

        if (fetchError || !content) {
          return NextResponse.json({ success: false, error: 'Content not found' }, { status: 404 })
        }

        if (content.status !== 'approved') {
          return NextResponse.json(
            { success: false, error: 'Content not approved for publishing' },
            { status: 400 }
          )
        }

        const { error: updateError } = await supabase
          .from('marketing_content_pieces')
          .update({ status: 'scheduled', 'metadata.scheduledFor': new Date().toISOString() })
          .eq('id', body.contentId)

        if (updateError) throw updateError
        console.log('Make.com: post scheduled for publishing', body.contentId)
        break
      }

      case 'meta_sync': {
        const { spawn } = await import('child_process')
        spawn('npx', ['tsx', 'scripts/sync-meta-ads.ts'], {
          stdio: 'inherit',
          cwd: process.cwd(),
        })
        console.log('Make.com: Meta Ads sync triggered')
        break
      }

      default:
        console.warn(`Unknown Make.com action: ${body.action}`)
        return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 })
    }

    return NextResponse.json({ success: true, action: body.action })
  } catch (err) {
    console.error('Make.com webhook error:', err)
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 })
  }
}
