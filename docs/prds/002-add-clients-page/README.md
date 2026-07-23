# Implementation Plan: Add Clients Page

## 1. Context

The task has two parts:

1. **Build a dedicated `/clients` page** showcasing client projects with the site's dark blueprint design system (the existing `ClientsSection` component uses the old light theme and center-aligned styling).
2. **Add a clients preview/reference to the homepage** (within or near the `WhoWeWorkWithSection`) — as an icon cloud or carousel of client logos.

The existing `ClientsSection` in `src/components/sections/clients-section.tsx` contains the project data (8 projects with titles, URLs, images, and descriptions) but uses old-theme styling (`text-ink`, `bg-white`, center-justified headings) that is inconsistent with the current dark blueprint aesthetic. The page route `app/clients/page.tsx` does not exist yet.

## 2. Design Decisions

| Decision             | Choice                                                                                                                                              | Rationale                                                                                                                                                                                                                               |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Data layer**       | Extract project data into `src/lib/clients.ts`                                                                                                      | Follows the pattern of `src/lib/services.ts` and `src/lib/team.ts` — separates data from presentation so both the full page and homepage preview can import the same source.                                                            |
| **Full page layout** | Two-column header (sticky left heading + scrollable grid right) then full-width project grid                                                        | Matches `services/page.tsx` and `team/page.tsx` patterns: `bp-label` -> `h1` -> `p` header, card grid with `BlueprintCorners`, CTA block at bottom.                                                                                     |
| **Project cards**    | Blueprint-styled cards with `Image`, `BlueprintCorners`, hover effects                                                                              | Adapts the existing `ClientsSection` card structure (image + caption) into the dark theme. Replace `bg-white` with `bg-bg-card`, `text-ink` with `text-text`, etc.                                                                      |
| **Homepage preview** | Client logo bar/cloud using Google Favicon API (already used in existing code) in the `WhoWeWorkWithSection` or as a standalone lightweight section | Simple, low-weight. The existing `ClientsSection` already fetches favicons via `https://www.google.com/s2/favicons?domain=...&sz=64`. A row of logos with a "View all clients" link matches how `ServicesPreview` links to `/services`. |
| **Navigation**       | Add "Clients" to `NAV_LINKS`                                                                                                                        | Ensures header/footer nav includes the new page. Placed after "Team" and before "Contact".                                                                                                                                              |
| **Sitemap**          | Add `/clients` entry                                                                                                                                | Follows existing pattern in `app/sitemap.ts`.                                                                                                                                                                                           |

## 3. Architecture Overview

```
src/lib/clients.ts              <- NEW: Client/project data type + array
app/clients/page.tsx             <- NEW: Full clients page (Server Component)
src/components/sections/
  clients-section.tsx            <- MODIFY: Restyle to dark blueprint theme (used by the page)
  clients-preview.tsx            <- NEW: Homepage logo bar/cloud + "View all" link
src/components/layout/nav-links.ts <- MODIFY: Add "Clients" link
app/page.tsx                     <- MODIFY: Add ClientsPreview to homepage
app/sitemap.ts                   <- MODIFY: Add /clients entry
```

## 4. Implementation Phases

### Phase 1: Data Layer — `src/lib/clients.ts`

**Create** `src/lib/clients.ts`

- Define a `Client` type: `{ title: string; href: string; image: string; description: string }`
- Export a `clients` array containing the 8 projects currently hardcoded in `src/components/sections/clients-section.tsx`
- Add a `getClientHostname` helper so the favicon URL logic isn't duplicated

**Verification:** `npx tsc --noEmit` passes.

---

### Phase 2: Restyle `ClientsSection` to Blueprint Theme

**Modify** `src/components/sections/clients-section.tsx`

- Import data from `src/lib/clients.ts` instead of inlining
- Replace old light-theme classes:
  - `text-ink` -> `text-text`, `text-ink/60` -> `text-text-muted`, `text-ink/80` -> `text-text-muted`
  - `bg-white/95` caption bar -> `bg-bg-card` with `border-t border-border`
  - Center-aligned header -> left-aligned with `bp-label`, matching `team/page.tsx` and `services/page.tsx`
