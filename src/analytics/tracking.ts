/**
 * Analytics tracking utilities.
 * Mixpanel is the primary (and only) analytics provider for the marketing machine.
 * PostHog is intentionally NOT used here — it belongs to the muuday-app product.
 */

import {
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

/**
 * Track a user action.
 * Sends to Mixpanel only. Never send PII.
 */
export function trackEvent(event: string, properties?: EventProperties): void {
  trackMixpanel(event, properties)
}

/**
 * Identify a user by their hashed ID.
 */
export function identifyUser(userId: string): void {
  identifyMixpanel(userId)
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
