import React from 'react'
import { ClassicCover, ClassicTip, ClassicCTA } from './classic'
import { MinimalCover, MinimalTip, MinimalCTA } from './minimal'
import { BoldCover, BoldTip, BoldCTA } from './bold'

export type CarouselTheme = 'classic' | 'minimal' | 'bold'

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

export const CAROUSEL_THEMES: { id: CarouselTheme; label: string; description: string }[] = [
  { id: 'classic', label: 'Classic', description: 'Gradiente escuro com verde limão' },
  { id: 'minimal', label: 'Minimal', description: 'Branco clean, tipografia elegante' },
  { id: 'bold', label: 'Bold', description: 'Verde vibrante, tipografia impactante' },
]

export function getTheme(theme: CarouselTheme): ThemeComponents {
  return THEMES[theme] || THEMES.classic
}
