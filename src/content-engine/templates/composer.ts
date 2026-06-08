import { createCanvas, loadImage } from '@napi-rs/canvas'
import type { ThemeTemplate, SlideData } from './themes'
import { generateImage } from '@/shared/model-router'
import { registerFonts } from './fonts'

registerFonts()

const WIDTH = 1080
const HEIGHT = 1080

interface ComposeInput {
  template: ThemeTemplate
  data: SlideData
  backgroundUrl?: string | null
}

export async function composeSlide(input: ComposeInput): Promise<Buffer> {
  const canvas = createCanvas(WIDTH, HEIGHT)
  const ctx = canvas.getContext('2d')

  // 1. Draw background
  if (input.backgroundUrl) {
    try {
      const img = await loadImage(input.backgroundUrl)
      // Cover fit
      const scale = Math.max(WIDTH / img.width, HEIGHT / img.height)
      const dx = (WIDTH - img.width * scale) / 2
      const dy = (HEIGHT - img.height * scale) / 2
      ctx.drawImage(img, dx, dy, img.width * scale, img.height * scale)
    } catch (err) {
      console.warn('[COMPOSER] Failed to load background, using solid:', err)
      ctx.fillStyle = '#0D0D0D'
      ctx.fillRect(0, 0, WIDTH, HEIGHT)
    }
  } else {
    // Default solid background based on theme
    ctx.fillStyle = '#0D0D0D'
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
  }

  // 2. Draw text overlay via theme template
  input.template.drawCover(ctx, input.data, WIDTH, HEIGHT)

  return Buffer.from(await canvas.encode('png'))
}

export async function composeTipSlide(input: ComposeInput): Promise<Buffer> {
  const canvas = createCanvas(WIDTH, HEIGHT)
  const ctx = canvas.getContext('2d')

  if (input.backgroundUrl) {
    try {
      const img = await loadImage(input.backgroundUrl)
      const scale = Math.max(WIDTH / img.width, HEIGHT / img.height)
      const dx = (WIDTH - img.width * scale) / 2
      const dy = (HEIGHT - img.height * scale) / 2
      ctx.drawImage(img, dx, dy, img.width * scale, img.height * scale)
    } catch {
      ctx.fillStyle = '#0D0D0D'
      ctx.fillRect(0, 0, WIDTH, HEIGHT)
    }
  } else {
    ctx.fillStyle = '#0D0D0D'
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
  }

  input.template.drawTip(ctx, input.data, WIDTH, HEIGHT)
  return Buffer.from(await canvas.encode('png'))
}

export async function composeCTASlide(input: ComposeInput): Promise<Buffer> {
  const canvas = createCanvas(WIDTH, HEIGHT)
  const ctx = canvas.getContext('2d')

  if (input.backgroundUrl) {
    try {
      const img = await loadImage(input.backgroundUrl)
      const scale = Math.max(WIDTH / img.width, HEIGHT / img.height)
      const dx = (WIDTH - img.width * scale) / 2
      const dy = (HEIGHT - img.height * scale) / 2
      ctx.drawImage(img, dx, dy, img.width * scale, img.height * scale)
    } catch {
      ctx.fillStyle = '#0D0D0D'
      ctx.fillRect(0, 0, WIDTH, HEIGHT)
    }
  } else {
    ctx.fillStyle = '#0D0D0D'
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
  }

  input.template.drawCTA(ctx, input.data, WIDTH, HEIGHT)
  return Buffer.from(await canvas.encode('png'))
}

// Generate FLUX background for a slide
export async function generateSlideBackground(
  topic: string,
  slideType: 'cover' | 'tip' | 'cta',
  themeName: string
): Promise<string | null> {
  const prompts: Record<string, Record<string, string>> = {
    cover: {
      editorial: `Professional editorial photography of ${topic}, warm Brazilian aesthetic, cinematic golden hour lighting, shallow depth of field, social media cover, 1080x1080, high fashion magazine quality`,
      minimal: `Clean minimalist abstract background, soft gradients, warm neutral tones, subtle texture, professional design system, 1080x1080`,
      bold: `Dramatic high contrast photography of ${topic}, bold colors, urban Brazilian scene, street photography style, cinematic, 1080x1080`,
      dark: `Moody dark photography of ${topic}, neon accents, night scene, cinematic atmosphere, professional editorial, 1080x1080`,
      warm: `Warm lifestyle photography of ${topic}, Brazilian culture, cozy atmosphere, golden hour, film grain texture, 1080x1080`,
    },
    tip: {
      editorial: `Abstract soft focus background, warm tones, bokeh lights, subtle gradient, professional backdrop, 1080x1080`,
      minimal: `Minimal geometric pattern, soft pastel colors, clean lines, modern design, 1080x1080`,
      bold: `Abstract vibrant texture, bold color blocks, dynamic composition, graphic design, 1080x1080`,
      dark: `Dark moody abstract texture, subtle neon glow, depth, professional backdrop, 1080x1080`,
      warm: `Warm textured background, earth tones, organic patterns, natural light feel, 1080x1080`,
    },
    cta: {
      editorial: `Vibrant lime green gradient, modern graphic design, energetic feel, bold and clean, 1080x1080`,
      minimal: `Soft mint green gradient, clean modern design, fresh and minimal, 1080x1080`,
      bold: `High contrast lime and black graphic, bold geometric shapes, dynamic, 1080x1080`,
      dark: `Dark background with lime green glow, neon accents, futuristic, 1080x1080`,
      warm: `Warm gradient with lime accents, sunset colors, inviting, 1080x1080`,
    },
  }

  const prompt = prompts[slideType]?.[themeName] || prompts[slideType]?.editorial
  if (!prompt) return null

  const result = await generateImage({ prompt, size: 'square' })
  if (!result.success || !result.data?.url) {
    console.warn('[COMPOSER] FLUX background failed')
    return null
  }

  return result.data.url
}
