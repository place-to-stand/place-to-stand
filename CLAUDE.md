# Place To Stand — Project Guide

## Grid alignment design rule (site-wide)

The site uses a **24px blueprint grid** (the dot/line background on `<body>` in `app/globals.css`).
Structural elements must line up with this grid so the architectural/schematic metaphor reads as intentional.

### How the grid is anchored

- Base unit: `--grid: 24px` (defined in `app/globals.css :root`).
- The background is a **centered** (`background-position: 50% 0`) 24px dot grid.
- Because the grid is centered, a centered container snaps its edges to grid lines **only if its width is an
  even multiple of 24px**. The one approved container width is `max-w-content` (1152px = 48 cells).

### Rules

1. **Container width:** use `max-w-content`. Do not introduce `max-w-7xl`/`max-w-6xl` or other widths — they
   break edge alignment.
2. **Gutters:** `px-6` (24px) on small screens, `lg:px-12` (48px) on large. Never `lg:px-10` (40px, off-grid).
3. **Structural spacing** (section padding, page-top clearance, gaps between major blocks, the main column gap
   of a section) must be a multiple of 24px. Prefer the grid tokens below over raw Tailwind values.
4. **Grid spacing tokens** (`app/globals.css → @theme`, `--spacing-grid-*`):
   `grid-half` (12) · `grid-1` (24) · `grid-2` (48) · `grid-3` (72) · `grid-4` (96) · `grid-5` (120) ·
   `grid-6` (144) · `grid-8` (192). Use as `p-grid-2`, `gap-grid-3`, `pt-grid-4`, etc.
5. **`grid-half` (12px)** is allowed for finer structural spacing. Component **micro-spacing** (icon↔label
   gaps, tight inline spacing) may sit sub-grid — but anything that defines the page frame must be on-grid.

### Honest limitation

Spacing bands and container edges align exactly. Arbitrary-height text/content blocks between bands will not
each terminate on a grid line — that's expected.

## Design tokens

- The site is on **Tailwind CSS v4** (CSS-first config; there is no `tailwind.config.ts`). All design tokens
  — colors, grid spacing, `max-w-content`, fonts — live in the `@theme` block in `app/globals.css`. Tailwind
  generates both the utility classes (`text-text-muted`, `bg-bg-card`, `p-grid-2`, …) and the `:root` CSS
  variables from that single block, so a token change there updates everything.
- No gradients — solid colors only.
- Mix alignments for visual variety; avoid center-justifying everything.
