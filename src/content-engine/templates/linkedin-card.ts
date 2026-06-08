import { createCanvas, SKRSContext2D } from '@napi-rs/canvas'

const WIDTH = 1200
const HEIGHT = 627

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

export interface LinkedInCardData {
  headline: string
  insight: string
  author?: string
}

export async function generateLinkedInCardBuffer(data: LinkedInCardData): Promise<Buffer> {
  const canvas = createCanvas(WIDTH, HEIGHT)
  const ctx = canvas.getContext('2d')

  // 1. Background - dark with subtle gradient
  const bgGradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT)
  bgGradient.addColorStop(0, '#0D0D0D')
  bgGradient.addColorStop(0.5, '#111827')
  bgGradient.addColorStop(1, '#0D0D0D')
  ctx.fillStyle = bgGradient
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  // 2. Top accent bar
  ctx.fillStyle = BRAND_LIME
  ctx.fillRect(80, 60, 120, 6)

  // 3. Headline
  ctx.fillStyle = WHITE
  ctx.font = 'bold 52px sans-serif'
  ctx.shadowColor = 'rgba(0,0,0,0.5)'
  ctx.shadowBlur = 20
  ctx.shadowOffsetY = 4

  const headlineLines = wrapText(ctx, data.headline, WIDTH - 160)
  let y = 140
  for (const line of headlineLines.slice(0, 3)) {
    ctx.fillText(line, 80, y)
    y += 72
  }
  ctx.shadowBlur = 0
  ctx.shadowOffsetY = 0

  // 4. Divider line
  ctx.fillStyle = 'rgba(159,232,112,0.3)'
  ctx.fillRect(80, y + 20, 80, 3)
  y += 50

  // 5. Insight / body
  if (data.insight) {
    ctx.fillStyle = 'rgba(255,255,255,0.8)'
    ctx.font = '32px sans-serif'
    const insightLines = wrapText(ctx, data.insight, WIDTH - 160)
    for (const line of insightLines.slice(0, 5)) {
      ctx.fillText(line, 80, y)
      y += 50
    }
  }

  // 6. Bottom bar with brand
  ctx.fillStyle = 'rgba(255,255,255,0.06)'
  ctx.fillRect(0, HEIGHT - 80, WIDTH, 80)

  // Author tag
  if (data.author) {
    ctx.fillStyle = 'rgba(255,255,255,0.5)'
    ctx.font = '24px sans-serif'
    ctx.fillText(data.author, 80, HEIGHT - 30)
  }

  // Brand mark
  ctx.fillStyle = BRAND_LIME
  ctx.font = 'bold 28px sans-serif'
  const brandText = 'muuday'
  const brandMetrics = ctx.measureText(brandText)
  ctx.fillText(brandText, WIDTH - 80 - brandMetrics.width, HEIGHT - 30)

  // Small lime dot before brand
  ctx.beginPath()
  ctx.arc(WIDTH - 100 - brandMetrics.width, HEIGHT - 40, 6, 0, Math.PI * 2)
  ctx.fill()

  return Buffer.from(await canvas.encode('png'))
}
