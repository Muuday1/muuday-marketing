import { NextRequest, NextResponse } from 'next/server'
import { env } from '@/config/env'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (password !== env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 })
    }

    const response = NextResponse.json({ success: true })

    response.cookies.set('admin-session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return response
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
