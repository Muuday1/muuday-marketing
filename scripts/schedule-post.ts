#!/usr/bin/env tsx
/**
 * Schedule a post for publishing.
 * Usage: npx tsx scripts/schedule-post.ts <content_piece_id> <platform> <datetime>
 * Example: npx tsx scripts/schedule-post.ts abc-123 instagram "2026-06-10T14:00:00Z"
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
  const [, , contentPieceId, platform, scheduledFor] = process.argv

  if (!contentPieceId || !platform || !scheduledFor) {
    console.error(
      'Usage: npx tsx scripts/schedule-post.ts <content_piece_id> <platform> <datetime>'
    )
    console.error(
      'Example: npx tsx scripts/schedule-post.ts abc-123 instagram "2026-06-10T14:00:00Z"'
    )
    process.exit(1)
  }

  if (!['instagram', 'linkedin', 'tiktok', 'twitter'].includes(platform)) {
    console.error('Platform must be one of: instagram, linkedin, tiktok, twitter')
    process.exit(1)
  }

  const scheduledDate = new Date(scheduledFor)
  if (isNaN(scheduledDate.getTime())) {
    console.error('Invalid datetime format. Use ISO 8601: 2026-06-10T14:00:00Z')
    process.exit(1)
  }

  const { data: content } = await supabase
    .from('marketing_content_pieces')
    .select('id, title')
    .eq('id', contentPieceId)
    .single()

  if (!content) {
    console.error(`Content piece not found: ${contentPieceId}`)
    process.exit(1)
  }

  const { data, error } = await supabase
    .from('marketing_social_posts')
    .insert({
      content_piece_id: contentPieceId,
      platform,
      status: 'scheduled',
      scheduled_for: scheduledFor,
    })
    .select('id')
    .single()

  if (error) {
    console.error('Failed to schedule post:', error.message)
    process.exit(1)
  }

  await supabase
    .from('marketing_content_pieces')
    .update({ status: 'scheduled' })
    .eq('id', contentPieceId)

  console.log('Post scheduled successfully')
  console.log(`  Content: ${content.title}`)
  console.log(`  Platform: ${platform}`)
  console.log(`  Scheduled for: ${scheduledDate.toLocaleString('pt-BR')}`)
  console.log(`  Post ID: ${data.id}`)
}

main().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
