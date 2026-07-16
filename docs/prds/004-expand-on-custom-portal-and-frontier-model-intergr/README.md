# PRD 004 — Expand Custom Portal & Frontier Model Integration

## Overview

The how-we-work page (`app/how-we-work/page.tsx`) currently has a brief mention of custom tools and frontier models in the "Automated Execution & Human Verification" process step, but doesn't elaborate. This PRD adds a dedicated section that:

- Goes deeper on the **PTS Portal** (the custom task-tracking / project management tool used internally)
- Highlights that it's **open source**
- Includes **screenshots** of the portal dashboard
- Positions this as evidence of how PTS uses frontier models in their own workflow, and how they could bring similar integrations to **client dashboards**

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **New section vs inline expansion** | New dedicated `<PortalSection />` component inserted between the process rows and the tech stack panel | The process rows are tight summaries; a portal deep-dive needs more visual real estate (screenshots, feature list, open-source callout). A standalone section keeps the process narrative clean. |
| **Component location** | `src/components/sections/portal-section.tsx` | Follows existing convention — every section is its own file in `src/components/sections/`. |
| **Server vs client component** | Client component (`'use client'`) | Needed for potential interactive elements and framer-motion. |
| **Media: screenshot** | Screenshot as `next/image`. Asset at `public/portal-screenshot.png` | Screenshot uses the existing `use-case-portal.png` as the initial asset. |
| **Open-source badge** | GitHub icon + link + `bp-label` styled callout | Consistent with the site's blueprint aesthetic. The GitHub vendor icon already exists in `vendorIcons`. |
| **Blueprint graphic** | New `PortalGraphic` SVG in `process-graphics.tsx` | Follows the pattern of every section having a schematic companion. A dashboard wireframe with an accent AI node fits the narrative. |
| **"For Your Business" callout** | A secondary content block within the section that pivots from "how we use it" → "how we build it for you" | Directly addresses the task goal of showing this capability is transferable to client dashboards. |
| **Grid alignment** | `max-w-content`, `px-6 lg:px-12`, spacing tokens from `tailwind.config.ts` | Mandatory per CLAUDE.md grid rules. |

## Architecture

```
app/how-we-work/page.tsx
├── AnimatedSection (intro + process rows)  ← existing, lightly modified
│   └── Process step 3 body text updated to reference the portal section below
├── PortalSection (NEW)                     ← the deep-dive
│   ├── Header (title, subtitle, open-source badge)
│   ├── Media panel (screenshot)
│   ├── Feature highlights (3 col grid of capabilities)
│   └── "For Your Business" callout card
├── Tech Stack panel                        ← existing, unchanged
├── PhasesSection                           ← existing, unchanged
└── CTA Block                              ← existing, unchanged
```

## Implementation Phases

### Phase 1: Add Portal Screenshot Asset

- `public/portal-screenshot.png` — copy of `use-case-portal.png` as placeholder until real content is provided

### Phase 2: Create Blueprint Graphic for Portal

- Add `PortalGraphic` SVG component to `src/components/graphics/process-graphics.tsx`
- Dashboard wireframe with sidebar nav, task row, and accent AI gear node
- Same 100×100 viewBox, thin `stroke-border-light` strokes, `fill-accent` highlight pattern

### Phase 3: Create `PortalSection` Component

- `src/components/sections/portal-section.tsx` — new `'use client'` section component
- Header with `bp-label`, headline, subtext, open-source badge
- Media panel with `next/image` screenshot in blueprint container
- Feature highlights grid (AI Task Processing, Human Verification, Open Source)
- "For Your Business" callout card with CTA link to `/contact`

### Phase 4: Integrate into How We Work Page

- Import and insert `<PortalSection />` between process rows and tech stack panel
- Update process step 3 text with teaser reference to portal section
- Add `id="portal"` anchor

### Phase 5: Update Metadata & Polish

- Update page `metadata.description` to mention portal/open-source tooling
- Meaningful `alt` text on images
- Accessibility and responsive layout verification

## Critical Files

| File | Role | Action |
|------|------|--------|
| `app/how-we-work/page.tsx` | How We Work page | **Modify** |
| `src/components/sections/portal-section.tsx` | Portal deep-dive section | **Create** |
| `src/components/graphics/process-graphics.tsx` | SVG schematic graphics | **Modify** |
| `public/portal-screenshot.png` | Portal screenshot asset | **Create** |
