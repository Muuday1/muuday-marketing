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
  hashtags: string[]
}

interface ImageGenerationInput {
  contentPieceId: string
  platform: Platform
  headline: string
  body: string
  cta: string
  hashtags: string[]
  theme?: CarouselTheme
  generateCoverImage?: boolean
  topic?: string
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
  console.log('[CAROUSEL] Starting generation with theme:', theme)
  console.log('[CAROUSEL] Headline:', headline.slice(0, 50))
  console.log('[CAROUSEL] Tips count:', tips.length)

  const slides = await generateCarousel({
    title: headline,
    subtitle: '',
    tips,
    cta,
    hashtags,
    theme,
  })

  console.log('[CAROUSEL] Generated', slides.length, 'slides')

  const urls: string[] = []
  for (let i = 0; i < slides.length; i++) {
    const path = `${contentPieceId}/slide-${i}.png`
    console.log('[CAROUSEL] Uploading slide', i, 'to', path)
    urls.push(await uploadAsset(path, slides[i].buffer, 'image/png'))
  }

  console.log('[CAROUSEL] Upload complete:', urls.length, 'urls')
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

  // Step 1: Generate copy (fast - usually 2-5s)
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

  // Step 2: Check brand voice (fast - local)
  const voiceResult = checkBrandVoice({
    headline: copy.headline,
    body: copy.body,
    cta: copy.cta,
  })

  if (!voiceResult.success) {
    return { success: false, error: `Brand voice: ${voiceResult.error}` }
  }

  const voice = voiceResult.data

  // Step 3: Save to DB immediately (fast)
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
        imageUrls: [],
        coverImageUrl: null,
      },
      brand_voice_score: voice.score,
      ai_provider: 'kimi',
      ai_model: 'kimi-k2.5',
    })
    .select('id')
    .single()

  if (dbError) {
    return { success: false, error: `DB: ${dbError.message}` }
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
      imageUrls: [],
      hashtags: copy.hashtags || [],
    },
  }
}

/**
 * Generate images for a content piece in background.
 * This is called via unstable_after to avoid Vercel's 10s timeout.
 */
export async function generateImagesForContent(input: ImageGenerationInput): Promise<void> {
  const theme = input.theme || 'warm'
  const tempId = `temp-${Date.now()}`
  let imageUrls: string[] = []
  let coverImageUrl: string | null = null

  console.log('[BACKGROUND] Starting image generation for', input.contentPieceId)

  if (input.platform === 'instagram') {
    try {
      const tips = extractTips(input.body)
      console.log('[BACKGROUND] Tips extracted:', tips.length)
      imageUrls = await generateInstagramCarousel(
        tempId,
        input.headline,
        tips,
        input.cta,
        input.hashtags,
        theme
      )
      console.log('[BACKGROUND] Carousel generated:', imageUrls.length, 'images')
    } catch (err) {
      console.error('[BACKGROUND] Carousel failed:', err)
    }
  } else if (input.platform === 'linkedin') {
    try {
      imageUrls = await generateLinkedInVisual(tempId, input.headline, input.body)
    } catch (err) {
      console.warn('[BACKGROUND] LinkedIn card failed:', err)
    }
  }

  if (input.generateCoverImage && input.topic) {
    try {
      coverImageUrl = await generateFLUXCover(tempId, input.headline, input.topic)
    } catch (err) {
      console.warn('[BACKGROUND] FLUX cover failed:', err)
    }
  }

  // Update DB with generated images
  if (imageUrls.length > 0 || coverImageUrl) {
    const { error } = await supabase
      .from('marketing_content_pieces')
      .update({
        metadata: {
          imageUrls,
          coverImageUrl,
        },
      })
      .eq('id', input.contentPieceId)

    if (error) {
      console.error('[BACKGROUND] DB update failed:', error)
    } else {
      console.log('[BACKGROUND] Images saved to DB for', input.contentPieceId)
    }
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
