# Ads Copy Generator — Design Spec

## Problem

Place To Stand runs Google Ads pointing to landing page variants (`/book-a-call/*`). Each variant has rich structured data — audience, headline, pain points, differentiators — but translating that into Google Ads Responsive Search Ad copy (15 headlines at 30 chars, 4 descriptions at 90 chars) is manual and tedious. There's no system to store, version, validate, or deploy ad copy.

## Solution

Extend the ads CLI with copy management commands. The CLI extracts variant data from `landing-pages.ts` and outputs it with a prompt guide. Claude Code (running in the same session) generates the ad copy. The CLI validates, stores, versions, and eventually deploys it via the Google Ads API.

## Ad Format: Responsive Search Ads (RSAs)

RSAs are the only format targeted by this spec.

| Field | Count | Max Characters |
|-------|-------|---------------|
| Headlines | 15 | 30 each |
| Descriptions | 4 | 90 each |
| Alternative headlines | 5 | 30 each |
| Alternative descriptions | 2 | 90 each |
| Final URL | 1 | Derived from variant slug |

---

## CLI Commands

### `ads copy show <variant>`

Extracts variant data from `src/lib/landing-pages.ts` and outputs:
1. Structured variant context (audience, headline, subheadline, pain points, differentiators, outcome bullets, CTA label)
2. A prompt guide with RSA constraints and generation instructions

**Parsing `landing-pages.ts`:** The variant data is a clean exported TypeScript array of objects with string fields. The CLI reads the file and extracts the object matching the requested slug using text parsing (regex-based extraction of the object block for the given slug). No TypeScript compiler or AST parser required.

**Output format:**

```
── VARIANT: fast-start ───────────────────────────
Audience:   For busy local business owners who need momentum this month
Headline:   Launch a working growth system in 14 to 30 days.
Subhead:    If leads are coming in but follow-up is slow...
CTA:        Book a call and get your 30-day fast-start plan
Final URL:  https://placetostandagency.com/book-a-call/fast-start

Pain Points:
  • New leads sit too long before someone responds
  • Important follow-ups depend on memory and sticky notes
  • You need results now, not another 3-month strategy deck

Differentiators:
  • You work directly with builders, not layers of account managers
  • We implement practical systems first, then optimize from real data
  • No bloated scope, just the fastest path to booked calls

Outcomes:
  • Map your current lead flow and identify where inquiries are being lost
  • Ship one high-impact workflow first (inquiry, follow-up, and booking)
  • Leave with a simple 30-day implementation plan and clear ownership

── GENERATION GUIDE ──────────────────────────────
Generate Google Ads Responsive Search Ad copy for the variant above.

Requirements:
- 15 headlines (max 30 characters each, strictly enforced)
- 4 descriptions (max 90 characters each, strictly enforced)
- 5 alternative headlines to swap in (max 30 characters each)
- 2 alternative descriptions to swap in (max 90 characters each)

Creative direction:
- Use the variant's pain points, differentiators, and audience as source material
- Match the tone of the existing headline and subheadline
- Include at least one headline with a number or stat
- Include at least one headline as a question
- CTA descriptions should reference booking a call
- Vary headline approaches: benefit, pain, question, urgency, social proof

Output as JSON:
{
  "headlines": ["...", ...],        // exactly 15
  "descriptions": ["...", ...],     // exactly 4
  "alt_headlines": ["...", ...],    // exactly 5
  "alt_descriptions": ["...", ...]  // exactly 2
}
──────────────────────────────────────────────────
```

**Flags:**
- `--json` — output variant data as JSON (no prompt guide) for programmatic use

**Error handling:**
- Unknown variant slug → print available slugs and exit 1
- `landing-pages.ts` not found → print path and exit 1

### `ads copy save <variant> [--file <path>] [--activate]`

Saves approved ad copy to `scripts/ads/copy/<variant>.json`.

**Input methods:**
- `--file <path>` — read copy from a JSON file with `headlines`, `descriptions`, `alt_headlines`, `alt_descriptions` arrays
- Without `--file` — read from stdin (pipe or paste, terminated by EOF)

**Validation (runs before saving):**

| Field | Rule | On Failure |
|-------|------|-----------|
| headlines | Exactly 15 items, each ≤ 30 chars | Print which lines exceed limit and by how many chars, exit 1 |
| descriptions | Exactly 4 items, each ≤ 90 chars | Same |
| alt_headlines | Exactly 5 items, each ≤ 30 chars | Same |
| alt_descriptions | Exactly 2 items, each ≤ 90 chars | Same |

**Version management:**
- Each save appends a new version entry to the `versions` array in the copy file
- New versions default to `"status": "draft"`
- `--activate` flag marks the new version as `"active"` and sets any previous `"active"` version to `"archived"`
- Only one version can be `"active"` at a time per variant

**Output:** Prints version number, validation summary, and status.

### `ads copy list`

Shows which variants have saved copy.

**Output table columns:**
- Variant slug
- Total versions
- Active version number (or "none")
- Last updated timestamp

### `ads deploy <variant> [--dry-run]`

Creates a Responsive Search Ad in the variant's ad group using the `"active"` version from `scripts/ads/copy/<variant>.json`.

