/**
 * Analytics tracking utilities.
 * Uses PostHog for product analytics with safe fallback.
 */

import { env } from '@/config/env'

interface EventProperties {
  [key: string]: string | number | boolean | null
}

let posthogInstance: typeof import('posthog-js').default | null = null

async function getPostHog() {
  if (typeof window === 'undefined') return null
  if (posthogInstance) return posthogInstance

  if (!env.NEXT_PUBLIC_POSTHOG_KEY || env.NEXT_PUBLIC_POSTHOG_KEY === 'phc_dummy') {
    return null
  }

  try {
    const posthog = await import('posthog-js')
    posthog.default.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      capture_pageview: false,
      loaded: (ph) => {
        if (process.env.NODE_ENV === 'development') ph.debug()
      },
    })
    posthogInstance = posthog.default
    return posthogInstance
  } catch {
    return null
  }
}

/**
 * Track a user action.
 * Never send PII (emails, names, phone numbers).
 */
export async function trackEvent(event: string, properties?: EventProperties): Promise<void> {
  const ph = await getPostHog()
  if (ph) {
    ph.capture(event, properties ?? {})
  } else if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${event}`, properties)
  }
}

/**
 * Identify a user by their hashed ID.
 * Never use raw email or personal info.
 */
export async function identifyUser(userId: string): Promise<void> {
  const ph = await getPostHog()
  if (ph) {
    ph.identify(userId)
  } else if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] Identify: ${userId}`)
  }
}

/**
 * Track page views.
 */
export function trackPageView(path: string): void {
  trackEvent('page_view', { path })
}

/**
 * Track content generation events.
 */
export function trackContentGenerated(format: string, platform: string): void {
  trackEvent('content_generated', { format, platform })
}

/**
 * Track Meta Ads spend changes.
 */
export function trackAdSpendChange(campaignId: string, newSpend: number): void {
  trackEvent('ad_spend_changed', { campaign_id: campaignId, new_spend: newSpend })
}
