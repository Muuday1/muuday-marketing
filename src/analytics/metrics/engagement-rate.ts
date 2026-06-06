/**
 * Engagement rate calculator.
 * Pure function — highest ROI test target.
 */

interface EngagementMetrics {
  likes: number
  comments: number
  shares: number
  saves: number
  impressions: number
}

/**
 * Calculate engagement rate as (interactions / impressions).
 * Industry standard for social media analytics.
 */
export function calculateEngagementRate(metrics: EngagementMetrics): number {
  if (metrics.impressions === 0) return 0

  const interactions = metrics.likes + metrics.comments + metrics.shares + metrics.saves
  return interactions / metrics.impressions
}

/**
 * Calculate weighted engagement rate.
 * Comments and shares weighted higher than likes.
 */
export function calculateWeightedEngagementRate(metrics: EngagementMetrics): number {
  if (metrics.impressions === 0) return 0

  const weightedInteractions =
    metrics.likes * 1 +
    metrics.comments * 3 +
    metrics.shares * 5 +
    metrics.saves * 2

  return weightedInteractions / metrics.impressions
}

/**
 * Benchmark engagement rate against industry standards.
 */
export function benchmarkEngagementRate(rate: number): {
  label: string
  color: string
} {
  if (rate >= 0.06) return { label: 'Excelente', color: '#22C55E' }
  if (rate >= 0.03) return { label: 'Bom', color: '#3B82F6' }
  if (rate >= 0.015) return { label: 'Médio', color: '#EAB308' }
  return { label: 'Precisa melhorar', color: '#EF4444' }
}
