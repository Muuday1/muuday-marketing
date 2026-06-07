import { generateCopy } from './generators/copy-generator'
import { checkBrandVoice } from './validators/brand-voice-check'
import { generateCarousel } from './templates'
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

async function saveCarouselImages(
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
    const url = await uploadAsset(path, slides[i].buffer, 'image/png')
    urls.push(url)
  }

  return urls
}

async function generateCoverImage(
  contentPieceId: string,
  headline: string,
  topic: string
): Promise<string | null> {
  const prompt = `Professional marketing image for Instagram post about: ${topic}. Headline: "${headline}". Style: modern, warm, inviting, Brazilian culture. Brand colors: lime green accents on dark background.`

  const result = await generateImage({ prompt, size: 'square' })

  if (!result.success || !result.data?.url) {
    console.warn(
      'Cover image generation failed:',
      'success' in result && !result.success ? 'Unknown error' : 'No URL'
    )
    return null
  }

  // Download the generated image and upload to Supabase
  try {
    const imageRes = await fetch(result.data.url)
    if (!imageRes.ok) return null

    const buffer = Buffer.from(await imageRes.arrayBuffer())
    const path = `${contentPieceId}/cover-image.png`
    return await uploadAsset(path, buffer, 'image/png')
  } catch (err) {
    console.warn('Failed to download/upload cover image:', err)
    return null
  }
}

export async function runContentPipeline(input: PipelineInput): Promise<ApiResult<PipelineOutput>> {
  const theme = input.theme || 'classic'

  // Step 1: Generate copy
  const copyResult = await generateCopy({
    platform: input.platform,
    pillar: input.pillar,
    topic: input.topic,
    tone: input.tone,
  })

  if (!copyResult.success) {
    return { success: false, error: `Copy generation failed: ${copyResult.error}` }
  }

  const copy = copyResult.data

  // Step 2: Brand voice validation
  const voiceResult = checkBrandVoice({
    headline: copy.headline,
    body: copy.body,
    cta: copy.cta,
  })

  if (!voiceResult.success) {
    return { success: false, error: `Brand voice check failed: ${voiceResult.error}` }
  }

  const voice = voiceResult.data

  // Step 3: Generate carousel visuals
  let imageUrls: string[] = []
  let coverImageUrl: string | null = null

  if (input.platform === 'instagram' || input.platform === 'linkedin') {
    try {
      const tips = extractTips(copy.body)
      const tempId = `temp-${Date.now()}`
      imageUrls = await saveCarouselImages(
        tempId,
        copy.headline,
        tips,
        copy.cta,
        copy.hashtags,
        theme
      )

      // Optional: Generate AI cover image with FLUX
      if (input.generateCoverImage) {
        coverImageUrl = await generateCoverImage(tempId, copy.headline, input.topic)
      }
    } catch (err) {
      console.warn('Carousel generation failed:', err)
    }
  }

  // Step 4: Save to Supabase
  const { data: contentPiece, error: dbError } = await supabase
    .from('marketing_content_pieces')
    .insert({
      type: mapPlatformToType(input.platform),
      status: voice.passed ? 'review' : 'draft',
      title: input.title,
      content: JSON.stringify(copy),
      metadata: {
        platform: input.platform,
        pillar: input.pillar,
        topic: input.topic,
        tone: input.tone,
        theme,
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
    return { success: false, error: `Database error: ${dbError.message}` }
  }

  if (imageUrls.length > 0) {
    await supabase
      .from('marketing_content_pieces')
      .update({
        metadata: {
          platform: input.platform,
          pillar: input.pillar,
          topic: input.topic,
          tone: input.tone,
          theme,
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
    tiktok: 'reel',
    youtube: 'reel',
    linkedin: 'carousel',
    twitter: 'story',
    blog: 'blog',
    newsletter: 'newsletter',
    podcast: 'podcast',
  }
  return map[platform] || 'carousel'
}
