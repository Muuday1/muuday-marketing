/**
 * Simple A/B testing framework.
 * Assigns users to variants deterministically based on user ID.
 */

interface Experiment<T> {
  id: string
  name: string
  variants: Array<{
    id: string
    name: string
    weight: number
    value: T
  }>
}

/**
 * Deterministically assign a user to a variant.
 * Same user ID always gets the same variant.
 */
export function assignVariant<T>(experiment: Experiment<T>, userId: string): T {
  const hash = hashString(`${experiment.id}:${userId}`)
  const totalWeight = experiment.variants.reduce((sum, v) => sum + v.weight, 0)
  const normalizedHash = (hash % totalWeight) / totalWeight

  let cumulativeWeight = 0
  for (const variant of experiment.variants) {
    cumulativeWeight += variant.weight / totalWeight
    if (normalizedHash <= cumulativeWeight) {
      return variant.value
    }
  }

  return experiment.variants[experiment.variants.length - 1].value
}

/**
 * Simple string hash function for deterministic assignment.
 */
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

// Example experiments
export const headlineExperiments: Experiment<string> = {
  id: 'hero-headline-v1',
  name: 'Hero Headline Test',
  variants: [
    { id: 'control', name: 'Control', weight: 50, value: 'A gente sabe que não é fácil' },
    { id: 'variant-b', name: 'Direct', weight: 50, value: 'Sua vida no exterior, mais fácil' },
  ],
}

export const ctaExperiments: Experiment<string> = {
  id: 'cta-button-v1',
  name: 'CTA Button Test',
  variants: [
    { id: 'control', name: 'Join', weight: 50, value: 'Junte-se à comunidade' },
    { id: 'variant-b', name: 'Start', weight: 50, value: 'Comece agora' },
  ],
}
