import { NextResponse } from 'next/server'

/**
 * Health check endpoint.
 * Used by uptime monitors and deployment checks.
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.NEXT_PUBLIC_APP_VERSION || '0.1.0',
    services: {
      openai: !!process.env.OPENAI_API_KEY,
      elevenlabs: !!process.env.ELEVENLABS_API_KEY,
      meta: !!(process.env.META_APP_ID && process.env.META_ACCESS_TOKEN),
    },
  })
}
