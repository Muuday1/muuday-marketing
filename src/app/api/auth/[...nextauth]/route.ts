import NextAuth from 'next-auth'
import { authOptions } from '@/auth'

const handler = NextAuth(authOptions)

// Debug: log env vars at runtime
console.log(
  '[AUTH ROUTE] GOOGLE_CLIENT_ID length:',
  authOptions.providers?.[0]?.options?.clientId?.length ?? 'N/A'
)

export { handler as GET, handler as POST }
