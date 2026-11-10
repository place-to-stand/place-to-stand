# Design system

Every structural space, text size, colour and accent line on the site comes from a named role. Pages never pick
raw numbers for these. To change how the site looks, change a role's value in `app/globals.css`, and every page
follows.

Breakpoints: **phone** (below 768px), **tablet** (`md`, 768px up), **laptop** (`lg`, 1024px up). All structural
values sit on the 24px grid (12px half steps for fine structure); see the grid rule in `CLAUDE.md`.

## Spacing roles

Defined as `--space-*` in `app/globals.css` (one value per breakpoint) and exposed to Tailwind as `--spacing-*`, so
they work with any spacing utility: `pt-page-start`, `gap-section`, `p-card`, `py-band`, …

| Role         | Phone / Tablet / Laptop | Use                                                                                                                                    |
| ------------ | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `page-top`   | 36 / 48 / 72            | Under the fixed nav to a page's first content (and the home hero)                                                                      |
| `page-start` | nav height + page-top   | `<main>` top padding on every page (the nav is fixed over the page)                                                                    |
| `section`    | 96 / 144 / 168          | Between two sections, content to content; also a page's end (`pb-…`)                                                                   |
| `edge`       | 72 / 96 / 120           | Last content to the closing callout's dots; home hero line to sections                                                                 |
| `header`     | 48 / 72 / 96            | A page header to the content in the same section                                                                                       |
| `stack`      | 48 / 48 / 72            | A section's heading group to its cards, list or form                                                                                   |
| `intro`      | 12 / 12 / 24            | A heading group to its intro paragraph                                                                                                 |
| `label`      | 36 / 36 / 48            | A lone label (no heading) to its content, e.g. "Trusted by" → logos                                                                    |
| `eyebrow`    | 24 / 24 / 24            | The small label above a title, to that title                                                                                           |
| `grid-half`  | 12                      | Tight structural pairs                                                                                                                 |
| `card`       | 24 / 24 / 36            | Inner padding of cards and panels                                                                                                      |
| `callout`    | 24 / 48 / 72            | Inner padding of the dotted callout box                                                                                                |
| `band-pad`   | 48 / 72 / 84            | A light or dark `Band`'s own top and bottom padding: half the section gap, so a tone change still puts one section gap between content |
| `band`       | 84 / 108 / 108          | Depth of the callout's dots above and below its box                                                                                    |

Cards in a grid sit `grid-1` (24px) apart. Raw grid tokens (`grid-half` … `grid-8`) stay available for anything
that is not one of these roles.

### Who owns the space

- **The page owns the gaps between sections.** A page stacks its sections in `flex flex-col gap-section` and ends
  with `pb-edge` before a closing callout or `pb-section` before the footer. Sections themselves have no outer
  padding.
- **Text is trimmed to its letters.** Headings, paragraphs and labels use `text-box: trim-both cap alphabetic`, so a
  48px gap is 48px from the baseline above to the cap height below. Firefox does not support this yet and keeps the
  normal leading, which looks a few px looser but never breaks. The home hero headline is untrimmed so its corner
  marks keep their size.

## Type roles

Utilities defined with `@utility` in `app/globals.css`. Size, weight, leading, tracking and colour come with the
role; add only layout classes (margins, max-width, `text-balance`, `uppercase`).

| Role                 | Size (phone / tablet up) | Weight | Use                                                               |
| -------------------- | ------------------------ | ------ | ----------------------------------------------------------------- |
| `type-page-title`    | 36 / 60                  | Bold   | The `h1` of an inner page                                         |
| `type-section-title` | 36 / 48                  | Bold   | Section and callout headings                                      |
| `type-card-title`    | 20                       | Semi   | Card, panel, step and list-item headings                          |
| `type-intro`         | 16 / 18, muted           | Normal | The paragraph under a page/section title                          |
| `type-lead`          | 16 / 18, text colour     | Normal | Reading text one step up: blog bodies, statements, quotes in copy |
| `type-stat`          | 48 / 60                  | Bold   | Big numbers in stat tiles                                         |
| `type-quote`         | 30 / 48                  | Semi   | Pull quotes                                                       |
| body (`text-base`)   | 16                       | Normal | Reading text                                                      |
| `bp-label`           | mono 14, caps, accent    | Medium | The small label above a heading                                   |
| `type-fine`          | mono 12, caps, muted     | Normal | Short fine print and tags only                                    |

The home hero headline is the one exception: it is sized to the window.

Type floor (from `CLAUDE.md`): reading text is 16px, never below 14px; 12px only for short mono lines.

## Colours

| Token              | Value                                     | Use                                                |
| ------------------ | ----------------------------------------- | -------------------------------------------------- |
| `bg`               | `#0e0f11`                                 | Page background                                    |
| `bg-card`          | `#1a1b1f`                                 | Cards, the callout box, accordion rows             |
| `bg-elevated`      | `#242529`                                 | Hover state of cards                               |
| `bg-panel`         | `rgba(22, 24, 28, 0.88)`                  | Translucent panels over the dot grid (audit)       |
| `text`             | `#e8e6e3`                                 | Headings and primary text                          |
| `text-muted`       | `#a8a8ac`                                 | Secondary text, intros                             |
| `accent`           | `#b5f542`                                 | Labels, links, primary buttons, strong lines       |
| `accent-subtle`    | accent at 40% (ink at 40% on light bands) | Subtle accent lines: borders, rings, underlines    |
| `accent-line`      | lime, ink on light bands                  | Bullets, link bars and underlines, button outlines |
| `accent-muted`     | accent at 15%                             | Accent-tinted backgrounds                          |
| `accent-secondary` | `#b4b4b4`                                 | Pillar card text                                   |
| `border`           | `#2a2b30`                                 | Dividers and card borders                          |
| `border-light`     | `#3a3b40`                                 | Lighter dividers                                   |
| `line`             | `#6e7078`                                 | Schematic line-work in drawings                    |

