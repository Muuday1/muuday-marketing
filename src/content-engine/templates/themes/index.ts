import React from 'react'
import { ClassicCover, ClassicTip, ClassicCTA } from './classic'
import { MinimalCover, MinimalTip, MinimalCTA } from './minimal'
import { BoldCover, BoldTip, BoldCTA } from './bold'
import type { CarouselTheme } from './const'
export { CAROUSEL_THEMES, type CarouselTheme } from './const'

interface ThemeComponents {
  Cover: React.FC<{ title: string; subtitle?: string }>
  Tip: React.FC<{ number: number; title: string; description: string }>
  CTA: React.FC<{ cta: string; hashtags?: string[] }>
}

const THEMES: Record<CarouselTheme, ThemeComponents> = {
  classic: { Cover: ClassicCover, Tip: ClassicTip, CTA: ClassicCTA },
  minimal: { Cover: MinimalCover, Tip: MinimalTip, CTA: MinimalCTA },
  bold: { Cover: BoldCover, Tip: BoldTip, CTA: BoldCTA },
}

export function getTheme(theme: CarouselTheme): ThemeComponents {
  return THEMES[theme] || THEMES.classic
}
