import { composeSlide, composeTipSlide, composeCTASlide, generateSlideBackground } from './composer'
import type { ThemeTemplate } from './themes/types'

export type CarouselTheme = 'editorial' | 'minimal' | 'bold' | 'dark' | 'warm'

export const CAROUSEL_THEMES: CarouselTheme[] = ['editorial', 'minimal', 'bold', 'dark', 'warm']

async function loadThemes(): Promise<Record<CarouselTheme, ThemeTemplate>> {
  const [{ editorialTheme }, { minimalTheme }, { boldTheme }, { darkTheme }, { warmTheme }] =
    await Promise.all([
      import('./themes/editorial'),
      import('./themes/minimal'),
      import('./themes/bold'),
      import('./themes/dark'),
      import('./themes/warm'),
    ])
  return {
    editorial: editorialTheme,
    minimal: minimalTheme,
    bold: boldTheme,
    dark: darkTheme,
    warm: warmTheme,
  }
}

let cachedThemes: Record<CarouselTheme, ThemeTemplate> | null = null

export async function getCarouselTheme(name: CarouselTheme): Promise<ThemeTemplate> {
  if (!cachedThemes) {
    cachedThemes = await loadThemes()
  }
  const theme = cachedThemes[name] || cachedThemes.editorial
  if (!theme) {
    console.error(`[THEME] Theme "${name}" not found. Available:`, Object.keys(cachedThemes))
  }
  return theme
}

export interface GeneratedSlide {
  buffer: Buffer
  filename: string
}

export interface CarouselInput {
  title: string
  subtitle?: string
  tips: { title: string; description: string }[]
  cta: string
  hashtags?: string[]
  theme?: CarouselTheme
  topic?: string
}

export interface LinkedInCardInput {
  headline: string
  insight: string
}

/**
 * Generate Instagram carousel with FLUX backgrounds + Canvas text overlays.
 */
export async function generateCarousel(input: CarouselInput): Promise<GeneratedSlide[]> {
  const themeName = input.theme || 'editorial'
  const template = await getCarouselTheme(themeName)
  const topic = input.topic || input.title
  const slides: GeneratedSlide[] = []

  // Generate only ONE FLUX background for the cover (expensive)
  // Tips and CTA use canvas-generated backgrounds (fast)
  console.log('[CAROUSEL] Generating FLUX cover background...')
  const coverBg = await generateSlideBackground(topic, 'cover', themeName)

  // Cover slide
  const coverBuffer = await composeSlide({
    template,
    data: { title: input.title, subtitle: input.subtitle },
    backgroundUrl: coverBg,
  })
  slides.push({ buffer: coverBuffer, filename: '01-cover.png' })

  // Tip slides - no FLUX, pure canvas
  for (let i = 0; i < Math.min(input.tips.length, 3); i++) {
    const tip = input.tips[i]
    const tipBuffer = await composeTipSlide({
      template,
      data: {
        title: tip.title,
        description: tip.description,
        number: i + 1,
      },
      backgroundUrl: null,
    })
    slides.push({
      buffer: tipBuffer,
      filename: `${String(i + 2).padStart(2, '0')}-tip-${i + 1}.png`,
    })
  }

  // CTA slide - no FLUX, pure canvas
  const ctaBuffer = await composeCTASlide({
    template,
    data: { cta: input.cta, hashtags: input.hashtags },
    backgroundUrl: null,
  })
  slides.push({
    buffer: ctaBuffer,
    filename: `${String(slides.length + 1).padStart(2, '0')}-cta.png`,
  })

  console.log('[CAROUSEL] Generated', slides.length, 'slides with FLUX + Canvas')
  return slides
}

/**
 * Generate LinkedIn Insight Card (1200x627).
 * TODO: migrate to Canvas + FLUX
 */
export async function generateLinkedInCard(_input: LinkedInCardInput): Promise<Buffer> {
  // Placeholder - LinkedIn card needs separate 1200x627 template
  const { createCanvas } = await import('@napi-rs/canvas')
  const canvas = createCanvas(1200, 627)
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#0D0D0D'
  ctx.fillRect(0, 0, 1200, 627)
  ctx.fillStyle = '#9FE870'
  ctx.font = 'bold 48px sans-serif'
  ctx.fillText('LinkedIn Card', 60, 320)
  return Buffer.from(await canvas.encode('png'))
}

/**
 * Generate Instagram Story (1080x1920).
 * TODO: migrate to Canvas + FLUX
 */
export async function generateStory(_input: { title: string; subtitle?: string }): Promise<Buffer> {
  const { createCanvas } = await import('@napi-rs/canvas')
  const canvas = createCanvas(1080, 1920)
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#0D0D0D'
  ctx.fillRect(0, 0, 1080, 1920)
  ctx.fillStyle = '#9FE870'
  ctx.font = 'bold 64px sans-serif'
  ctx.fillText('Story', 60, 960)
  return Buffer.from(await canvas.encode('png'))
}
