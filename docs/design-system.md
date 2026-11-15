# Design system

Every structural space, text size, color and accent line on the site comes from a named role. Pages never pick
raw numbers for these. To change how the site looks, change a role's value in `app/globals.css`, and every page
follows.

Breakpoints: **phone** (below 768px), **tablet** (`md`, 768px up), **laptop** (`lg`, 1024px up). All structural
values sit on the 24px grid (12px half steps for fine structure); see the grid rule in `CLAUDE.md`.

## Tiers

The system is six tiers, each built only from the one below. `npm run lint` enforces the import direction for
`src/components` (pages are not restricted yet).

| Tier          | Where                        | What                                                                               |
| ------------- | ---------------------------- | ---------------------------------------------------------------------------------- |
| 1. Tokens     | `app/globals.css`            | Color, type, spacing, stroke, radius, shadow, stacking, motion                     |
| 2. Primitives | `src/components/primitives/` | Buttons, inputs, links and CTA, logo, social icons, reveal                         |
| 3. Boxes      | `src/components/boxes/`      | Card, LinkCard, StatTile, Callout, Panel, RuledRow/List, SideNote, Chip            |
| 4. Patterns   | `src/components/patterns/`   | Section scaffolding, headings, arrow link, tag row, drawings, logo wall, UI pieces |
| 5. Sections   | `src/components/sections/`   | Page-level blocks with named variants and a fixed tone                             |
| 6. Templates  | `src/components/templates/`  | Whole-page layouts that pages render                                               |

## 1. Tokens

### Spacing roles

Defined as `--space-*` in `app/globals.css` (one value per breakpoint) and exposed to Tailwind as `--spacing-*`, so
they work with any spacing utility: `pt-page-start`, `gap-section`, `p-card`, `py-band`, …

| Role         | Phone / Tablet / Laptop | Use                                                                                                                                    |
| ------------ | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `page-top`   | 36 / 48 / 72            | Under the fixed nav to a page's first content (and the home hero)                                                                      |
| `page-start` | nav height + page-top   | `<main>` top padding on every page (the nav is fixed over the page)                                                                    |
| `section`    | 96 / 144 / 192          | Between two sections, content to content; also a page's end (`pb-…`)                                                                   |
| `edge`       | 72 / 96 / 120           | Last content to the closing callout's dots; home hero line to sections                                                                 |
| `header`     | 48 / 72 / 96            | A page header to the content in the same section                                                                                       |
| `stack`      | 48 / 48 / 72            | A section's heading group to its cards, list or form                                                                                   |
| `intro`      | 12 / 12 / 24            | A heading group to its intro paragraph                                                                                                 |
| `label`      | 36 / 36 / 48            | A lone label (no heading) to its content, e.g. "Trusted by" → logos                                                                    |
| `eyebrow`    | 24 / 24 / 24            | The small label above a title, to that title                                                                                           |
| `grid-half`  | 12                      | Tight structural pairs                                                                                                                 |
| `card`       | 24 / 24 / 36            | Inner padding of cards and panels                                                                                                      |
| `callout`    | 24 / 48 / 72            | Inner padding of the dotted callout box                                                                                                |
| `band-pad`   | 48 / 72 / 96            | A light or dark `Band`'s own top and bottom padding: half the section gap, so a tone change still puts one section gap between content |
| `band`       | 72 / 96 / 96            | Depth of the callout's dots above and below its box                                                                                    |

Cards in a grid sit `grid-1` (24px) apart. Raw grid tokens (`grid-half` … `grid-8`) stay available for anything
that is not one of these roles.

#### Who owns the space

- **The page owns the gaps between sections.** A page stacks its sections in `flex flex-col gap-section` and ends
  with `pb-edge` before a closing callout or `pb-section` before the footer. Sections themselves have no outer
  padding.
- **Text is trimmed to its letters.** Headings, paragraphs and labels use `text-box: trim-both cap alphabetic`, so a
  48px gap is 48px from the baseline above to the cap height below. Firefox does not support this yet and keeps the
  normal leading, which looks a few px looser but never breaks. The home hero headline is untrimmed so its corner
  marks keep their size.

