/**
 * Redis cache utilities.
 * Uses Upstash Redis in production, in-memory fallback for local dev.
 */

import { Redis } from '@upstash/redis'
import { env } from '@/config/env'

interface CacheEntry<T> {
  value: T
  expiresAt: number
}

const memoryCache = new Map<string, CacheEntry<unknown>>()

function getRedisClient(): Redis | null {
  const url = env.UPSTASH_REDIS_REST_URL
  const token = env.UPSTASH_REDIS_REST_TOKEN
  if (!url || url.includes('dummy') || url.includes('localhost') || !token || token === 'dummy') {
    return null
  }
  try {
    return new Redis({ url, token })
  } catch {
    return null
  }
}

const redis = getRedisClient()

/**
 * Get a value from cache.
 */
export async function getCache<T>(key: string): Promise<T | null> {
  if (redis) {
    try {
      const value = await redis.get<T>(key)
      return value ?? null
    } catch {
      // Fallback to memory cache on Redis error
    }
  }

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
  if (redis) {
    try {
      await redis.set(key, value, { ex: ttlSeconds })
      return
    } catch {
      // Fallback to memory cache on Redis error
    }
  }

  memoryCache.set(key, {
    value,
    expiresAt: Date.now() + ttlSeconds * 1000,
  })
}

/**
 * Delete a value from cache.
 */
export async function deleteCache(key: string): Promise<void> {
  if (redis) {
    try {
      await redis.del(key)
      return
    } catch {
      // Fallback
    }
  }
  memoryCache.delete(key)
}

/**
 * Increment a counter in cache.
 */
export async function incrementCache(key: string, ttlSeconds: number): Promise<number> {
  if (redis) {
    try {
      const value = await redis.incr(key)
      await redis.expire(key, ttlSeconds)
      return value
    } catch {
      // Fallback
    }
  }

  const current = (memoryCache.get(key)?.value as number) ?? 0
  const next = current + 1
  memoryCache.set(key, {
    value: next,
    expiresAt: Date.now() + ttlSeconds * 1000,
  })
  return next
}

/**
 * Cache keys for common data.
 */
export const cacheKeys = {
  metaInsights: (accountId: string) => `meta:insights:${accountId}`,
  contentPiece: (id: string) => `content:piece:${id}`,
  memberList: (page: number) => `community:members:${page}`,
  newsletterIssue: (id: string) => `newsletter:issue:${id}`,
  rateLimit: (ip: string, path: string) => `ratelimit:${ip}:${path}`,
} as const
