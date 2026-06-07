import { generateCopy } from './generators/copy-generator'
import { checkBrandVoice } from './validators/brand-voice-check'
import { generateCarousel } from './templates'
import { supabaseServer } from '@/lib/supabase/server'
import { uploadAsset } from './storage'
import { ApiResult, ContentPillar, Platform } from '@/types'

const supabase = supabaseServer

interface PipelineInput {
  title: string
  platform: Platform
  pillar: ContentPillar
  topic: string
  tone?: 'warm' | 'informative' | 'motivational' | 'fun'
  scheduledFor?: string
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

/**
 * Extract tips from generated body text.
 * Splits by newlines/numbers and returns up to 3 tips.
 */
function extractTips(body: string): { title: string; description: string }[] {
  const lines = body
    .split(/\n+/)
    .map((l) => l.trim())
    .filter((l) => l.length > 10 && !l.startsWith('#') && !l.toLowerCase().startsWith('cta'))

  const tips: { title: string; description: string }[] = []

  for (const line of lines.slice(0, 3)) {
    // Try to split title from description (first sentence = title, rest = description)
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

/**
 * Generate carousel images and upload to Supabase Storage.
 * Returns public URLs that work from anywhere (required for Instagram API).
 */
async function saveCarouselImages(
  contentPieceId: string,
  headline: string,
  tips: { title: string; description: string }[],
  cta: string,
  hashtags: string[]
): Promise<string[]> {
  const slides = await generateCarousel({
    title: headline,
    subtitle: '',
    tips,
    cta,
    hashtags,
  })

  const urls: string[] = []
  for (let i = 0; i < slides.length; i++) {
    const path = `${contentPieceId}/slide-${i}.png`
    const url = await uploadAsset(path, slides[i].buffer, 'image/png')
    urls.push(url)
  }

  return urls
}

/**
 * Content Pipeline: Generate copy → Validate → Generate visuals → Save
 * All-in-one flow for creating marketing content with carousels.
 */
export async function runContentPipeline(input: PipelineInput): Promise<ApiResult<PipelineOutput>> {
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

  // Step 3: Generate carousel visuals (for Instagram/LinkedIn)
  let imageUrls: string[] = []
  if (input.platform === 'instagram' || input.platform === 'linkedin') {
    try {
      const tips = extractTips(copy.body)
      // We need the contentPieceId to save images, so we generate after DB insert
      // For now, we'll generate and save with a temp ID, then update
      const tempId = `temp-${Date.now()}`
      imageUrls = await saveCarouselImages(tempId, copy.headline, tips, copy.cta, copy.hashtags)
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
        scheduledFor: input.scheduledFor,
        caption: copy.body,
        hashtags: copy.hashtags,
        imageUrls,
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

  // Step 5: Update Supabase with final image URLs (already uploaded with correct ID)
  if (imageUrls.length > 0) {
    await supabase
      .from('marketing_content_pieces')
      .update({
        metadata: {
          platform: input.platform,
          pillar: input.pillar,
          topic: input.topic,
          tone: input.tone,
          scheduledFor: input.scheduledFor,
          caption: copy.body,
          hashtags: copy.hashtags,
          imageUrls,
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
