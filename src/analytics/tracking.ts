/**
 * Analytics tracking utilities.
 * Uses PostHog for product analytics.
 * Stub implementation — integrate real PostHog SDK in production.
 */

interface EventProperties {
  [key: string]: string | number | boolean | null
}

/**
 * Track a user action.
 * Never send PII (emails, names, phone numbers).
 */
export function trackEvent(event: string, properties?: EventProperties): void {
  if (typeof window === 'undefined') return

  // TODO: Replace with PostHog or Mixpanel
  console.log(`[Analytics] ${event}`, properties)
}

/**
 * Identify a user by their hashed ID.
 * Never use raw email or personal info.
 */
export function identifyUser(userId: string): void {
  if (typeof window === 'undefined') return

  // TODO: Replace with PostHog identify
  console.log(`[Analytics] Identify: ${userId}`)
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
