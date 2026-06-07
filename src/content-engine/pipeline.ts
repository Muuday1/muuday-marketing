import { generateCopy } from './generators/copy-generator'
import { checkBrandVoice } from './validators/brand-voice-check'
import { generateCarousel, generateLinkedInCard } from './templates'
import { generateImage } from '@/shared/model-router'
import { supabaseServer } from '@/lib/supabase/server'
import { uploadAsset } from './storage'
import { ApiResult, ContentPillar, Platform } from '@/types'
import type { CarouselTheme } from './templates'

const supabase = supabaseServer

interface PipelineInput {
  title: string
  platform: Platform
  pillar: ContentPillar
  topic: string
  tone?: 'warm' | 'informative' | 'motivational' | 'fun'
  scheduledFor?: string
  theme?: CarouselTheme
  generateCoverImage?: boolean
  purpose?: string
  format?: string
}

interface PipelineOutput {
  contentPieceId: string
  headline: string
  body: string
  cta: string
  brandVoiceScore: number
  passed: boolean
  imageUrls: string[]
}

function extractTips(body: string): { title: string; description: string }[] {
  const lines = body
    .split(/\n+/)
    .map((l) => l.trim())
    .filter((l) => l.length > 10 && !l.startsWith('#') && !l.toLowerCase().startsWith('cta'))

  const tips: { title: string; description: string }[] = []

  for (const line of lines.slice(0, 3)) {
    const sentences = line
      .split(/[.!?]/)
      .map((s) => s.trim())
      .filter(Boolean)
    if (sentences.length >= 2) {
      tips.push({
        title: sentences[0].slice(0, 60),
        description: sentences.slice(1).join('. ').slice(0, 200),
      })
    } else {
      tips.push({
        title: line.slice(0, 60),
        description: line.slice(0, 200),
      })
    }
  }

  return tips.length > 0 ? tips : [{ title: 'Dica importante', description: body.slice(0, 200) }]
}

async function generateInstagramCarousel(
  contentPieceId: string,
  headline: string,
  tips: { title: string; description: string }[],
  cta: string,
  hashtags: string[],
  theme: CarouselTheme
): Promise<string[]> {
  const slides = await generateCarousel({
    title: headline,
    subtitle: '',
    tips,
    cta,
    hashtags,
    theme,
  })

  const urls: string[] = []
  for (let i = 0; i < slides.length; i++) {
    const path = `${contentPieceId}/slide-${i}.png`
    urls.push(await uploadAsset(path, slides[i].buffer, 'image/png'))
  }
  return urls
}

async function generateLinkedInVisual(
  contentPieceId: string,
  headline: string,
  body: string
): Promise<string[]> {
  const insight = body.slice(0, 200)
  const buffer = await generateLinkedInCard({ headline, insight })
  const path = `${contentPieceId}/linkedin-card.png`
  const url = await uploadAsset(path, buffer, 'image/png')
  return [url]
}

async function generateFLUXCover(
  contentPieceId: string,
  headline: string,
  topic: string
): Promise<string | null> {
  const prompt = `Professional image for social media about: ${topic}. "${headline}". Modern, warm, Brazilian culture. Brand: lime green accents on dark.`
  const result = await generateImage({ prompt, size: 'square' })

  if (!result.success || !result.data?.url) {
    console.warn('FLUX cover failed: no url')
    return null
  }

  try {
    const res = await fetch(result.data.url)
    if (!res.ok) return null
    const buffer = Buffer.from(await res.arrayBuffer())
    return await uploadAsset(`${contentPieceId}/cover-flux.png`, buffer, 'image/png')
  } catch (err) {
    console.warn('FLUX download failed:', err)
    return null
  }
}

export async function runContentPipeline(input: PipelineInput): Promise<ApiResult<PipelineOutput>> {
  const theme = input.theme || 'warm'

  const copyResult = await generateCopy({
    platform: input.platform,
    pillar: input.pillar,
    topic: input.topic,
    tone: input.tone,
  })

  if (!copyResult.success) {
    return { success: false, error: `Copy failed: ${copyResult.error}` }
  }

  const copy = copyResult.data

  const voiceResult = checkBrandVoice({
    headline: copy.headline,
    body: copy.body,
    cta: copy.cta,
  })

  if (!voiceResult.success) {
    return { success: false, error: `Brand voice: ${voiceResult.error}` }
  }

  const voice = voiceResult.data

  // Generate platform-specific visuals
  let imageUrls: string[] = []
  let coverImageUrl: string | null = null
  const tempId = `temp-${Date.now()}`

  if (input.platform === 'instagram') {
    try {
      console.log('[PIPELINE] Generating Instagram carousel...')
      const tips = extractTips(copy.body)
      console.log('[PIPELINE] Tips extracted:', tips.length)
      imageUrls = await generateInstagramCarousel(
        tempId,
        copy.headline,
        tips,
        copy.cta,
        copy.hashtags,
        theme
      )
      console.log('[PIPELINE] Carousel generated:', imageUrls.length, 'images')
    } catch (err) {
      console.error('[PIPELINE] Carousel failed:', err)
    }
  } else if (input.platform === 'linkedin') {
    try {
      imageUrls = await generateLinkedInVisual(tempId, copy.headline, copy.body)
    } catch (err) {
      console.warn('LinkedIn card failed:', err)
    }
  }

  if (input.generateCoverImage) {
    coverImageUrl = await generateFLUXCover(tempId, copy.headline, input.topic)
  }

  const { data: contentPiece, error: dbError } = await supabase
    .from('marketing_content_pieces')
    .insert({
      type: input.format || mapPlatformToType(input.platform),
      status: voice.passed ? 'review' : 'draft',
      title: input.title,
      content: JSON.stringify(copy),
      metadata: {
        platform: input.platform,
        pillar: input.pillar,
        topic: input.topic,
        tone: input.tone,
        theme,
        purpose: input.purpose,
        format: input.format,
        scheduledFor: input.scheduledFor,
        caption: copy.body,
        hashtags: copy.hashtags,
        imageUrls,
        coverImageUrl,
      },
      brand_voice_score: voice.score,
      ai_provider: 'kimi',
      ai_model: 'kimi-k2.6',
    })
    .select('id')
    .single()

  if (dbError) {
    return { success: false, error: `DB: ${dbError.message}` }
  }

  if (imageUrls.length > 0 || coverImageUrl) {
    await supabase
      .from('marketing_content_pieces')
      .update({
        metadata: {
          platform: input.platform,
          pillar: input.pillar,
          topic: input.topic,
          tone: input.tone,
          theme,
          purpose: input.purpose,
          format: input.format,
          scheduledFor: input.scheduledFor,
          caption: copy.body,
          hashtags: copy.hashtags,
          imageUrls,
          coverImageUrl,
        },
      })
      .eq('id', contentPiece.id)
  }

  return {
    success: true,
    data: {
      contentPieceId: contentPiece.id,
      headline: copy.headline,
      body: copy.body,
      cta: copy.cta,
      brandVoiceScore: voice.score,
      passed: voice.passed,
      imageUrls,
    },
  }
}

function mapPlatformToType(platform: Platform): string {
  const map: Record<string, string> = {
    instagram: 'carousel',
    linkedin: 'linkedin-post',
    tiktok: 'reel',
    youtube: 'reel',
    twitter: 'text',
    blog: 'blog',
    newsletter: 'newsletter',
    podcast: 'podcast',
  }
  return map[platform] || 'carousel'
}
