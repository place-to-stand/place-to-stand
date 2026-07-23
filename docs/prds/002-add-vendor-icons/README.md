# PRD 002 — Add Vendor Technology Icons

## Implementation Plan: Vendor Technology Icons Section

### 1. Context

The agency wants to showcase the independent vendor technologies it uses (Anthropic, OpenAI, Vercel, Supabase, Cloudflare, Resend, Shopify) to establish technical credibility. This will appear as:

- A new section on the **homepage** (`app/page.tsx`)
- A new section on the **How We Work** page (`app/how-we-work/page.tsx`)

Both pages will use a shared, reusable component. The design must follow the existing dark blueprint theme — monochrome/muted vendor logos, grid-aligned spacing, `BlueprintCorners`, `AnimatedSection`/`Reveal` patterns.

### 2. Design Decisions

| Decision                     | Choice                                                                                            | Rationale                                                                                                                                                   |
| ---------------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Icon format**              | Inline SVG React components in a single file                                                      | No external deps needed; keeps icons crisp at any size; follows the same pattern as `lucide-react` icons used elsewhere; allows easy `currentColor` theming |
| **Icon color treatment**     | Monochrome (`text-text-muted` / `text-accent-secondary`) with optional subtle `hover:text-accent` | Consistent with the dark blueprint aesthetic; avoids colorful logos clashing with the muted palette; shows vendors as tools, not sponsors                   |
| **Data structure**           | Array of vendor objects in a dedicated `src/lib/vendors.ts` file                                  | Mirrors the pattern of `src/lib/services.ts`, `src/lib/team.ts` — data lives in `src/lib/`, components in `src/components/sections/`                        |
| **Section layout**           | Horizontal logo bar with bp-label, single row on desktop, wrapping grid on mobile                 | Similar to "trust bar" patterns; lightweight, doesn't compete with other sections. Uses `AnimatedSection` + `Reveal` like all other sections                |
| **Section component**        | Single `<TechStackSection />` with an optional `variant` prop for homepage vs how-we-work styling | Reusable component; both pages can render it with minor contextual differences (e.g., heading text)                                                         |
| **Placement on homepage**    | After `ManifestoSection` (the "Who We Are" section), before `ServicesPreview`                     | The "Who We Are" section introduces the team's AI-native approach — the tech stack logically follows as proof of the tools they wield                       |
| **Placement on How We Work** | After the process steps and before `PhasesSection`                                                | The process narrative describes automated execution with frontier models — the vendor strip backs that claim with concrete tooling                          |

### 3. Architecture Overview

```
src/lib/vendors.ts              — Vendor data (name, url, description)
src/components/icons/vendor-icons.tsx  — SVG icon components for each vendor
src/components/sections/tech-stack-section.tsx — Reusable section component
app/page.tsx                     — Add <TechStackSection /> to homepage
app/how-we-work/page.tsx         — Add <TechStackSection /> to How We Work
```

### 4. Implementation Phases

#### Phase 1: Create vendor data file

**File:** `src/lib/vendors.ts`

Create a typed array of vendor objects:

```ts
export type Vendor = {
  name: string
  url: string
  description: string // short tooltip/aria text
}
```

Seven entries: Anthropic, OpenAI, Vercel, Supabase, Cloudflare, Resend, Shopify. Each with official URLs and a one-line description of what the agency uses them for (e.g., "AI reasoning & code generation", "Edge hosting & serverless", "Postgres database & auth", etc.).

**Verification:** `npx tsc --noEmit` passes.

#### Phase 2: Create vendor SVG icon components

**File:** `src/components/icons/vendor-icons.tsx`

Create a set of lightweight SVG React components, one per vendor. Each component:

- Accepts standard `SVGProps<SVGSVGElement>` (so consumers can pass `className`, `aria-hidden`, etc.)
- Uses `currentColor` as `fill` for monochrome theming
- Renders the recognizable logomark (not wordmark) of each vendor
- Exports a mapping record: `vendorIcons: Record<string, React.FC<SVGProps<SVGSVGElement>>>` keyed by vendor name

This mirrors the pattern in `src/lib/service-icons.ts` (a `Record<string, LucideIcon>` mapping), except with custom SVGs instead of Lucide imports.

**Verification:** `npx tsc --noEmit` passes; icons render correctly when imported.

#### Phase 3: Create the `TechStackSection` component

**File:** `src/components/sections/tech-stack-section.tsx`

