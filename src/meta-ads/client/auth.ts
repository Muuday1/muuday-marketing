import { env } from '@/config/env'

/**
 * Meta Marketing API authentication utilities.
 * https://developers.facebook.com/docs/marketing-api/overview/
 */

const META_API_BASE = 'https://graph.facebook.com/v19.0'

export function getMetaAuthHeaders(): Record<string, string> {
  const token = env.META_ACCESS_TOKEN
  if (!token) {
    throw new Error('META_ACCESS_TOKEN not configured')
  }
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
}

export async function metaFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${META_API_BASE}${path}`

  const response = await fetch(url, {
    ...options,
    headers: {
      ...getMetaAuthHeaders(),
      ...(options.headers || {}),
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(
      `Meta API error ${response.status}: ${error.error?.message || 'Unknown error'}`
    )
  }

  return response.json() as Promise<T>
}

export function buildInsightsPath(
  adAccountId: string,
  fields: string[],
  params?: Record<string, string>
): string {
  const queryParams = new URLSearchParams({
    fields: fields.join(','),
    ...(params || {}),
  })
  return `/${adAccountId}/insights?${queryParams.toString()}`
}