### Type roles

Utilities defined with `@utility` in `app/globals.css`. Size, weight, leading, tracking and color come with the
role; add only layout classes (margins, max-width, `text-balance`, `uppercase`).

| Role                 | Size (phone / tablet up) | Weight | Use                                                               |
| -------------------- | ------------------------ | ------ | ----------------------------------------------------------------- |
| `type-page-title`    | 36 / 60                  | Bold   | The `h1` of an inner page                                         |
| `type-section-title` | 36 / 48                  | Bold   | Section and callout headings                                      |
| `type-card-title`    | 20                       | Semi   | Card, panel, step and list-item headings                          |
| `type-intro`         | 16 / 18, muted           | Normal | The paragraph under a page/section title                          |
| `type-lead`          | 16 / 18, text color      | Normal | Reading text one step up: blog bodies, statements, quotes in copy |
| `type-stat`          | 48 / 60                  | Bold   | Big numbers in stat tiles                                         |
| `type-quote`         | 30 / 48                  | Semi   | Pull quotes                                                       |
| `type-voice`         | 22 / 28, text color      | Light  | Proposed (Nov 15), not yet in use: spoken words, first “ hung     |
| body (`text-base`)   | 16                       | Normal | Reading text                                                      |
| `bp-label`           | mono 14, caps, accent    | Medium | The small label above a heading                                   |
| `type-fine`          | mono 12, caps, muted     | Normal | Short fine print and tags only                                    |

The home hero headline is the one exception: it is sized to the window.

`type-voice` (proposed Nov 15, not yet used on any page; shown on /design): things people say, set apart from both body text and
headings. Plex Sans Light, balanced lines, and a `-0.4em` first-line indent so the opening “ hangs in the margin
and the words line up with the label above. Lead each block with “. Keep it one level below the section title and
above everything else in its section; don't pair it with bold item titles or boxes.

Type floor (from `CLAUDE.md`): reading text is 16px, never below 14px; 12px only for short mono lines.

### Colors

