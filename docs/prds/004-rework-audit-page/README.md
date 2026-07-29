# PRD 004: Rework `/audit` as Ad Landing Page + Add PostHog Audit Funnel Analytics

## 1. Context

**Landing page problem:** The `/audit` page currently shows a bare intro screen (headline + button). Visitors arriving from paid ads have zero context about Place To Stand — no trust signals, no company info, no reason to engage. The page needs to function as a self-contained landing page that builds trust and converts cold traffic.

**Analytics gap:** The existing PostHog instrumentation covers three moments:
| Event | Where | Properties |
|---|---|---|
| `audit_started` | `useAudit` hook | _(none)_ |
| `audit_step_completed` | `AuditWizard` | `step`, `section` |
| `audit_completed` | `useAudit` hook | `phase`, `top_service` |
| `audit_capture_submitted` | `ResultsView` | `phase` |

This leaves significant blind spots: **no per-question answer tracking**, **no step abandonment events**, **no results-view engagement**, and **no landing-page CTA tracking**. For ad-driven traffic, we need a complete funnel to see where people drop off and what answers they give.

## 2. Design Decisions

| Decision | Choice | Rationale |
|---|---|---|
| **Landing page scope** | Replace `IntroScreen` with a new `AuditLandingContent`; leave `AuditWizard` + `ResultsView` untouched structurally | The wizard and results work well. The gap is the pre-wizard experience. |
| **New component vs. inline** | New `src/components/audit/audit-landing.tsx` | Landing content is substantial enough to warrant its own file. |
| **Reuse existing data** | Import from `src/lib/clients.ts`, `src/lib/team.ts`, `src/lib/services.ts`; reuse `FaqAccordion` from `faq-section.tsx` | Consistent with every other page; no new abstractions needed. |
| **Delete IntroScreen** | Yes | Fully replaced; keeping it creates dead code. |
| **CTA placement** | Two CTAs — one hero-level, one after trust sections | Cold traffic needs CTA visible early and after scrolling trust content. |
| **Content structure** | Hero -> Client trust strip -> Who We Are -> What The Audit Covers -> Services overview -> FAQ -> Final CTA | Proven landing page flow: hook -> credibility -> clarity -> proof -> objections -> action. |
| **Manifesto data** | Inline the facets data in the new component | Short (3 items); avoids coupling two unrelated components. |
| **PostHog tracking approach** | Add events to existing components (`useAudit`, `AuditWizard`, `ResultsView`); no new wrapper components | Follows established pattern (`usePostHog()` hook + `posthog?.capture()`). |
| **Answer tracking** | Fire `audit_answer_selected` on each answer change in `useAudit.setAnswer` | Captures per-question behavior without touching `QuestionField` internals. |
| **Abandonment tracking** | Fire `audit_abandoned` on `reset` when stage is `wizard` (user exits mid-flow) | Captures drop-off point using existing `stepIndex` via new `currentStep` state. |
| **Results tracking** | Fire `audit_results_viewed` on mount of `ResultsView` | Captures whether users actually read their results. |
| **Landing CTA tracking** | Use `posthog?.capture('audit_landing_cta_click', { location })` on both CTA buttons | Tracks which CTA (hero vs. bottom) drives starts for ad-traffic analysis. |

## 3. Architecture Overview

```
app/audit/page.tsx                       <- Updated metadata for ad traffic
  +-- AuditApp                           <- Enhanced with abandonment tracking
        |-- AuditLandingContent (NEW)     <- Full landing page; replaces IntroScreen
        |     |-- Hero block (headline + CTA + highlights)
        |     |-- Client trust strip (logos from src/lib/clients.ts)
        |     |-- Who We Are block (manifesto facets + team from src/lib/team.ts)
        |     |-- What The Audit Covers block
        |     |-- Services overview (from src/lib/services.ts)
        |     |-- FaqAccordion (reused from faq-section.tsx)
        |     +-- Final CTA block
        |-- AuditWizard                  <- Enhanced: answer tracking + abandonment
        +-- ResultsView                  <- Enhanced: results-viewed event

Deleted:
  src/components/audit/intro-screen.tsx

New PostHog events:
  audit_landing_cta_click   { location: 'hero' | 'bottom' }
  audit_answer_selected     { question_id, section_id, value }
  audit_step_viewed         { step, section }
  audit_abandoned           { last_step, last_section, answers_count }
  audit_results_viewed      { phase, recommendations_count }
```

## 4. Implementation Phases

### Phase 1: Create `AuditLandingContent` component

**File created:** `src/components/audit/audit-landing.tsx`

**Props interface:**
```typescript
interface AuditLandingProps {
  onStart: (location: string) => void
}
```

**Blocks included (top to bottom):**

1. **Hero Block** — `bp-label` "Opportunity Audit" + bold headline + subtitle explaining who PTS is and what the audit does + primary CTA button (calls `onStart('hero')`) + highlight pills ("Under 2 minutes", "Free, no obligation", "Personalized recommendations")

2. **Client Trust Strip** — Label "Trusted by" + horizontal logo row for top ~6 clients using `clients` data from `src/lib/clients.ts` + `BlueprintCorners` for visual consistency. Follows the pattern in `client-logos-section.tsx` but compact (single row, no external links needed).

