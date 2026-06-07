import { supabaseServer } from '@/lib/supabase/server'
import { publishToInstagram } from './instagram'

interface PublishResult {
  postId: string
  platform: string
}

export async function publishDuePosts(): Promise<{
  published: PublishResult[]
  failed: { id: string; error: string }[]
}> {
  const { data: scheduledPosts, error } = await supabaseServer
    .from('marketing_social_posts')
    .select('*, marketing_content_pieces(*)')
    .eq('status', 'scheduled')
    .lte('scheduled_for', new Date().toISOString())

  if (error) {
    throw new Error(`Error fetching scheduled posts: ${error.message}`)
  }

  const published: PublishResult[] = []
  const failed: { id: string; error: string }[] = []

  if (!scheduledPosts || scheduledPosts.length === 0) {
    return { published, failed }
  }

  for (const post of scheduledPosts) {
    const content = post.marketing_content_pieces
    if (!content) {
      failed.push({ id: post.id, error: 'No content found' })
      continue
    }

    const copy = JSON.parse(content.content || '{}')
    const imageUrls: string[] = content.metadata?.imageUrls || []
    const caption = `${copy.body}\n\n${copy.cta}\n\n${(copy.hashtags || []).join(' ')}`

    let result: { success: boolean; error?: string; data?: { postId: string } }

    if (post.platform === 'instagram') {
      result = await publishToInstagram({ caption, imageUrls })
    } else {
      failed.push({ id: post.id, error: `Platform ${post.platform} not supported` })
      continue
    }

    if (result.success) {
      await supabaseServer
        .from('marketing_social_posts')
        .update({
          status: 'published',
          external_post_id: result.data?.postId,
          published_at: new Date().toISOString(),
        })
        .eq('id', post.id)

      await supabaseServer
        .from('marketing_content_pieces')
        .update({ status: 'published', published_at: new Date().toISOString() })
        .eq('id', content.id)

      published.push({ postId: result.data!.postId, platform: post.platform })
    } else {
      await supabaseServer
        .from('marketing_social_posts')
        .update({ status: 'failed', error_message: result.error })
        .eq('id', post.id)

      failed.push({ id: post.id, error: result.error || 'Unknown error' })
    }
  }

  return { published, failed }
}
