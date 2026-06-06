import { NextRequest, NextResponse } from 'next/server'
import { authMiddleware, rateLimitMiddleware } from '@/middleware/auth'

export function middleware(request: NextRequest) {
  // Check auth first
  const authResponse = authMiddleware(request)
  if (authResponse) return authResponse

  // Check rate limits
  const rateLimitResponse = rateLimitMiddleware(request)
  if (rateLimitResponse) return rateLimitResponse

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
}
