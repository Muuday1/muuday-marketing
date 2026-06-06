/**
 * Analytics tracking utilities.
 * Uses Mixpanel as primary analytics provider.
 * PostHog kept as fallback for product analytics.
 */

import { env } from '@/config/env'
import {
  initMixpanel,
  trackEvent as trackMixpanel,
  identifyUser as identifyMixpanel,
  setUserProfile,
  resetIdentity,
  trackPageView as trackMixpanelPageView,
  trackContentGenerated as trackMixpanelContentGenerated,
  trackAdSpendChange as trackMixpanelAdSpendChange,
  trackSignupCompleted,
  trackNewsletterSubscribed,
  trackCommunityJoined,
} from './mixpanel'

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

if (typeof window !== 'undefined') {
  initMixpanel()
  initPostHog()
}

/**
 * Track a user action.
 * Sends to Mixpanel (primary) + PostHog (fallback).
 * Never send PII.
 */
export function trackEvent(event: string, properties?: EventProperties): void {
  // Primary: Mixpanel
  trackMixpanel(event, properties)

  // Fallback: PostHog
  if (posthogInstance) {
    posthogInstance.capture(event, properties ?? {})
  } else if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${event}`, properties)
  }
}

/**
 * Identify a user by their hashed ID.
 */
export function identifyUser(userId: string): void {
  identifyMixpanel(userId)

  if (posthogInstance) {
    posthogInstance.identify(userId)
  }
}

/**
 * Set user profile properties.
 */
export function setProfile(properties: Record<string, unknown>): void {
  setUserProfile(properties)
}

/**
 * Reset identity on logout.
 */
export function resetUser(): void {
  resetIdentity()

  if (posthogInstance) {
    posthogInstance.reset()
  }
}

/**
 * Track page views.
 */
export function trackPageView(path: string): void {
  trackMixpanelPageView(path)
}

/**
 * Track content generation events.
 */
export function trackContentGenerated(format: string, platform: string): void {
  trackMixpanelContentGenerated(format, platform)
}

/**
 * Track Meta Ads spend changes.
 */
export function trackAdSpendChange(campaignId: string, newSpend: number): void {
  trackMixpanelAdSpendChange(campaignId, newSpend)
}

// Re-export for convenience
export { trackSignupCompleted, trackNewsletterSubscribed, trackCommunityJoined }
