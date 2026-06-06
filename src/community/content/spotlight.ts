import { CommunityMember } from '@/types'

/**
 * Select a community member for the weekly spotlight.
 * Prioritizes engaged members who haven't been featured yet.
 */
export function selectSpotlightMember(
  members: CommunityMember[],
  previouslyFeatured: string[]
): CommunityMember | null {
  const eligible = members.filter(
    (m) => !previouslyFeatured.includes(m.id) && m.engagementScore > 50
  )

  if (eligible.length === 0) return null

  // Weighted random: higher engagement = higher chance
  const totalWeight = eligible.reduce((sum, m) => sum + m.engagementScore, 0)
  let random = Math.random() * totalWeight

  for (const member of eligible) {
    random -= member.engagementScore
    if (random <= 0) return member
  }

  return eligible[eligible.length - 1]
}

/**
 * Generate spotlight content for a member.
 */
export function generateSpotlightContent(member: CommunityMember): {
  headline: string
  questions: string[]
  callToAction: string
} {
  return {
    headline: `Conheça ${member.name}: brasileiro em ${member.city}, ${member.country}`,
    questions: [
      'Quando você saiu do Brasil e o que te motivou?',
      'Qual foi o maior desafio que você enfrentou?',
      'O que você mais sente falta do Brasil?',
      'Qual dica você daria para quem está começando essa jornada?',
      'Como a comunidade Brasil Global te ajudou?',
    ],
    callToAction: `Quer compartilhar sua história como ${member.name}? Entre em contato!`,
  }
}
