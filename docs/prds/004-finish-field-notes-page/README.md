# PRD 004: Finish Field Notes Page

## Implementation Plan

### 1. Context

The Field Notes section is currently **scaffolded but intentionally disabled** across the site. Specifically:
- `src/lib/field-notes.ts` defines a `FieldNote` type with only metadata (title, description, tags, url, date) — no article body content
- `app/field-notes/page.tsx` renders a listing page using that data, but cards link to external URLs or `#` placeholders — there are no individual article detail pages
- The section is **commented out** in 4 places: homepage (`app/page.tsx`), nav (`nav-links.ts`), sitemap (`app/sitemap.ts`), and the FieldNotesPreview was removed from the homepage
- The task asks to **start with raw Markdown files instead of a CMS** — meaning article body content lives as `.md` files in the repo, parsed at build time

The goal is to make Field Notes a fully functional blog-like section: a listing page showing all notes, individual `/field-notes/[slug]` detail pages rendering Markdown content, and re-enable the feature across the site.

### 2. Design Decisions

| Decision | Choice | Rationale |
|---|---|---|
| **Content format** | Raw `.md` files with YAML frontmatter | Task requirement ("raw md files instead of CMS"). Frontmatter replaces the hardcoded `fieldNotes` array in `field-notes.ts` |
| **Content location** | `content/field-notes/*.md` | Follows common convention; separates content from app/component code; easy to find and edit |
| **Markdown parsing** | `gray-matter` (frontmatter) + `remark` + `remark-html` (body) | Lightweight, no MDX complexity needed. These are standard, well-maintained packages. No React components needed inside articles |
| **Routing** | `app/field-notes/[slug]/page.tsx` with `generateStaticParams` | Matches the existing `book-a-call/[variant]` dynamic route pattern already in the codebase |
| **Data layer** | New `src/lib/field-notes.ts` functions (`getAllFieldNotes`, `getFieldNoteBySlug`) replacing the hardcoded array | Keeps the module interface clean; listing page and preview component use `getAllFieldNotes()`, detail page uses `getFieldNoteBySlug()` |
| **Styling article body** | Tailwind `prose` classes via `@tailwindcss/typography` plugin | Standard approach for rendering HTML from Markdown with good defaults; customizable to match the dark blueprint theme |
| **Detail page layout** | Single-column article with blueprint aesthetic (corners, bp-label, badge tags) | Consistent with the rest of the site's design language |

### 3. Architecture Overview

```
content/field-notes/
  ├── ai-playbook-smbs.md          ← Markdown + YAML frontmatter
  ├── portal-open-source.md
  └── automation-roi-calculator.md

src/lib/field-notes.ts             ← getAllFieldNotes() + getFieldNoteBySlug()
                                     reads from content/field-notes/*.md

app/field-notes/
  ├── page.tsx                     ← Listing page (existing, updated)
  └── [slug]/page.tsx              ← NEW detail page

src/components/sections/
  └── field-notes-preview.tsx      ← Homepage preview (existing, updated)

nav-links.ts, sitemap.ts, page.tsx ← Uncomment / re-enable
```

### 4. Implementation Phases

#### Phase 1: Install Dependencies

**Files to modify:**
- `package.json` (via `npm install`)

**Changes:**
- Install `gray-matter` for YAML frontmatter parsing
- Install `remark` and `remark-html` for Markdown → HTML conversion
- Install `@tailwindcss/typography` for prose styling of article bodies

**Verification:**
- `npm install gray-matter remark remark-html @tailwindcss/typography`
- `npm run type-check` passes

---

#### Phase 2: Create Content Directory & Markdown Files

**Files to create:**
- `content/field-notes/ai-playbook-smbs.md`
- `content/field-notes/portal-open-source.md`
- `content/field-notes/automation-roi-calculator.md`

**Changes:**
Each file uses YAML frontmatter matching the existing `FieldNote` type fields, plus article body in Markdown:

```markdown
---
title: "The Emerging AI Playbook for SMBs"
description: "A practical guide for small and medium businesses..."
tags: ["AI", "Strategy", "SMB"]
date: "2025-11-05"
repo: null
---

## Introduction

Article body content here...
```

- Migrate the metadata from the hardcoded `fieldNotes` array in `src/lib/field-notes.ts` into each file's frontmatter
- Write initial article body content (can be placeholder/draft — the infrastructure is what matters)
- Remove the `url` field from the data model — internal notes will be routed to `/field-notes/[slug]` automatically; external links can be kept via an optional `externalUrl` frontmatter field

**Verification:**
- Files exist and frontmatter is valid YAML

---

#### Phase 3: Rewrite the Data Layer (`src/lib/field-notes.ts`)

**Files to modify:**
- `src/lib/field-notes.ts`

**Changes:**
- Keep the `FieldNote` type, updated:
  ```ts
  export type FieldNote = {
    slug: string
    title: string
    description: string
    tags: string[]
    date: string
    repo?: string
    externalUrl?: string   // for notes that link externally (e.g., GitHub)
    contentHtml: string    // rendered HTML body
  }
  ```
- Add `getAllFieldNotes()`: reads `content/field-notes/`, parses each `.md` with `gray-matter`, converts body with `remark` + `remark-html`, returns sorted by date (newest first). For the listing page, `contentHtml` can be empty string to avoid parsing overhead — or parse all since this is static/build-time.
- Add `getFieldNoteBySlug(slug: string)`: reads a single file, parses frontmatter + body, returns full `FieldNote` or `null`.
- Remove the hardcoded `fieldNotes` array.
- All functions use `fs.readFileSync` / `path.join(process.cwd(), 'content/field-notes')` — only called at build time from Server Components.

