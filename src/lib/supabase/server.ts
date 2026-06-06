import { createClient } from '@supabase/supabase-js'
import { env } from '@/config/env'

export function getSupabaseServer() {
  const url = env.NEXT_PUBLIC_SUPABASE_URL
  const key = env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error('Supabase URL or service role key not configured')
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  })
}
