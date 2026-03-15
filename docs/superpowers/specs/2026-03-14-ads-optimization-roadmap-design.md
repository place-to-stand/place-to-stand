# Ads Optimization Roadmap — Design Spec

## Problem

Place To Stand runs $10/day Google Ads across 15 landing page variants. At ~$0.67/variant/day, no variant accumulates enough clicks to draw meaningful conclusions. The funnel CLI (Phase 1-2 complete) can report data but can't act on it. We need a phased plan to concentrate spend, analyze results, automate optimization, and iterate on landing pages.

## Phased Approach

### Phase 1: Focus the Funnel (manual, no code)
### Phase 2: Analyze & Act (CLI recommendations + landing page fixes)
### Phase 3: Automate (CLI writes to Google Ads API)
### Phase 4: Landing Page Iteration (A/B testing + social proof)

---

## Phase 1: Focus the Funnel

**Goal:** Concentrate $10/day budget across 4 variants instead of 15, generating enough clicks per variant for meaningful analysis.

### Surviving Variants

| # | Slug | Angle |
|---|------|-------|
| 1 | `fast-start` | Speed/urgency |
| 2 | `done-for-you` | Low-effort |
| 3 | `ops-systemization` | Operations pain |
| 4 | `ai-opportunity-audit` | Low-commitment entry point |

### Actions (all manual in Google Ads console)

1. Pause ad groups for the 11 non-selected variants
2. Set even budget split across 4 survivors (~$2.50/day each)
3. Wait 2 weeks for data accumulation

### Success Criteria

After 2 weeks, each surviving variant has 15+ clicks — enough to compare CTR and on-site behavior (scroll depth, CTA clicks) via `ads funnel full --days 14`.

### Dependencies

- Scroll depth tracking deployed to production (done — commit `8558710` on main)
- PostHog capturing `scroll_depth` events on `/book-a-call/*` pages (live)

### Timeline

Start immediately. Data window: 2 weeks.

---

## Phase 2: Analyze & Act

**Goal:** Use accumulated data to generate actionable recommendations and improve underperforming landing pages.

### New CLI Command

#### `ads recommend [--days 14]`

Reads funnel data (Google Ads + PostHog) and prints rule-based recommendations. No AI — deterministic threshold checks.

**Location:** Add `cmd_recommend` handler to `scripts/ads/cli.py`, recommendation logic in new `scripts/ads/recommendations.py`.

**Data source:** Reuses the existing data-fetching logic from `cmd_funnel_full` (Google Ads via `google_ads.py` + PostHog via `posthog_api.py` with URL stitching). The `recommendations.py` module receives the stitched data and applies rules — it does not fetch data itself.

**Rules engine:**

| Signal | Condition | Recommendation |
|--------|-----------|----------------|
| Low CTR | Impressions > 200, CTR < 1% | "Ad copy isn't landing — rewrite headline for `{variant}`" |
| Tracking gap | Clicks > 15, pageviews < 50% of clicks | "Tracking gap or slow load on `{variant}` — check page speed" |
| Hero bounce | Pageviews > 10, scroll 25% < 30% of pageviews | "Above-the-fold isn't hooking on `{variant}` — rework hero" |
| CTA invisible | Scroll 50%+ > 5, CTA clicks = 0 | "They're reading `{variant}` but not clicking — CTA needs work" |
| Winner detected | One variant CTR 2x+ any other (both > 100 impressions) | "Shift budget toward `{winner}` — outperforming by {ratio}x" |
| Insufficient data | Any variant < 15 clicks | "Not enough data for `{variant}` — wait for more traffic" |

**Output format:** One line per triggered recommendation, prefixed with severity (`INFO`, `WARN`, `ACTION`). Supports `--json` flag.

**Error handling:** Same contract as existing CLI commands (see ads-funnel-cli spec).

### Landing Page Improvements (code changes)

Based on Phase 2 data analysis, make targeted changes to underperforming variants:

- **Hero bounce high:** Tighten above-the-fold copy, make value prop more immediate
- **Scroll but no CTA click:** Reposition CTA, test different button text, add urgency near CTA
- **Good CTR but low pageviews:** Check page load speed, verify tracking

Changes are made directly to variant definitions in `src/lib/landing-pages.ts` and/or the variant page component at `app/book-a-call/[variant]/page.tsx`.

### Dependencies

- Phase 1 complete (4 variants running for 2+ weeks)
- Google Ads developer token — at minimum test access for read-only data; Basic Access preferred

### Timeline

Starts after Phase 1's 2-week data window (+2 weeks from now).

---

## Phase 3: Automate

**Goal:** Give the CLI write access to Google Ads API so budget shifts and pausing happen from the terminal instead of the Ads console.

### New CLI Commands

#### `ads pause <variant>`

Pause a specific variant's ad group.

