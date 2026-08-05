# 006 — First-touch attribution capture

**Status:** planned, not implemented. Repo: `place-to-stand` (marketing). No portal changes required.

## Why

Every paid conversion is arriving at the portal with null attribution. The Google Ads tagging is
correct and PostHog receives it in full — we lose it in our own client code between the landing page
and the form.

Evidence, from PostHog (`execute-sql`, 60-day window), for the one campaign session that produced a
captured lead (session `019fc15c-ffac-78ce-bb87-1f56f0df9cb2`, 2026-08-02):

```
07:25:26  $pageview  /?utm_source=google&utm_medium=cpc&utm_campaign=audit-stage1
                      &utm_content=custom-software&gad_source=1&gad_campaignid=24075829112
                      &gclid=CjwKCAjw1bvTBhBb…          referrer: https://www.google.com/
07:25:30  $pageview  /audit                              ← query string gone
07:25:52  $pageview  /?utm_source=google&…
```

The matching `form_submissions` row has `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`,
`utm_content` and `gclid` all null, with `referrer = https://www.google.com/` and
`landing_path = /audit`.

**Mechanism.** `collectSubmissionContext()` (`src/lib/forms/context.ts:97`) reads
`window.location.search` at the moment it is called. For the audit that is `createAuditSession()`
(`src/lib/audit/session.ts:58`), which fires when the visitor starts the wizard on `/audit`; for the
contact form it is `onSubmit` on `/contact`. Neither page carries the query string, because the ad's
Final URL points at `/` and the visitor navigates client-side. `document.referrer` survives SPA
navigation, which is why the referrer field looks healthy and masks the problem.

**Scale.** All 49 campaign sessions in the last 60 days entered on `/`. Not one entered on `/audit` or
`/contact`. So the current code path captures paid attribution essentially never.

This is the limitation already named in `docs/prds/005-form-submissions/README.md` § Known limitations
and in the comment at `src/lib/forms/context.ts:87-90`. This PRD closes it.

## Goals

- Attribution captured at first touch and preserved across any number of client-side navigations.
- Both forms fixed by one change — they already share `collectSubmissionContext()`.
- `landingPath` means the actual landing page, not the page the form happened to sit on.
- No change to the wire contract, so the portal needs no deploy.

## Non-goals

- Multi-touch or channel-attribution modelling. First touch wins; that is all.
- A consent gate (still open from 005).
- Backfilling historical rows (see § Follow-ups).
- Changing the Google Ads Final URL. Worth doing independently and takes a minute, but it is a
  stopgap: it only helps visitors who convert without navigating away, and does nothing for
  `/contact`. It is not a substitute for this change.

## Design

### Storage and lifetime

`localStorage`, key `pts_attribution_v1`, 30-day TTL.

`sessionStorage` would fix the observed failure (same-tab navigation) and is simpler, but it drops the
case worth the most: someone clicks the ad, leaves, returns two days later and converts. That is a
campaign-driven conversion and should be attributed as one. 30 days matches a conventional paid
lookback window and bounds the staleness. The audit already keeps a 7-day localStorage session, so
this is a familiar pattern in the codebase, not a new one.

Stored shape:

```ts
interface StoredAttribution {
  utmSource: string | null
  utmMedium: string | null
  utmCampaign: string | null
  utmTerm: string | null
  utmContent: string | null
  gclid: string | null
  referrer: string | null      // document.referrer at first touch
  landingPath: string | null   // pathname at first touch
  capturedAt: string           // ISO 8601, drives the TTL
}
```

### Write rule

On every page load (including client-side route changes):

1. Parse campaign params from the current URL.
2. **If the URL carries any campaign param** — write, overwriting whatever was stored. A fresh ad
   click is newer and better information than a month-old first touch.
3. **Otherwise, if nothing is stored (or the stored record is past its TTL)** — write a record with
   null campaign fields but a real `referrer` and `landingPath`, so organic first touch is still
   captured.
4. **Otherwise** — leave it alone. This is the case that fixes the bug: navigating `/` → `/audit` must
   not clobber the campaign data captured on `/`.

"Any campaign param" means any of the five `utm_*` or `gclid`. Empty and whitespace-only values do not
count — reuse the existing `nullable()` helper.

### Read precedence

`collectSubmissionContext()` resolves each field as: **current URL → stored → null.**

The current URL still wins when it has params, so a direct-landing conversion behaves exactly as it
does today and the change is a pure superset of current behaviour. `landingPath` comes from the stored
record first, falling back to `window.location.pathname` when nothing is stored — that fallback keeps
the field populated for a visitor whose storage is unavailable.

Resolve the campaign block as a unit, not field by field: if the current URL has any campaign param,
take all six from the URL; otherwise take all six from storage. Mixing a `utm_source` from the URL with
a `gclid` from a different, older visit would fabricate a campaign that never existed.

