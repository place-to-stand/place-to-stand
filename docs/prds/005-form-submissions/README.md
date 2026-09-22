# 005 — Marketing form submissions to the portal

## Why

Both marketing forms used to POST to the portal's `/api/integrations/leads-intake`, creating a row in
the `leads` table on final submit only. That meant:

- everyone who abandoned the Opportunity Audit mid-wizard was invisible
- the scored audit result was flattened into a free-text `message` field and could not be queried
- no UTM attribution or PostHog linkage was captured for either form

Now every audit attempt is pushed as it progresses, both forms land in the portal's `form_submissions`
table, and leads are promoted from **Sales → Submissions** by hand. The `leads-intake` POST is gone from
both actions.

## What was built

| File | Role |
|---|---|
| `src/lib/forms/context.ts` | Shared envelope: UTM/referrer, device/locale, PostHog ids, UUID minting |
| `src/lib/forms/portal.ts` | Server-only endpoint resolution and best-effort POST. Holds the tokens |
| `src/lib/forms/contact-payload.ts` | Contact wire contract and builder |
| `src/lib/audit/session.ts` | Audit session identity, localStorage persistence, TTL, resume gate |
| `src/lib/audit/progress-payload.ts` | Audit wire contract and builder |
| `src/lib/audit/track-progress.ts` | Browser transport: `sendBeacon`, or `fetch` with `keepalive` |
| `app/api/audit-progress/route.ts` | Same-origin proxy. Validates, injects user agent, forwards |
| `src/hooks/use-audit.ts` | Orchestrates the audit session and its pushes |
| `src/lib/audit/summarize-answers.ts` | `describeAnswers()` resolves option ids to labels, shared with the emails |

### Why the audit needs a proxy route and contact does not

`navigator.sendBeacon` cannot set request headers, so it can never carry the bearer token, and shipping
the token to the browser would publish a portal secret in the JS bundle. The audit therefore beacons to
a same-origin marketing route, which adds the token server-side:

```
browser ──sendBeacon──▶ marketing /api/audit-progress ──fetch + Bearer──▶ portal
```

The contact form is already a server action, so it posts to the portal directly. Its client half only
gathers the browser-side context (PostHog ids, UTM params, screen metrics) and hands it to the action.

Both paths set `client.userAgent` from the incoming request header rather than `navigator.userAgent`.

### When the audit pushes

| Trigger | Status | Fired from |
|---|---|---|
| `started` | `in_progress` | `start()` |
| `step_completed` | `in_progress` | `completeStep()`, once per wizard section |
| `scored` | `completed` | `submit()`, after the engine runs |
| `captured` | `captured` | `markCaptured()`, after the email form succeeds |
| `abandoned` | `abandoned` | `reset()`, only when leaving from the wizard |
| `pagehide` | `in_progress` | Beacon on tab close, only if answers changed since the last push |

`pagehide` deliberately does not claim `abandoned`: a tab switch is indistinguishable from a close. The
portal infers real abandonment from `in_progress` plus a stale `updatedAt`.

### Sender obligations, and how they are met

The contract names three things the portal cannot do for us:

1. **Stable `sessionId` for the whole session.** Minted once in `createAuditSession()` and persisted to
   `localStorage` under `pts_audit_session_v1`. A refresh restores the same id, so resuming updates one
   row rather than creating a second.
2. **Monotonically increasing `updatedAt`.** Stamped in `commit()` at the moment of the change, which is
   immediately before the push. Never taken from render state.
3. **`responses` is always the full question set.** `describeAnswers()` maps over all of `QUESTIONS`, not
   just the answered ones, emitting `value: null` for the rest.

### Resume

The session is mirrored to `localStorage` on every answer. On mount the hook restores it if the status is
`in_progress`, it has at least one answer, and it is under the 7 day TTL. Reading it through
`useSyncExternalStore` with a null server snapshot is what lets a client-only value participate in the
server-rendered tree without a hydration mismatch.

## Environment

| Variable | Purpose |
|---|---|
| `PORTAL_API_BASE_URL` | Portal host, e.g. `https://portal.placetostandagency.com`. Paths are appended |
| `AUDIT_INTAKE_TOKEN` | Bearer token for `/api/integrations/audit-responses` |
| `CONTACT_INTAKE_TOKEN` | Bearer token for `/api/integrations/contact-submissions` |

`PORTAL_LEADS_ENDPOINT` and `PORTAL_LEADS_TOKEN` are no longer read by any code and should be removed
from Vercel after the cutover.

Leave all three unset in local development. Both paths then log the payload to the server console
instead of forwarding it and report success, so the whole flow is verifiable with no portal running.
In production an unset value is an error the visitor sees, because nothing else delivers the message.

## Failure handling

**Superseded in September 2026 by portal PRD 008 (form email consolidation).** This site no longer
sends email. Both form submissions now go to the portal with `deliver: true`, and the portal records
the row and then sends the team notification and the visitor's confirmation, and handles the
marketing-audience opt-in.

- **Form submissions are awaited and gate success.** `submitToPortal` reports `portal_rejected` or
  `portal_unreachable`, and the visitor sees an error pointing at hello@placetostandagency.com. The
  portal records before it sends, so a mail-provider outage delays an email rather than losing the
  enquiry; a visitor only sees a failure when the portal itself did not accept the request.
- **Audit progress beacons stay best-effort.** `postToPortal` still logs and continues.
- **The audit's `captured` push moved out of the beacon** and into the BotID-gated `sendAudit`
  action. The beacon route is unauthenticated, and `captured` + `deliver` is what makes the portal
  email a visitor-supplied address, so `auditBeaconSchema` refuses `captured`, nulls any lead, and
  strips `deliver`. See `src/lib/audit/progress-schema.ts`.

`RESEND_API_KEY` and `RESEND_AUDIENCE_ID` are no longer read and should be removed from Vercel after
the cutover has been quiet for a week.

## Known limitations

- **UTM attribution is last-touch at collection time.** The params are read from the URL when the audit
  starts or the contact form is submitted. Someone who lands on `/?utm_source=x` and then navigates
  before converting arrives with a bare URL and loses their attribution. Site-wide first-touch capture is
  a separate change.
- **No consent gate.** Submissions are captured for anonymous visitors with no opt-in prompt, matching
  how PostHog already behaves on this site. `app/privacy/page.tsx` does not currently describe this
  collection.
- **Beacons are unacknowledged.** A `pagehide` push the browser drops is simply lost; there is no retry.
  The next push recovers the state, but a true tab-close has no next push.
