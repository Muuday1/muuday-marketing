/**
 * Redis cache utilities.
 * Stub implementation — integrate with Upstash Redis in production.
 */

interface CacheEntry<T> {
  value: T
  expiresAt: number
}

// In-memory fallback for development
const memoryCache = new Map<string, CacheEntry<unknown>>()

/**
 * Get a value from cache.
 */
export async function getCache<T>(key: string): Promise<T | null> {
  // TODO: Replace with Upstash Redis
  const entry = memoryCache.get(key) as CacheEntry<T> | undefined

  if (!entry) return null
  if (Date.now() > entry.expiresAt) {
    memoryCache.delete(key)
    return null
  }

  return entry.value
}

/**
 * Set a value in cache with TTL.
 */
export async function setCache<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
  // TODO: Replace with Upstash Redis
  memoryCache.set(key, {
    value,
    expiresAt: Date.now() + ttlSeconds * 1000,
  })
}

/**
 * Delete a value from cache.
 */
export async function deleteCache(key: string): Promise<void> {
  memoryCache.delete(key)
}

/**
 * Cache keys for common data.
 */
export const cacheKeys = {
  metaInsights: (accountId: string) => `meta:insights:${accountId}`,
  contentPiece: (id: string) => `content:piece:${id}`,
  memberList: (page: number) => `community:members:${page}`,
  newsletterIssue: (id: string) => `newsletter:issue:${id}`,
} as const
