import { NextRequest, NextResponse } from 'next/server'

/**
 * Meta webhook receiver.
 * Handles lead events and ad performance updates from Meta.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // TODO: Verify signature using META_APP_SECRET
    // const signature = request.headers.get('x-hub-signature-256')

    switch (body.object) {
      case 'instagram':
      case 'page':
        // Handle messaging/webhook events
        await handleMetaWebhook(body.entry)
        break
      default:
        console.warn(`Unknown webhook object: ${body.object}`)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Meta webhook error:', err)
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 })
  }
}

/**
 * Meta webhook verification (GET).
 * Used during webhook subscription setup.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === process.env.META_VERIFY_TOKEN) {
    return new NextResponse(challenge)
  }

  return NextResponse.json({ success: false }, { status: 403 })
}

async function handleMetaWebhook(entries: unknown[]) {
  for (const entry of entries) {
    console.log('Meta webhook entry:', JSON.stringify(entry, null, 2))
    // TODO: Process events (new leads, message replies, etc.)
  }
}
