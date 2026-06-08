import type { SKRSContext2D } from '@napi-rs/canvas'
import type { ThemeTemplate } from './types'

const BRAND_LIME = '#9FE870'
const DARK = '#0a0a0a'
const WHITE = '#ffffff'

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

export const boldTheme: ThemeTemplate = {
  name: 'bold',

  drawCover(ctx, data, w, h) {
    // Full dark overlay
    const overlay = ctx.createLinearGradient(0, 0, 0, h)
    overlay.addColorStop(0, 'rgba(10,10,10,0.3)')
    overlay.addColorStop(0.4, 'rgba(10,10,10,0.6)')
    overlay.addColorStop(1, 'rgba(10,10,10,0.95)')
    ctx.fillStyle = overlay
    ctx.fillRect(0, 0, w, h)

    // Lime accent bar left
    ctx.fillStyle = BRAND_LIME
    ctx.fillRect(60, h * 0.25, 10, h * 0.5)

    // Title - big and bold
    ctx.fillStyle = WHITE
    ctx.font = 'bold 84px sans-serif'
    ctx.shadowColor = 'rgba(0,0,0,0.6)'
    ctx.shadowBlur = 40
    const titleLines = wrapText(ctx, data.title || '', w - 180)
    let y = h * 0.32
    for (const line of titleLines.slice(0, 3)) {
      ctx.fillText(line, 100, y)
      y += 108
    }

    // Subtitle
    if (data.subtitle) {
      ctx.font = '400 40px sans-serif'
      ctx.fillStyle = 'rgba(255,255,255,0.65)'
      ctx.shadowBlur = 20
      const subLines = wrapText(ctx, data.subtitle, w - 180)
      y += 16
      for (const line of subLines.slice(0, 2)) {
        ctx.fillText(line, 100, y)
        y += 58
      }
    }

    ctx.shadowBlur = 0

    // Brand bottom right
    ctx.fillStyle = BRAND_LIME
    ctx.font = 'bold 28px sans-serif'
    ctx.textAlign = 'right'
    ctx.fillText('muuday', w - 80, h - 60)
    ctx.textAlign = 'left'
  },

  drawTip(ctx, data, w, h) {
    ctx.fillStyle = DARK
    ctx.fillRect(0, 0, w, h)

    // Lime corner accent
    ctx.fillStyle = BRAND_LIME
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(200, 0)
    ctx.lineTo(0, 200)
    ctx.closePath()
    ctx.fill()

    // Number inside corner
    if (data.number) {
      ctx.fillStyle = DARK
      ctx.font = 'bold 64px sans-serif'
      ctx.fillText(String(data.number), 40, 100)
    }

    // Title
    ctx.fillStyle = WHITE
    ctx.font = 'bold 64px sans-serif'
    const titleLines = wrapText(ctx, data.title || '', w - 180)
    let y = 280
    for (const line of titleLines.slice(0, 3)) {
      ctx.fillText(line, 100, y)
      y += 84
    }

    // Description
    if (data.description) {
      ctx.fillStyle = 'rgba(255,255,255,0.65)'
      ctx.font = '400 36px sans-serif'
      const descLines = wrapText(ctx, data.description, w - 180)
      y += 24
      for (const line of descLines.slice(0, 4)) {
        ctx.fillText(line, 100, y)
        y += 54
      }
    }

    // Bottom lime bar
    ctx.fillStyle = BRAND_LIME
    ctx.fillRect(100, h - 80, 160, 6)
  },

  drawCTA(ctx, data, w, h) {
    // Split background - lime top, dark bottom
    ctx.fillStyle = BRAND_LIME
    ctx.fillRect(0, 0, w, h * 0.55)
    ctx.fillStyle = DARK
    ctx.fillRect(0, h * 0.55, w, h * 0.45)

    // Question on lime
    ctx.fillStyle = DARK
    ctx.font = 'bold 68px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('gostou?', w / 2, h * 0.3)

    // CTA on dark
    ctx.fillStyle = WHITE
    ctx.font = 'bold 48px sans-serif'
    ctx.fillText(data.cta || 'salva e compartilha', w / 2, h * 0.72)

    // Hashtags
    if (data.hashtags?.length) {
      ctx.fillStyle = 'rgba(255,255,255,0.5)'
      ctx.font = '400 28px sans-serif'
      const tags = data.hashtags.join(' ')
      ctx.fillText(tags, w / 2, h * 0.85)
    }

    ctx.textAlign = 'left'
  },
}
