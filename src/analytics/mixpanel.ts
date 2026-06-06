/**
 * Mixpanel analytics initialization and helpers.
 * Client-side only. Never run on server.
 */

import mixpanel from 'mixpanel-browser'
import { env } from '@/config/env'

let initialized = false

/**
 * Initialize Mixpanel SDK.
 * Call once on app mount (client-side only).
 */
export function initMixpanel(): void {
  if (typeof window === 'undefined') return
  if (initialized) return

  const token = env.NEXT_PUBLIC_MIXPANEL_TOKEN
  if (!token || token === 'dummy') {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Mixpanel] Token not configured, tracking disabled')
    }
    return
  }

  mixpanel.init(token, {
    debug: process.env.NODE_ENV === 'development',
    track_pageview: false,
    persistence: 'localStorage',
    batch_requests: true,
    loaded: (mp) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('[Mixpanel] Initialized')
      }
      // Set super properties on every event
      mp.register({
        platform: 'web',
        app_version: env.NEXT_PUBLIC_APP_VERSION,
        project: 'marketing',
      })
    },
  })

  initialized = true
}

/**
 * Track an event.
 * Never send PII (emails, names, phone numbers).
 */
export function trackEvent(
  event: string,
  properties?: Record<string, string | number | boolean | null>
): void {
  if (typeof window === 'undefined') return
  if (!initialized) initMixpanel()
  if (!initialized) return // Still not initialized (token missing)

  mixpanel.track(event, properties ?? {})
}

/**
 * Identify a user by their hashed ID.
 * Never use raw email or personal info.
 */
export function identifyUser(userId: string): void {
  if (typeof window === 'undefined') return
  if (!initialized) initMixpanel()
  if (!initialized) return

  mixpanel.identify(userId)
}

/**
 * Set user profile properties.
 * Only for identified users.
 */
export function setUserProfile(properties: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  if (!initialized) initMixpanel()
  if (!initialized) return

  mixpanel.people.set(properties)
}

/**
 * Reset identity on logout.
 */
export function resetIdentity(): void {
  if (typeof window === 'undefined') return
  if (!initialized) initMixpanel()
  if (!initialized) return

  mixpanel.reset()
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

/**
 * Track signup completion.
 */
export function trackSignupCompleted(method: string): void {
  trackEvent('sign_up_completed', {
    sign_up_method: method,
    platform: 'web',
  })
}

/**
 * Track newsletter subscription.
 */
export function trackNewsletterSubscribed(source: string): void {
  trackEvent('newsletter_subscribed', {
    source,
    platform: 'web',
  })
}

/**
 * Track community join.
 */
export function trackCommunityJoined(country: string): void {
  trackEvent('community_joined', {
    country,
    platform: 'web',
  })
}