No gradients; solid colours only.

### Light bands

Pages mix dark and light bands. Wrap reading sections in `<Band tone='light'>` (and proof or set pieces in
`<Band tone='dark'>`). The light band redefines the colour tokens above (`bg` #f4f3ef, `bg-card` white, `text`
#0e0f11, `text-muted` #55565c, light borders), so components need no light variants. Lime never carries text on
light: labels get a lime marker with black text, and accent-coloured text turns black with a lime underline. A
band pads itself by the `section` role top and bottom.

### Links

Every text link is one of three roles, defined once in `app/globals.css`:

| Role        | Class                                        | Looks like                                                                                                                                   | Use                                                                                                    |
| ----------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Nav link    | `link-nav`                                   | Mono caps 12px, muted; on hover the text lightens and an accent bar slides in under it; the current page keeps the bar                       | Header, footer, fine print, phone menu Login                                                           |
| Action link | `link-action` (or `ArrowLink` / `AuditLink`) | Mono caps 12px in the text colour, no line at rest, the same sliding bar as nav links on hover with the arrow nudging 3px right, never wraps | Standalone links: "See the platform →", "Read the case study →", "Visit site ↗", "Take the free audit" |
| Inline link | `link-inline`                                | Text-colour words with a thin, quiet underline (text colour at 35%), turning to the accent line on hover; wraps with the sentence            | Links inside paragraphs: body copy, blog posts, legal pages, fine print under forms                    |

Profile icons (LinkedIn, GitHub, Clutch, X, Instagram) are the nav link role's icon variant: `SocialIcon` with the `link-icon` class, a 14px monochrome glyph in a 24px hit area, muted, turning to the accent line on hover. Used on the About founder rows and the footer bar.

Cards that are links (client photos, stat tiles, blog rows) are not text links: they react as a whole and keep their own hover. The phone menu's page list uses large headline type for touch.

### Accent on light bands

Lime only appears on light bands as a fill behind dark text: the label marker and the primary button. Lines, bullets, underlines and focus rings use `accent-line`, which is lime on dark bands and ink on light ones, so a component never needs a light variant.

### Accent lines

Two strengths only: **`accent-subtle`** for borders, focus rings and link underlines, and **`accent`** (strong) for
active states, the corner marks and highlighted panels. Do not use other opacities (`border-accent/50` etc.).

## Components

All in `src/components/layout/`.

- **`Section`** (`section.tsx`): a page section with no outer padding. Takes everything `AnimatedSection` does.
- **`PageHeader`** (`section.tsx`): label, title, optional intro and `meta` line, with the blueprint dots behind it.
  Put it first in the page's first section, followed by `gap-header`.
- **`Band`** and **`SectionHeading`** (`section.tsx`): a full-width light or dark band of sections, and a
  section's label + h2 + intro group.
- **`CtaBand`** (`cta-band.tsx`): the closing "Find where to start" callout. Put it last in `<main>`, after a block
  ending in `pb-edge`. Takes `location` (analytics) and optional `title` and `description`.

A typical inner page:

```tsx
<main className='flex-1 pt-page-start'>
  <div className='flex flex-col gap-section pb-edge'>
    <Section priority className='flex flex-col gap-header'>
      <PageHeader label='Services' title='What we build' intro='…' />
      {/* content */}
    </Section>
    <Section>{/* another section */}</Section>
  </div>
  <CtaBand location='services-cta-block' />
</main>
```

## Calls to action

One shared definition in `src/components/layout/cta.tsx`, so every place matches:

- **`BookCallButton`**: the lime "Book a call" button. Goes to `/contact`; only the Contact page opens the calendar (`toCalendar`). Header uses the small size, everywhere else large.
- **`AuditLink`**: the "Take the free audit" action link, never a button.
- **`BookCallGroup`**: the button with "or Take the free audit" centred under it (24px gap, 12px mono caps, "or" muted). Used in the hero and every closing band.

## Motion

All hovers read three settings in `app/globals.css`:

| Setting        | Value    | Used by                                                      |
| -------------- | -------- | ------------------------------------------------------------ |
| `--link-dur`   | 180ms    | Nav, action and inline links, icon links, button text colour |
| `--hover-dur`  | 250ms    | Primary button fill slide, secondary button outline draw     |
| `--hover-ease` | ease-out | All of the above                                             |
| `--spin-dur`   | 550ms    | Logo spin (overshoot easing, plays once per hover)           |

Everything respects `prefers-reduced-motion`.

## Logo

`LogoLockup` (`src/components/layout/logo-mark.tsx`) is the mark + name, used in the header (a link home) and footer. On hover or keyboard focus the outline and the inner square each turn 180° in opposite directions with a small overshoot, always finishing the turn.

## Checks

`npm run lint` runs the design rules in `eslint/rules/design.mjs` (tests in `eslint/tests/`): no raw spacing above 8px micro-spacing, no raw text sizes outside the type roles (12px mono labels allowed), no raw colours, every text link on a link role, and pages build sections from `Section` / `PageHeader` / `Band` / `CtaBand`. Deliberate exceptions carry an `eslint-disable-next-line` comment saying why.

See every token and component live at `/design`. It is public so it can be shared with clients, but it is `noindex` and left out of the sitemap and `llms.txt`. It is deliberately not disallowed in `robots.txt`: crawlers have to fetch the page to see the noindex.