**Current behavior (until Basic Access approved):**
1. Reads the `"active"` version from copy file
2. Finds the ad group via `find_ad_group_by_url` (from `ads_writer.py`)
3. Prints a preview of the ad (headlines, descriptions, final URL)
4. Prints: `"Deploy is blocked until Google Ads Basic Access is approved."`
5. Exits 0

**Future behavior (after Basic Access):**
- Same preview + confirmation prompt
- Creates RSA via `AdGroupAdService.MutateAdGroupAds`
- Logs action to `.action-log.jsonl`

**Error handling:**
- No copy file for variant → "No saved copy for {variant}. Run `ads copy save` first." exit 1
- No active version → "No active version for {variant}. Run `ads copy save --activate` first." exit 1
- No ad group found → "No ad group found for {variant}." exit 1

---

## File Structure

### New Files

```
scripts/ads/
  copy_manager.py      # Parse landing-pages.ts, format output, validate/save/list copy
  copy_guide.txt       # Prompt guide template (checked in, editable)
  copy/                # Saved ad copy per variant (gitignored)
    fast-start.json
    done-for-you.json
    ...
```

### Copy File Format

```json
{
  "variant": "fast-start",
  "final_url": "https://placetostandagency.com/book-a-call/fast-start",
  "versions": [
    {
      "version": 1,
      "created": "2026-03-15T14:30:00Z",
      "status": "draft",
      "headlines": [
        "Growth System In 14 Days",
        "Stop Losing Leads Today",
        "..."
      ],
      "descriptions": [
        "We build a lead-to-booking workflow in 14-30 days. Book a free strategy call.",
        "..."
      ],
      "alt_headlines": [
        "Ready In 2 Weeks, Not 2 Months",
        "..."
      ],
      "alt_descriptions": [
        "Custom automation for your business. No templates, no bloat.",
        "..."
      ]
    }
  ]
}
```

### Prompt Guide Template

Stored at `scripts/ads/copy_guide.txt`. The CLI reads this file and appends it to the variant data output. This allows editing the prompt guide without changing code.

If the file is missing, the CLI uses a hardcoded default (same content as the template above).

---

## Gitignore Additions

```
scripts/ads/copy/
```

The copy directory is gitignored because it contains creative work tied to your ad account, not shared code.

---

## Workflow

```
1. $ ads copy show fast-start
   → CLI outputs variant data + prompt guide

2. User pastes output to Claude Code (or just says "generate copy for fast-start")
   → Claude Code follows the guide, produces JSON copy

3. User reviews, iterates with Claude Code

4. User saves the JSON to a file (e.g., /tmp/fast-start-copy.json)

5. $ ads copy save fast-start --file /tmp/fast-start-copy.json --activate
   → CLI validates character limits, saves to copy/fast-start.json as active version

6. $ ads deploy fast-start --dry-run
   → CLI previews the ad (blocked until Basic Access)

7. $ ads deploy fast-start
   → CLI creates the RSA in Google Ads (after Basic Access)
```

---

## Integration with Existing CLI

**Deferred authentication:** The current `ads-cli.py` authenticates with Google Ads before dispatching any command. The `copy show`, `copy save`, and `copy list` commands only read local files and do not need Google Ads credentials. The `main()` function must be restructured to only call `get_google_ads_client()` for commands that need it (`report`, `variants`, `status`, `funnel`, `recommend`, `deploy`, and write commands). This allows `copy` subcommands to work without credentials configured.

- Commands added to `build_parser()` in `cli.py` following existing pattern
- `copy` is a subcommand group (like `funnel`) with sub-subcommands: `copy show <variant>`, `copy save <variant>`, `copy list`
- `deploy` is a top-level subcommand
- Handlers: `cmd_copy_show`, `cmd_copy_save`, `cmd_copy_list`, `cmd_deploy` in `cli.py`
- Business logic in `copy_manager.py` (parsing, validation, file I/O)
- Deploy uses `find_ad_group_by_url` from `ads_writer.py` (created in Phase 3 optimization plan). Expected signature: `find_ad_group_by_url(client, customer_id: str, variant_path: str) -> dict | None` returning `{"resource_name": str, "name": str}` or `None` if not found. If `ads_writer.py` does not exist yet, the deploy command should catch `ImportError` and print: `"Deploy requires ads_writer.py (Phase 3). Run the optimization plan first."`

---

## Dependencies

- `landing-pages.ts` must exist at `src/lib/landing-pages.ts` (already in repo)
- `ads_writer.py` must exist for `deploy` command (Phase 3 of optimization roadmap — scaffold the import, handle ImportError gracefully if not yet built)
- No new Python dependencies required

---

## Success Criteria

- [ ] `ads copy show fast-start` outputs variant data + prompt guide
- [ ] `ads copy save fast-start --file copy.json` validates and stores copy
- [ ] `ads copy list` shows saved variants with version info
- [ ] `ads deploy fast-start --dry-run` previews the ad from saved copy
- [ ] Character limit validation catches and reports violations
- [ ] Prompt guide is editable at `scripts/ads/copy_guide.txt`
