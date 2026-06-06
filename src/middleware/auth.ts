import { NextRequest, NextResponse } from 'next/server'
import { env } from '@/config/env'
import { incrementCache, cacheKeys } from '@/cache/redis'

/**
 * Validate a JWT token using APP_SECRET.
 * In production, integrate with Supabase Auth or NextAuth.
 */
async function validateToken(token: string): Promise<boolean> {
  try {
    const [headerB64, payloadB64, signature] = token.split('.')
    if (!headerB64 || !payloadB64 || !signature) return false

    const encoder = new TextEncoder()
    const data = `${headerB64}.${payloadB64}`
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(env.APP_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )
    const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(data))
    const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')

    return sigB64 === signature
  } catch {
    return false
  }
}

/**
 * Simple auth middleware for dashboard routes.
 */
export async function authMiddleware(request: NextRequest): Promise<NextResponse | null> {
  const path = request.nextUrl.pathname

  if (path.startsWith('/dashboard')) {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }

    const isValid = await validateToken(token)
    if (!isValid) {
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return null
}

/**
 * Rate limiting middleware for API routes.
 * 100 requests per minute per IP per endpoint.
 */
export async function rateLimitMiddleware(request: NextRequest): Promise<NextResponse | null> {
  const path = request.nextUrl.pathname

  if (path.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous'
    const key = cacheKeys.rateLimit(ip, path)
    const limit = 100
    const windowSeconds = 60

    try {
      const count = await incrementCache(key, windowSeconds)
      if (count > limit) {
        return NextResponse.json(
          { error: 'Too many requests', retry_after: windowSeconds },
          { status: 429 }
        )
      }
    } catch {
      // Allow request if rate limiting fails
    }
  }

  return null
}
