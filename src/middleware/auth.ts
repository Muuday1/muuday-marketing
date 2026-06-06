import { NextRequest, NextResponse } from 'next/server'

/**
 * Simple auth middleware for dashboard routes.
 * In production, integrate with Supabase Auth or NextAuth.
 */
export function authMiddleware(request: NextRequest): NextResponse | null {
  const path = request.nextUrl.pathname

  // Protect dashboard routes
  if (path.startsWith('/dashboard')) {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }

    // TODO: Validate JWT token
    // const isValid = await validateToken(token)
    // if (!isValid) { ... }
  }

  return null
}

/**
 * Rate limiting middleware for API routes.
 */
export function rateLimitMiddleware(request: NextRequest): NextResponse | null {
  const path = request.nextUrl.pathname

  if (path.startsWith('/api/')) {
    // TODO: Implement rate limiting with Upstash Redis
    // const ip = request.ip ?? 'anonymous'
    // const key = `ratelimit:${ip}:${path}`
    // const limit = await getRateLimit(key)
    // if (limit.remaining <= 0) {
    //   return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    // }
  }

  return null
}
