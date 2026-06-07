import { generateWithModel } from '@/shared/model-router'
import { ApiResult, ContentPillar, Platform } from '@/types'

interface CopyGenerationInput {
  platform: Platform
  pillar: ContentPillar
  topic: string
  tone?: 'warm' | 'informative' | 'motivational' | 'fun'
  targetAudience?: string
  wordCount?: number
}

interface CopyGenerationOutput {
  headline: string
  body: string
  cta: string
  hashtags: string[]
  altText?: string
}

function buildSystemPrompt(input: CopyGenerationInput): string {
  return `Você é um copywriter sênior brasileiro especializado em criar conteúdo para brasileiros que vivem no exterior.

REGRAS DE VOZ DA MARCA:
- Tom: ${input.tone || 'warm'} (quente, acolhedor, empático)
- Use português do Brasil, não de Portugal
- Comece com o problema do leitor
- Use voz ativa
- Uma ideia por frase
- Referências culturais brasileiras quando relevante
- NUNCA use "imigrante" — use "brasileiro no exterior"
- NUNCA minimize a dificuldade ("é fácil", "só fazer X")

FORMATO DE SAÍDA (JSON):
{
  "headline": "Hook poderoso (máx 100 chars)",
  "body": "Texto principal adaptado para ${input.platform}",
  "cta": "Call to action clara",
  "hashtags": ["#tag1", "#tag2", "#tag3"],
  "altText": "Descrição da imagem para acessibilidade"
}

PLATAFORMA: ${input.platform}
- Instagram carousel: copy curta, scannable, bullet points
- Instagram Reel: hook nos primeiros 3 segundos, legendas on-screen
- Blog: estrutura SEO-friendly, H2/H3, 800-2000 palavras
- Newsletter: tom pessoal, como carta de um amigo
- Podcast: script conversacional, natural, com pausas`
}

function parseGeneratedCopy(content: string): CopyGenerationOutput {
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
  } catch {
    // Fallback: return raw content as body
  }

  return {
    headline: content.slice(0, 100),
    body: content,
    cta: 'Saiba mais',
    hashtags: ['#BrasilGlobal'],
    altText: 'Imagem relacionada ao conteúdo',
  }
}

/**
 * Generate social media copy using Kimi (primary) via Model Router.
 * All copy must pass brand voice validation before publish.
 */
export async function generateCopy(
  input: CopyGenerationInput
): Promise<ApiResult<CopyGenerationOutput>> {
  const result = await generateWithModel('copy', {
    system: buildSystemPrompt(input),
    prompt: `Tema: ${input.topic}\nPilar: ${input.pillar}\nPlataforma: ${input.platform}`,
    maxTokens: 4096,
  })

  if (!result.success) {
    return { success: false, error: result.error }
  }

  const parsed = parseGeneratedCopy(result.data)
  return { success: true, data: parsed }
}
