import type { SKRSContext2D } from '@napi-rs/canvas'
import type { ThemeTemplate } from './types'

const BRAND_LIME = '#9FE870'
const CREAM = '#F5F0E8'
const BROWN = '#3D2B1F'
const TERRACOTTA = '#C4705A'

function wrapText(ctx: SKRSContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let currentLine = ''
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    const metrics = ctx.measureText(testLine)
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = testLine
    }
  }
  if (currentLine) lines.push(currentLine)
  return lines
}

export const warmTheme: ThemeTemplate = {
  name: 'warm',

  drawCover(ctx, data, w, h) {
    // Cream overlay at bottom
    const overlay = ctx.createLinearGradient(0, h * 0.3, 0, h)
    overlay.addColorStop(0, 'rgba(245,240,232,0)')
    overlay.addColorStop(0.45, 'rgba(245,240,232,0.88)')
    overlay.addColorStop(1, 'rgba(245,240,232,0.99)')
    ctx.fillStyle = overlay
    ctx.fillRect(0, 0, w, h)

    // Terracotta accent line
    ctx.fillStyle = TERRACOTTA
    ctx.fillRect(80, h - 300, 6, 80)

    // Title
    ctx.fillStyle = BROWN
    ctx.font = 'bold 62px sans-serif'
    const titleLines = wrapText(ctx, data.title || '', w - 160)
    let y = h - 260
    for (const line of titleLines.slice(0, 4)) {
      ctx.fillText(line, 120, y)
      y += 80
    }

    // Subtitle
    if (data.subtitle) {
      ctx.font = '400 34px sans-serif'
      ctx.fillStyle = '#6B5B4F'
      const subLines = wrapText(ctx, data.subtitle, w - 160)
      y += 8
      for (const line of subLines.slice(0, 2)) {
        ctx.fillText(line, 120, y)
        y += 48
      }
    }

    // Brand
    ctx.fillStyle = BRAND_LIME
    ctx.font = 'bold 24px sans-serif'
    ctx.fillText('muuday', 120, h - 50)
  },

  drawTip(ctx, data, w, h) {
    ctx.fillStyle = CREAM
    ctx.fillRect(0, 0, w, h)

    // Warm top bar
    ctx.fillStyle = TERRACOTTA
    ctx.fillRect(0, 0, w, 6)

    // Number circle
    if (data.number) {
      ctx.fillStyle = TERRACOTTA
      ctx.beginPath()
      ctx.arc(110, 130, 36, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = CREAM
      ctx.font = 'bold 36px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(String(data.number), 110, 142)
      ctx.textAlign = 'left'
    }

    // Title
    ctx.fillStyle = BROWN
    ctx.font = 'bold 56px sans-serif'
    const titleLines = wrapText(ctx, data.title || '', w - 180)
    let y = 260
    for (const line of titleLines.slice(0, 3)) {
      ctx.fillText(line, 90, y)
      y += 76
    }

    // Description
    if (data.description) {
      ctx.fillStyle = '#6B5B4F'
      ctx.font = '400 36px sans-serif'
      const descLines = wrapText(ctx, data.description, w - 180)
      y += 24
      for (const line of descLines.slice(0, 4)) {
        ctx.fillText(line, 90, y)
        y += 54
      }
    }

    // Bottom accent
    ctx.fillStyle = TERRACOTTA
    ctx.fillRect(90, h - 90, 100, 4)
  },

  drawCTA(ctx, data, w, h) {
    // Terracotta background
    ctx.fillStyle = TERRACOTTA
    ctx.fillRect(0, 0, w, h)

    // Cream card
    ctx.fillStyle = CREAM
    ctx.beginPath()
    ctx.roundRect(70, 90, w - 140, h - 180, 20)
    ctx.fill()

    // Question
    ctx.fillStyle = BROWN
    ctx.font = 'bold 56px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('curtiu?', w / 2, 260)

    // CTA
    ctx.fillStyle = TERRACOTTA
    ctx.font = 'bold 42px sans-serif'
    ctx.fillText(data.cta || 'compartilha com alguém', w / 2, 400)

    // Hashtags
    if (data.hashtags?.length) {
      ctx.fillStyle = '#6B5B4F'
      ctx.font = '400 28px sans-serif'
      const tags = data.hashtags.join(' ')
      ctx.fillText(tags, w / 2, h - 140)
    }

    ctx.textAlign = 'left'
  },
}
