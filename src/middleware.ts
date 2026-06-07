import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  if (
    path.startsWith('/api/auth/') ||
    path.startsWith('/api/cron/') ||
    path === '/api/health' ||
    path.startsWith('/api/debug/')
  ) {
    return NextResponse.next()
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
}
