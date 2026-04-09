# PRD 001: Make Separate Pages for PTS Site

## Implementation Plan

### 1. Context

The task has two parts:
1. **Create a standalone `/case-studies` page** — Move the detailed use-cases content (the carousel/lightbox experience currently on the homepage) to its own dedicated page at `/case-studies`.
2. **Reduce the projects/clients section on the landing page to a logo grid** — The current `ClientsSection` displays full project cards with screenshots, descriptions, and hover effects. This should be simplified to a compact logo grid on the homepage, keeping the full detail available on the case studies page.

### 2. Design Decisions

| Decision | Choice | Rationale |
|---|---|---|
| **Route for case studies** | `/case-studies` (not `/work` or `/use-cases`) | Task explicitly says "case studies page"; clean, SEO-friendly slug |
| **What goes on case studies page** | Both the use-cases carousel AND the full client project cards | Consolidates all portfolio/work content into a single dedicated page |
| **Homepage use-cases section** | Remove entirely from homepage | The hero CTA currently points to `#use-cases`; we'll redirect it to the new case-studies page |
| **Homepage clients section** | Replace with a logo grid (favicons + brand names) | Task says "reduce to a logo grid"; keeps social proof visible without dominating the page |
| **Nav link update** | Change "Use Cases" → "Case Studies" pointing to `/case-studies`; remove "Clients" as a separate nav item | Consolidates work into one nav entry |
| **Page type** | Server component for metadata + client component for interactive carousel/lightbox | Follows existing patterns like `book-a-call/[variant]/page.tsx` |
| **Data location** | Keep `useCases` array in the existing section file; extract `projects` array to a shared `src/lib/case-studies.ts` data file | Clean separation of data from presentation; both the homepage logo grid and case studies page can import from same source |

### 3. Architecture Overview

```
app/
  page.tsx                          ← MODIFY: Remove UseCasesSection, replace ClientsSection with LogoGrid
  case-studies/
    page.tsx                        ← CREATE: New case studies page

src/
  components/
    sections/
      use-cases-section.tsx         ← KEEP (imported by case-studies page)
      clients-section.tsx           ← KEEP (imported by case-studies page)
      clients-logo-grid.tsx         ← CREATE: Compact logo grid for homepage
    layout/
      nav-links.ts                  ← MODIFY: Update navigation
  lib/
    case-studies.ts                 ← CREATE: Shared data for projects array

app/sitemap.ts                      ← MODIFY: Add /case-studies route
```

### 4. Implementation Phases

#### Phase 1: Extract shared data

**Files to create:**
- `src/lib/case-studies.ts`

**Changes:**
- Extract the `projects` array and `Project` type from `src/components/sections/clients-section.tsx` into `src/lib/case-studies.ts`
- Update `clients-section.tsx` to import `projects` from the new shared data file instead of defining it inline

#### Phase 2: Create the clients logo grid component

**Files to create:**
- `src/components/sections/clients-logo-grid.tsx`

**Changes:**
- Build a compact grid component that displays project logos (using Google favicon service) and brand names
- Use `AnimatedSection` wrapper with `id='clients'` for consistency
- Import `projects` from `src/lib/case-studies.ts`
- Include a "View all case studies →" link to `/case-studies`
- Grid layout: `grid-cols-2 md:grid-cols-4` of compact logo items (favicon + name), no screenshots

#### Phase 3: Create the case studies page

**Files to create:**
- `app/case-studies/page.tsx`

**Changes:**
- Server component wrapper that exports `metadata`
- Renders existing `UseCasesSection` with carousel + lightbox
- Renders existing `ClientsSection` below it
- Add a CTA section at the bottom linking to `/#contact`

#### Phase 4: Update the homepage

**Files to modify:**
- `app/page.tsx`

**Changes:**
- Remove `UseCasesSection` import and rendering (along with all lightbox state/effects)
- Replace `ClientsSection` import with `ClientsLogoGrid`
- Simplify homepage: `HeroSection` → `ClientsLogoGrid` → `HowWeWorkSection` → `ContactSection` → `FaqSection`

#### Phase 5: Update navigation and hero CTA

**Files to modify:**
- `src/components/layout/nav-links.ts`
- `src/components/sections/hero-section.tsx`
- `src/components/layout/header.tsx`
- `src/components/layout/footer.tsx`

**Changes:**
- Update nav links to support both hash-based and path-based links
- Replace "Use Cases" with "Case Studies" pointing to `/case-studies`
- Remove "Clients" nav item
- Update hero CTA to link to `/case-studies`

#### Phase 6: Update sitemap and SEO

**Files to modify:**
- `app/sitemap.ts`

**Changes:**
- Add `/case-studies` to the standalone pages array with priority 0.8
- Update hash sections list to reflect current homepage sections

### 5. Critical Files Reference

| File | Action | Purpose |
|---|---|---|
| `src/lib/case-studies.ts` | **Create** | Shared data: `projects` array + types |
| `src/components/sections/clients-logo-grid.tsx` | **Create** | Compact logo grid for homepage |
| `app/case-studies/page.tsx` | **Create** | Standalone case studies page |
| `app/page.tsx` | **Modify** | Remove use-cases + lightbox, swap clients for logo grid |
| `src/components/layout/nav-links.ts` | **Modify** | Update nav structure for page links |
| `src/components/layout/header.tsx` | **Modify** | Support path-based nav links |
| `src/components/layout/footer.tsx` | **Modify** | Support path-based nav links |
| `src/components/sections/hero-section.tsx` | **Modify** | Update hero CTA destination |
| `src/components/sections/clients-section.tsx` | **Modify** | Import data from shared file |
| `app/sitemap.ts` | **Modify** | Add `/case-studies` route |
