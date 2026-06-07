import { generateWithModel } from '@/shared/model-router'
import { BRAND_DNA, PLATFORM_VOICE, PILLAR_ANGLES } from './voice-guide'
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
  const basePrompt = `${BRAND_DNA}

${PLATFORM_VOICE[input.platform] || PLATFORM_VOICE.instagram}

TOPIC ANGLE: ${PILLAR_ANGLES[input.pillar]}
OVERALL TONE: ${input.tone || 'warm'}
${input.purpose ? `PURPOSE: ${input.purpose}` : ''}
${getLengthLimit(input.platform)}

OUTPUT FORMAT - RESPONDA APENAS COM JSON, SEM TEXTO ANTES OU DEPOIS:
{
  "headline": "Hook de até 80 caracteres. Nada genérico.",
  "body": "Copy para ${input.platform}. Respeite o limite de caracteres acima.",
  "cta": "Chamada curta e natural (máx 60 chars).",
  "hashtags": ["#tag1", "#tag2", "#tag3"],
  "altText": "Descrição acessível"
}

REGRAS CRÍTICAS:
1. Responda APENAS com o objeto JSON acima. Nenhum texto antes ou depois.
2. STRICT length limit. Do NOT exceed the character count above.
3. Max 15% sentences start with "Você/Quando/Se/Para"
4. Use fragments. Imperfect grammar = okay if human.
5. Include ONE specific detail (number, place, brand, time).
6. Body should NOT read like a listicle unless platform demands it.
7. Hashtags in Portuguese.`

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

function parseGeneratedCopy(content: string): CopyGenerationOutput {
  const cleaned = cleanJsonContent(content)

  // Strategy 1: Look for JSON after a clear marker (Kimi often puts JSON at the very end)
  // Try to find the last valid JSON object with our expected keys
  const possibleJsons: string[] = []

  // Find all potential JSON objects by tracking brace depth
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

  // Try each potential JSON from last to first (JSON usually at end)
  for (const jsonStr of [...possibleJsons].reverse()) {
    try {
      const p = JSON.parse(jsonStr)
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
