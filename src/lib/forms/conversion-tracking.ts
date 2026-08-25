/**
 * Google Ads enhanced-conversion signals, pushed through the GTM dataLayer.
 *
 * Enhanced conversions let Google match a conversion to a signed-in Google
 * account using first-party data the visitor already gave us. We push the
 * email under `user_data` at the moment a form submit succeeds; the GTM
 * container reads it with a User-Provided Data variable and hashes it
 * before anything leaves the browser.
 *
 * Client-only: writes to `window.dataLayer`.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export type ConversionEvent = 'contact_form_submitted' | 'audit_lead_submitted'

export function pushLeadConversion(event: ConversionEvent, email: string) {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event,
    user_data: {
      // Google's matching requires normalized input: trimmed and lowercased.
      email: email.trim().toLowerCase(),
    },
  })
}
