# PRD 003: Update Favicon to Reflect New Color and Design

## 1. Context

The site uses Next.js App Router's [file-based metadata convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons) for favicons. Three icon files currently live in the `app/` directory:

| File                 | Size  | Purpose                                                                             |
| -------------------- | ----- | ----------------------------------------------------------------------------------- |
| `app/favicon.ico`    | 15 KB | Classic `.ico` favicon (shown in browser tabs, bookmarks)                           |
| `app/icon.png`       | 37 KB | Modern PNG icon (used by browsers that prefer `<link rel="icon" type="image/png">`) |
| `app/apple-icon.png` | 37 KB | Apple touch icon (iOS home screen, Safari)                                          |

Next.js automatically generates the appropriate `<link>` tags from these files — **no code references them explicitly**. The site's brand colors are a dark background (`#0e0f11`) with a lime-green accent (`#b5f542`), and the in-page logo mark in `src/components/layout/header.tsx` is a small accent-bordered square with an accent dot (blueprint motif). The OG images (`app/opengraph-image.png`, `app/twitter-image.png`) may also need consideration for consistency, though those are separate assets.

## 2. Design Decisions

| Decision            | Choice                                                                                 | Rationale                                                                                                                                                                                                   |
| ------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **File format**     | Keep `.ico` + `.png` + Apple touch icon (same structure)                               | Next.js convention; no code changes needed, maximum browser compatibility                                                                                                                                   |
| **Design motif**    | Blueprint logo mark — accent-bordered square with accent dot on dark bg                | Matches the header logo mark (`<span className='inline-flex h-6 w-6 items-center justify-center border border-accent/50'><span className='h-2 w-2 bg-accent' /></span>`) and the site's architectural theme |
| **Color palette**   | Dark bg `#0e0f11`, accent green `#b5f542`, border `#2a2b30`                            | Pulled from `globals.css` / `tailwind.config.ts` design tokens                                                                                                                                              |
| **Sizes**           | `favicon.ico`: 16×16 + 32×32 multi-res; `icon.png`: 192×192; `apple-icon.png`: 180×180 | Standard sizes for each platform; Next.js docs recommend these                                                                                                                                              |
| **No code changes** | Replace files in-place, same filenames                                                 | Next.js auto-discovers by convention; layout.tsx has no explicit icon metadata                                                                                                                              |

## 3. Architecture Overview

This is a **pure asset replacement task** — no source code changes are required. Next.js App Router automatically serves:

```
app/favicon.ico    →  <link rel="icon" href="/favicon.ico" sizes="48x48">
app/icon.png       →  <link rel="icon" href="/icon.png" type="image/png" sizes="...">
app/apple-icon.png →  <link rel="apple-touch-icon" href="/apple-icon.png" sizes="...">
```

The only work is designing the new icon assets and replacing the three files.

## 4. Implementation Phases

### Phase 1: Design the New Favicon

**Design specification** for the icon (to be created in an image editor or via SVG-to-raster export):

- **Concept:** A square canvas with `#0e0f11` background. A 1px `#b5f542` (accent green) border inset ~12% from the edges, forming the blueprint registration square. A solid `#b5f542` dot/square centered inside, sized ~33% of the inner area. This mirrors the header logo mark.
- **Variants needed:**
  - **32×32 px** — for the `.ico` file (and a 16×16 variant embedded in it)
  - **192×192 px** — for `icon.png`
  - **180×180 px** — for `apple-icon.png`

**Files to create:**

- `app/favicon.ico` (replace) — multi-resolution `.ico` containing 16×16 and 32×32
- `app/icon.png` (replace) — 192×192 PNG
- `app/apple-icon.png` (replace) — 180×180 PNG

**Design tips for small sizes:**

- At 16×16, simplify: solid dark bg, a 1px accent border, and a 4×4 or 3×3 centered accent square. Avoid anti-aliasing artifacts.
- At 32×32, the border + centered dot can be slightly more refined.
- At 180–192px, the full blueprint mark renders cleanly.

### Phase 2: Replace Favicon Files

1. Back up the existing files (or rely on git history).
2. Replace all three files in `app/`:
   - `app/favicon.ico`
   - `app/icon.png`
   - `app/apple-icon.png`
3. Ensure the new files use the **exact same filenames** — Next.js discovers them by convention.

### Phase 3: Verify

- **Local dev:** Run `npm run dev`, open the site in a browser, and verify the new favicon appears in:
  - Browser tab
  - Bookmarks bar (if bookmarked)
  - Mobile browser (add to home screen on iOS for apple-icon test)
- **Inspect HTML:** View source / DevTools → `<head>` and confirm the auto-generated `<link rel="icon">` and `<link rel="apple-touch-icon">` tags point to the correct files with expected sizes.
- **Cache busting:** Hard-refresh (`Ctrl+Shift+R` / `Cmd+Shift+R`) or open an incognito window, as favicons are aggressively cached.
- **Build check:** Run `npm run build` to ensure no build errors.
- **Multiple browsers:** Verify in Chrome, Firefox, Safari, and Edge.

### Phase 4 (Optional): Update OG / Twitter Images for Consistency

If the brand refresh extends beyond the favicon, the same design language should be reflected in:

- `app/opengraph-image.png` (1.5 MB, 1200×630 recommended)
- `app/twitter-image.png` (1.5 MB, 1200×630 recommended)

These are separate assets and a separate scope, but flagged here for completeness.

## 5. Critical Files Reference

| File                               | Action         | Notes                                                                               |
| ---------------------------------- | -------------- | ----------------------------------------------------------------------------------- |
| `app/favicon.ico`                  | **Replace**    | Multi-res .ico (16×16 + 32×32); dark bg + accent border + accent dot                |
| `app/icon.png`                     | **Replace**    | 192×192 PNG; same design                                                            |
| `app/apple-icon.png`               | **Replace**    | 180×180 PNG; same design (no transparency — iOS clips to rounded rect)              |
| `app/layout.tsx`                   | No change      | No explicit icon metadata; Next.js auto-discovers from file convention              |
| `app/globals.css`                  | Reference only | Source of truth for brand colors (`--color-accent: #b5f542`, `--color-bg: #0e0f11`) |
| `tailwind.config.ts`               | Reference only | Hex values for accent (`#b5f542`) and bg (`#0e0f11`)                                |
| `src/components/layout/header.tsx` | Reference only | Contains the in-page logo mark to visually match                                    |

## 6. Notes & Caveats

- **Apple touch icon transparency:** iOS ignores transparency and fills with black. The apple-icon should have a solid `#0e0f11` background, not a transparent one.
- **ICO generation:** Tools like [RealFaviconGenerator](https://realfavicongenerator.net/), ImageMagick (`convert icon-32.png icon-16.png favicon.ico`), or Figma plugins can produce multi-resolution `.ico` files.
- **No `manifest.json` / `site.webmanifest`:** The project doesn't currently have one. If PWA support is ever needed, a `manifest.json` with icon entries would be added, but that's out of scope here.
