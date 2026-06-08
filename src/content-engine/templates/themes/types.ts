import type { SKRSContext2D } from '@napi-rs/canvas'

export interface SlideData {
  title?: string
  subtitle?: string
  description?: string
  cta?: string
  hashtags?: string[]
  number?: number
}

export interface ThemeTemplate {
  name: string
  drawCover: (ctx: SKRSContext2D, data: SlideData, w: number, h: number) => void
  drawTip: (ctx: SKRSContext2D, data: SlideData, w: number, h: number) => void
  drawCTA: (ctx: SKRSContext2D, data: SlideData, w: number, h: number) => void
}
