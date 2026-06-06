import { describe, it, expect } from 'vitest'
import { selectSpotlightMember, generateSpotlightContent } from '@/community/content/spotlight'

describe('selectSpotlightMember', () => {
  it('selects a member with high engagement', () => {
    const members = [
      { id: '1', name: 'Alice', email: 'alice@example.com', city: 'Londres', country: 'UK', joinDate: new Date(), interests: [], engagementScore: 80, isAmbassador: false, referralCount: 0 },
      { id: '2', name: 'Bob', email: 'bob@example.com', city: 'Dublin', country: 'Irlanda', joinDate: new Date(), interests: [], engagementScore: 40, isAmbassador: false, referralCount: 0 },
      { id: '3', name: 'Carol', email: 'carol@example.com', city: 'Lisboa', country: 'Portugal', joinDate: new Date(), interests: [], engagementScore: 95, isAmbassador: false, referralCount: 0 },
    ]

    const result = selectSpotlightMember(members, [])
    expect(result).not.toBeNull()
    expect(result!.engagementScore).toBeGreaterThan(50)
  })

  it('excludes previously featured members', () => {
    const members = [
      { id: '1', name: 'Alice', email: 'alice@example.com', city: 'Londres', country: 'UK', joinDate: new Date(), interests: [], engagementScore: 80, isAmbassador: false, referralCount: 0 },
      { id: '2', name: 'Bob', email: 'bob@example.com', city: 'Dublin', country: 'Irlanda', joinDate: new Date(), interests: [], engagementScore: 60, isAmbassador: false, referralCount: 0 },
    ]

    const result = selectSpotlightMember(members, ['1'])
    expect(result).not.toBeNull()
    expect(result!.id).toBe('2')
  })

  it('returns null when no eligible members', () => {
    const members = [
      { id: '1', name: 'Alice', email: 'alice@example.com', city: 'Londres', country: 'UK', joinDate: new Date(), interests: [], engagementScore: 30, isAmbassador: false, referralCount: 0 },
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
      email: 'maria@example.com',
      city: 'Londres',
      country: 'UK',
      joinDate: new Date(),
      interests: [],
      engagementScore: 85,
      isAmbassador: false,
      referralCount: 0,
    }

    const content = generateSpotlightContent(member)
    expect(content.headline).toContain('Maria')
    expect(content.headline).toContain('Londres')
    expect(content.questions).toHaveLength(5)
    expect(content.callToAction).toContain('Maria')
  })
})
