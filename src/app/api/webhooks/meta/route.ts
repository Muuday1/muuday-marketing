import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { env } from '@/config/env'
import { createHmac } from 'crypto'

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  { auth: { persistSession: false } }
)

function verifySignature(body: string, signature: string | null, secret: string): boolean {
  if (!signature) return false
  const expected = `sha256=${createHmac('sha256', secret).update(body, 'utf8').digest('hex')}`
  return signature === expected
}

interface MetaWebhookEntry {
  id: string
  time: number
  messaging?: Array<{
    sender: { id: string }
    recipient: { id: string }
    timestamp: number
    message?: { mid: string; text: string }
    postback?: { title: string; payload: string }
  }>
  changes?: Array<{
    field: string
    value: Record<string, unknown>
  }>
}

/**
 * Meta webhook receiver.
 * Handles lead events and ad performance updates from Meta.
 */
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get('x-hub-signature-256')

    if (!verifySignature(rawBody, signature, env.META_APP_SECRET || '')) {
      return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 403 })
    }

    const body = JSON.parse(rawBody)

    switch (body.object) {
      case 'instagram':
      case 'page':
        await handleMetaWebhook(body.entry as MetaWebhookEntry[])
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

  if (mode === 'subscribe' && token === env.META_VERIFY_TOKEN) {
    return new NextResponse(challenge)
  }

  return NextResponse.json({ success: false }, { status: 403 })
}

async function handleMetaWebhook(entries: MetaWebhookEntry[]) {
  for (const entry of entries) {
    // Handle messaging events (DMs, comments)
    if (entry.messaging) {
      for (const event of entry.messaging) {
        if (event.message?.text) {
          console.log(`Meta message from ${event.sender.id}: ${event.message.text}`)
          await supabase.from('marketing_leads').insert({
            source: 'meta_messenger',
            tags: ['messenger', 'organic'],
            status: 'new',
            notes: event.message.text,
          })
        }
        if (event.postback?.payload) {
          console.log(`Meta postback from ${event.sender.id}: ${event.postback.payload}`)
        }
      }
    }

    // Handle lead gen form submissions
    if (entry.changes) {
      for (const change of entry.changes) {
        if (change.field === 'leadgen_forms') {
          const leadData = change.value
          console.log('Meta lead gen form submission:', leadData)
          await supabase.from('marketing_leads').insert({
            source: 'meta_lead_gen',
            tags: ['meta_ads', 'lead_gen'],
            status: 'new',
            notes: JSON.stringify(leadData),
          })
        }
      }
    }
  }
}
