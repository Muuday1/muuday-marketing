/**
 * Analytics tracking utilities.
 * Uses PostHog for product analytics with safe fallback.
 */

import { env } from '@/config/env'

interface EventProperties {
  [key: string]: string | number | boolean | null
}

let posthogInstance: import('posthog-js').PostHog | null = null
let posthogReady = false

function initPostHog() {
  if (typeof window === 'undefined') return
  if (posthogReady) return

  if (!env.NEXT_PUBLIC_POSTHOG_KEY || env.NEXT_PUBLIC_POSTHOG_KEY === 'phc_dummy') {
    posthogReady = true
    return
  }

  import('posthog-js')
    .then((posthog) => {
      posthog.default.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
        capture_pageview: false,
        loaded: (ph) => {
          if (process.env.NODE_ENV === 'development') ph.debug()
        },
      })
      posthogInstance = posthog.default
      posthogReady = true
    })
    .catch(() => {
      posthogReady = true
    })
}

// Initialize on module load (client-side only)
if (typeof window !== 'undefined') {
  initPostHog()
}

/**
 * Track a user action.
 * Never send PII (emails, names, phone numbers).
 */
export function trackEvent(event: string, properties?: EventProperties): void {
  if (posthogInstance) {
    posthogInstance.capture(event, properties ?? {})
  } else if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${event}`, properties)
  }
}

/**
 * Identify a user by their hashed ID.
 * Never use raw email or personal info.
 */
export function identifyUser(userId: string): void {
  if (posthogInstance) {
    posthogInstance.identify(userId)
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
