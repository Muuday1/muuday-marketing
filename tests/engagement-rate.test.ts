import { describe, it, expect } from 'vitest'
import {
  calculateEngagementRate,
  calculateWeightedEngagementRate,
  benchmarkEngagementRate,
} from '@/analytics/metrics/engagement-rate'

describe('calculateEngagementRate', () => {
  it('calculates basic engagement rate', () => {
    const result = calculateEngagementRate({
      likes: 100,
      comments: 20,
      shares: 10,
      saves: 5,
      impressions: 1000,
    })
    expect(result).toBe(0.135)
  })

  it('returns 0 for zero impressions', () => {
    const result = calculateEngagementRate({
      likes: 10,
      comments: 0,
      shares: 0,
      saves: 0,
      impressions: 0,
    })
    expect(result).toBe(0)
  })
})

describe('calculateWeightedEngagementRate', () => {
  it('weights comments and shares higher', () => {
    const result = calculateWeightedEngagementRate({
      likes: 100,
      comments: 20,
      shares: 10,
      saves: 5,
      impressions: 1000,
    })
    // (100*1 + 20*3 + 10*5 + 5*2) / 1000 = 0.24
    expect(result).toBe(0.24)
  })
})

describe('benchmarkEngagementRate', () => {
  it('returns excellent for 6%+', () => {
    const result = benchmarkEngagementRate(0.06)
    expect(result.label).toBe('Excelente')
  })

  it('returns needs improvement for <1.5%', () => {
    const result = benchmarkEngagementRate(0.01)
    expect(result.label).toBe('Precisa melhorar')
  })
})
