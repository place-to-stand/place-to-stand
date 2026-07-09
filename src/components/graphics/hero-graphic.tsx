import type { CSSProperties, ReactNode } from 'react'
import { BlueprintGraphic } from './blueprint-graphic'

/**
 * Hero signature piece — a side-by-side that states the headline outright:
 * turn a mess of off-the-shelf apps into one app built for you.
 *
 *   LEFT   "Turn these" — a cluttered desk of one-size-fits-all dashboards
 *          tossed at odd angles, the front one overloaded with mismatched
 *          modules: hatching, a cramped bar chart, dot rows and data lines.
 *          One-size-fits-all noise, but rendered in the same thin, hollow
 *          blueprint language as the rest of the site.
 *   ARROW  the transformation from the clutter to the clean result.
 *   RIGHT  "Into this" — one clean dashboard (bigger; it's the payoff), modelled
 *          on the real product: a grouped nav sidebar with the active item in
 *          accent, a page header, a "My Tasks" list, and two stat-card panels,
 *          all squared off and aligned to a tight grid. A live dot breathes.
 *
 * Same schematic vocabulary as home-graphics.tsx (fill-bg-card hollow shapes,
 * stroke-line, one accent highlight). Entrance is a sequenced fade-and-rise
 * (see .hero-compare in globals.css): the tossed generic dashboards come up one
 * by one, then the front, then the arrow, then your app last. The wrapper
 * (<BlueprintGraphic>) supplies the in-view gate, reduced-motion handling, and
 * the intro offset.
 */

/** Sets a group's entrance delay (ms) within the sequenced reveal. */
const cmp = (delayMs: number) => ({ ['--cmp-delay']: `${delayMs}ms` }) as CSSProperties

type Rect = { x: number; y: number; w: number; h: number }

// ── Generic app: overloaded, misaligned modules in the front dashboard. All
//    hollow; `deco` adds interior noise. Columns align, rows don't. ──
type Tile = Rect & { deco?: 'hatch' | 'bars' | 'dots' | 'text' }
const CLUTTER: Tile[] = [
  { x: 20, y: 51, w: 19, h: 11, deco: 'text' },
  { x: 20, y: 64, w: 19, h: 15, deco: 'hatch' },
  { x: 20, y: 81, w: 19, h: 10 },
  { x: 20, y: 93, w: 19, h: 20, deco: 'bars' },
  { x: 41, y: 51, w: 19, h: 8 },
  { x: 41, y: 61, w: 19, h: 17, deco: 'text' },
  { x: 41, y: 80, w: 19, h: 7, deco: 'dots' },
  { x: 41, y: 89, w: 19, h: 24, deco: 'hatch' },
  { x: 62, y: 51, w: 18, h: 16, deco: 'text' },
  { x: 62, y: 69, w: 18, h: 10 },
  { x: 62, y: 81, w: 18, h: 12, deco: 'hatch' },
  { x: 62, y: 95, w: 18, h: 18, deco: 'bars' },
]

/** Diagonal hatch fill (two parallel sets) inside a tile. */
function hatch({ x, y, w, h }: Rect): ReactNode {
  const fs = [0.25, 0.5, 0.75, 1]
  return (
    <>
      {fs.map(f => (
        <line key={`ha${f}`} x1={x + w * f} y1={y} x2={x} y2={y + h * f} className='stroke-line' strokeWidth='0.5' />
      ))}
      {fs.map(f => (
        <line key={`hb${f}`} x1={x + w} y1={y + h * (1 - f)} x2={x + w * (1 - f)} y2={y + h} className='stroke-line' strokeWidth='0.5' />
      ))}
    </>
  )
}

/** A cramped bar chart inside a tile. */
function bars({ x, y, w, h }: Rect): ReactNode {
  const base = y + h - 3
  const hs = [0.4, 0.7, 0.5, 0.9, 0.6, 0.8]
  const bw = (w - 6) / hs.length
  return (
    <>
      <line x1={x + 3} y1={base} x2={x + w - 3} y2={base} className='stroke-line' strokeWidth='0.55' />
      {hs.map((f, i) => (
        <line
          key={`br${i}`}
          x1={x + 3 + i * bw + bw / 2}
          y1={base}
          x2={x + 3 + i * bw + bw / 2}
          y2={base - (h - 8) * f}
          className='stroke-line'
          strokeWidth={bw - 1.2}
        />
      ))}
    </>
  )
}

/** A row of toggle/status dots. */
function dots({ x, y, w, h }: Rect): ReactNode {
  const cy = y + h / 2
  return (
    <>
      {[0.2, 0.4, 0.6, 0.8].map(f => (
        <circle key={`dt${f}`} cx={x + w * f} cy={cy} r='1.3' className='fill-bg stroke-line' strokeWidth='0.55' />
      ))}
    </>
  )
}

