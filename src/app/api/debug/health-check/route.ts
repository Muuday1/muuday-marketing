import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ ok: true, version: 'test-2', timestamp: new Date().toISOString() })
}
