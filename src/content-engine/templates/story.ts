import { createCanvas, SKRSContext2D } from '@napi-rs/canvas'
import { registerFonts } from './fonts'

registerFonts()

const WIDTH = 1080
const HEIGHT = 1920

const BRAND_LIME = '#9FE870'
const WHITE = '#FFFFFF'

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

export interface StoryData {
  title: string
  subtitle?: string
  cta?: string
}

export async function generateStoryBuffer(data: StoryData): Promise<Buffer> {
  const canvas = createCanvas(WIDTH, HEIGHT)
  const ctx = canvas.getContext('2d')

  // 1. Background - dark gradient
  const bgGradient = ctx.createLinearGradient(0, 0, 0, HEIGHT)
  bgGradient.addColorStop(0, '#0D0D0D')
  bgGradient.addColorStop(0.4, '#111827')
  bgGradient.addColorStop(0.7, '#0F172A')
  bgGradient.addColorStop(1, '#0D0D0D')
  ctx.fillStyle = bgGradient
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  // 2. Subtle radial glow at top
  const glow = ctx.createRadialGradient(WIDTH / 2, HEIGHT * 0.3, 0, WIDTH / 2, HEIGHT * 0.3, 600)
  glow.addColorStop(0, 'rgba(159,232,112,0.08)')
  glow.addColorStop(1, 'rgba(159,232,112,0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  // 3. Top accent line
  ctx.fillStyle = BRAND_LIME
  ctx.fillRect(80, 120, 100, 8)

  // 4. Title - large, centered vertically in upper half
  ctx.fillStyle = WHITE
  ctx.font = 'bold 96px Inter'
  ctx.shadowColor = 'rgba(0,0,0,0.6)'
  ctx.shadowBlur = 30
  ctx.shadowOffsetY = 6
  ctx.textAlign = 'center'

  const titleLines = wrapText(ctx, data.title, WIDTH - 160)
  let y = HEIGHT * 0.35
  for (const line of titleLines.slice(0, 4)) {
    ctx.fillText(line, WIDTH / 2, y)
    y += 120
  }
  ctx.shadowBlur = 0
  ctx.shadowOffsetY = 0

  // 5. Subtitle
  if (data.subtitle) {
    ctx.fillStyle = 'rgba(255,255,255,0.75)'
    ctx.font = '40px Inter'
    const subLines = wrapText(ctx, data.subtitle, WIDTH - 200)
    y += 40
    for (const line of subLines.slice(0, 3)) {
      ctx.fillText(line, WIDTH / 2, y)
      y += 64
    }
  }

  // 6. Bottom CTA area
  if (data.cta) {
    const ctaY = HEIGHT - 200

    // CTA pill background
    ctx.fillStyle = BRAND_LIME
    const ctaMetrics = ctx.measureText(data.cta)
    const pillWidth = Math.min(ctaMetrics.width + 80, WIDTH - 160)
    const pillHeight = 80
    const pillX = (WIDTH - pillWidth) / 2
    roundRect(ctx, pillX, ctaY, pillWidth, pillHeight, 40)
    ctx.fill()

    // CTA text
    ctx.fillStyle = '#0D0D0D'
    ctx.font = 'bold 36px Inter'
    ctx.fillText(data.cta, WIDTH / 2, ctaY + 52)
  }

  // 7. Brand mark at bottom
  ctx.fillStyle = 'rgba(255,255,255,0.4)'
  ctx.font = '28px Inter'
  ctx.fillText('muuday', WIDTH / 2, HEIGHT - 60)

  ctx.textAlign = 'left'

  return Buffer.from(await canvas.encode('png'))
}

function roundRect(
  ctx: SKRSContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): void {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  ctx.lineTo(x + width, y + height - radius)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  ctx.lineTo(x + radius, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}
