import type { SKRSContext2D } from '@napi-rs/canvas'
import type { ThemeTemplate } from './types'

const BRAND_LIME = '#9FE870'
const BG = '#121212'
const CARD = '#1e1e1e'
const WHITE = '#e8e8e8'

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

export const darkTheme: ThemeTemplate = {
  name: 'dark',

  drawCover(ctx, data, w, h) {
    // Gradient overlay
    const overlay = ctx.createLinearGradient(0, 0, 0, h)
    overlay.addColorStop(0, 'rgba(18,18,18,0.4)')
    overlay.addColorStop(0.5, 'rgba(18,18,18,0.85)')
    overlay.addColorStop(1, 'rgba(18,18,18,0.98)')
    ctx.fillStyle = overlay
    ctx.fillRect(0, 0, w, h)

    // Glass card at bottom
    ctx.fillStyle = 'rgba(30,30,30,0.6)'
    ctx.beginPath()
    ctx.roundRect(60, h - 420, w - 120, 360, 24)
    ctx.fill()

    // Lime top border on card
    ctx.fillStyle = BRAND_LIME
    ctx.fillRect(60, h - 420, w - 120, 4)

    // Title
    ctx.fillStyle = WHITE
    ctx.font = 'bold 58px sans-serif'
    const titleLines = wrapText(ctx, data.title || '', w - 240)
    let y = h - 360
    for (const line of titleLines.slice(0, 3)) {
      ctx.fillText(line, 100, y)
      y += 76
    }

    // Subtitle
    if (data.subtitle) {
      ctx.font = '400 32px sans-serif'
      ctx.fillStyle = 'rgba(232,232,232,0.6)'
      const subLines = wrapText(ctx, data.subtitle, w - 240)
      y += 8
      for (const line of subLines.slice(0, 2)) {
        ctx.fillText(line, 100, y)
        y += 46
      }
    }

    // Brand
    ctx.fillStyle = BRAND_LIME
    ctx.font = 'bold 22px sans-serif'
    ctx.fillText('muuday', 100, h - 80)
  },

  drawTip(ctx, data, w, h) {
    ctx.fillStyle = BG
    ctx.fillRect(0, 0, w, h)

    // Card
    ctx.fillStyle = CARD
    ctx.beginPath()
    ctx.roundRect(60, 60, w - 120, h - 120, 20)
    ctx.fill()

    // Number pill
    if (data.number) {
      ctx.fillStyle = BRAND_LIME
      ctx.beginPath()
      ctx.roundRect(100, 100, 80, 50, 25)
      ctx.fill()
      ctx.fillStyle = BG
      ctx.font = 'bold 28px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(String(data.number), 140, 135)
      ctx.textAlign = 'left'
    }

    // Title
    ctx.fillStyle = WHITE
    ctx.font = 'bold 52px sans-serif'
    const titleLines = wrapText(ctx, data.title || '', w - 280)
    let y = 220
    for (const line of titleLines.slice(0, 3)) {
      ctx.fillText(line, 100, y)
      y += 70
    }

    // Description
    if (data.description) {
      ctx.fillStyle = 'rgba(232,232,232,0.55)'
      ctx.font = '400 34px sans-serif'
      const descLines = wrapText(ctx, data.description, w - 280)
      y += 20
      for (const line of descLines.slice(0, 4)) {
        ctx.fillText(line, 100, y)
        y += 52
      }
    }
  },

  drawCTA(ctx, data, w, h) {
    ctx.fillStyle = BG
    ctx.fillRect(0, 0, w, h)

    // Centered lime circle glow
    const glow = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, 500)
    glow.addColorStop(0, 'rgba(159,232,112,0.2)')
    glow.addColorStop(1, 'rgba(159,232,112,0)')
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, w, h)

    // Question
    ctx.fillStyle = WHITE
    ctx.font = 'bold 64px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('curtiu?', w / 2, h * 0.35)

    // CTA pill
    ctx.fillStyle = BRAND_LIME
    ctx.beginPath()
    ctx.roundRect(w / 2 - 260, h * 0.48, 520, 90, 45)
    ctx.fill()
    ctx.fillStyle = BG
    ctx.font = 'bold 38px sans-serif'
    ctx.fillText(data.cta || 'compartilha', w / 2, h * 0.48 + 58)

    // Hashtags
    if (data.hashtags?.length) {
      ctx.fillStyle = 'rgba(232,232,232,0.4)'
      ctx.font = '400 28px sans-serif'
      const tags = data.hashtags.join(' ')
      ctx.fillText(tags, w / 2, h * 0.78)
    }

    ctx.textAlign = 'left'
  },
}
