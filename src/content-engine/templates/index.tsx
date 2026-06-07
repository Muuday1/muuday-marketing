import React from 'react'
import { renderToPng } from './render'
import { StoryTemplate } from './story'
import { getCarouselTheme, LinkedInCover, type CarouselTheme } from './themes'

export { getCarouselTheme, LinkedInCover, CAROUSEL_THEMES, type CarouselTheme } from './themes'
export { StoryTemplate, renderToPng }

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
}

export interface LinkedInCardInput {
  headline: string
  insight: string
}

/**
 * Generate Instagram carousel (5 PNGs).
 */
export async function generateCarousel(input: CarouselInput): Promise<GeneratedSlide[]> {
  const theme = getCarouselTheme(input.theme || 'classic')
  const slides: GeneratedSlide[] = []

  const coverPng = await renderToPng(
    <theme.Cover title={input.title} subtitle={input.subtitle} />,
    {
      width: 1080,
      height: 1080,
    }
  )
  slides.push({ buffer: coverPng, filename: '01-cover.png' })

  for (let i = 0; i < Math.min(input.tips.length, 3); i++) {
    const tip = input.tips[i]
    const tipPng = await renderToPng(
      <theme.Tip number={i + 1} title={tip.title} description={tip.description} />,
      { width: 1080, height: 1080 }
    )
    slides.push({ buffer: tipPng, filename: `${String(i + 2).padStart(2, '0')}-tip-${i + 1}.png` })
  }

  const ctaPng = await renderToPng(<theme.CTA cta={input.cta} hashtags={input.hashtags} />, {
    width: 1080,
    height: 1080,
  })
  slides.push({ buffer: ctaPng, filename: `${String(slides.length + 1).padStart(2, '0')}-cta.png` })

  return slides
}

/**
 * Generate LinkedIn Insight Card (1200x627).
 */
export async function generateLinkedInCard(input: LinkedInCardInput): Promise<Buffer> {
  return renderToPng(<LinkedInCover headline={input.headline} insight={input.insight} />, {
    width: 1200,
    height: 627,
  })
}

/**
 * Generate Instagram Story (1 PNG).
 */
export async function generateStory(input: { title: string; subtitle?: string }): Promise<Buffer> {
  return renderToPng(<StoryTemplate title={input.title} subtitle={input.subtitle} />, {
    width: 1080,
    height: 1920,
  })
}