3. **Who We Are Block** — Inline the 3 manifesto facets (Senior Builders, AI-Native, Direct Access) in a blueprint grid. Show team headshots + name/title from `src/lib/team.ts`. Brief intro paragraph establishing credibility.

4. **What The Audit Covers Block** — 4 items in a blueprint grid: "Your business phase", "Top software opportunities", "Where to start first", "Tailored recommendations". Reinforces value prop.

5. **Services Overview Block** — Compact grid from `src/lib/services.ts` showing icon + title + tagline for each service. Label: "What we can build for you".

6. **FAQ Block** — Import and render `FaqAccordion` from `src/components/sections/faq-section.tsx` with heading "Common Questions".

7. **Final CTA Block** — Repeat "Start the audit" button (calls `onStart('bottom')`) + secondary text link to `/contact` using `TrackedLink`.

### Phase 2: Add PostHog tracking to landing page CTAs

Built into `AuditLandingContent` — each CTA button fires `audit_landing_cta_click` with `{ location }` before calling `onStart`.

### Phase 3: Add per-answer PostHog tracking

**File modified:** `src/hooks/use-audit.ts`

The `setAnswer` callback fires `audit_answer_selected` with `{ question_id, value }` on every answer change.

### Phase 4: Add step-viewed and abandonment tracking

**File modified:** `src/components/audit/audit-wizard.tsx`

- `audit_step_viewed` fires via `useEffect` keyed on `stepIndex`

**File modified:** `src/hooks/use-audit.ts`

- `audit_abandoned` fires in `reset` when `stage === 'wizard'`, with `{ answers_count }`

### Phase 5: Add results-viewed tracking

**File modified:** `src/components/audit/results-view.tsx`

- `audit_results_viewed` fires via `useEffect` on mount with `{ phase, recommendations_count, top_service }`

### Phase 6: Update `AuditApp` to use `AuditLandingContent`

**File modified:** `src/components/audit/audit-app.tsx`

- Swapped `IntroScreen` import/usage for `AuditLandingContent`

### Phase 7: Delete `IntroScreen`

**File deleted:** `src/components/audit/intro-screen.tsx`

### Phase 8: Update page metadata for ad traffic

**File modified:** `app/audit/page.tsx`

- Enhanced `metadata` with ad-optimized title, description, openGraph, and twitter
- Adjusted page top padding from `pt-10` to `pt-grid-4`

## 5. Complete PostHog Event Map (after implementation)

| Event | Trigger | Properties | Funnel Position |
|---|---|---|---|
| `$pageview` | Page load | `$current_url` | Entry |
| `scroll_depth` | Scroll thresholds | `depth`, `path` | Engagement |
| `audit_landing_cta_click` | **NEW** — CTA button on landing | `location` (`'hero'` / `'bottom'`) | Pre-funnel |
| `audit_started` | "Start the audit" begins wizard | _(none)_ | Funnel start |
| `audit_step_viewed` | **NEW** — Step renders | `step`, `section` | Step entry |
| `audit_answer_selected` | **NEW** — Answer chosen | `question_id`, `value` | Micro-conversion |
| `audit_step_completed` | "Continue" succeeds | `step`, `section` | Step exit |
| `audit_abandoned` | **NEW** — Exit mid-wizard | `answers_count` | Drop-off |
| `audit_completed` | All steps done, scored | `phase`, `top_service` | Funnel end |
| `audit_results_viewed` | **NEW** — Results page mounts | `phase`, `recommendations_count`, `top_service` | Post-funnel |
| `audit_capture_submitted` | Lead form submitted | `phase` | Conversion |
| `cta_click` | "Book a call" links | `destination`, `location` | Conversion |

## 6. Critical Files Reference

| File | Action | Purpose |
|---|---|---|
| `src/components/audit/audit-landing.tsx` | **Create** | Full landing page for cold ad traffic + CTA tracking |
| `src/components/audit/audit-app.tsx` | **Modify** | Swap `IntroScreen` -> `AuditLandingContent` |
| `src/components/audit/intro-screen.tsx` | **Delete** | Replaced by `audit-landing.tsx` |
| `src/hooks/use-audit.ts` | **Modify** | Add `audit_answer_selected` + `audit_abandoned` on reset |
| `src/components/audit/audit-wizard.tsx` | **Modify** | Add `audit_step_viewed` event |
| `src/components/audit/results-view.tsx` | **Modify** | Add `audit_results_viewed` event |
| `app/audit/page.tsx` | **Modify** | Enhanced metadata + page spacing |
| `src/lib/clients.ts` | Read-only | Client data for trust strip |
| `src/lib/team.ts` | Read-only | Team data for "Who We Are" block |
| `src/lib/services.ts` | Read-only | Services data for overview block |
| `src/components/sections/faq-section.tsx` | Read-only | Reuse `FaqAccordion` export |
| `src/components/layout/animated-section.tsx` | Read-only | `AnimatedSection` + `Reveal` wrappers |
| `src/components/layout/dot-grid-background.tsx` | Read-only | `BlueprintCorners` component |
| `src/components/tracked-link.tsx` | Read-only | `TrackedLink` for secondary CTAs |
