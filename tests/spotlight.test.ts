import { describe, it, expect } from 'vitest'
import { selectSpotlightMember, generateSpotlightContent } from '@/community/content/spotlight'

describe('selectSpotlightMember', () => {
  it('selects a member with high engagement', () => {
    const members = [
      { id: '1', name: 'Alice', city: 'Londres', country: 'UK', engagementScore: 80 },
      { id: '2', name: 'Bob', city: 'Dublin', country: 'Irlanda', engagementScore: 40 },
      { id: '3', name: 'Carol', city: 'Lisboa', country: 'Portugal', engagementScore: 95 },
    ]

    const result = selectSpotlightMember(members, [])
    expect(result).not.toBeNull()
    expect(result!.engagementScore).toBeGreaterThan(50)
  })

  it('excludes previously featured members', () => {
    const members = [
      { id: '1', name: 'Alice', city: 'Londres', country: 'UK', engagementScore: 80 },
      { id: '2', name: 'Bob', city: 'Dublin', country: 'Irlanda', engagementScore: 60 },
    ]

    const result = selectSpotlightMember(members, ['1'])
    expect(result).not.toBeNull()
    expect(result!.id).toBe('2')
  })

  it('returns null when no eligible members', () => {
    const members = [
      { id: '1', name: 'Alice', city: 'Londres', country: 'UK', engagementScore: 30 },
    ]

    const result = selectSpotlightMember(members, [])
    expect(result).toBeNull()
  })
})

describe('generateSpotlightContent', () => {
  it('generates personalized content', () => {
    const member = {
      id: '1',
      name: 'Maria',
      city: 'Londres',
      country: 'UK',
      engagementScore: 85,
    }

    const content = generateSpotlightContent(member)
    expect(content.headline).toContain('Maria')
    expect(content.headline).toContain('Londres')
    expect(content.questions).toHaveLength(5)
    expect(content.callToAction).toContain('Maria')
  })
})
