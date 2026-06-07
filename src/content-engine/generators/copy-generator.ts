import { generateWithModel } from '@/shared/model-router'
import { PLATFORM_VOICE } from './voice-guide'
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

function getLengthLimit(platform: Platform): string {
  const limits: Record<string, string> = {
    instagram: 'Body: 250-350 caracteres. Curto, direto, punchy.',
    tiktok: 'Body: 100-150 caracteres. Ultra curto.',
    twitter: 'Body: 200-250 caracteres. Dentro do limite.',
    linkedin: 'Body: 800-1200 caracteres. Profissional mas humano.',
    youtube: 'Body: 300-500 caracteres. Descrição de vídeo.',
    blog: 'Body: 1500-2500 caracteres. Artigo completo.',
    newsletter: 'Body: 1000-2000 caracteres. Email aprofundado.',
    podcast: 'Body: 400-800 caracteres. Show notes.',
  }
  return limits[platform] || limits.instagram
}

function buildSystemPrompt(input: CopyGenerationInput): string {
  const basePrompt = `Você é um redator nativo de Brasília que morou 5 anos em Londres. Escreve com voz de irmão mais velho: quente, informado, sem clichês.

REGRAS INQUEBRÁVEIS:
- ZERO texto fora do JSON
- ZERO explicação de raciocínio
- NUNCA "imigrante" → "brasileiro no exterior"
- NUNCA "é fácil", "só fazer", "basta"
- NUNCA "in today's world", "in conclusion"
- Português do BRASIL (não Portugal)
- Uma ideia por frase. Voz ativa. Máx 15% frases começam com Você/Quando/Se/Para
- Use fragmentos. Gramática imperfeita = ok se soa humano
- Inclua UM detalhe específico (número, lugar, marca, tempo)
- Hashtags em português

${PLATFORM_VOICE[input.platform] || PLATFORM_VOICE.instagram}

${getLengthLimit(input.platform)}

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
      // If format guide fails, fall back to base prompt
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
    prompt: `Escreva um post para ${input.platform} sobre: ${input.topic}\n\nPilar: ${input.pillar}\n\nEscreva como uma pessoa real, não como AI. Use detalhes específicos. Seja honesto sobre as dificuldades.`,
    maxTokens: 4096,
  })

  if (!result.success) {
    return { success: false, error: result.error }
  }

  return { success: true, data: parseGeneratedCopy(result.data) }
}
