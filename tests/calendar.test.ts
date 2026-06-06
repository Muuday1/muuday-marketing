import { describe, it, expect, vi } from 'vitest'
import { generateWeeklySchedule, isDueForPublishing } from '@/scheduler/calendar'

describe('generateWeeklySchedule', () => {
  it('generates slots for all content pieces', () => {
    const content = [
      { id: '1', type: 'carousel' as const, status: 'draft' as const, title: 'Post 1', content: '', metadata: { platform: 'instagram' as const, pillar: 'culture' as const, hashtags: [], mentions: [], mediaUrls: [] }, createdAt: new Date(), updatedAt: new Date(), authorId: '1' },
      { id: '2', type: 'blog' as const, status: 'draft' as const, title: 'Post 2', content: '', metadata: { platform: 'linkedin' as const, pillar: 'career' as const, hashtags: [], mentions: [], mediaUrls: [] }, createdAt: new Date(), updatedAt: new Date(), authorId: '1' },
      { id: '3', type: 'reel' as const, status: 'draft' as const, title: 'Post 3', content: '', metadata: { platform: 'tiktok' as const, pillar: 'lifestyle' as const, hashtags: [], mentions: [], mediaUrls: [] }, createdAt: new Date(), updatedAt: new Date(), authorId: '1' },
    ]

    const schedule = generateWeeklySchedule(content)
    expect(schedule).toHaveLength(3)
    expect(schedule[0].time).toBe('07:30')
    expect(schedule[1].time).toBe('12:00')
    expect(schedule[2].time).toBe('19:00')
  })

  it('distributes across multiple days when content exceeds slots per day', () => {
    const content = Array.from({ length: 5 }, (_, i) => ({
      id: String(i),
      type: 'carousel' as const,
      status: 'draft' as const,
      title: `Post ${i}`,
      content: '',
      metadata: { platform: 'instagram' as const, pillar: 'culture' as const, hashtags: [], mentions: [], mediaUrls: [] },
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: '1',
    }))

    const schedule = generateWeeklySchedule(content)
    expect(schedule).toHaveLength(5)
    // First 3 on day 0, next 2 on day 1
    expect(schedule[0].date).toBe(schedule[2].date)
    expect(schedule[3].date).not.toBe(schedule[0].date)
  })
})

describe('isDueForPublishing', () => {
  it('returns true when current time is past scheduled time', () => {
    const now = new Date('2026-06-03T10:00:00')
    expect(isDueForPublishing('2026-06-03', '09:00', now)).toBe(true)
  })

  it('returns false when current time is before scheduled time', () => {
    const now = new Date('2026-06-03T08:00:00')
    expect(isDueForPublishing('2026-06-03', '09:00', now)).toBe(false)
  })

  it('returns false for future dates', () => {
    const now = new Date('2026-06-03T10:00:00')
    expect(isDueForPublishing('2026-06-04', '09:00', now)).toBe(false)
  })
})
