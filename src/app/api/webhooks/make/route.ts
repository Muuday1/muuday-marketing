import { NextRequest, NextResponse } from 'next/server'

/**
 * Make.com webhook receiver.
 * Triggered by Make.com scenarios to create content, publish posts,
 * or start a podcast pipeline.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Simple API key validation
    const apiKey = request.headers.get('x-api-key')
    if (apiKey !== process.env.MAKE_WEBHOOK_API_KEY) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    switch (body.action) {
      case 'generate_content':
        // TODO: Trigger content generation workflow
        console.log('Make.com: generate content', body.topic)
        break
      case 'publish_post':
        // TODO: Publish approved content to social media
        console.log('Make.com: publish post', body.contentId)
        break
      case 'meta_sync':
        // TODO: Sync Meta Ads data
        console.log('Make.com: sync Meta Ads')
        break
      default:
        console.warn(`Unknown Make.com action: ${body.action}`)
    }

    return NextResponse.json({ success: true, action: body.action })
  } catch (err) {
    console.error('Make.com webhook error:', err)
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 })
  }
}
