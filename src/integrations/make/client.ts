import { env } from '@/config/env'
import { ApiResult } from '@/types'

interface MakeWebhookPayload {
  action: string
  [key: string]: unknown
}

/**
 * Trigger a Make.com scenario via webhook.
 * Used to kick off no-code automation flows from code.
 */
export async function triggerMakeWebhook(
  webhookUrl: string,
  payload: MakeWebhookPayload
): Promise<ApiResult<{ message: string }>> {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const error = await response.text()
      return { success: false, error: `Make.com error: ${error}` }
    }

    const data = await response.json()
    return { success: true, data: { message: 'Webhook triggered', ...data } }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return { success: false, error: message }
  }
}

/**
 * Trigger content generation via Make.com.
 */
export async function triggerContentGeneration(topic: string): Promise<ApiResult<unknown>> {
  const webhookUrl = env.MAKE_CONTENT_WEBHOOK_URL
  if (!webhookUrl) {
    return { success: false, error: 'MAKE_CONTENT_WEBHOOK_URL not configured' }
  }

  return triggerMakeWebhook(webhookUrl, {
    action: 'generate_content',
    topic,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Trigger Meta Ads sync via Make.com.
 */
export async function triggerMetaSync(): Promise<ApiResult<unknown>> {
  const webhookUrl = env.MAKE_META_SYNC_WEBHOOK_URL
  if (!webhookUrl) {
    return { success: false, error: 'MAKE_META_SYNC_WEBHOOK_URL not configured' }
  }

  return triggerMakeWebhook(webhookUrl, {
    action: 'meta_sync',
    timestamp: new Date().toISOString(),
  })
}
