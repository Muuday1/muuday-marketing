import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { env } from '@/config/env'

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
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
})
