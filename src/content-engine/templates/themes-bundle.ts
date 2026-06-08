import type { SKRSContext2D } from '@napi-rs/canvas'
import type { ThemeTemplate } from './themes/types'
import { registerFonts } from './fonts'

registerFonts()

const BRAND_LIME = '#9FE870'

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

// ─── Editorial ───────────────────────────────────────────────────────────────

const EDITORIAL_WHITE = '#FFFFFF'
const EDITORIAL_DARK_BG = '#0D0D0D'

export const editorialTheme: ThemeTemplate = {
  name: 'editorial',

  drawCover(ctx, data, w, h) {
    const overlay = ctx.createLinearGradient(0, h * 0.4, 0, h)
    overlay.addColorStop(0, 'rgba(13,13,13,0)')
    overlay.addColorStop(0.5, 'rgba(13,13,13,0.7)')
    overlay.addColorStop(1, 'rgba(13,13,13,0.95)')
    ctx.fillStyle = overlay
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = BRAND_LIME
    ctx.fillRect(80, h - 340, 80, 6)

    ctx.fillStyle = EDITORIAL_WHITE
    ctx.font = 'bold 68px Inter'
    ctx.shadowColor = 'rgba(0,0,0,0.8)'
    ctx.shadowBlur = 30
    ctx.shadowOffsetY = 4

    const titleLines = wrapText(ctx, data.title || '', w - 160)
    let y = h - 280
    for (const line of titleLines.slice(0, 4)) {
      ctx.fillText(line, 80, y)
      y += 90
    }

    if (data.subtitle) {
      ctx.font = '400 36px Inter'
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

    ctx.fillStyle = BRAND_LIME
    ctx.font = 'bold 24px Inter'
    ctx.fillText('muuday', 80, h - 50)
  },

  drawTip(ctx, data, w, h) {
    ctx.fillStyle = EDITORIAL_DARK_BG
    ctx.fillRect(0, 0, w, h)

    const accent = ctx.createRadialGradient(w * 0.8, h * 0.2, 0, w * 0.8, h * 0.2, 600)
    accent.addColorStop(0, 'rgba(159,232,112,0.08)')
    accent.addColorStop(1, 'rgba(159,232,112,0)')
    ctx.fillStyle = accent
    ctx.fillRect(0, 0, w, h)

    if (data.number) {
      ctx.fillStyle = BRAND_LIME
      ctx.beginPath()
      ctx.arc(120, 140, 40, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = EDITORIAL_DARK_BG
      ctx.font = 'bold 48px Inter'
      ctx.textAlign = 'center'
      ctx.fillText(String(data.number), 120, 155)
      ctx.textAlign = 'left'
    }

    ctx.fillStyle = EDITORIAL_WHITE
    ctx.font = 'bold 60px Inter'
    const titleLines = wrapText(ctx, data.title || '', w - 160)
    let y = 280
    for (const line of titleLines.slice(0, 3)) {
      ctx.fillText(line, 80, y)
      y += 78
    }

    if (data.description) {
      ctx.fillStyle = 'rgba(255,255,255,0.7)'
      ctx.font = '400 38px Inter'
      const descLines = wrapText(ctx, data.description, w - 160)
      y += 30
      for (const line of descLines.slice(0, 4)) {
        ctx.fillText(line, 80, y)
        y += 56
      }
    }

    ctx.fillStyle = BRAND_LIME
    ctx.fillRect(80, h - 80, 120, 4)
  },

  drawCTA(ctx, data, w, h) {
    const grad = ctx.createLinearGradient(0, 0, w, h)
    grad.addColorStop(0, '#7BC85A')
    grad.addColorStop(0.5, '#9FE870')
    grad.addColorStop(1, '#B8F090')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = EDITORIAL_DARK_BG
    ctx.font = 'bold 72px Inter'
    ctx.textAlign = 'center'
    ctx.fillText('e aí, curtiu?', w / 2, h * 0.35)

    ctx.fillStyle = EDITORIAL_DARK_BG
    ctx.beginPath()
    ctx.roundRect(w / 2 - 280, h * 0.5, 560, 100, 50)
    ctx.fill()

    ctx.fillStyle = BRAND_LIME
    ctx.font = 'bold 42px Inter'
    ctx.fillText(data.cta || 'compartilha com quem precisa', w / 2, h * 0.5 + 65)

    if (data.hashtags?.length) {
      ctx.fillStyle = 'rgba(13,13,13,0.6)'
      ctx.font = '400 32px Inter'
      const tags = data.hashtags.join(' ')
      ctx.fillText(tags, w / 2, h * 0.82)
    }

    ctx.textAlign = 'left'
  },
}

// ─── Minimal ─────────────────────────────────────────────────────────────────

const MINIMAL_DARK_TEXT = '#1a1a1a'
const MINIMAL_GRAY_TEXT = '#555555'

export const minimalTheme: ThemeTemplate = {
  name: 'minimal',

  drawCover(ctx, data, w, h) {
    const overlay = ctx.createLinearGradient(0, h * 0.35, 0, h)
    overlay.addColorStop(0, 'rgba(255,255,255,0)')
    overlay.addColorStop(0.5, 'rgba(255,255,255,0.85)')
    overlay.addColorStop(1, 'rgba(255,255,255,0.98)')
    ctx.fillStyle = overlay
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = BRAND_LIME
    ctx.beginPath()
    ctx.arc(100, h - 310, 10, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = MINIMAL_DARK_TEXT
    ctx.font = 'bold 64px Inter'
    const titleLines = wrapText(ctx, data.title || '', w - 200)
    let y = h - 260
    for (const line of titleLines.slice(0, 4)) {
      ctx.fillText(line, 100, y)
      y += 82
    }

    if (data.subtitle) {
      ctx.font = '400 34px Inter'
      ctx.fillStyle = MINIMAL_GRAY_TEXT
      const subLines = wrapText(ctx, data.subtitle, w - 200)
      y += 8
      for (const line of subLines.slice(0, 2)) {
        ctx.fillText(line, 100, y)
        y += 48
      }
    }

    ctx.fillStyle = BRAND_LIME
    ctx.font = 'bold 22px Inter'
    ctx.fillText('muuday', 100, h - 50)
  },

  drawTip(ctx, data, w, h) {
    ctx.fillStyle = '#FAFAF5'
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = BRAND_LIME
    ctx.fillRect(0, 0, w, 8)

    if (data.number) {
      ctx.fillStyle = BRAND_LIME
      ctx.font = 'bold 140px Inter'
      ctx.globalAlpha = 0.15
      ctx.fillText(String(data.number).padStart(2, '0'), 60, 200)
      ctx.globalAlpha = 1
    }

    ctx.fillStyle = MINIMAL_DARK_TEXT
    ctx.font = 'bold 56px Inter'
    const titleLines = wrapText(ctx, data.title || '', w - 200)
    let y = 280
    for (const line of titleLines.slice(0, 3)) {
      ctx.fillText(line, 100, y)
      y += 74
    }

    if (data.description) {
      ctx.fillStyle = MINIMAL_GRAY_TEXT
      ctx.font = '400 36px Inter'
      const descLines = wrapText(ctx, data.description, w - 200)
      y += 24
      for (const line of descLines.slice(0, 4)) {
        ctx.fillText(line, 100, y)
        y += 54
      }
    }

    ctx.fillStyle = BRAND_LIME
    ctx.fillRect(100, h - 100, 80, 4)
  },

  drawCTA(ctx, data, w, h) {
    ctx.fillStyle = BRAND_LIME
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = '#FFFFFF'
    ctx.beginPath()
    ctx.roundRect(80, 100, w - 160, h - 200, 24)
    ctx.fill()

    ctx.fillStyle = MINIMAL_DARK_TEXT
    ctx.font = 'bold 56px Inter'
    ctx.textAlign = 'center'
    ctx.fillText('curtiu esse conteúdo?', w / 2, 280)

    ctx.fillStyle = BRAND_LIME
    ctx.font = 'bold 44px Inter'
    ctx.fillText(data.cta || 'salva pra depois', w / 2, 420)

    if (data.hashtags?.length) {
      ctx.fillStyle = MINIMAL_GRAY_TEXT
      ctx.font = '400 30px Inter'
      const tags = data.hashtags.join(' ')
      ctx.fillText(tags, w / 2, h - 140)
    }

    ctx.textAlign = 'left'
  },
}

// ─── Bold ────────────────────────────────────────────────────────────────────

const BOLD_DARK = '#0a0a0a'
const BOLD_WHITE = '#ffffff'

export const boldTheme: ThemeTemplate = {
  name: 'bold',

  drawCover(ctx, data, w, h) {
    const overlay = ctx.createLinearGradient(0, 0, 0, h)
    overlay.addColorStop(0, 'rgba(10,10,10,0.3)')
    overlay.addColorStop(0.4, 'rgba(10,10,10,0.6)')
    overlay.addColorStop(1, 'rgba(10,10,10,0.95)')
    ctx.fillStyle = overlay
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = BRAND_LIME
    ctx.fillRect(60, h * 0.25, 10, h * 0.5)

    ctx.fillStyle = BOLD_WHITE
    ctx.font = 'bold 84px Inter'
    ctx.shadowColor = 'rgba(0,0,0,0.6)'
    ctx.shadowBlur = 40
    const titleLines = wrapText(ctx, data.title || '', w - 180)
    let y = h * 0.32
    for (const line of titleLines.slice(0, 3)) {
      ctx.fillText(line, 100, y)
      y += 108
    }

    if (data.subtitle) {
      ctx.font = '400 40px Inter'
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

    ctx.fillStyle = BRAND_LIME
    ctx.font = 'bold 28px Inter'
    ctx.textAlign = 'right'
    ctx.fillText('muuday', w - 80, h - 60)
    ctx.textAlign = 'left'
  },

  drawTip(ctx, data, w, h) {
    ctx.fillStyle = BOLD_DARK
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = BRAND_LIME
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(200, 0)
    ctx.lineTo(0, 200)
    ctx.closePath()
    ctx.fill()

    if (data.number) {
      ctx.fillStyle = BOLD_DARK
      ctx.font = 'bold 64px Inter'
      ctx.fillText(String(data.number), 40, 100)
    }

    ctx.fillStyle = BOLD_WHITE
    ctx.font = 'bold 64px Inter'
    const titleLines = wrapText(ctx, data.title || '', w - 180)
    let y = 280
    for (const line of titleLines.slice(0, 3)) {
      ctx.fillText(line, 100, y)
      y += 84
    }

    if (data.description) {
      ctx.fillStyle = 'rgba(255,255,255,0.65)'
      ctx.font = '400 36px Inter'
      const descLines = wrapText(ctx, data.description, w - 180)
      y += 24
      for (const line of descLines.slice(0, 4)) {
        ctx.fillText(line, 100, y)
        y += 54
      }
    }

    ctx.fillStyle = BRAND_LIME
    ctx.fillRect(100, h - 80, 160, 6)
  },

  drawCTA(ctx, data, w, h) {
    ctx.fillStyle = BRAND_LIME
    ctx.fillRect(0, 0, w, h * 0.55)
    ctx.fillStyle = BOLD_DARK
    ctx.fillRect(0, h * 0.55, w, h * 0.45)

    ctx.fillStyle = BOLD_DARK
    ctx.font = 'bold 68px Inter'
    ctx.textAlign = 'center'
    ctx.fillText('gostou?', w / 2, h * 0.3)

    ctx.fillStyle = BOLD_WHITE
    ctx.font = 'bold 48px Inter'
    ctx.fillText(data.cta || 'salva e compartilha', w / 2, h * 0.72)

    if (data.hashtags?.length) {
      ctx.fillStyle = 'rgba(255,255,255,0.5)'
      ctx.font = '400 28px Inter'
      const tags = data.hashtags.join(' ')
      ctx.fillText(tags, w / 2, h * 0.85)
    }

    ctx.textAlign = 'left'
  },
}

// ─── Dark ────────────────────────────────────────────────────────────────────

const DARK_BG = '#121212'
const DARK_CARD = '#1e1e1e'
const DARK_WHITE = '#e8e8e8'

export const darkTheme: ThemeTemplate = {
  name: 'dark',

  drawCover(ctx, data, w, h) {
    const overlay = ctx.createLinearGradient(0, 0, 0, h)
    overlay.addColorStop(0, 'rgba(18,18,18,0.4)')
    overlay.addColorStop(0.5, 'rgba(18,18,18,0.85)')
    overlay.addColorStop(1, 'rgba(18,18,18,0.98)')
    ctx.fillStyle = overlay
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = 'rgba(30,30,30,0.6)'
    ctx.beginPath()
    ctx.roundRect(60, h - 420, w - 120, 360, 24)
    ctx.fill()

    ctx.fillStyle = BRAND_LIME
    ctx.fillRect(60, h - 420, w - 120, 4)

    ctx.fillStyle = DARK_WHITE
    ctx.font = 'bold 58px Inter'
    const titleLines = wrapText(ctx, data.title || '', w - 240)
    let y = h - 360
    for (const line of titleLines.slice(0, 3)) {
      ctx.fillText(line, 100, y)
      y += 76
    }

    if (data.subtitle) {
      ctx.font = '400 32px Inter'
      ctx.fillStyle = 'rgba(232,232,232,0.6)'
      const subLines = wrapText(ctx, data.subtitle, w - 240)
      y += 8
      for (const line of subLines.slice(0, 2)) {
        ctx.fillText(line, 100, y)
        y += 46
      }
    }

    ctx.fillStyle = BRAND_LIME
    ctx.font = 'bold 22px Inter'
    ctx.fillText('muuday', 100, h - 80)
  },

  drawTip(ctx, data, w, h) {
    ctx.fillStyle = DARK_BG
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = DARK_CARD
    ctx.beginPath()
    ctx.roundRect(60, 60, w - 120, h - 120, 20)
    ctx.fill()

    if (data.number) {
      ctx.fillStyle = BRAND_LIME
      ctx.beginPath()
      ctx.roundRect(100, 100, 80, 50, 25)
      ctx.fill()
      ctx.fillStyle = DARK_BG
      ctx.font = 'bold 28px Inter'
      ctx.textAlign = 'center'
      ctx.fillText(String(data.number), 140, 135)
      ctx.textAlign = 'left'
    }

    ctx.fillStyle = DARK_WHITE
    ctx.font = 'bold 52px Inter'
    const titleLines = wrapText(ctx, data.title || '', w - 280)
    let y = 220
    for (const line of titleLines.slice(0, 3)) {
      ctx.fillText(line, 100, y)
      y += 70
    }

    if (data.description) {
      ctx.fillStyle = 'rgba(232,232,232,0.55)'
      ctx.font = '400 34px Inter'
      const descLines = wrapText(ctx, data.description, w - 280)
      y += 20
      for (const line of descLines.slice(0, 4)) {
        ctx.fillText(line, 100, y)
        y += 52
      }
    }
  },

  drawCTA(ctx, data, w, h) {
    ctx.fillStyle = DARK_BG
    ctx.fillRect(0, 0, w, h)

    const glow = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, 500)
    glow.addColorStop(0, 'rgba(159,232,112,0.2)')
    glow.addColorStop(1, 'rgba(159,232,112,0)')
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = DARK_WHITE
    ctx.font = 'bold 64px Inter'
    ctx.textAlign = 'center'
    ctx.fillText('curtiu?', w / 2, h * 0.35)

    ctx.fillStyle = BRAND_LIME
    ctx.beginPath()
    ctx.roundRect(w / 2 - 260, h * 0.48, 520, 90, 45)
    ctx.fill()
    ctx.fillStyle = DARK_BG
    ctx.font = 'bold 38px Inter'
    ctx.fillText(data.cta || 'compartilha', w / 2, h * 0.48 + 58)

    if (data.hashtags?.length) {
      ctx.fillStyle = 'rgba(232,232,232,0.4)'
      ctx.font = '400 28px Inter'
      const tags = data.hashtags.join(' ')
      ctx.fillText(tags, w / 2, h * 0.78)
    }

    ctx.textAlign = 'left'
  },
}

// ─── Warm ────────────────────────────────────────────────────────────────────

const WARM_CREAM = '#F5F0E8'
const WARM_BROWN = '#3D2B1F'
const WARM_TERRACOTTA = '#C4705A'

export const warmTheme: ThemeTemplate = {
  name: 'warm',

  drawCover(ctx, data, w, h) {
    const overlay = ctx.createLinearGradient(0, h * 0.3, 0, h)
    overlay.addColorStop(0, 'rgba(245,240,232,0)')
    overlay.addColorStop(0.45, 'rgba(245,240,232,0.88)')
    overlay.addColorStop(1, 'rgba(245,240,232,0.99)')
    ctx.fillStyle = overlay
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = WARM_TERRACOTTA
    ctx.fillRect(80, h - 300, 6, 80)

    ctx.fillStyle = WARM_BROWN
    ctx.font = 'bold 62px Inter'
    const titleLines = wrapText(ctx, data.title || '', w - 160)
    let y = h - 260
    for (const line of titleLines.slice(0, 4)) {
      ctx.fillText(line, 120, y)
      y += 80
    }

    if (data.subtitle) {
      ctx.font = '400 34px Inter'
      ctx.fillStyle = '#6B5B4F'
      const subLines = wrapText(ctx, data.subtitle, w - 160)
      y += 8
      for (const line of subLines.slice(0, 2)) {
        ctx.fillText(line, 120, y)
        y += 48
      }
    }

    ctx.fillStyle = BRAND_LIME
    ctx.font = 'bold 24px Inter'
    ctx.fillText('muuday', 120, h - 50)
  },

  drawTip(ctx, data, w, h) {
    ctx.fillStyle = WARM_CREAM
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = WARM_TERRACOTTA
    ctx.fillRect(0, 0, w, 6)

    if (data.number) {
      ctx.fillStyle = WARM_TERRACOTTA
      ctx.beginPath()
      ctx.arc(110, 130, 36, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = WARM_CREAM
      ctx.font = 'bold 36px Inter'
      ctx.textAlign = 'center'
      ctx.fillText(String(data.number), 110, 142)
      ctx.textAlign = 'left'
    }

    ctx.fillStyle = WARM_BROWN
    ctx.font = 'bold 56px Inter'
    const titleLines = wrapText(ctx, data.title || '', w - 180)
    let y = 260
    for (const line of titleLines.slice(0, 3)) {
      ctx.fillText(line, 90, y)
      y += 76
    }

    if (data.description) {
      ctx.fillStyle = '#6B5B4F'
      ctx.font = '400 36px Inter'
      const descLines = wrapText(ctx, data.description, w - 180)
      y += 24
      for (const line of descLines.slice(0, 4)) {
        ctx.fillText(line, 90, y)
        y += 54
      }
    }

    ctx.fillStyle = WARM_TERRACOTTA
    ctx.fillRect(90, h - 90, 100, 4)
  },

  drawCTA(ctx, data, w, h) {
    ctx.fillStyle = WARM_TERRACOTTA
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = WARM_CREAM
    ctx.beginPath()
    ctx.roundRect(70, 90, w - 140, h - 180, 20)
    ctx.fill()

    ctx.fillStyle = WARM_BROWN
    ctx.font = 'bold 56px Inter'
    ctx.textAlign = 'center'
    ctx.fillText('curtiu?', w / 2, 260)

    ctx.fillStyle = WARM_TERRACOTTA
    ctx.font = 'bold 42px Inter'
    ctx.fillText(data.cta || 'compartilha com alguém', w / 2, 400)

    if (data.hashtags?.length) {
      ctx.fillStyle = '#6B5B4F'
      ctx.font = '400 28px Inter'
      const tags = data.hashtags.join(' ')
      ctx.fillText(tags, w / 2, h - 140)
    }

    ctx.textAlign = 'left'
  },
}
