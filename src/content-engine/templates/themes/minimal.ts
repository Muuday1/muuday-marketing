import type { SKRSContext2D } from '@napi-rs/canvas'
import type { ThemeTemplate } from './types'

const BRAND_LIME = '#9FE870'
const DARK_TEXT = '#1a1a1a'
const GRAY_TEXT = '#555555'

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

export const minimalTheme: ThemeTemplate = {
  name: 'minimal',

  drawCover(ctx, data, w, h) {
    // Light overlay at bottom
    const overlay = ctx.createLinearGradient(0, h * 0.35, 0, h)
    overlay.addColorStop(0, 'rgba(255,255,255,0)')
    overlay.addColorStop(0.5, 'rgba(255,255,255,0.85)')
    overlay.addColorStop(1, 'rgba(255,255,255,0.98)')
    ctx.fillStyle = overlay
    ctx.fillRect(0, 0, w, h)

    // Accent dot
    ctx.fillStyle = BRAND_LIME
    ctx.beginPath()
    ctx.arc(100, h - 310, 10, 0, Math.PI * 2)
    ctx.fill()

    // Title
    ctx.fillStyle = DARK_TEXT
    ctx.font = 'bold 64px sans-serif'
    const titleLines = wrapText(ctx, data.title || '', w - 200)
    let y = h - 260
    for (const line of titleLines.slice(0, 4)) {
      ctx.fillText(line, 100, y)
      y += 82
    }

    // Subtitle
    if (data.subtitle) {
      ctx.font = '400 34px sans-serif'
      ctx.fillStyle = GRAY_TEXT
      const subLines = wrapText(ctx, data.subtitle, w - 200)
      y += 8
      for (const line of subLines.slice(0, 2)) {
        ctx.fillText(line, 100, y)
        y += 48
      }
    }

    // Brand
    ctx.fillStyle = BRAND_LIME
    ctx.font = 'bold 22px sans-serif'
    ctx.fillText('muuday', 100, h - 50)
  },

  drawTip(ctx, data, w, h) {
    // Warm off-white background
    ctx.fillStyle = '#FAFAF5'
    ctx.fillRect(0, 0, w, h)

    // Subtle lime top border
    ctx.fillStyle = BRAND_LIME
    ctx.fillRect(0, 0, w, 8)

    // Number
    if (data.number) {
      ctx.fillStyle = BRAND_LIME
      ctx.font = 'bold 140px sans-serif'
      ctx.globalAlpha = 0.15
      ctx.fillText(String(data.number).padStart(2, '0'), 60, 200)
      ctx.globalAlpha = 1
    }

    // Title
    ctx.fillStyle = DARK_TEXT
    ctx.font = 'bold 56px sans-serif'
    const titleLines = wrapText(ctx, data.title || '', w - 200)
    let y = 280
    for (const line of titleLines.slice(0, 3)) {
      ctx.fillText(line, 100, y)
      y += 74
    }

    // Description
    if (data.description) {
      ctx.fillStyle = GRAY_TEXT
      ctx.font = '400 36px sans-serif'
      const descLines = wrapText(ctx, data.description, w - 200)
      y += 24
      for (const line of descLines.slice(0, 4)) {
        ctx.fillText(line, 100, y)
        y += 54
      }
    }

    // Bottom line
    ctx.fillStyle = BRAND_LIME
    ctx.fillRect(100, h - 100, 80, 4)
  },

  drawCTA(ctx, data, w, h) {
    // Solid lime
    ctx.fillStyle = BRAND_LIME
    ctx.fillRect(0, 0, w, h)

    // White card
    ctx.fillStyle = '#FFFFFF'
    ctx.beginPath()
    ctx.roundRect(80, 100, w - 160, h - 200, 24)
    ctx.fill()

    // Question
    ctx.fillStyle = DARK_TEXT
    ctx.font = 'bold 56px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('curtiu esse conteúdo?', w / 2, 280)

    // CTA
    ctx.fillStyle = BRAND_LIME
    ctx.font = 'bold 44px sans-serif'
    ctx.fillText(data.cta || 'salva pra depois', w / 2, 420)

    // Hashtags
    if (data.hashtags?.length) {
      ctx.fillStyle = GRAY_TEXT
      ctx.font = '400 30px sans-serif'
      const tags = data.hashtags.join(' ')
      ctx.fillText(tags, w / 2, h - 140)
    }

    ctx.textAlign = 'left'
  },
}