| Token              | Value                                                | Use                                                |
| ------------------ | ---------------------------------------------------- | -------------------------------------------------- |
| `bg`               | `#0e0f11`                                            | Page background                                    |
| `bg-card`          | `#1a1b1f`                                            | Cards, the callout box, accordion rows             |
| `bg-elevated`      | `#242529`                                            | Hover state of cards                               |
| `bg-panel`         | `rgba(22, 24, 28, 0.88)`                             | Translucent panels over the dot grid (audit)       |
| `text`             | `#e8e6e3`                                            | Headings and primary text                          |
| `text-muted`       | `#a8a8ac`                                            | Secondary text, intros                             |
| `accent`           | `#b5f542`                                            | Labels, links, primary buttons, strong lines       |
| `accent-subtle`    | accent at 60% (#b5f54299; ink at 40% on light bands) | Subtle accent lines: borders, rings, underlines    |
| `accent-line`      | lime, ink on light bands                             | Bullets, link bars and underlines, button outlines |
| `accent-muted`     | accent at 15%                                        | Accent-tinted backgrounds                          |
| `accent-secondary` | `#b4b4b4`                                            | Pillar card text                                   |
| `border`           | `#2a2b30`                                            | Dividers and card borders                          |
| `border-light`     | `#3a3b40`                                            | Lighter dividers                                   |
| `line`             | `#6e7078`                                            | Schematic line-work in drawings                    |

No gradients; solid colors only.

#### Light bands

Pages mix dark and light bands. Wrap reading sections in `<Band tone='light'>` (and proof or set pieces in
`<Band tone='dark'>`). The light band redefines the color tokens above (`bg` #f4f3ef, `bg-card` white, `text` #0e0f11,
`text-muted` #55565c, light borders), so components need no light variants. Lime never carries text on
light: labels get a lime marker with black text, and accent-colored text turns black with a lime underline. A
band pads itself by the `band-pad` role top and bottom.

#### Accent on light bands

Lime only appears on light bands as a fill behind dark text: the label marker and the primary button. Lines, bullets and underlines use `accent-line`, which is lime on dark bands and ink on light ones, so a component never needs a light variant.

#### Accent lines

Two strengths only: **`accent-subtle`** for borders, focus rings and link underlines, and **`accent`** (strong) for
active states and highlighted panels. The corner marks (2px) are solid: `accent-line`, lime on dark bands and ink on light ones. Do not use other opacities (`border-accent/50` etc.).

### Motion

Durations and easings are tokens by role in `app/globals.css`. Every animation and transition uses them, and
every one has a `prefers-reduced-motion` end state.

| Token             | Value                          | Role                                              |
| ----------------- | ------------------------------ | ------------------------------------------------- |
| `--motion-fast`   | 180ms                          | Links (`--link-dur`)                              |
| `--motion-base`   | 250ms                          | Hovers: button fill, outline draw (`--hover-dur`) |
| `--motion-enter`  | 500ms                          | One element arriving                              |
| `--motion-slow`   | 900ms                          | A drawing building                                |
| `--motion-spin`   | 550ms                          | The logo spin (`--spin-dur`)                      |
| `--ease-standard` | ease-out                       | Hovers (`--hover-ease`)                           |
| `--ease-enter`    | cubic-bezier(0.16, 1, 0.3, 1)  | Things arriving: fast start, long settle          |
| `--ease-in-out`   | cubic-bezier(0.65, 0, 0.35, 1) | Loops                                             |
| `--ease-exit`     | cubic-bezier(0.7, 0, 0.84, 0)  | Things leaving                                    |

#### Reference choreography: the Home hero intro

The hero intro is the site's motion reference (`sections/hero-section.tsx`, `.hero-*` in `globals.css`). New
page-load motion should follow its shape: decoration first, content in short staged steps, the drawing after.

| When             | What                                                                                                 |
| ---------------- | ---------------------------------------------------------------------------------------------------- |
| 0s               | Corner marks snap in (0.4s, ease-enter).                                                             |
| 0s, 0.12s, 0.24s | Each headline line settles 10px while a curtain slides off it (0.5s); text is opaque from frame one. |
| 0.85s            | The description rises 14px and fades in (0.6s).                                                      |
| 1s               | The buttons rise and fade in (0.6s).                                                                 |
| 0.8s on          | The drawing builds group by group (to 1.75s), bars grow from 1.9s, live detail at 3.2s.              |
| up to 3s         | Sections already in view under the hero wait for the intro before revealing.                         |
| reduced motion   | Every step shows its end state.                                                                      |

Scroll reveals (`Reveal`, `AnimatedSection`) slide sections in once as they enter the window.

### Strokes and drawings

Line drawings use two stroke weights and nothing else: `--stroke-structure` (1px) for line-work and `--stroke-emphasis` (2px) for what the eye should land on. Round caps, square corners, schematic lines in the `line` color, lime only on the result.

## 2. Primitives

### Calls to action

One shared definition in `src/components/primitives/cta.tsx`, so every place matches:

- **`BookCallButton`**: the lime "Book a call" button. Goes to the calendar embedded on Contact (`/contact#call`). Header uses the small size, everywhere else large.
- **Buttons** (`Button`, approved Nov 14): two kinds, both sized to their words (32px side padding at large size, no minimum width; full width only where a phone layout stacks them).
  - **Edges.** 2px at rest on every button (buttons are controls, so they take the emphasis stroke): the primary's is lime on dark and ink on light (`border-primary-edge`); the outline button's is the control gray on dark and ink on light (`border-button-edge`). Labels: ink on lime; the outline button's label is the text color on both bands, never lime on light.
  - **Hover and keyboard focus.** One left-to-right motion, in the button hover timing (250ms, ease-out): a 2px accent-line stroke draws over the edge (left side from its middle out, top and bottom left to right together, right side closing), and the primary's dark fill grows in from the left at the same time. On light bands the drawn ink stroke would land on an ink edge, so the outline button also fills ink from the left and its label turns light.
  - **Reduced motion** shows the end state at once.
- **`AuditLink`**: the "Take the free audit" action link, never a button.
- **`NoteLink`**: the "send us a note" action link, to the Contact message form (`/contact#message`).
- **`BookCallGroup`**: the button with one line centered under it (24px gap, 12px mono caps, "or" muted). `secondary` picks the line: `audit` ("or Take the free audit", the default), `note` ("or send us a note", the closing bands) or `none` (when a second button stands beside it).

### Links

Every text link is one of three roles, defined once in `app/globals.css`:

| Role        | Class                                        | Looks like                                                                                                                                  | Use                                                                                                    |
| ----------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Nav link    | `link-nav`                                   | Mono caps 12px, muted; on hover the text lightens and an accent bar slides in under it; the current page keeps the bar                      | Header, footer, fine print, phone menu Login                                                           |
| Action link | `link-action` (or `ArrowLink` / `AuditLink`) | Mono caps 12px in the text color, no line at rest, the same sliding bar as nav links on hover with the arrow nudging 3px right, never wraps | Standalone links: "See the platform →", "Read the case study →", "Visit site ↗", "Take the free audit" |
| Inline link | `link-inline`                                | Text-color words with a thin, quiet underline (text color at 35%), turning to the accent line on hover; wraps with the sentence             | Links inside paragraphs: body copy, blog posts, legal pages, fine print under forms                    |

Profile icons (LinkedIn, GitHub, Clutch, X, Instagram) are the nav link role's icon variant: `SocialIcon` with the `link-icon` class, a 16px monochrome glyph in a 24px hit area, muted, turning to the accent line on hover. Used on the About founder rows and the footer bar.

Cards that are links (client photos, stat tiles, blog rows) are not text links: they react as a whole and keep their own hover. The phone menu's page list uses large headline type for touch.

### Logo

`LogoLockup` (`src/components/primitives/logo-mark.tsx`) is the mark + name, used in the header (a link home) and footer. The outer square uses the emphasis stroke (2px) in solid `accent`, the same lime as the inner square, so the mark follows the drawing rule. On hover or keyboard focus the outline and the inner square each turn 180° in opposite directions with a small overshoot, always finishing the turn.

## 3. Boxes

Every box on the site is one of the components in `src/components/boxes`, and each one owns its stroke. Box lines are 1px; 2px is only for selected and focus states. Pages never draw a border themselves: `design/no-raw-border` fails lint outside the boxes, site chrome (header, footer, hero rule, logo), form controls, the audit tool and /design.

| Component              | Stroke                                                              | Fill       | Use for                                                 |
| ---------------------- | ------------------------------------------------------------------- | ---------- | ------------------------------------------------------- |
| `Card`                 | 1px `border`                                                        | `bg-card`  | Modules, steps, facets, after-launch, anything compared |
| `LinkCard`             | 1px `border`; hover changes fill only                               | `bg-card`  | A whole card that is one link (Contact options)         |
| `StatTile`             | a `Card`                                                            | `bg-card`  | A number and what it counts, everywhere                 |
| `Callout`              | none; 20px corner marks, 2px solid `accent-line` (`band` adds dots) | `bg-card`  | The page's one ask, a quote, the newsletter box         |
| `Panel`                | none                                                                | `bg-panel` | Holds a form or a tool (contact form, audit results)    |
| `RuledRow`/`RuledList` | 1px top rule in `rule` (accent only for ownership)                  | none       | Lists of rows: steps, FAQ, posts, legal clauses         |
| `SideNote`             | 2px left bar in `accent-line` (the emphasis stroke)                 | none       | A short aside: the billing promise, the proof line      |
| `Chip`                 | 1px `border`                                                        | none       | Short tags: tools, clients, a rank                      |

`rule` is one color per tone: `#2a2b30` on dark, `#cbcac4` on light.

## 4. Patterns

The page scaffolding in `patterns/section.tsx`:

- **`Section`** (`section.tsx`): a page section with no outer padding. Takes everything `AnimatedSection` does.
- **`PageHeader`** (`section.tsx`): label, title, optional intro and `meta` line, with the blueprint dots behind it.
  Put it first in the page's first section, followed by `gap-header`.
- **`Band`** and **`SectionHeading`** (`section.tsx`): a full-width light or dark band of sections, and a
  section's label + h2 + intro group.
- **`CtaBand`** (`sections/cta-band.tsx`): the closing callout. Default title "Tell us where it hurts most." with Book a
  call and "or send us a note" under it. Put it last in `<main>`, after a block ending in `pb-edge`. Takes `location`
  (analytics) and optional `title`, `description`, and `secondary` (`{ label, href }`): a second outline button beside
  Book a call in place of the note line (Portal: "See the code").

Other patterns:

- **`UiPiece`** (`patterns/ui-piece.tsx`): one piece of real UI lifted out of a screen, enlarged and layered on the
  blueprint (Guidelines > Imagery). Takes `alt`, `caption`, `width` (`sm`, `md`, `lg`, `full`) and `compact`; the
  children are the piece's HTML. The pieces themselves live in `patterns/pieces/`, one file per source
  (`heatonist.tsx`, `platform.tsx`, `portal.tsx`): plain HTML made of site tokens, sample data only, no links,
  buttons or headings inside.
- **`MediaFrame`** (`patterns/media-frame.tsx`): the one frame for photos (Guidelines > Imagery).
- **`TeamChat`** (`patterns/team-chat.tsx`): a short team chat in our own plain chat UI (no real product's look or
  name): a header with where it happens and how many people are in it, then messages with an initials avatar, name, role,
  time, and optional reactions and replies; a "New" divider above one message and a typing line at the end are
  optional. Messages appear one by one on first view; reduced motion shows them at once. Used by Home's warning
  signs, one chat per place, with the fix under each in a `SideNote`.
- **`SplitSection`** (`patterns/split-section.tsx`, proposed Nov 15, not yet used on any page; shown on /design): the asymmetric
  split. The aside (usually a `SectionHeading`) takes columns 1-5 and sticks under the nav; the content takes columns
  7-12, with column 6 left as air (at 1440: 546px, a 138px gap, 636px). Below `lg` they stack and nothing sticks.
  Use it for one statement plus a long run of content, not for equal pieces (a grid of `Card`s).
- **`ALT_ROW`** (`patterns/alt-row.ts`): the shared grid for a big image beside its text, switching sides each row
  (About's founders).

A typical inner page:

```tsx
<main className='flex-1 pt-page-start'>
  <div className='flex flex-col gap-section pb-edge'>
    <Hero
      variant='page'
      sectionClassName='flex flex-col gap-header'
      label='Services'
      title='What we build'
      intro='…'
    >
      {/* content */}
    </Hero>
    <Section>{/* another section */}</Section>
  </div>
  <CtaBand location='services-cta-block' />
</main>
```

## 5. Sections

Each section has named variants and a fixed tone (light or dark), so a page picks a section instead of composing
raw pieces. The tone is exported on the component (`StepsSection.tone`).

| Section                 | Variants                                                                                                   | Tone                                      |
| ----------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `Hero`                  | `home` (the Home hero), `page` (an inner page title)                                                       | dark                                      |
| `ClientLogosSection`    | one layout, under the Home hero                                                                            | dark                                      |
| `ProofSection`          | one layout (Home, `#results`): the Heatonist and Hot Ones copy beside four lifted-out pieces               | dark                                      |
| `SoundFamiliarSection`  | one layout (Home): three cards of clients' own words, each closed by what we build for it                  | light                                     |
| `WhoYouWorkWithSection` | one layout (Home): the promise beside the two founders                                                     | dark                                      |
| Offers (`offers.tsx`)   | detail only: `OfferDetail` (Run, Sell), `SeniorHelpSection`, `DataHomeSection`, each its own Platform band | the band it sits in (Platform alternates) |
| `ResultsSection`        | one layout: the Heatonist case study, featured at the top of Clients                                       | dark                                      |
| `StepsSection`          | `cards` (Home, with `showBilling`), `rows` (Process)                                                       | light                                     |
| `AfterLaunchSection`    | one layout (Platform, `#after-launch`)                                                                     | light                                     |
| `OwnershipSection`      | `full` (the six lines, Platform `#own`), `short` (Home)                                                    | dark                                      |
| `ClientsSection`        | one layout (Clients): grouped ruled rows, the group title in the left third                                | light                                     |
| `CtaBand`               | `call` (Book a call + note line, or a `secondary` button), `audit` (audit link only)                       | dark                                      |

Header, footer and the audit tool also live in `sections/`.

## 6. Templates

| Template                     | Page       | Layout                                                                                   |
| ---------------------------- | ---------- | ---------------------------------------------------------------------------------------- |
| `HomeTemplate`               | Home       | Hero, logos and proof, then light and dark bands of sections, closing band               |
| `OfferPageTemplate`          | Platform   | Hero, Run, Sell, Senior help, data and ownership, after launch, closing band             |
| `CaseStudyTemplate`          | Heatonist  | Hero with the numbers, spec rows, quote, the work beside lifted-out pieces, closing band |
| `ArticleShell`/`ArticleBody` | Blog posts | A shell shared by every post, and the post that streams into it                          |
| `ContactTemplate`            | Contact    | Hero with three ways in, the call, the audit, the message form                           |

Not templated yet: Process, About, Clients, Portal (`/platform/portal`), Referral, the blog list, Privacy, Terms, the audit and 404. They compose sections directly.

## Guidelines

Voice and Imagery are agreed. The others are not yet defined: each lists what the site does today, and the rules come once they are agreed.

### Imagery

Approved Nov 10:

1. **Color.** Natural. No filters on photos or screenshots; logos keep their one-color treatment.
2. **Shapes.** Three only, through MediaFrame: 16:10 for work, 1:1 for people, 21:9 for full-width moments.
3. **What goes where.** Photos show the client’s world. Screenshots show software we built, always in a frame. Drawings explain how something works, never decoration.
4. **Founder photos.** Matching light and background.
5. **Alt text.** Describe what the work shows; alt="" only for pure texture.

Approved Nov 13:

6. **Lifted-out pieces.** Client work and the portal are shown as lifted-out pieces of real UI (UiPiece): one piece of the screen, enlarged and layered on the blueprint, built as HTML, sample data only. No full-page screenshots or lifestyle photos in new sections.

Every photo, screenshot and video sits in `MediaFrame` (`patterns/media-frame.tsx`): `shape='work'` (16:10), `'person'` (1:1) or `'wide'` (21:9), with `wideFrom` to switch to 21:9 from a breakpoint up. `design/no-raw-aspect` fails any other aspect ratio; drawings that need their own box say so in a disable comment.

### Icons

Approved Nov 10.

1. **One set.** Lucide, through the `Icon` primitive (`primitives/icon.tsx`). Lint (`no-restricted-imports`) keeps `lucide-react` inside it.
2. **Sizes.** 16 beside text, 24 for a button that is only an icon (the menu). 48 for a rare feature spot. `<Icon icon={ArrowRight} size={24} />`; the default is 16.
3. **Lines.** A fixed width at every size (Lucide's `absoluteStrokeWidth`): 2px at 16 and 24 so small icons stay legible, 1px at 48 to match the drawings' structure lines.
4. **Where.** Only in working parts: forms, the audit, arrows, the menu. No icons as section decoration.
5. **Brand and social marks.** Their real shapes, in one color (`currentColor`): `SocialIcon` at 16px, `vendorIcons` in the stack. Vendor marks in the stack row are logos, not icons, and keep their 36px size.

Icons are `aria-hidden` by default; a button that is only an icon carries an `sr-only` label.

### Interaction states

Approved Nov 10.

1. **Focus.** One ring: 2px with a 2px gap, on keyboard focus only (`:focus-visible`). `--color-focus` is accent-subtle on dark bands and solid ink on light ones (`.theme-light`), so it reaches 3:1 on both (`npm run test:contrast`). The `focus-ring` utility is applied to every element by one base `:focus-visible` rule in `app/globals.css`; components don't set their own.
2. **Pressed.** Buttons move down 1px while pressed (`active:translate-y-px` in `Button`), nothing else.
3. **Disabled.** One look for every button variant and field: muted text (`text-text-muted`) on the muted line (`border-border`), no fill, `cursor-not-allowed`. Never faded with opacity.
4. **Loading.** `<Button loading={isPending} loadingLabel='Sending…'>`: the button disables itself and shows a 16px Lucide spinner in front of the loading label. The audit keeps its progress bar.
5. **Errors and success.** `FieldError` (`primitives/field-error.tsx`): one plain sentence right under its field, in `text-danger`, with `role='alert'`. Success replaces the form in place.

Lint: `design/no-raw-focus` fails `ring-*` and `outline-*` classes and `disabled:opacity-*` anywhere. An element focused only by script (the audit moves focus to each new question) says so in a disable comment.

### Accessibility

Approved Nov 10.

1. **The bar.** WCAG 2.2 AA on every page.
2. **Focus.** The one focus ring from Interaction states, 3:1 on dark and light bands.
3. **Skip to content.** `SkipLink` (`primitives/skip-link.tsx`) is the first element in `<body>`: the first Tab stop on every page, shown only on keyboard focus, jumping to `<main id='main'>`. Every page's `<main>` carries that id.
4. **Checked, not hoped.** `npm run test:a11y` (`scripts/a11y.mjs`) runs axe-core (WCAG 2.2 A and AA) on every page at 390 and 1440 and fails on serious or critical issues. It also fails a page without exactly one h1, a skipped heading level, an id used twice, or a skip link that isn't the first Tab stop.
5. **Lines that matter.** Decorative lines (`border`, `rule`) stay soft. The edge of anything you click or type into (`Input`, `Textarea`, `Select`, `Checkbox`, the audit's check boxes) uses `border-control`, and buttons use their 2px edges (Calls to action), which reaches 3:1 against the page and the field fill on both bands; `npm run test:contrast` requires it. Disabled controls drop back to `border-border`.

Also: reading text never under 14px (lint); every animation has a reduced-motion end state.

### Voice

How the site sounds (approved Nov 10):

1. **Say what we do.** Describe the work plainly. AI is a tool we use, not who we are. Never “small business” or “Next.js agency”.
2. **Short and active.** Short words, active verbs. Cut any word that can go.
3. **Concrete or nothing.** Name tools, times and numbers. Only claim what we can prove; client numbers only with the client’s OK.
4. **Sound like the engineers you’ll meet.** “We” and “you”, no hype, no stock phrases.
5. **Our own words.** Never borrow phrasing from another site.
6. **House style.** US spelling, sentence case for headings and buttons, no prices.

`npm run lint` fails on the banned phrases and British spellings (`scripts/voice.mjs`).

## Checks

`npm run lint` runs the design rules in `eslint/rules/design.mjs` (tests in `eslint/tests/`): no raw spacing above 8px micro-spacing, no raw text sizes outside the type roles (12px mono labels allowed), no raw colors, no raw borders outside the boxes, every text link on a link role, pages build sections from `Section` / `PageHeader` / `Band` / `CtaBand`, and each component tier imports only from the tiers below. Deliberate exceptions carry an `eslint-disable-next-line` comment saying why.

Four more checks run against a production build (`npm run build && npm start`), together as
`npm run test:design`, using the Chrome on the machine:

- `npm run test:contrast`: WCAG AA for text on every background, dark and light bands, plus the focus ring and
  control edges (3:1). Decorative lines are reported as advisory.
- `npm run test:a11y`: axe-core on 15 pages at 390 and 1440, plus headings, repeated ids and the skip link
  (Guidelines > Accessibility).
- `npm run test:visual`: full-page screenshots of 15 pages at 390, 768, 1024 and 1440 against the baselines in
  `tests/visual/baselines`, with reduced motion on so every animation sits at its end state (photos and video are
  hidden; their frames stay). `npm run test:visual:update` accepts the current pages.
- `npm run test:budget`: Home's FCP, LCP, CLS and JS, CSS, font and image weight on desktop and a throttled phone,
  against the limits in `scripts/budget.json`.

See every token and component live at `/design`. It is public so it can be shared with clients, but it is `noindex` and left out of the sitemap and `llms.txt`. It is deliberately not disallowed in `robots.txt`: crawlers have to fetch the page to see the noindex.
