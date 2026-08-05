/**
 * Campaign, session, and device context attached to every form submission.
 *
 * Shared by the Opportunity Audit and the contact form so both land in the
 * portal's `form_submissions` table with an identical envelope. See
 * `docs/prds/005-form-submissions/README.md` for the wire contract.
 *
 * Client-only: reads `window`, `document`, and the PostHog browser client.
 */
import posthog from 'posthog-js'
import {
  hasCampaign,
  nullable,
  parseCampaignParams,
  readStoredAttribution,
  type CampaignParams,
} from './attribution-store'

export type ViewportClass = 'mobile' | 'tablet' | 'desktop'

export interface SubmissionAttribution {
  utmSource: string | null
  utmMedium: string | null
  utmCampaign: string | null
  utmTerm: string | null
  utmContent: string | null
  gclid: string | null
  referrer: string | null
  landingPath: string | null
}

/** `userAgent` is filled in server-side from the request header, never here. */
export interface SubmissionClientInfo {
  viewport: ViewportClass | null
  screenWidth: number | null
  timezone: string | null
  language: string | null
}

export interface SubmissionAnalytics {
  posthogDistinctId: string | null
  posthogSessionId: string | null
  posthogReplayUrl: string | null
}

export interface SubmissionContext {
  attribution: SubmissionAttribution
  client: SubmissionClientInfo
}

const EMPTY_ATTRIBUTION: SubmissionAttribution = {
  utmSource: null,
  utmMedium: null,
  utmCampaign: null,
  utmTerm: null,
  utmContent: null,
  gclid: null,
  referrer: null,
  landingPath: null,
}

const EMPTY_CLIENT: SubmissionClientInfo = {
  viewport: null,
  screenWidth: null,
  timezone: null,
  language: null,
}

export const EMPTY_ANALYTICS: SubmissionAnalytics = {
  posthogDistinctId: null,
  posthogSessionId: null,
  posthogReplayUrl: null,
}

function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

function classifyViewport(width: number): ViewportClass {
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

/**
 * Snapshot campaign, referrer, and device context from the current page.
 *
 * Attribution resolves as **current URL → stored first touch → null**, the
 * stored record coming from `<AttributionCapture />`. That fallback is the whole
 * point: the ads land on `/` but conversions happen on `/audit` and `/contact`,
 * so by the time this runs the URL is usually bare.
 *
 * The campaign block resolves as a unit rather than field by field. Pairing a
 * `utm_source` read off this URL with a `gclid` left over from an older visit
 * would describe a campaign that never ran.
 */
export function collectSubmissionContext(): SubmissionContext {
  if (!isBrowser()) {
    return { attribution: EMPTY_ATTRIBUTION, client: EMPTY_CLIENT }
  }

  const urlCampaign = parseCampaignParams(window.location.search)

  // A URL carrying campaign params describes this visit directly and wins;
  // otherwise the stored record supplies the whole first-touch block.
  const firstTouch = hasCampaign(urlCampaign) ? null : readStoredAttribution()
  const campaign: CampaignParams = firstTouch ?? urlCampaign

  const width = window.innerWidth || window.screen?.width || 0

  let timezone: string | null = null
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? null
  } catch {
    timezone = null
  }

  return {
    attribution: {
      utmSource: campaign.utmSource,
      utmMedium: campaign.utmMedium,
      utmCampaign: campaign.utmCampaign,
      utmTerm: campaign.utmTerm,
      utmContent: campaign.utmContent,
      gclid: campaign.gclid,
      // Both follow the campaign block's source, so all eight fields describe
      // the same visit. `landingPath` now means the page the visitor arrived
      // on, not the page they happened to submit from.
      referrer: firstTouch?.referrer ?? nullable(document.referrer),
      landingPath: firstTouch?.landingPath ?? window.location.pathname,
    },
    client: {
      viewport: width ? classifyViewport(width) : null,
      screenWidth: window.screen?.width ?? null,
      timezone,
      language: nullable(navigator.language),
    },
  }
}

/**
 * PostHog ids, read defensively. The client is a no-op singleton when
 * `NEXT_PUBLIC_POSTHOG_KEY` is unset (as in local dev), and these getters can
 * throw before `init` has run.
 */
export function readSubmissionAnalytics(): SubmissionAnalytics {
  if (!isBrowser()) return EMPTY_ANALYTICS

  const safely = <T>(read: () => T): T | null => {
    try {
      return read() ?? null
    } catch {
      return null
    }
  }

  return {
    posthogDistinctId: safely(() => posthog.get_distinct_id()),
    posthogSessionId: safely(() => posthog.get_session_id()),
    posthogReplayUrl: safely(() => posthog.get_session_replay_url()),
  }
}

/**
 * A v4 UUID. The portal validates this strictly, so the fallback for non-secure
 * contexts (where `crypto.randomUUID` is undefined) must still produce a
 * structurally valid 8-4-4-4-12 v4: four hex chars per group, version nibble 4,
 * variant nibble 8-b. Not cryptographically random, but well-formed.
 */
export function createSubmissionId(): string {
  if (isBrowser() && typeof crypto?.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  const hex4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .slice(1)

  return [
    `${hex4()}${hex4()}`,
    hex4(),
    `4${hex4().slice(1)}`,
    `a${hex4().slice(1)}`,
    `${hex4()}${hex4()}${hex4()}`,
  ].join('-')
}
