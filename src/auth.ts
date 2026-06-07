import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { env } from '@/config/env'
import type { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      wellKnown: 'https://accounts.google.com/.well-known/openid-configuration',
      authorization: {
        url: 'https://accounts.google.com/o/oauth2/v2/auth',
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope: 'openid email profile',
        },
      },
      token: {
        url: 'https://oauth2.googleapis.com/token',
      },
      userinfo: {
        url: 'https://openidconnect.googleapis.com/v1/userinfo',
      },
      idToken: true,
      checks: ['pkce', 'state'],
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
