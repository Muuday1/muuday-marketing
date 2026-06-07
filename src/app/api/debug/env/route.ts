import { env } from '@/config/env'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    nextauth_url: env.NEXTAUTH_URL,
    google_client_id_exists: env.GOOGLE_CLIENT_ID.length > 0,
    google_client_id_length: env.GOOGLE_CLIENT_ID.length,
    google_client_secret_exists: env.GOOGLE_CLIENT_SECRET.length > 0,
    google_client_secret_length: env.GOOGLE_CLIENT_SECRET.length,
    nextauth_secret_exists: env.NEXTAUTH_SECRET.length > 0,
    nextauth_secret_length: env.NEXTAUTH_SECRET.length,
  })
}
