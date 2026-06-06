import { ApiResult } from '@/types'

interface BrandVoiceCheckInput {
  headline: string
  body: string
  cta: string
}

interface BrandVoiceCheckOutput {
  score: number // 0-10
  passed: boolean
  issues: string[]
  suggestions: string[]
}

/**
 * Automated brand voice quality gate.
 * Content must score 8+/10 to proceed to human review.
 */
export function checkBrandVoice(input: BrandVoiceCheckInput): ApiResult<BrandVoiceCheckOutput> {
  const issues: string[] = []
  const suggestions: string[] = []
  let score = 10

  // Check forbidden words
  const forbiddenWords = ['imigrante', 'estrangeiro', 'fácil', 'só', 'perfeito', 'expatriado']
  const lowerBody = `${input.headline} ${input.body} ${input.cta}`.toLowerCase()

  for (const word of forbiddenWords) {
    if (lowerBody.includes(word)) {
      issues.push(`Palavra proibida encontrada: "${word}"`)
      score -= 1
    }
  }

  // Check tone markers
  const warmMarkers = ['gente', 'você', 'sua jornada', 'a gente sabe', 'entendemos']
  const hasWarmMarker = warmMarkers.some((m) => lowerBody.includes(m))
  if (!hasWarmMarker) {
    suggestions.push('Adicione marcadores de calor humano ("você", "gente", "a gente sabe")')
    score -= 0.5
  }

  // Check CTA strength
  const weakCTAs = ['clique aqui', 'saiba mais', 'veja']
  const hasWeakCTA = weakCTAs.some((w) => input.cta.toLowerCase().includes(w))
  if (hasWeakCTA) {
    suggestions.push('CTA pode ser mais forte e específica')
    score -= 0.5
  }

  // Check length
  if (input.headline.length > 100) {
    issues.push('Headline muito longa (max 100 chars recomendado)')
    score -= 0.5
  }

  const finalScore = Math.max(0, Math.min(10, score))

  return {
    success: true,
    data: {
      score: Math.round(finalScore * 10) / 10,
      passed: finalScore >= 8,
      issues,
      suggestions,
    },
  }
}
