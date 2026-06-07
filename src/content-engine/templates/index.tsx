import React from 'react'
import { renderToPng } from './render'
import { CoverSlide, TipSlide, CTASlide } from './carousel'
import { StoryTemplate } from './story'

export { CoverSlide, TipSlide, CTASlide, StoryTemplate, renderToPng }

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
}

/**
 * Generate a complete Instagram carousel (5 PNGs) from copy data.
 */
export async function generateCarousel(input: CarouselInput): Promise<GeneratedSlide[]> {
  const slides: GeneratedSlide[] = []

  // Slide 1: Cover
  const coverPng = await renderToPng(<CoverSlide title={input.title} subtitle={input.subtitle} />, {
    width: 1080,
    height: 1080,
  })
  slides.push({ buffer: coverPng, filename: '01-cover.png' })

  // Slides 2-4: Tips (up to 3)
  for (let i = 0; i < Math.min(input.tips.length, 3); i++) {
    const tip = input.tips[i]
    const tipPng = await renderToPng(
      <TipSlide number={i + 1} title={tip.title} description={tip.description} />,
      { width: 1080, height: 1080 }
    )
    slides.push({ buffer: tipPng, filename: `${String(i + 2).padStart(2, '0')}-tip-${i + 1}.png` })
  }

  // Final slide: CTA
  const ctaPng = await renderToPng(<CTASlide cta={input.cta} hashtags={input.hashtags} />, {
    width: 1080,
    height: 1080,
  })
  slides.push({ buffer: ctaPng, filename: `${String(slides.length + 1).padStart(2, '0')}-cta.png` })

  return slides
}

/**
 * Generate an Instagram Story (1 PNG) from copy data.
 */
export async function generateStory(input: { title: string; subtitle?: string }): Promise<Buffer> {
  return renderToPng(<StoryTemplate title={input.title} subtitle={input.subtitle} />, {
    width: 1080,
    height: 1920,
  })
}
