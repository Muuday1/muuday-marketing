import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { env } from '@/config/env'
import type { NextAuthOptions } from 'next-auth'

// Debug: verify env vars are loaded
console.log('[AUTH DEBUG] NEXTAUTH_URL:', env.NEXTAUTH_URL)
console.log('[AUTH DEBUG] GOOGLE_CLIENT_ID exists:', env.GOOGLE_CLIENT_ID.length > 0)
console.log('[AUTH DEBUG] GOOGLE_CLIENT_SECRET exists:', env.GOOGLE_CLIENT_SECRET.length > 0)
console.log('[AUTH DEBUG] NEXTAUTH_SECRET exists:', env.NEXTAUTH_SECRET.length > 0)

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'password',
      credentials: {
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.password || !env.ADMIN_PASSWORD_HASH) {
          return null
        }
        const valid = await bcrypt.compare(credentials.password as string, env.ADMIN_PASSWORD_HASH)
        if (!valid) return null
        return { id: 'admin', name: 'Admin', email: 'admin@muuday.com' }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Only allow Google OAuth from authorized email
      if (account?.provider === 'google') {
        const allowedEmails = ['igorpinto.lds@gmail.com']
        if (!allowedEmails.includes(user.email ?? '')) {
          return false
        }
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) token.sub = user.id
      return token
    },
    async session({ session, token }) {
      if (token?.sub && session.user) {
        ;(session.user as Record<string, unknown>).id = token.sub
      }
      return session
    },
  },
}
