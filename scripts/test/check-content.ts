import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import WebSocket from 'ws'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { realtime: { transport: WebSocket as any } }
)

async function main() {
  const { data, error } = await supabase
    .from('marketing_content_pieces')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3)

  if (error) {
    console.log('Error:', error.message)
    return
  }

  console.log(`Found ${data?.length} content pieces:\n`)
  for (const item of data || []) {
    console.log(`ID: ${item.id}`)
    console.log(`Title: ${item.title}`)
    console.log(`Status: ${item.status}`)
    console.log(`Score: ${item.brand_voice_score}/10`)
    console.log(`Type: ${item.type}`)
    console.log(`Created: ${item.created_at}`)
    console.log('---')
  }
}

main()