- Add `BlueprintCorners` to each project card
- Use `AnimatedSection` + `Reveal` for staggered reveals (already uses `AnimatedSection`)
- Keep the existing hover interaction (title slides out, description slides in) — just re-skin it
- Use `max-w-content`, `px-6 lg:px-12` gutters per the grid rules

**Verification:** Visual check that the section renders correctly in the blueprint theme.

---

### Phase 3: Create the Clients Page — `app/clients/page.tsx`

**Create** `app/clients/page.tsx`

- Follow the `team/page.tsx` / `services/page.tsx` pattern:
  - Export `metadata` with title "Clients" and a description
  - `<main className='flex-1 pt-10 pb-32'>`
  - `AnimatedSection` with header: `bp-label` -> `h1` -> `p`
  - Render the restyled `ClientsSection` (or inline the grid directly if the section wrapper is redundant)
  - Bottom CTA block (identical to other pages — "Ready to build?" with Start a Project + Opportunity Audit buttons)
- Use `BlueprintCorners` on the CTA block

**Verification:** Navigate to `/clients`, confirm page renders with correct layout, metadata, and styling.

---

### Phase 4: Homepage Clients Preview — `src/components/sections/clients-preview.tsx`

**Create** `src/components/sections/clients-preview.tsx`

- A lightweight section showing client logos (favicons or simple brand marks) in a scrollable row or wrapped grid
- Uses the `clients` data from `src/lib/clients.ts`
- Structure: `AnimatedSection` -> left-aligned heading ("Clients" `bp-label`, heading, subtext, "View all clients" link) + logo row
- Two-column layout matching `ServicesPreview` and `PillarsSection`: sticky left heading + right content
- Each logo links to the client's external site (`target='_blank'`)
- Logo rendering: use Google Favicon API at `sz=64` (already proven in the existing component), displayed in a grid/row of small bordered squares with `bg-bg-card` + `BlueprintCorners` or simple `border border-border` treatment
- Accessible: `aria-label` on each link, `alt` text on images

**Modify** `app/page.tsx`

- Import and render `ClientsPreview` in the homepage
- Place it after `WhoWeWorkWithSection` and before `PillarsSection`

**Verification:** Homepage shows the client logos section with correct styling and link to `/clients`.

---

### Phase 5: Navigation & Sitemap

**Modify** `src/components/layout/nav-links.ts`

- Add `{ href: '/clients' as const, label: 'Clients' }` to `NAV_LINKS`
- Position: after `'Team'` and before `'Contact'` (keeping Contact last as the primary action entry point)

**Modify** `app/sitemap.ts`

- Add entry: `{ url: '${baseUrl}/clients', lastModified, changeFrequency: 'monthly', priority: 0.7 }`

**Verification:**

- Header and footer nav show "Clients" link
- `npm run build` succeeds
- Sitemap includes `/clients`

---

### Phase 6: Final Validation

- `npm run lint` — no errors
- `npm run type-check` — no type errors
- `npm run build` — successful build
- Manual visual review of:
  - `/clients` page (header, project grid, CTA, responsive)
  - Homepage (clients preview section, correct ordering)
  - Navigation (header + footer links, active state on `/clients`)
  - Mobile responsiveness (320px+)
  - Keyboard navigation and focus states

## 5. Critical Files Reference

| File                                          | Action | Purpose                                    |
| --------------------------------------------- | ------ | ------------------------------------------ |
| `src/lib/clients.ts`                          | Create | Typed client data array                    |
| `app/clients/page.tsx`                        | Create | Dedicated clients page route               |
| `src/components/sections/clients-section.tsx` | Modify | Restyle from light to dark blueprint theme |
| `src/components/sections/clients-preview.tsx` | Create | Homepage logo bar preview section          |
| `app/page.tsx`                                | Modify | Add `ClientsPreview` to homepage           |
| `src/components/layout/nav-links.ts`          | Modify | Add "Clients" nav entry                    |
| `app/sitemap.ts`                              | Modify | Add `/clients` to sitemap                  |
