import { createClient } from '@supabase/supabase-js'
import { env } from '@/config/env'

const url = env.NEXT_PUBLIC_SUPABASE_URL
const key = env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !key) {
  throw new Error('Supabase URL or service role key not configured')
}

/**
 * Singleton Supabase server client.
 * Use `auth: { persistSession: false }` to avoid WebSocket issues in Node.js 20.
 */
export const supabaseServer = createClient(url, key, {
  auth: { persistSession: false },
})

/**
 * Factory function for cases that need a fresh client instance.
 * Prefer `supabaseServer` for 99% of use cases.
 */
export function getSupabaseServer() {
  return createClient(url, key, {
    auth: { persistSession: false },
  })
}
