/**
 * First-touch attribution, captured on landing and preserved across navigation.
 *
 * The problem this exists to solve: our ads point at `/`, but conversions happen
 * on `/audit` and `/contact`. Reading `window.location.search` at submit time
 * therefore sees a bare URL and records nothing, so paid attribution was lost on
 * essentially every campaign visit. See
 * `docs/prds/006-first-touch-attribution/README.md`.
 *
 * `<AttributionCapture />` calls `captureAttribution()` on every page load and
 * client-side route change; `collectSubmissionContext()` reads the result back.
 *
 * Client-only, and every storage call is defensive: Safari private mode throws
 * on `setItem`, and a storage failure must never break a page render.
 */

export const ATTRIBUTION_KEY = 'pts_attribution_v1'

/**
 * A conventional paid lookback window. Long enough to attribute the visitor who
 * clicks an ad, leaves, and converts days later; short enough to bound how stale
 * a first touch can get.
 */
export const ATTRIBUTION_TTL_MS = 30 * 24 * 60 * 60 * 1000

/** The six campaign fields, always resolved together. */
export interface CampaignParams {
  utmSource: string | null
  utmMedium: string | null
  utmCampaign: string | null
  utmTerm: string | null
  utmContent: string | null
  gclid: string | null
}

export interface StoredAttribution extends CampaignParams {
  /** `document.referrer` at first touch. */
  referrer: string | null
  /** Pathname at first touch, i.e. the page the visitor actually landed on. */
  landingPath: string | null
  /** ISO 8601. Drives the TTL. */
  capturedAt: string
}

function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

/** Empty string and whitespace both mean "not present" for our purposes. */
export function nullable(value: string | null | undefined): string | null {
  const trimmed = value?.trim()
  return trimmed ? trimmed : null
}

/** Read a field off untrusted parsed JSON without letting non-strings through. */
function storedField(
  record: Record<string, unknown>,
  key: string
): string | null {
  const value = record[key]
  return typeof value === 'string' ? nullable(value) : null
}

export function parseCampaignParams(search: string): CampaignParams {
  const params = new URLSearchParams(search)

  return {
    utmSource: nullable(params.get('utm_source')),
    utmMedium: nullable(params.get('utm_medium')),
    utmCampaign: nullable(params.get('utm_campaign')),
    utmTerm: nullable(params.get('utm_term')),
    utmContent: nullable(params.get('utm_content')),
    gclid: nullable(params.get('gclid')),
  }
}

/** Whether a URL says anything at all about where the visitor came from. */
export function hasCampaign(campaign: CampaignParams): boolean {
  return Object.values(campaign).some(value => value !== null)
}

/** The stored first touch, or null when absent, unreadable, or past the TTL. */
export function readStoredAttribution(): StoredAttribution | null {
  if (!isBrowser()) return null

  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_KEY)
    if (!raw) return null

    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null

    const record = parsed as Record<string, unknown>
    const capturedAt = record.capturedAt
    if (typeof capturedAt !== 'string') return null

    const age = Date.now() - new Date(capturedAt).getTime()
    if (!Number.isFinite(age) || age > ATTRIBUTION_TTL_MS) {
      removeStoredAttribution()
      return null
    }

    return {
      utmSource: storedField(record, 'utmSource'),
      utmMedium: storedField(record, 'utmMedium'),
      utmCampaign: storedField(record, 'utmCampaign'),
      utmTerm: storedField(record, 'utmTerm'),
      utmContent: storedField(record, 'utmContent'),
      gclid: storedField(record, 'gclid'),
      referrer: storedField(record, 'referrer'),
      landingPath: storedField(record, 'landingPath'),
      capturedAt,
    }
  } catch {
    return null
  }
}

function writeStoredAttribution(attribution: StoredAttribution): void {
  if (!isBrowser()) return

  try {
    window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution))
  } catch {
    // Private mode, quota exceeded, or storage disabled. Attribution falls back
    // to whatever the submitting page's own URL carries, which is exactly the
    // behaviour that shipped before this module existed.
  }
}

function removeStoredAttribution(): void {
  if (!isBrowser()) return

  try {
    window.localStorage.removeItem(ATTRIBUTION_KEY)
  } catch {
    // Nothing useful to do here.
  }
}

/**
 * Record the first touch for this visitor, if this page load is one.
 *
 * Three cases, in order:
 *
 * 1. The URL carries a campaign param — write, overwriting whatever was stored.
 *    A fresh ad click is newer and better information than a month-old touch.
 * 2. Nothing stored, or the stored record has expired — write a record with null
 *    campaign fields, so an organic first touch still gets a referrer and a
 *    landing path.
 * 3. Otherwise leave it alone. This is the case that fixes the bug: navigating
 *    `/` → `/audit` must not clobber the campaign data captured on `/`.
 */
export function captureAttribution(search: string, pathname: string): void {
  if (!isBrowser()) return

  const campaign = parseCampaignParams(search)

  // `readStoredAttribution` clears an expired record and reports null, so case 2
  // falls through to the write below.
  if (!hasCampaign(campaign) && readStoredAttribution() !== null) return

  writeStoredAttribution({
    ...campaign,
    referrer: nullable(document.referrer),
    landingPath: nullable(pathname) ?? nullable(window.location.pathname),
    capturedAt: new Date().toISOString(),
  })
}
