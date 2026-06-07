import React from 'react'

// Brand-aligned themes (Muuday identity)
import { LimeCover, LimeTip, LimeCTA } from './lime'
import { DarkCover, DarkTip, DarkCTA } from './dark'
import { EditorialCover, EditorialTip, EditorialCTA } from './editorial'
import { MinimalCover, MinimalTip, MinimalCTA } from './minimal'
import { BoldCover, BoldTip, BoldCTA } from './bold'

// Legacy themes (backward compatibility)
import { ClassicCover, ClassicTip, ClassicCTA } from './classic'
import { WarmCover, WarmTip, WarmCTA } from './warm'
import { CraftCover, CraftTip, CraftCTA } from './craft'
import { CalmCover, CalmTip, CalmCTA } from './calm'

import { LinkedInCover } from './linkedin-card'
import type { CarouselTheme } from './const'
export { CAROUSEL_THEMES, type CarouselTheme } from './const'

interface CarouselComponents {
  Cover: React.FC<{ title: string; subtitle?: string }>
  Tip: React.FC<{ number: number; title: string; description: string }>
  CTA: React.FC<{ cta: string; hashtags?: string[] }>
}

const CAROUSEL_THEMES_MAP: Record<CarouselTheme, CarouselComponents> = {
  // Brand-aligned (Muuday)
  lime: { Cover: LimeCover, Tip: LimeTip, CTA: LimeCTA },
  dark: { Cover: DarkCover, Tip: DarkTip, CTA: DarkCTA },
  editorial: { Cover: EditorialCover, Tip: EditorialTip, CTA: EditorialCTA },
  minimal: { Cover: MinimalCover, Tip: MinimalTip, CTA: MinimalCTA },
  bold: { Cover: BoldCover, Tip: BoldTip, CTA: BoldCTA },
  // Legacy
  classic: { Cover: ClassicCover, Tip: ClassicTip, CTA: ClassicCTA },
  warm: { Cover: WarmCover, Tip: WarmTip, CTA: WarmCTA },
  craft: { Cover: CraftCover, Tip: CraftTip, CTA: CraftCTA },
  calm: { Cover: CalmCover, Tip: CalmTip, CTA: CalmCTA },
}

export function getCarouselTheme(theme: CarouselTheme): CarouselComponents {
  return CAROUSEL_THEMES_MAP[theme] || CAROUSEL_THEMES_MAP.lime
}

export { LinkedInCover }
