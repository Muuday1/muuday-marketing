import { env } from '@/config/env'
import { ApiResult } from '@/types'

interface InstagramPublishInput {
  caption: string
  imageUrls: string[] // Array of PNG URLs (must be publicly accessible)
}

/**
 * Publish a carousel to Instagram using Meta Graph API.
 * Requires: META_ACCESS_TOKEN, INSTAGRAM_BUSINESS_ACCOUNT_ID
 *
 * Steps:
 * 1. Upload each image → get media container ID
 * 2. Create carousel container → get creation ID
 * 3. Publish creation
 */
export async function publishToInstagram(
  input: InstagramPublishInput
): Promise<ApiResult<{ postId: string }>> {
  // Validate credentials
  if (!env.META_ACCESS_TOKEN || env.META_ACCESS_TOKEN === 'dummy') {
    return {
      success: false,
      error: 'META_ACCESS_TOKEN not configured. Set up Meta credentials first.',
    }
  }
  if (!env.INSTAGRAM_BUSINESS_ACCOUNT_ID) {
    return {
      success: false,
      error: 'INSTAGRAM_BUSINESS_ACCOUNT_ID not configured.',
    }
  }

  const accessToken = env.META_ACCESS_TOKEN
  const accountId = env.INSTAGRAM_BUSINESS_ACCOUNT_ID

  try {
    // Step 1: Create media containers for each image
    const mediaIds: string[] = []
    for (const imageUrl of input.imageUrls) {
      const mediaRes = await fetch(
        `https://graph.facebook.com/v18.0/${accountId}/media?` +
          new URLSearchParams({
            image_url: imageUrl,
            access_token: accessToken,
            is_carousel_item: 'true',
          }),
        { method: 'POST' }
      )

      const mediaData = await mediaRes.json()
      if (!mediaRes.ok || !mediaData.id) {
        return {
          success: false,
          error: `Failed to create media container: ${mediaData.error?.message || JSON.stringify(mediaData)}`,
        }
      }
      mediaIds.push(mediaData.id)
    }

    // Step 2: Create carousel container
    const carouselRes = await fetch(
      `https://graph.facebook.com/v18.0/${accountId}/media?` +
        new URLSearchParams({
          caption: input.caption,
          media_type: 'CAROUSEL',
          children: mediaIds.join(','),
          access_token: accessToken,
        }),
      { method: 'POST' }
    )

    const carouselData = await carouselRes.json()
    if (!carouselRes.ok || !carouselData.id) {
      return {
        success: false,
        error: `Failed to create carousel: ${carouselData.error?.message || JSON.stringify(carouselData)}`,
      }
    }

    // Step 3: Publish
    const publishRes = await fetch(
      `https://graph.facebook.com/v18.0/${accountId}/media_publish?` +
        new URLSearchParams({
          creation_id: carouselData.id,
          access_token: accessToken,
        }),
      { method: 'POST' }
    )

    const publishData = await publishRes.json()
    if (!publishRes.ok || !publishData.id) {
      return {
        success: false,
        error: `Failed to publish: ${publishData.error?.message || JSON.stringify(publishData)}`,
      }
    }

    return { success: true, data: { postId: publishData.id } }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return { success: false, error: `Instagram publish failed: ${message}` }
  }
}
