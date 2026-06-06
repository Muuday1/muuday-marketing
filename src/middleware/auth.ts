import { NextRequest, NextResponse } from 'next/server'
import { incrementCache, cacheKeys } from '@/cache/redis'

/**
 * Simple auth middleware: checks for admin-session cookie.
 * No JWT, no complexity. Physical access is the security boundary.
 */
export async function authMiddleware(request: NextRequest): Promise<NextResponse | null> {
  const path = request.nextUrl.pathname

  // Public routes
  if (path === '/login' || path.startsWith('/api/auth/')) {
    return null
  }

  const session = request.cookies.get('admin-session')?.value

  if (session !== 'authenticated') {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
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
