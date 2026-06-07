import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await fetch('https://accounts.google.com/.well-known/openid-configuration')
    const status = res.status
    const text = await res.text()
    return NextResponse.json({
      success: true,
      status,
      length: text.length,
      firstChars: text.slice(0, 100),
    })
  } catch (e) {
    return NextResponse.json({
      success: false,
      error: (e as Error).message,
    })
  }
}