/** Stacked data-row lines, count + widths adapting to the tile height. */
function textRows({ x, y, w, h }: Rect): ReactNode {
  const n = Math.max(2, Math.min(6, Math.floor((h - 3) / 4)))
  const widths = [0.9, 0.6, 0.85, 0.5, 0.78, 0.45]
  const gap = (h - 7) / n
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <line
          key={`tx${i}`}
          x1={x + 3}
          y1={y + 5 + i * gap}
          x2={x + 3 + (w - 6) * widths[i % widths.length]}
          y2={y + 5 + i * gap}
          className='stroke-line'
          strokeWidth='0.7'
          strokeLinecap='round'
        />
      ))}
    </>
  )
}

const DECO = { hatch, bars, dots, text: textRows }

// ── The generic stack: one cluttered dashboard up front, with a mess of other
//    one-size-fits-all apps tossed behind it at odd angles — a cluttered desk. ──
type Win = Rect & { rot: number }
// A messy fan: each window is tossed at a sporadic angle and scattered wide —
// alternating hard left/right and stepping down — so a big slice of every
// dashboard shows, not just its title bar. The top one is the most cock-eyed.
// The front one (with the dense clutter) sits lowest; the deck spills behind it.
const FRONT: Rect = { x: 30, y: 60, w: 70, h: 80 }
const FRONT_ROT = -3
const BEHIND: Win[] = [
  { x: 40, y: 30, w: 60, h: 72, rot: 15 },
  { x: 9, y: 34, w: 60, h: 72, rot: -13 },
  { x: 46, y: 44, w: 58, h: 70, rot: 8 },
  { x: 7, y: 50, w: 60, h: 72, rot: -8 },
  { x: 28, y: 53, w: 64, h: 74, rot: 6 },
]
// Clutter tiles are authored for a front at (14, 38); shift them onto FRONT.
const CLUTTER_DX = FRONT.x - 14
const CLUTTER_DY = FRONT.y - 38

// Center of a rect — used as a rotation origin for the tossed windows.
const rcx = (r: Rect) => r.x + r.w / 2
const rcy = (r: Rect) => r.y + r.h / 2

// ── Your app: a mini of the real product (the Place To Stand portal) — a
//    grouped nav sidebar with the active item highlighted, a page header, one
//    full-width graph widget (the accent trend), and two half-width widgets
//    below. Squared off and aligned to a tight grid so it reads as precise and
//    calm next to the clutter. Depth: dark window (fill-bg) → raised cards
//    (fill-bg-card) → inset marks (stroke-line / accent). ──
const RIGHT_WIN: Rect = { x: 176, y: 30, w: 92, h: 104 }

// Sidebar: a wordmark, an accent "active" pill, then hollow nav rows (the two
// wider gaps hint the product's grouped sections).
const SIDEBAR_DIV = 201
const NAV_ACTIVE: Rect = { x: 178, y: 55, w: 18, h: 6 }
const NAV_ROWS = [64, 71, 78, 87, 94]

// Main column: header, one full-width graph widget, two half-width widgets.
const HOME_ICON: Rect = { x: 205, y: 45, w: 6, h: 6 }
const GRAPH_CARD: Rect = { x: 205, y: 58, w: 59, h: 40 }
// Bars in the graph widget; the last one is tallest and accent (baseline y = 93).
const GRAPH_BARS: Rect[] = [6, 8, 11, 13, 16, 18, 21].map((h, i) => ({
  x: 211 + i * 7,
  y: 93 - h,
  w: 4.5,
  h,
}))
const HALF_CARDS: Rect[] = [
  { x: 205, y: 102, w: 27, h: 28 },
  { x: 237, y: 102, w: 27, h: 28 },
]

/** App window chrome: frame + title bar + three dots. Thin borders. `rx` sets
 *  the corner radius (default rounded; the finished app passes 0 for hard edges).
 *  `fill` sets the interior (default the card tone; the finished app uses the
 *  darker page bg so its own cards read as raised). */
function AppWindow({ x, y, w, h, rx = '3', fill = 'fill-bg-card' }: Rect & { rx?: string; fill?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={rx} className={`${fill} stroke-line`} strokeWidth='1' />
      <line x1={x} y1={y + 11} x2={x + w} y2={y + 11} className='stroke-line' strokeWidth='0.7' />
      {[x + 8, x + 13, x + 18].map(dx => (
        <circle key={`wd${dx}`} cx={dx} cy={y + 5.5} r='1.3' className='fill-bg stroke-line' strokeWidth='0.6' />
      ))}
    </g>
  )
}