- Shows preview: "Will pause ad group for `/book-a-call/{variant}`"
- Requires confirmation (Y/n) before executing
- Supports `--dry-run` flag
- Logs action to `scripts/ads/.action-log.jsonl`

#### `ads unpause <variant>`

Re-enable a paused variant's ad group. Same confirmation/logging behavior.

#### `ads budget shift --from <variant> --to <variant> [--amount <dollars>]`

Reallocate daily budget between variants.

- If `--amount` not specified, shifts 50% of `--from` budget to `--to`
- Budget floor: never reduce a variant below $1/day
- Shows preview with before/after budgets
- Requires confirmation, supports `--dry-run`, logs action

#### `ads pause-losers --days 14 [--min-clicks 15] [--max-ctr 1.0]`

Auto-pause variants below performance thresholds.

- Default: pause any variant with 15+ clicks and CTR < 1% over the lookback window
- Shows list of variants that would be paused with their stats
- Requires confirmation
- Will not pause the last active variant (safety)

#### `ads promote-winner --days 14`

Shift 70% of total budget to the highest-performing variant.

- "Highest-performing" = highest CTR among variants with 15+ clicks
- Remaining 30% split evenly among other active variants
- Shows before/after budget table
- Requires confirmation

### Safety Rails

- **Confirmation required:** Every write command shows a preview and prompts Y/n
- **Dry run:** `--dry-run` flag on all write commands — shows what would happen without executing
- **Action log:** All executed actions logged to `scripts/ads/.action-log.jsonl` with timestamp, command, parameters, and API response
- **Budget floor:** $1/day minimum per variant (Google penalizes very low budgets with reduced quality)
- **Last-man-standing:** Cannot pause the final active variant

### Implementation

**Files:**
- `scripts/ads/ads_writer.py` — Google Ads API mutate operations (pause/unpause ad groups, update budgets)
- `scripts/ads/action_log.py` — Append-only JSONL logger
- Add write command handlers to `scripts/ads/cli.py`

**Google Ads API operations:**

Variants are separate ad groups within a single campaign. Write operations target ad groups, not campaigns.

- Pause/unpause ad group: `AdGroupService.MutateAdGroups` with `ad_group.status = PAUSED/ENABLED`
- Budget update: `CampaignBudgetService.MutateCampaignBudgets` with new `amount_micros` (budget is campaign-level; shifting budget between variants means adjusting ad group bids or campaign budget allocation)

### Dependencies

- **Google Ads Basic Access approved** — test tokens are read-only, write operations require Basic Access
- Phase 2 complete (know what "good" and "bad" look like)

### Timeline

+3-4 weeks from now. Blocked on Basic Access approval.

---

## Phase 4: Landing Page Iteration

**Goal:** Once a winning angle is identified, create challenger variants and test them against the control.

### Process

1. The Phase 3 winner becomes the "control" variant
2. Create 2-3 new variants that riff on the winning angle (same psychological lever, different copy/layout/CTA)
3. Run new variants alongside control with even budget split
4. Use `ads recommend` to flag when a challenger beats the control

### Landing Page Enhancements

- **Dynamic social proof component:** e.g., "12 businesses audited this month" — pulls from a simple counter (can be static/manually updated initially)
- **CTA variations:** Test button text ("Book a free strategy call" vs "Get your AI audit"), placement (fixed bottom bar vs inline), and styling
- **Copy tightening:** Based on scroll depth data — if users drop off at a specific section, rewrite or remove it

### Implementation

- New variants added to `src/lib/landing-pages.ts`
- Social proof component at `src/components/social-proof-badge.tsx` (optional, only if data supports it)
- CLI continues tracking via existing `funnel full` and `recommend` commands

### Dependencies

- Clear winner from Phase 3 (one variant significantly outperforming others)
- Enough baseline data to detect improvements (50+ clicks on control)

### Timeline

+5-6 weeks from now. Only starts after Phases 1-3 produce a clear winner.

---

## Full Timeline

| Phase | What | When | Code Changes |
|-------|------|------|-------------|
| 1 | Focus to 4 variants | Now | None — manual in Ads console |
| 2 | Analyze + recommend | +2 weeks | `ads recommend` command, landing page copy fixes |
| 3 | Automate budget/pausing | +3-4 weeks | Write commands, action logging |
| 4 | Landing page iteration | +5-6 weeks | New variants, social proof component |

## Dependency Chain

```
Phase 1 (manual, now)
  └─ 2 weeks of data ─→ Phase 2 (recommend command + page fixes)
                            └─ Basic Access approved ─→ Phase 3 (write commands)
                                                           └─ Clear winner ─→ Phase 4 (iterate)
```

## What This Spec Does NOT Cover

- Changing ad copy in Google Ads (manual for now)
- Multi-campaign support (single campaign assumed)
- Automated ad copy generation
- Landing page infrastructure changes (Next.js routing stays as-is)