### Where capture runs

A new client component `<AttributionCapture />` mounted in `app/layout.tsx`, wrapped in its own
`<Suspense>` boundary.

Three constraints drive this:

- It reads `useSearchParams()`, which without a Suspense boundary opts the entire route into
  client-side rendering.
- It must run on the first paint of the first page, before any navigation.
- **It must not live inside `PostHogProvider`.** That component early-returns `<>{children}</>` when
  `NEXT_PUBLIC_POSTHOG_KEY` is unset (`src/components/posthog-provider.tsx:48-50`), which is the case
  in local dev — capture would silently not run there, and the first anyone would notice is null
  attribution in production again. Mount it as a sibling.

`PostHogPageView` in the same file is the closest existing model for the hook usage.

## Changes

| File | Change |
|---|---|
| `src/lib/forms/attribution-store.ts` | **New.** `readStoredAttribution()`, `captureAttribution()`, the TTL constant, the storage key. All storage access wrapped in try/catch, matching `src/lib/audit/session.ts:106-124` — Safari private mode throws on `setItem` and must never break a page render. |
| `src/components/attribution-capture.tsx` | **New.** Client component. `useSearchParams()` + `usePathname()` in a `useEffect` calling `captureAttribution()`. Renders `null`. |
| `app/layout.tsx` | Mount `<Suspense fallback={null}><AttributionCapture /></Suspense>` inside `<body>`, as a sibling of `PostHogProvider`, not a child. |
| `src/lib/forms/context.ts` | `collectSubmissionContext()` merges current URL over stored per § Read precedence. Signature unchanged. Replace the stale limitation comment at lines 84-91 with a description of the precedence rule. |

`src/components/sections/contact-section.tsx` and `src/lib/audit/session.ts` are untouched — they call
`collectSubmissionContext()` and inherit the fix.

## Edge cases

- **In-flight audit sessions.** `createAuditSession()` freezes its context at mint time and
  `localStorage` holds it for 7 days, so audits started before the deploy keep their null attribution
  until they expire. Do **not** bump `AUDIT_SESSION_KEY` to force them out — that would wipe genuine
  in-progress audits to fix at most a handful of rows. It self-heals in a week.
- **Storage refused.** Every read and write is best-effort. With storage unavailable the behaviour
  degrades to exactly what ships today, which is the correct floor.
- **`landingPath` semantics change.** Rows written before this change store the *submission* path;
  rows after store the *landing* path. Same column, two meanings, split at the deploy date. Note it
  wherever the field is analysed. The new meaning is the one the name always implied.
- **The stored `referrer` will differ from today's value** for anyone who lands, leaves the site, and
  returns before converting. First-touch referrer is the intended semantics.

## Testing

Manual, on a preview deploy. Steps 1 and 2 are the regression that matters.

1. Load `/?utm_source=google&utm_medium=cpc&utm_campaign=audit-stage1&gclid=test123`, navigate to
   `/audit` via the nav (not a reload), complete the audit and capture. Portal row must show all four
   values plus `landing_path = /`.
2. Same, but navigate to `/contact` and submit. Same expectation.
3. Land directly on `/audit?utm_source=direct`, convert without navigating. `utm_source = direct` —
   confirms the current-URL path still wins.
4. Complete step 1, then in a fresh tab load `/` bare and convert. Attribution still present from
   storage.
5. With a stored record, load `/?utm_source=second&utm_campaign=other` and convert. New campaign
   overwrites; no mixing with the first.
6. Clear storage, load `/` bare, convert. Campaign fields null, `referrer` and `landing_path`
   populated — no crash, no regression versus today.
7. Safari private browsing, step 1. Audit completes and submits; attribution may be absent.
8. Confirm no hydration warnings in the console and that `/` is still server-rendered — a missing
   Suspense boundary around `useSearchParams` shows up here.

## Follow-ups (separate work, not blocking)

- **Point the Google Ads Final URL at `/audit`.** Independent of this change, no code, starts
  recovering data immediately. See the campaign at `gad_campaignid=24075829112`.
- **Backfill historical rows.** Submissions store `posthog_session_id` and `posthog_distinct_id`, and
  PostHog holds the UTMs and gclid keyed by session id. A one-off script can join on that and populate
  the null columns. Recoverable, small volume.
- **Additional click ids.** `wbraid` / `gbraid` replace `gclid` on iOS Google Ads traffic, so those
  conversions carry no `gclid` at all; `msclkid` and `fbclid` matter if spend ever moves off Google.
  Capturing them needs a column and envelope change in the portal (`packages/db/src/schema.ts`,
  `apps/internal/lib/form-submissions/envelope.ts`) — cross-repo, hence separate.
- **`firstTouchAt` on the wire.** The stored record carries it; the payload has nowhere to put it.
  Adding a column would let analysis separate same-session conversions from delayed ones.
