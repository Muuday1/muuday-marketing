import type { SKRSContext2D } from '@napi-rs/canvas'
import type { ThemeTemplate } from './types'

const BRAND_LIME = '#9FE870'
const WHITE = '#FFFFFF'
const DARK_BG = '#0D0D0D'

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

export const editorialTheme: ThemeTemplate = {
  name: 'editorial',

  drawCover(ctx, data, w, h) {
    // Dark overlay at bottom for text readability
    const overlay = ctx.createLinearGradient(0, h * 0.4, 0, h)
    overlay.addColorStop(0, 'rgba(13,13,13,0)')
    overlay.addColorStop(0.5, 'rgba(13,13,13,0.7)')
    overlay.addColorStop(1, 'rgba(13,13,13,0.95)')
    ctx.fillStyle = overlay
    ctx.fillRect(0, 0, w, h)

    // Accent line
    ctx.fillStyle = BRAND_LIME
    ctx.fillRect(80, h - 340, 80, 6)

    // Title
    ctx.fillStyle = WHITE
    ctx.font = 'bold 68px sans-serif'
    ctx.shadowColor = 'rgba(0,0,0,0.8)'
    ctx.shadowBlur = 30
    ctx.shadowOffsetY = 4

    const titleLines = wrapText(ctx, data.title || '', w - 160)
    let y = h - 280
    for (const line of titleLines.slice(0, 4)) {
      ctx.fillText(line, 80, y)
      y += 90
    }

    // Subtitle
    if (data.subtitle) {
      ctx.font = '400 36px sans-serif'
      ctx.fillStyle = 'rgba(255,255,255,0.75)'
      ctx.shadowBlur = 15
      const subLines = wrapText(ctx, data.subtitle, w - 160)
      y += 10
      for (const line of subLines.slice(0, 2)) {
        ctx.fillText(line, 80, y)
        y += 52
      }
    }

    ctx.shadowBlur = 0
    ctx.shadowOffsetY = 0

    // Brand mark
    ctx.fillStyle = BRAND_LIME
    ctx.font = 'bold 24px sans-serif'
    ctx.fillText('muuday', 80, h - 50)
  },

  drawTip(ctx, data, w, h) {
    // Solid dark background
    ctx.fillStyle = DARK_BG
    ctx.fillRect(0, 0, w, h)

    // Subtle gradient accent
    const accent = ctx.createRadialGradient(w * 0.8, h * 0.2, 0, w * 0.8, h * 0.2, 600)
    accent.addColorStop(0, 'rgba(159,232,112,0.08)')
    accent.addColorStop(1, 'rgba(159,232,112,0)')
    ctx.fillStyle = accent
    ctx.fillRect(0, 0, w, h)

    // Number badge
    if (data.number) {
      ctx.fillStyle = BRAND_LIME
      ctx.beginPath()
      ctx.arc(120, 140, 40, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = DARK_BG
      ctx.font = 'bold 48px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(String(data.number), 120, 155)
      ctx.textAlign = 'left'
    }

    // Title
    ctx.fillStyle = WHITE
    ctx.font = 'bold 60px sans-serif'
    const titleLines = wrapText(ctx, data.title || '', w - 160)
    let y = 280
    for (const line of titleLines.slice(0, 3)) {
      ctx.fillText(line, 80, y)
      y += 78
    }

    // Description
    if (data.description) {
      ctx.fillStyle = 'rgba(255,255,255,0.7)'
      ctx.font = '400 38px sans-serif'
      const descLines = wrapText(ctx, data.description, w - 160)
      y += 30
      for (const line of descLines.slice(0, 4)) {
        ctx.fillText(line, 80, y)
        y += 56
      }
    }

    // Bottom accent line
    ctx.fillStyle = BRAND_LIME
    ctx.fillRect(80, h - 80, 120, 4)
  },

  drawCTA(ctx, data, w, h) {
    // Lime gradient background
    const grad = ctx.createLinearGradient(0, 0, w, h)
    grad.addColorStop(0, '#7BC85A')
    grad.addColorStop(0.5, '#9FE870')
    grad.addColorStop(1, '#B8F090')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)

    // Dark text for contrast
    ctx.fillStyle = DARK_BG
    ctx.font = 'bold 72px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('e aí, curtiu?', w / 2, h * 0.35)

    // CTA button area
    ctx.fillStyle = DARK_BG
    ctx.beginPath()
    ctx.roundRect(w / 2 - 280, h * 0.5, 560, 100, 50)
    ctx.fill()

    ctx.fillStyle = BRAND_LIME
    ctx.font = 'bold 42px sans-serif'
    ctx.fillText(data.cta || 'compartilha com quem precisa', w / 2, h * 0.5 + 65)

    // Hashtags
    if (data.hashtags?.length) {
      ctx.fillStyle = 'rgba(13,13,13,0.6)'
      ctx.font = '400 32px sans-serif'
      const tags = data.hashtags.join(' ')
      ctx.fillText(tags, w / 2, h * 0.82)
    }

    ctx.textAlign = 'left'
  },
}