**Verification:**
- `npm run type-check` passes
- Manually verify by importing in a test script or checking build output

---

#### Phase 4: Add Typography Plugin to Tailwind

**Files to modify:**
- `tailwind.config.ts`

**Changes:**
- Add `@tailwindcss/typography` to the plugins array
- Add `typography` customization in `theme.extend` to match the dark blueprint theme:
  - Prose colors: headings use `text-text`, body uses `text-text-muted`, links use `text-accent`
  - Prose borders/hr: use `border-border`
  - Code blocks: `bg-bg-elevated` background
  - Appropriate sizing that works within the blueprint aesthetic

**Verification:**
- `npm run build` passes (Tailwind compiles with the new plugin)

---

#### Phase 5: Update the Listing Page (`app/field-notes/page.tsx`)

**Files to modify:**
- `app/field-notes/page.tsx`

**Changes:**
- Import `getAllFieldNotes` instead of the `fieldNotes` array
- Call `const notes = getAllFieldNotes()` (sync, Server Component)
- Update card links: for notes with `externalUrl`, link externally (keep existing external link pattern); for notes without, link to `/field-notes/${note.slug}`
- Keep all existing styling/structure (BlueprintCorners, badges, AnimatedSection)

**Verification:**
- `npm run build` passes
- `/field-notes` page renders with cards linking to correct destinations

---

#### Phase 6: Create the Detail Page (`app/field-notes/[slug]/page.tsx`)

**Files to create:**
- `app/field-notes/[slug]/page.tsx`

**Changes:**
- Implement `generateStaticParams()` following the `book-a-call/[variant]` pattern — returns all slugs from `getAllFieldNotes()`
- Implement `generateMetadata()` — returns title, description, and OG tags from the note's frontmatter
- Page component:
  - Calls `getFieldNoteBySlug(slug)`, returns `notFound()` if null
  - Wraps content in `AnimatedSection` with the standard page structure
  - Header: bp-label "Field Notes", title (h1, `font-headline` uppercase), date, tags (badges), optional "Open Source" / repo link
  - Body: renders `contentHtml` inside a `<div>` with `prose` classes, customized for the dark theme
  - Back link to `/field-notes`
  - Optionally a CTA block at the bottom (matching Services/How We Work pattern)

**Verification:**
- `npm run build` passes
- `/field-notes/ai-playbook-smbs` renders with article content
- 404s for invalid slugs

---

#### Phase 7: Update the Homepage Preview (`src/components/sections/field-notes-preview.tsx`)

**Files to modify:**
- `src/components/sections/field-notes-preview.tsx`

**Changes:**
- Import `getAllFieldNotes` instead of the `fieldNotes` array
- Call `const notes = getAllFieldNotes()` — this component is used in a Server Component context (homepage)
- Update card links: internal notes link to `/field-notes/${note.slug}`, external notes keep external URL pattern
- Slice to first 3 (same as current behavior)

**Verification:**
- Component renders correctly when re-enabled on homepage

---

#### Phase 8: Re-enable Field Notes Across the Site

**Files to modify:**
- `app/page.tsx` — uncomment the `FieldNotesPreview` import and usage (restore it between ManifestoSection/PillarsSection and the CTA block)
- `src/components/layout/nav-links.ts` — uncomment the Field Notes nav link
- `app/sitemap.ts` — uncomment the `/field-notes` entry, and add entries for each individual field note page using `getAllFieldNotes()` to generate URLs

**Verification:**
- `npm run build` succeeds
- Nav shows "Field Notes" link
- Sitemap includes `/field-notes` and all individual note URLs
- Homepage shows the Field Notes preview section

---

#### Phase 9: Final Verification

**Run:**
- `npm run type-check` — no TypeScript errors
- `npm run lint` — no linting errors
- `npm run build` — full production build succeeds
- Manual spot-check:
  - `/field-notes` listing page renders all notes
  - Clicking a card navigates to `/field-notes/[slug]`
  - Article content renders with proper typography styling
  - Back link works
  - External links (e.g., repo) open in new tab
  - Mobile responsiveness (320px+)
  - Nav, footer, sitemap all reference field-notes correctly

---

### 5. Critical Files Reference

| File | Action | Purpose |
|---|---|---|
| `content/field-notes/*.md` | **Create** | Markdown article content with YAML frontmatter |
| `src/lib/field-notes.ts` | **Rewrite** | Data layer: parse MD files, expose `getAllFieldNotes` / `getFieldNoteBySlug` |
| `app/field-notes/page.tsx` | **Modify** | Listing page uses new data layer |
| `app/field-notes/[slug]/page.tsx` | **Create** | Individual article detail page |
| `src/components/sections/field-notes-preview.tsx` | **Modify** | Homepage preview uses new data layer |
| `app/page.tsx` | **Modify** | Uncomment FieldNotesPreview |
| `src/components/layout/nav-links.ts` | **Modify** | Uncomment Field Notes nav link |
| `app/sitemap.ts` | **Modify** | Uncomment + add individual note URLs |
| `tailwind.config.ts` | **Modify** | Add `@tailwindcss/typography` plugin with dark theme customization |
| `package.json` | **Modify** | Add `gray-matter`, `remark`, `remark-html`, `@tailwindcss/typography` |
