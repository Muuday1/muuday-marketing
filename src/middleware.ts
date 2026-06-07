import { NextRequest, NextResponse } from 'next/server'
import { authMiddleware, rateLimitMiddleware } from '@/middleware/auth'

/**
 * Next.js middleware — runs before every request.
 * Handles authentication for dashboard routes and rate limiting for API routes.
 */
export async function middleware(request: NextRequest) {
  // Skip auth for cron and health endpoints
  if (
    request.nextUrl.pathname.startsWith('/api/cron/') ||
    request.nextUrl.pathname === '/api/health'
  ) {
    return NextResponse.next()
  }

  // Rate limiting first (cheapest check)
  const rateLimitResponse = await rateLimitMiddleware(request)
  if (rateLimitResponse) return rateLimitResponse

  // Then auth check
  const authResponse = await authMiddleware(request)
  if (authResponse) return authResponse

  return NextResponse.next()
}

/**
 * Middleware matcher — only run on routes that need it.
 * Avoids running on static files, images, favicon, etc.
 */
export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
}