Structure (follows the exact conventions of existing sections like `ManifestoSection`, `PillarsSection`):

```
Server component that renders:
  <AnimatedSection>
    <div className="flex flex-col gap-12">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Reveal index={0}>
          <span className="bp-label font-mono">{label}</span>
          <h2>...</h2>
        </Reveal>
        <Reveal index={1}>
          <p>subtitle text</p>
        </Reveal>
      </div>

      {/* Vendor logo strip */}
      <Reveal index={2}>
        <div — border/bg-card panel with BlueprintCorners>
          <div — responsive grid/flex of vendor icons>
            {vendors.map(vendor => (
              <a href={vendor.url} target="_blank" rel="noreferrer noopener">
                <VendorIcon className="..." />
                <span className="sr-only">{vendor.name}</span>
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  </AnimatedSection>
```

Props:

- `heading?: string` — defaults to something like `"Our Tech Stack"`
- `subtitle?: string` — defaults to a description of the tooling philosophy
- `className?: string` — passed to `AnimatedSection`

Layout details:

- Grid: `grid grid-cols-3 gap-px border border-border bg-border sm:grid-cols-4 md:grid-cols-7` — mimics the `gap-px bg-border` pattern used in `PhasesSection` and `ManifestoSection` for the inner-grid look
- Each cell: `bg-bg-card p-6 flex items-center justify-center` — icon centered, with vendor name below in `font-mono text-[10px] uppercase tracking-wider text-text-muted`
- Icons sized at `h-8 w-8` in `text-text-muted`, with `transition-colors hover:text-accent`
- Outer wrapper gets `<BlueprintCorners size={16} />`

**Verification:** `npx tsc --noEmit` passes; visually inspect in dev with `npm run dev`.

#### Phase 4: Add section to homepage

**File:** `app/page.tsx`

- Import `TechStackSection` from `@/src/components/sections/tech-stack-section`
- Place `<TechStackSection />` after `<ManifestoSection />` and before `<ServicesPreview />`

This positions the vendor trust bar right after the "Who We Are" narrative about AI-native engineering, creating a natural flow: _who we are → what tools we use → what we build_.

**Verification:** `npm run dev` — homepage renders correctly, section animates on scroll, grid alignment checked against dot grid.

#### Phase 5: Add section to How We Work page

**File:** `app/how-we-work/page.tsx`

- Import `TechStackSection`
- Place it between the process steps `AnimatedSection` and `<PhasesSection />`
- Optionally pass a custom `heading` or `subtitle` if the context calls for different copy (e.g., "Tools We Use" vs. "Our Tech Stack")

**Verification:** `npm run dev` — How We Work page renders correctly.

#### Phase 6: Final QA

- Run `npm run lint` — no errors
- Run `npx tsc --noEmit` — type-check passes
- Run `npm run build` — production build succeeds
- Responsive testing: check at 320px, 768px, 1200px+ viewports
- Verify grid alignment: container stays at `max-w-content`, gutters at `px-6 lg:px-12`, structural spacing uses grid tokens
- Check `prefers-reduced-motion`: animations should respect `reduced` context from `AnimatedSection`
- Accessibility: each vendor link has meaningful `aria-label`, icons have `aria-hidden`, links open in new tab with `rel="noreferrer noopener"`

### 5. Critical Files Reference

| File                                             | Action     | Purpose                                           |
| ------------------------------------------------ | ---------- | ------------------------------------------------- |
| `src/lib/vendors.ts`                             | **Create** | Vendor data (name, url, description)              |
| `src/components/icons/vendor-icons.tsx`          | **Create** | SVG icon components for 7 vendors                 |
| `src/components/sections/tech-stack-section.tsx` | **Create** | Reusable tech stack section component             |
| `app/page.tsx`                                   | **Modify** | Add `<TechStackSection />` after ManifestoSection |
| `app/how-we-work/page.tsx`                       | **Modify** | Add `<TechStackSection />` after process steps    |

### Notes

- The SVG icons should be sourced from official brand assets / Simple Icons. Each vendor's logomark is well-established and recognizable at small sizes. Only the logomark (symbol) is needed, not the full wordmark — the vendor name will be displayed as text below each icon.
- All icons use `currentColor` so they inherit the monochrome color scheme via Tailwind classes, keeping the blueprint aesthetic intact.
- The vendor name text below each icon doubles as identification for visitors who may not recognize a logomark on its own.
