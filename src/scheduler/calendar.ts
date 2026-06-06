import { ContentPiece } from '@/types'

interface ScheduleSlot {
  date: string // ISO date string
  time: string // HH:mm
  platform: string
  contentType: string
}

/**
 * Generate optimal posting schedule for a week.
 * Based on best times for Brazilian audience abroad.
 */
export function generateWeeklySchedule(content: ContentPiece[]): ScheduleSlot[] {
  const slots: ScheduleSlot[] = []
  const now = new Date()
  const weekStart = new Date(now.setDate(now.getDate() - now.getDay() + 1)) // Monday

  // Best times for Brazilian audience (BRT: UTC-3)
  // Morning: 7:30 BRT, Lunch: 12:00 BRT, Evening: 19:00 BRT
  const bestTimes = ['07:30', '12:00', '19:00']

  content.forEach((piece, index) => {
    const dayOffset = Math.floor(index / bestTimes.length)
    const timeIndex = index % bestTimes.length

    const date = new Date(weekStart)
    date.setDate(date.getDate() + dayOffset)

    slots.push({
      date: date.toISOString().split('T')[0],
      time: bestTimes[timeIndex],
      platform: piece.metadata.platform,
      contentType: piece.type,
    })
  })

  return slots
}

/**
 * Check if a content piece is due for publishing.
 */
export function isDueForPublishing(
  scheduledDate: string,
  scheduledTime: string,
  now = new Date()
): boolean {
  const scheduled = new Date(`${scheduledDate}T${scheduledTime}:00`)
  return now >= scheduled
}
