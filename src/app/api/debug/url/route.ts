import { env } from '@/config/env'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    nextauth_url: env.NEXTAUTH_URL,
    nextauth_url_length: env.NEXTAUTH_URL.length,
    nextauth_url_last_char: env.NEXTAUTH_URL.slice(-1),
  })
}