/** Upsell/ad texts that bloat the generic dashboards — assigned one per window
 *  (by index) so the clutter isn't uniform. Speaks straight to the SaaS-bloat
 *  problem the finished app solves. */
const PROMOS = [
  'BUY THIS',
  'UPGRADE NOW',
  'LIMITED TIME OFFER',
  'GO PRO TODAY',
  '50% OFF TODAY',
  'NEW! CLICK HERE',
  'ADD-ONS INSIDE',
  'SUBSCRIBE NOW',
]

/** A small boxed ad/upsell banner. */
function PromoBanner({ x, y, w, text }: { x: number; y: number; w: number; text: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height='7' className='fill-bg stroke-line' strokeWidth='0.5' />
      <text
        x={x + w / 2}
        y={y + 4.8}
        textAnchor='middle'
        className='fill-text-muted font-mono'
        fontSize='2.8'
        letterSpacing='0.1'
      >
        {text}
      </text>
    </g>
  )
}

/** A generic dashboard in the clutter pile: window chrome, a nav rail, an upsell
 *  banner, and a dense grid of mismatched modules — so every window that peeks
 *  out reads as its own bloated, ad-riddled dashboard. `seed` varies the promo
 *  text and module decorations so no two windows are identical. */
function ClutterWindow({ x, y, w, h, seed }: Rect & { seed: number }) {
  const mainX = x + 16
  const mainW = w - 20
  const colW = (mainW - 2) / 2
  const gridTop = y + 24
  const rowH = (y + h - 4 - gridTop - 4) / 3
  const decos: (keyof typeof DECO)[] = ['text', 'bars', 'hatch', 'dots', 'text', 'bars']
  const cells: Rect[] = []
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 2; c++) {
      cells.push({ x: mainX + c * (colW + 2), y: gridTop + r * (rowH + 2), w: colW, h: rowH })
    }
  }
  return (
    <g>
      <AppWindow x={x} y={y} w={w} h={h} />
      {/* nav rail */}
      <rect x={x + 4} y={y + 14} width='9' height={h - 20} className='fill-bg-card stroke-line' strokeWidth='0.5' />
      {[0, 1, 2, 3].map(k => (
        <line key={`nr${k}`} x1={x + 6} y1={y + 18 + k * 6} x2={x + 11} y2={y + 18 + k * 6} className='stroke-line' strokeWidth='0.4' strokeLinecap='round' />
      ))}
      {/* upsell banner */}
      <PromoBanner x={mainX} y={y + 15} w={mainW} text={PROMOS[seed % PROMOS.length]} />
      {/* dense grid of mismatched modules */}
      {cells.map((cell, idx) => {
        const Deco = DECO[decos[(idx + seed) % decos.length]]
        return (
          <g key={`cm${idx}`}>
            <rect x={cell.x} y={cell.y} width={cell.w} height={cell.h} className='fill-bg-card stroke-line' strokeWidth='0.5' />
            {Deco(cell)}
          </g>
        )
      })}
    </g>
  )
}

