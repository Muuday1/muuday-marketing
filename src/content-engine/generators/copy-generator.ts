import { generateWithModel } from '@/shared/model-router'
// import { PLATFORM_VOICE } from './voice-guide'
import { buildPromptForFormat } from '@/content-engine/strategy/format-guides'
import { type ContentPurpose, type ContentFormat } from '@/content-engine/strategy/content-matrix'
import { ApiResult, ContentPillar, Platform } from '@/types'

interface CopyGenerationInput {
  platform: Platform
  pillar: ContentPillar
  topic: string
  tone?: 'warm' | 'informative' | 'motivational' | 'fun'
  purpose?: ContentPurpose
  format?: string
}

interface CopyGenerationOutput {
  headline: string
  body: string
  cta: string
  hashtags: string[]
  altText?: string
}

interface LengthConfig {
  min: number
  max: number
  ideal: number
  label: string
}

function getLengthConfig(platform: Platform): LengthConfig {
  const configs: Record<string, LengthConfig> = {
    instagram: { min: 200, max: 350, ideal: 280, label: '250-350 caracteres' },
    tiktok: { min: 80, max: 150, ideal: 120, label: '100-150 caracteres' },
    twitter: { min: 180, max: 250, ideal: 220, label: '200-250 caracteres' },
    linkedin: { min: 700, max: 1200, ideal: 900, label: '800-1200 caracteres' },
    youtube: { min: 250, max: 500, ideal: 350, label: '300-500 caracteres' },
    blog: { min: 1200, max: 2500, ideal: 1800, label: '1500-2500 caracteres' },
    newsletter: { min: 800, max: 2000, ideal: 1400, label: '1000-2000 caracteres' },
    podcast: { min: 300, max: 800, ideal: 500, label: '400-800 caracteres' },
  }
  return configs[platform] || configs.instagram
}

function truncateToLimit(text: string, max: number): string {
  if (text.length <= max) return text
  // Truncate at last complete sentence or line break before limit
  const truncated = text.slice(0, max)
  const lastPeriod = truncated.lastIndexOf('.')
  const lastBreak = truncated.lastIndexOf('\n')
  const cutPoint = Math.max(lastPeriod, lastBreak)
  if (cutPoint > max * 0.7) {
    return truncated.slice(0, cutPoint + 1).trim()
  }
  return truncated.trim()
}

function validateAndFixCopy(copy: CopyGenerationOutput, platform: Platform): CopyGenerationOutput {
  const cfg = getLengthConfig(platform)

  // Headline: max 80 for Instagram, 100 for others
  const headlineMax = platform === 'instagram' ? 80 : 100
  const headline = copy.headline.slice(0, headlineMax).trim()

  // Body: hard truncate to platform limit
  const body = truncateToLimit(copy.body, cfg.max).trim()

  // CTA: max 60
  const cta = copy.cta.slice(0, 60).trim()

  // Hashtags: max 5
  const hashtags = copy.hashtags.slice(0, 5).map((h) => h.trim())

  return { headline, body, cta, hashtags, altText: copy.altText }
}

function buildSystemPrompt(input: CopyGenerationInput): string {
  const lengthCfg = getLengthConfig(input.platform)

  const basePrompt = `Você é um redator nativo de Brasília que morou 5 anos em Londres. Escreve com voz de irmão mais velho: quente, informado, sem clichês.

REGRAS:
- Responda APENAS em JSON válido. ZERO texto fora do JSON.
- NUNCA "imigrante" → use "brasileiro no exterior"
- NUNCA "é fácil", "só fazer", "basta"
- Português do BRASIL
- Use fragmentos curtos. Gramática imperfeita = ok se soa humano.
- Inclua UM detalhe específico (número, lugar, marca)
- Hashtags em português
- Body: máximo ${lengthCfg.max} caracteres

OUTPUT - APENAS JSON:
{"headline":"","body":"","cta":"","hashtags":["","",""],"altText":""}`

  // If format is provided, append format-specific strategy guide
  if (input.format) {
    try {
      const formatGuide = buildPromptForFormat(
        input.format as ContentFormat,
        input.purpose || 'educate',
        input.topic,
        input.pillar
      )
      return `${basePrompt}\n\n${formatGuide}`
    } catch {
      return basePrompt
    }
  }

  return basePrompt
}

function cleanJsonContent(content: string): string {
  // Remove markdown code blocks
  const codeBlockMatch = content.match(/```(?:json)?\n?([\s\S]*?)```/)
  if (codeBlockMatch) {
    return codeBlockMatch[1].trim()
  }
  return content.trim()
}

function sanitizeJsonString(jsonStr: string): string {
  // Kimi sometimes returns literal newlines inside JSON strings (invalid)
  // We need to escape them properly while preserving structure
  let result = ''
  let inString = false
  let escaped = false

  for (let i = 0; i < jsonStr.length; i++) {
    const char = jsonStr[i]

    if (escaped) {
      result += char
      escaped = false
      continue
    }

    if (char === '\\') {
      result += char
      escaped = true
      continue
    }

    if (char === '"' && !escaped) {
      inString = !inString
      result += char
      continue
    }

    if (inString && (char === '\n' || char === '\r')) {
      result += '\\n'
      continue
    }

    result += char
  }

  return result
}

function parseGeneratedCopy(content: string): CopyGenerationOutput {
  const cleaned = cleanJsonContent(content)

  // Find all potential JSON objects by tracking brace depth
  const possibleJsons: string[] = []
  let depth = 0
  let start = -1

  for (let i = 0; i < cleaned.length; i++) {
    if (cleaned[i] === '{') {
      if (depth === 0) start = i
      depth++
    } else if (cleaned[i] === '}') {
      depth--
      if (depth === 0 && start !== -1) {
        possibleJsons.push(cleaned.slice(start, i + 1))
        start = -1
      }
    }
  }

  // Try each potential JSON from last to first (JSON usually at end of reasoning)
  for (const jsonStr of [...possibleJsons].reverse()) {
    try {
      const sanitized = sanitizeJsonString(jsonStr)
      const p = JSON.parse(sanitized)
      if (p.headline && typeof p.headline === 'string') {
        return {
          headline: String(p.headline || '').slice(0, 100),
          body: String(p.body || ''),
          cta: String(p.cta || 'Saiba mais').slice(0, 80),
          hashtags: Array.isArray(p.hashtags)
            ? p.hashtags.slice(0, 5).map(String)
            : ['#BrasilGlobal'],
          altText: String(p.altText || ''),
        }
      }
    } catch {
      continue
    }
  }

  return {
    headline: cleaned.slice(0, 80),
    body: cleaned,
    cta: 'Saiba mais',
    hashtags: ['#BrasilGlobal'],
    altText: 'Imagem relacionada',
  }
}

export async function generateCopy(
  input: CopyGenerationInput
): Promise<ApiResult<CopyGenerationOutput>> {
  const result = await generateWithModel('copy', {
    system: buildSystemPrompt(input),
    prompt: `Tema: ${input.topic}\nPlataforma: ${input.platform}\nPilar: ${input.pillar}\n\nGere o post em JSON. Body máximo ${getLengthConfig(input.platform).max} caracteres.`,
    maxTokens: 1280,
  })

  if (!result.success) {
    return { success: false, error: result.error }
  }

  const parsed = parseGeneratedCopy(result.data)
  const fixed = validateAndFixCopy(parsed, input.platform)

  console.log(
    `[COPY] Generated for ${input.platform}: headline=${fixed.headline.length} body=${fixed.body.length} max=${getLengthConfig(input.platform).max}`
  )

  return { success: true, data: fixed }
}
