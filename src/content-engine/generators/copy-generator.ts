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

function buildSystemPrompt(input: CopyGenerationInput): string {
  const basePrompt = `${BRAND_DNA}

${PLATFORM_VOICE[input.platform] || PLATFORM_VOICE.instagram}

TOPIC ANGLE: ${PILLAR_ANGLES[input.pillar]}
OVERALL TONE: ${input.tone || 'warm'}
${input.purpose ? `PURPOSE: ${input.purpose}` : ''}

OUTPUT (JSON only):
{
  "headline": "Hook de até 80 caracteres. Nada genérico.",
  "body": "Copy para ${input.platform}. Respeite as regras de voz acima.",
  "cta": "Chamada curta e natural (máx 60 chars).",
  "hashtags": ["#tag1", "#tag2", "#tag3"],
  "altText": "Descrição acessível"
}

RULES:
1. Max 15% sentences start with "Você/Quando/Se/Para"
2. Use fragments. Imperfect grammar = okay if human.
3. Include ONE specific detail (number, place, brand, time).
4. Body should NOT read like a listicle unless platform demands it.
5. Hashtags in Portuguese.`

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

  try {
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const p = JSON.parse(jsonMatch[0])
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
    /* fallback */
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
