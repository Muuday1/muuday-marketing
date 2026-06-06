#!/usr/bin/env tsx
/**
 * Show content pipeline status in the terminal.
 */

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase credentials not configured')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
})

async function main() {
  const { data: content } = await supabase
    .from('marketing_content_pieces')
    .select('title, type, status, created_at')
    .order('created_at', { ascending: false })
    .limit(20)

  const { count: total } = await supabase
    .from('marketing_content_pieces')
    .select('*', { count: 'exact', head: true })

  const { count: scheduled } = await supabase
    .from('marketing_social_posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'scheduled')

  console.log('\n============================================')
  console.log('      MUUDAY CONTENT PIPELINE             ')
  console.log('============================================')
  console.log(`Total content: ${total ?? 0}`)
  console.log(`Scheduled posts: ${scheduled ?? 0}`)
  console.log('============================================\n')

  if (content && content.length > 0) {
    console.log('Recent content:')
    console.log('-'.repeat(60))
    for (const item of content) {
      const status = item.status.padEnd(10)
      const type = item.type.padEnd(10)
      const date = new Date(item.created_at).toLocaleDateString('pt-BR')
      console.log(`${status} | ${type} | ${date} | ${item.title}`)
    }
    console.log('-'.repeat(60))
  }

  const { data: upcoming } = await supabase
    .from('marketing_social_posts')
    .select('platform, scheduled_for')
    .eq('status', 'scheduled')
    .order('scheduled_for', { ascending: true })
    .limit(5)

  if (upcoming && upcoming.length > 0) {
    console.log('\nUpcoming posts:')
    console.log('-'.repeat(40))
    for (const post of upcoming) {
      const date = post.scheduled_for ? new Date(post.scheduled_for).toLocaleString('pt-BR') : 'TBD'
      console.log(`${post.platform.padEnd(10)} | ${date}`)
    }
    console.log('-'.repeat(40))
  }

  console.log('')
}

main().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
