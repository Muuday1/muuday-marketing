'use client'

import { useEffect } from 'react'
import { initMixpanel } from '@/analytics/mixpanel'

/**
 * Initializes analytics SDKs on the client side.
 * Place once in the root layout.
 */
export function AnalyticsInit() {
  useEffect(() => {
    initMixpanel()
  }, [])

  return null
}
