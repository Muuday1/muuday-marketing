import { composeSlide, composeTipSlide, composeCTASlide, generateSlideBackground } from './composer'
import type { ThemeTemplate } from './themes/types'
import { editorialTheme, minimalTheme, boldTheme, darkTheme, warmTheme } from './themes-bundle'
import { generateLinkedInCardBuffer } from './linkedin-card'
import { generateStoryBuffer } from './story'

export type CarouselTheme = 'editorial' | 'minimal' | 'bold' | 'dark' | 'warm'

export const CAROUSEL_THEMES: CarouselTheme[] = ['editorial', 'minimal', 'bold', 'dark', 'warm']

const THEMES: Record<CarouselTheme, ThemeTemplate> = {
  editorial: editorialTheme,
  minimal: minimalTheme,
  bold: boldTheme,
  dark: darkTheme,
  warm: warmTheme,
}

export function getCarouselTheme(name: CarouselTheme): ThemeTemplate {
  const theme = THEMES[name]
  if (!theme) {
    console.error(`[THEME] Theme "${name}" not found. Available:`, Object.keys(THEMES))
    return THEMES.editorial
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
  const template = getCarouselTheme(themeName)
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
 */
export async function generateLinkedInCard(input: LinkedInCardInput): Promise<Buffer> {
  return generateLinkedInCardBuffer({
    headline: input.headline,
    insight: input.insight,
    author: 'muuday',
  })
}

/**
 * Generate Instagram Story (1080x1920).
 */
export async function generateStory(input: {
  title: string
  subtitle?: string
  cta?: string
}): Promise<Buffer> {
  return generateStoryBuffer({
    title: input.title,
    subtitle: input.subtitle,
    cta: input.cta || 'deslize para cima',
  })
}
