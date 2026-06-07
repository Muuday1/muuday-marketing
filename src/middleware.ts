import { NextResponse } from 'next/server'
import { auth } from '@/auth'

export default auth((req) => {
  const { nextUrl } = req
  const path = nextUrl.pathname

  // Skip auth for NextAuth routes, cron endpoints, and health check
  if (
    path.startsWith('/api/auth/') ||
    path.startsWith('/api/cron/') ||
    path === '/api/health' ||
    path.startsWith('/api/debug/')
  ) {
    return NextResponse.next()
  }

  // Check if user is authenticated
  if (!req.auth) {
    const loginUrl = new URL('/login', nextUrl)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
}
