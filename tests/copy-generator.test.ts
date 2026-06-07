import { describe, it, expect, vi, beforeEach } from 'vitest'
import { generateCopy } from '@/content-engine/generators/copy-generator'

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('generateCopy', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns success with generated copy', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: JSON.stringify({
                headline: 'Test Headline',
                body: 'Test body content',
                cta: 'Test CTA',
                hashtags: ['#test'],
                platform: 'instagram',
              }),
            },
          },
        ],
      }),
    })

    const result = await generateCopy({
      topic: 'test topic',
      platform: 'instagram',
      pillar: 'culture',
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.headline).toBe('Test Headline')
      expect(result.data.body).toBe('Test body content')
    }
  })

  it('returns error when API fails', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      text: async () => 'API Error',
    })

    const result = await generateCopy({
      topic: 'test',
      platform: 'instagram',
      pillar: 'culture',
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toMatch(/failed after \d+ retries|error/i)
    }
  })
})
