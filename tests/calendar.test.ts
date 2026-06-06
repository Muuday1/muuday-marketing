import { describe, it, expect, vi } from 'vitest'
import { generateWeeklySchedule, isDueForPublishing } from '@/scheduler/calendar'

describe('generateWeeklySchedule', () => {
  it('generates slots for all content pieces', () => {
    const content = [
      { id: '1', headline: 'Post 1', platform: 'instagram', format: 'carousel' },
      { id: '2', headline: 'Post 2', platform: 'linkedin', format: 'article' },
      { id: '3', headline: 'Post 3', platform: 'tiktok', format: 'video' },
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
      headline: `Post ${i}`,
      platform: 'instagram',
      format: 'carousel',
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
