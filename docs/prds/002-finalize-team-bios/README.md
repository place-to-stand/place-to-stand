# PRD 002: Finalize Team Bios

## Implementation Plan

### 1. Context

The three current team bios in `src/lib/team.ts` are generic/boilerplate. They need to be rewritten to highlight each person's unique background:

| Member              | Key points to highlight                                                                                         |
| ------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Jason Desiderio** | 10+ years as Senior Engineer at Squarespace; expertise building apps at scale                                   |
| **Kris Crawford**   | 5 years as software engineer; prior career in hard technical fields building systems designed to last decades   |
| **Damon Bodine**    | Completion of the Gauntlet AI bootcamp; multiple decades of entrepreneurship in the music and realty industries |

### 2. Design Decisions

| Decision               | Choice                                | Rationale                                                                                                                                                |
| ---------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Which file to edit** | `src/lib/team.ts` only                | This is the single source of truth consumed by `app/team/page.tsx`. The homepage `TeamSection` component doesn't render bios, so no change needed there. |
| **Bio length**         | 2–3 sentences (~40–60 words each)     | Matches the current bio length; fits the `text-sm leading-relaxed` styling on the team page cards without overflowing.                                   |
| **Tone**               | Confident, specific, results-oriented | Consistent with the rest of the site's copy (e.g., "measurable impact", "end-to-end"). Avoid vague filler; lead with the differentiator.                 |
| **Title changes**      | None                                  | Titles are already appropriate; task only asks for bio rewrites.                                                                                         |

### 3. Architecture Overview

This is a **copy-only change** — a single data file edit. No structural, type, or component changes are needed.

```
src/lib/team.ts   ← update `bio` field for Jason, Kris, Damon
       │
       ▼
app/team/page.tsx  (renders member.bio — no changes needed)
```

### 4. Implementation Phase

#### Phase 1: Rewrite bios in `src/lib/team.ts`

**File to modify:** `src/lib/team.ts`

**Changes:**

Replace each team member's `bio` string:

- **Jason Desiderio** — New bio emphasizing his 10+ year tenure as a Senior Engineer at Squarespace, and how that large-scale platform experience translates into building robust, scalable applications for clients today.

  > _Example direction:_ "Spent over a decade as a Senior Engineer at Squarespace, shipping systems that served millions of users. Brings that large-scale platform discipline to every project — architecting apps built to perform under real-world load."

- **Kris Crawford** — New bio highlighting his 5 years in software engineering layered on top of a prior career in hard technical fields (engineering/systems built to last decades), and how that background shapes his approach to building durable software.

  > _Example direction:_ "Software engineer with five years of building for the web, grounded in a prior career designing physical systems meant to last decades. That same rigor — measure twice, build once — carries into every line of code."

- **Damon Bodine** — New bio emphasizing his completion of the Gauntlet AI bootcamp, his tenure there, and his decades of entrepreneurship across the music and realty industries.

  > _Example direction:_ "Graduate of the Gauntlet AI engineering bootcamp with multiple decades of entrepreneurship spanning the music and real-estate industries. Combines hard-won business instinct with hands-on AI engineering to build systems that actually move the needle."

**Verification steps:**

1. Run `npx next build` (or the project's build command) — confirm no TypeScript or build errors.
2. Visit `/team` in the dev server — confirm all three bios render correctly in their cards.
3. Visually check that bio length doesn't cause layout issues on mobile and desktop viewports.
4. Confirm the homepage `TeamSection` (which doesn't show bios) is unaffected.

### 5. Critical Files Reference

| File                                       | Role                                  | Action                              |
| ------------------------------------------ | ------------------------------------- | ----------------------------------- |
| `src/lib/team.ts`                          | Canonical team data (type + array)    | **Modify** — update 3 `bio` strings |
| `app/team/page.tsx`                        | `/team` page rendering bios           | Read-only — verify rendering        |
| `src/components/sections/team-section.tsx` | Homepage team section (no bios shown) | No change — verify unaffected       |
