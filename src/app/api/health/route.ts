import { NextResponse } from 'next/server'

/**
 * Health check endpoint for Docker / load balancers.
 */
export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: process.env.NEXT_PUBLIC_APP_VERSION || '0.1.0',
    },
    { status: 200 }
  )
}
