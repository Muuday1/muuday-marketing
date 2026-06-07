import { createClient } from '@supabase/supabase-js'
import { env } from '@/config/env'
import WebSocket from 'ws'

// Node.js 20 workaround: provide WebSocket transport for Supabase realtime
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const wsTransport = WebSocket as any

export const supabaseServer = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  {
    realtime: {
      transport: wsTransport,
    },
  }
)