export function HeroGraphic({ className }: { className?: string }) {
  return (
    <BlueprintGraphic
      viewBox='0 0 274 150'
      drawDelayMs={2000}
      className={`hero-compare ${className ?? ''}`}
    >
      {/* ── Titles — each rises in with its column (stack first, your app last) ── */}
      <g className='cmp-in' style={cmp(0)}>
        <text x='62' y='12' textAnchor='middle' className='fill-text-muted font-headline' fontSize='7' fontWeight='500' letterSpacing='0.3'>
          Turn these
        </text>
      </g>
      <g className='cmp-in' style={cmp(1315)}>
        <text x='222' y='12' textAnchor='middle' className='fill-accent font-headline' fontSize='7' fontWeight='500' letterSpacing='0.3'>
          Into this
        </text>
      </g>

      {/* ── Generic stack: the tossed-behind windows land one by one, then the
             cluttered front dashboard on top ── */}
      {BEHIND.map((w, i) => (
        <g key={`bh${i}`} className='cmp-in' style={cmp(i * 140)}>
          <g transform={`rotate(${w.rot} ${rcx(w)} ${rcy(w)})`}>
            <ClutterWindow {...w} seed={i} />
          </g>
        </g>
      ))}
      <g className='cmp-in' style={cmp(760)}>
        <g transform={`rotate(${FRONT_ROT} ${rcx(FRONT)} ${rcy(FRONT)})`}>
          <AppWindow {...FRONT} />
          <g transform={`translate(${CLUTTER_DX} ${CLUTTER_DY})`}>
            {CLUTTER.map((t, idx) => {
              const Deco = t.deco ? DECO[t.deco] : null
              return (
                <g key={`c${idx}`}>
                  <rect x={t.x} y={t.y} width={t.w} height={t.h} className='fill-bg-card stroke-line' strokeWidth='0.75' />
                  {Deco && Deco(t)}
                </g>
              )
            })}
          </g>
          {/* Intrusive top-of-page ad banner across the front dashboard */}
          <PromoBanner x={FRONT.x + 8} y={FRONT.y + 14} w={FRONT.w - 16} text='TRY OUR NEW PRODUCT' />
        </g>
      </g>

      {/* ── Your app: a clean, squared-off mini of the real product. Slides in
             dramatically from the right, last of all. ── */}
      <g className='cmp-slide' style={cmp(1544)}>
        <AppWindow {...RIGHT_WIN} rx='0' fill='fill-bg' />

        {/* Sidebar: divider, wordmark, an accent active item, hollow nav rows */}
        <line x1={SIDEBAR_DIV} y1='45' x2={SIDEBAR_DIV} y2='130' className='stroke-line' strokeWidth='0.6' />
        <line x1='180' y1='49' x2='193' y2='49' className='stroke-line' strokeWidth='1.3' strokeLinecap='round' />
        <rect x={NAV_ACTIVE.x} y={NAV_ACTIVE.y} width={NAV_ACTIVE.w} height={NAV_ACTIVE.h} className='fill-accent' />
        <rect x='180' y='56.5' width='3' height='3' className='fill-bg' />
        <rect x='185' y='57.4' width='8' height='1.6' className='fill-bg' />
        {NAV_ROWS.map((y, i) => (
          <g key={`nav${i}`}>
            <rect x='180' y={y} width='3' height='3' className='fill-bg stroke-line' strokeWidth='0.55' />
            <line x1='185' y1={y + 1.6} x2='196' y2={y + 1.6} className='stroke-line' strokeWidth='0.75' strokeLinecap='round' />
          </g>
        ))}

        {/* Page header: icon, title, subtitle */}
        <rect x={HOME_ICON.x} y={HOME_ICON.y} width={HOME_ICON.w} height={HOME_ICON.h} className='fill-bg stroke-line' strokeWidth='0.7' />
        <line x1='214' y1='48' x2='236' y2='48' className='stroke-line' strokeWidth='1.5' strokeLinecap='round' />
        <line x1='214' y1='52.5' x2='255' y2='52.5' className='stroke-line' strokeWidth='0.8' strokeLinecap='round' />

        {/* Full-width graph widget — a bar chart whose tallest, final column is
            the accent and slowly blinks */}
        <rect x={GRAPH_CARD.x} y={GRAPH_CARD.y} width={GRAPH_CARD.w} height={GRAPH_CARD.h} className='fill-bg-card stroke-line' strokeWidth='0.9' />
        <line x1='209' y1='64' x2='224' y2='64' className='stroke-line' strokeWidth='1.1' strokeLinecap='round' />
        {GRAPH_BARS.map((b, i) =>
          i === GRAPH_BARS.length - 1 ? (
            <rect
              key={`gb${i}`}
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              className='cmp-live fill-accent'
              style={{ ['--cmp-live-delay']: '2080ms' } as CSSProperties}
            />
          ) : (
            <rect key={`gb${i}`} x={b.x} y={b.y} width={b.w} height={b.h} className='fill-bg stroke-line' strokeWidth='0.55' />
          )
        )}
        <line x1='209' y1='93' x2='259' y2='93' className='stroke-line' strokeWidth='0.5' strokeLinecap='round' />

        {/* Two half-width widgets below — clean KPI cards */}
        {HALF_CARDS.map((c, i) => (
          <g key={`half${i}`}>
            <rect x={c.x} y={c.y} width={c.w} height={c.h} className='fill-bg-card stroke-line' strokeWidth='0.9' />
            <line x1={c.x + 4} y1={c.y + 7} x2={c.x + 15} y2={c.y + 7} className='stroke-line' strokeWidth='0.8' strokeLinecap='round' />
            <line x1={c.x + 4} y1={c.y + 15} x2={c.x + 12} y2={c.y + 15} className='stroke-line' strokeWidth='1.8' strokeLinecap='round' />
            <line x1={c.x + 4} y1={c.y + 21} x2={c.x + 19} y2={c.y + 21} className='stroke-line' strokeWidth='0.5' strokeLinecap='round' />
          </g>
        ))}
      </g>

      {/* ── Transformation arrow. Rendered last so it always sits above the
             windows. Slides out to the right after the stack settles. ── */}
      <g className='cmp-arrow' style={cmp(1040)}>
        <g className='stroke-line' strokeWidth='1.2' strokeLinecap='round' strokeLinejoin='round' fill='none'>
          <line x1='132' y1='82' x2='156' y2='82' />
          <path d='M151 78 L156 82 L151 86' />
        </g>
      </g>
    </BlueprintGraphic>
  )
}
