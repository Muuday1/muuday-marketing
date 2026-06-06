import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { env } from '@/config/env'

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  { auth: { persistSession: false } }
)

export async function POST(request: NextRequest) {
  try {
    const { title, type, platform, pillar, useAI } = await request.json()

    if (!title || !type || !platform) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    let content = ''
    let aiCost = 0
    let aiProvider = ''
    let aiModel = ''

    if (useAI) {
      // Generate copy via OpenAI
      const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `Você é um copywriter especialista em marketing para brasileiros no exterior.\nTom: warm, informed, aspirational. Nunca genérico.\nFormato: ${type} para ${platform}. Pilar: ${pillar}.`,
            },
            {
              role: 'user',
              content: `Crie copy para: "${title}".\n\nResponda em JSON com: { "headline": "...", "body": "...", "cta": "...", "hashtags": ["..."] }`,
            },
          ],
          response_format: { type: 'json_object' },
        }),
      })

      if (openaiRes.ok) {
        const openaiData = await openaiRes.json()
        const parsed = JSON.parse(openaiData.choices[0]?.message?.content || '{}')
        content = `${parsed.headline}\n\n${parsed.body}\n\n${parsed.cta}\n\n${parsed.hashtags?.join(' ') || ''}`
        aiCost = (openaiData.usage?.total_tokens ?? 0) * 0.0000015
        aiProvider = 'openai'
        aiModel = 'gpt-4o-mini'
      }
    }

    if (!content) {
      content = title
    }

    // Save to Supabase
    const { data, error } = await supabase
      .from('marketing_content_pieces')
      .insert({
        title,
        type,
        content,
        status: 'draft',
        metadata: { platform, pillar },
        ai_cost_usd: aiCost,
        ai_provider: aiProvider,
        ai_model: aiModel,
      })
      .select('id')
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data.id })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
