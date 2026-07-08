import type { CSSProperties, ReactNode } from 'react'
import { BlueprintGraphic } from './blueprint-graphic'

/**
 * Hero signature piece — a plain side-by-side that states the headline outright:
 * off-the-shelf software is built for everyone; we build for you.
 *
 *   LEFT   "Built for everyone" — a whole stack of generic dashboards fanned
 *          like cards (many to juggle), the front one overloaded with
 *          mismatched modules: hatching, a cramped bar chart, dot rows and data
 *          lines. One-size-fits-all noise, but rendered in the same thin,
 *          hollow blueprint language as the rest of the site.
 *   ARROW  annotated with the transition: consolidate + custom fit.
 *   RIGHT  "Built for you" — one app, pared to a clean sidebar (one active item)
 *          and a single insight widget: a rising accent trend with a live node.
 *
 * Same schematic vocabulary as home-graphics.tsx (fill-bg-card hollow shapes,
 * stroke-line, one accent highlight). Entrance is a sequenced fade-and-rise
 * (see .hero-compare in globals.css): the three generic dashboards come up one
 * by one, then the arrow, then your app last. The wrapper (<BlueprintGraphic>)
 * only supplies the in-view gate, reduced-motion handling, and the intro offset.
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

// ── The generic stack: front dashboard (with content) sits on the right of the
//    cluster; the deck recedes up and to the left so their title bars peek out. ──
const FRONT: Rect = { x: 30, y: 38, w: 74, h: 84 }
const BEHIND: Rect[] = [
  { x: 14, y: 24, w: 74, h: 84 },
  { x: 22, y: 31, w: 74, h: 84 },
]
// Clutter is authored for a front at x=14; shift it to match FRONT's position.
const CLUTTER_DX = FRONT.x - 14

// ── Your app: a clean sidebar + one insight widget. ──
const RIGHT_WIN: Rect = { x: 184, y: 38, w: 76, h: 84 }
const RAIL: Rect = { x: 190, y: 53, w: 14, h: 58 }
const NAV: Rect[] = [
  { x: 194, y: 57, w: 8, h: 6 }, // active (accent)
  { x: 194, y: 67, w: 8, h: 6 },
  { x: 194, y: 77, w: 8, h: 6 },
  { x: 194, y: 87, w: 8, h: 6 },
]
const HEADER: Rect = { x: 210, y: 53, w: 44, h: 7 }
const WIDGET: Rect = { x: 210, y: 62, w: 44, h: 30 } // clean insight widget
const FOOTER: Rect = { x: 210, y: 97, w: 44, h: 7 }

/** App window chrome: rounded frame + title bar + three dots. Thin borders. */
function AppWindow({ x, y, w, h }: Rect) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx='3' className='fill-bg-card stroke-line' strokeWidth='1' />
      <line x1={x} y1={y + 11} x2={x + w} y2={y + 11} className='stroke-line' strokeWidth='0.7' />
      {[x + 8, x + 13, x + 18].map(dx => (
        <circle key={`wd${dx}`} cx={dx} cy={y + 5.5} r='1.3' className='fill-bg stroke-line' strokeWidth='0.6' />
      ))}
    </g>
  )
}

export function HeroGraphic({ className }: { className?: string }) {
  return (
    <BlueprintGraphic
      viewBox='0 0 274 150'
      drawDelayMs={3600}
      className={`hero-compare ${className ?? ''}`}
    >
      {/* ── Titles ── */}
      <text x='62' y='18' textAnchor='middle' className='fill-text-muted font-mono' fontSize='6.5' letterSpacing='0.5'>
        Built for everyone
      </text>
      <text x='222' y='18' textAnchor='middle' className='fill-accent font-mono' fontSize='6.5' letterSpacing='0.5'>
        Built for you
      </text>

      {/* ── Generic stack: dashboards come up one by one ── */}
      <g className='cmp-in' style={cmp(0)}>
        <AppWindow {...BEHIND[0]} />
      </g>
      <g className='cmp-in' style={cmp(200)}>
        <AppWindow {...BEHIND[1]} />
      </g>
      <g className='cmp-in' style={cmp(400)}>
        <AppWindow {...FRONT} />
        <g transform={`translate(${CLUTTER_DX} 0)`}>
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
      </g>

      {/* ── Your app: comes up last ── */}
      <g className='cmp-in' style={cmp(940)}>
        <AppWindow {...RIGHT_WIN} />
        <rect x={RAIL.x} y={RAIL.y} width={RAIL.w} height={RAIL.h} rx='2' className='fill-bg-card stroke-line' strokeWidth='0.8' />
        {NAV.map((n, i) => (
          <rect
            key={`nav${i}`}
            x={n.x}
            y={n.y}
            width={n.w}
            height={n.h}
            rx='1'
            className={i === 0 ? 'fill-accent' : 'fill-bg-card stroke-line'}
            strokeWidth={i === 0 ? undefined : '0.7'}
          />
        ))}
        <rect x={HEADER.x} y={HEADER.y} width={HEADER.w} height={HEADER.h} rx='1' className='fill-bg-card stroke-line' strokeWidth='0.8' />
        <rect x={FOOTER.x} y={FOOTER.y} width={FOOTER.w} height={FOOTER.h} rx='1' className='fill-bg-card stroke-line' strokeWidth='0.8' />

        {/* Insight widget — hollow frame, a couple of bars, a rising accent
            trend and one live node (mirrors ChartGraphic). */}
        <rect x={WIDGET.x} y={WIDGET.y} width={WIDGET.w} height={WIDGET.h} rx='1.5' className='fill-bg-card stroke-line' strokeWidth='0.9' />
        <line x1='214' y1='88' x2='250' y2='88' className='stroke-line' strokeWidth='0.6' strokeLinecap='round' />
        <rect x='216' y='79' width='6' height='9' className='fill-bg-card stroke-line' strokeWidth='0.7' />
        <rect x='225' y='73' width='6' height='15' className='fill-bg-card stroke-line' strokeWidth='0.7' />
        <rect x='234' y='68' width='6' height='20' className='fill-bg-card stroke-line' strokeWidth='0.7' />
        <polyline points='217,79 228,72 237,67 248,63' className='stroke-accent' strokeWidth='1.4' fill='none' strokeLinejoin='round' strokeLinecap='round' />
        <circle
          cx='248'
          cy='63'
          r='2.4'
          className='cmp-live fill-accent'
          style={{ ['--cmp-live-delay']: '1700ms' } as CSSProperties}
        />
      </g>

      {/* ── Transformation arrow, annotated with the transition. Rendered last
             so its labels always sit above the windows. ── */}
      <g className='cmp-in' style={cmp(680)}>
        <text x='144' y='73' textAnchor='middle' className='fill-text-muted font-mono' fontSize='6' letterSpacing='0.5'>
          CONSOLIDATE
        </text>
        <g className='stroke-line' strokeWidth='1.2' strokeLinecap='round' strokeLinejoin='round' fill='none'>
          <line x1='132' y1='80' x2='156' y2='80' />
          <path d='M151 76 L156 80 L151 84' />
        </g>
        <text x='144' y='96' textAnchor='middle' className='fill-accent font-mono' fontSize='6' letterSpacing='0.5'>
          CUSTOM FIT
        </text>
      </g>
    </BlueprintGraphic>
  )
}
