import React from 'react'
import { ClassicCover, ClassicTip, ClassicCTA } from './classic'
import { MinimalCover, MinimalTip, MinimalCTA } from './minimal'
import { BoldCover, BoldTip, BoldCTA } from './bold'
import { LinkedInCover } from './linkedin-card'
import type { CarouselTheme } from './const'
export { CAROUSEL_THEMES, type CarouselTheme } from './const'

interface CarouselComponents {
  Cover: React.FC<{ title: string; subtitle?: string }>
  Tip: React.FC<{ number: number; title: string; description: string }>
  CTA: React.FC<{ cta: string; hashtags?: string[] }>
}

const CAROUSEL_THEMES_MAP: Record<CarouselTheme, CarouselComponents> = {
  classic: { Cover: ClassicCover, Tip: ClassicTip, CTA: ClassicCTA },
  minimal: { Cover: MinimalCover, Tip: MinimalTip, CTA: MinimalCTA },
  bold: { Cover: BoldCover, Tip: BoldTip, CTA: BoldCTA },
}

export function getCarouselTheme(theme: CarouselTheme): CarouselComponents {
  return CAROUSEL_THEMES_MAP[theme] || CAROUSEL_THEMES_MAP.classic
}

export { LinkedInCover }
