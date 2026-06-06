#!/usr/bin/env tsx
/**
 * Publish all social posts that are scheduled for now or earlier.
 * Run via cron: every 15 minutes
 */

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { publishContent } from '../src/publisher/social-publisher'
import { ContentPiece } from '../src/types'

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
  const now = new Date().toISOString()

  const { data: posts, error } = await supabase
    .from('marketing_social_posts')
    .select('id, platform, scheduled_for, content_piece_id')
    .eq('status', 'scheduled')
    .lte('scheduled_for', now)

  if (error) {
    console.error('Failed to fetch scheduled posts:', error.message)
    process.exit(1)
  }

  if (!posts || posts.length === 0) {
    console.log('No posts due for publishing')
    return
  }

  console.log(`${posts.length} post(s) due for publishing`)

  for (const post of posts) {
    const { data: content } = await supabase
      .from('marketing_content_pieces')
      .select('*')
      .eq('id', post.content_piece_id)
      .single()

    if (!content) {
      console.error('Content piece not found for post', post.id)
      await supabase
        .from('marketing_social_posts')
        .update({ status: 'failed', error_message: 'Content piece not found' })
        .eq('id', post.id)
      continue
    }

    const result = await publishContent(
      content as ContentPiece,
      post.platform as 'instagram' | 'linkedin' | 'tiktok'
    )

    if (result.success && result.data) {
      await supabase
        .from('marketing_social_posts')
        .update({
          status: 'published',
          published_at: new Date().toISOString(),
          external_post_id: result.data.postId,
        })
        .eq('id', post.id)

      await supabase
        .from('marketing_content_pieces')
        .update({ status: 'published', published_at: new Date().toISOString() })
        .eq('id', post.content_piece_id)

      console.log('Published to', post.platform, ':', result.data.url)
    } else {
      await supabase
        .from('marketing_social_posts')
        .update({ status: 'failed', error_message: result.error })
        .eq('id', post.id)

      console.error('Failed to publish to', post.platform, ':', result.error)
    }
  }
}

main().catch((err) => {
  console.error('Unexpected error:', err)
  process.exit(1)
})
