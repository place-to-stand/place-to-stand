'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useInView } from './blueprint-graphic'
import { AsanaLogo, MondayLogo, SlackLogo, TrelloLogo, NotionLogo } from './saas-logos'

/**
 * Hero signature piece — a looping four-beat story that plays after the hero
 * intro and repeats, leaning into the "Place to Stand" metaphor: the PTS Portal
 * is the platform, and the user ends up standing on top of it.
 *   0 TOOL OVERLOAD  — the user, centred, tethered to scattered SaaS tools.
 *   1 MEET PTS       — the tools dim; the lime PTS core appears where the user was,
 *                      and the user rises to stand above it (first accent).
 *   2 YOUR DASHBOARD — the tools collapse into the PTS Portal, now a solid platform
 *                      the user stands on.
 *   3 THINK BIGGER   — strategy ideas rise from the user, up off the top.
 *
 * Self-contained: a JS beat sequencer toggles `beat`; per-element opacity/transform
 * is set inline and CSS (.hs-anim in globals.css) tweens it. Reuses `useInView`
 * for the in-view gate + reduced-motion detection; under reduced motion it parks on
 * beat 2 (user standing on the Portal) with no timer.
 */

const CAPTIONS = ['TOOL OVERLOAD', 'MEET PTS', 'YOUR DASHBOARD', 'THINK BIGGER']
const HOLDS = [3200, 2600, 3000, 3400] // ms held on each beat

// Opacity of each element group per beat [0..3].
const OP = {
  logos: [1, 0.4, 0, 0],
  tethers: [0.7, 0.35, 0, 0],
  ring: [1, 1, 0, 0], // the hub ring — only while the user is the centre
  core: [0, 1, 1, 1],
  portal: [0, 0, 1, 1],
  thoughts: [0, 0, 0, 1],
}

const CENTER = { x: 100, y: 94 } // the hub: the user (beat 0), then the Portal core
const USER = { x: 100, y: 52, r: 17 } // the user's resting spot — standing on top
const USER_DROP = CENTER.y - USER.y // translateY that drops the user to CENTER for beat 0
const LOGO_S = 0.7
const LOGO_O = 12 * LOGO_S // half of the 24-grid glyph, scaled

// Tools orbit the hub.
const SCATTER = [
  { x: 100, y: 40 },
  { x: 151, y: 77 },
  { x: 132, y: 138 },
  { x: 68, y: 138 },
  { x: 49, y: 77 },
]
const LOGOS = [AsanaLogo, MondayLogo, SlackLogo, TrelloLogo, NotionLogo]

/** Point on a circle of radius r (centre cx,cy) in the direction of (px,py). */
function edge(cx: number, cy: number, px: number, py: number, r: number) {
  const dx = px - cx
  const dy = py - cy
  const len = Math.hypot(dx, dy) || 1
  return { x: cx + (dx / len) * r, y: cy + (dy / len) * r }
}

/** A person, from lucide's `User` bust glyph, placed + scaled at (cx,cy). */
function Person({ cx, cy, s }: { cx: number; cy: number; s: number }) {
  return (
    <g transform={`translate(${cx - 12 * s} ${cy - 12 * s}) scale(${s})`}>
      <path
        d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
        className="stroke-border-light"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="7" r="4" className="fill-bg stroke-border-light" strokeWidth="1.4" />
    </g>
  )
}

export function HeroGraphic({ className }: { className?: string }) {
  const { ref, inView } = useInView<SVGSVGElement>()
  const [beat, setBeat] = useState(0)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setBeat(2) // park on the resolved frame: user standing on the Portal
      return
    }
    let b = 0
    setBeat(0)
    const step = () => {
      timer.current = setTimeout(() => {
        b = (b + 1) % CAPTIONS.length
        setBeat(b)
        step()
      }, HOLDS[b])
    }
    step()
    return () => clearTimeout(timer.current)
  }, [inView])

  const anim = (opacity: number, extra?: CSSProperties): CSSProperties => ({ opacity, ...extra })

  return (
    <svg
      ref={ref}
      data-hero-story
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      {/* ── Tethers: tools pull on the hub (the user, then the app) ── */}
      {SCATTER.map((n, i) => {
        const a = edge(n.x, n.y, CENTER.x, CENTER.y, 10)
        const b = edge(CENTER.x, CENTER.y, n.x, n.y, USER.r)
        return (
          <line
            key={`t${i}`}
            className="hs-anim stroke-border-light"
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            strokeWidth="1"
            strokeLinecap="round"
            style={anim(OP.tethers[beat])}
          />
        )
      })}

      {/* ── Scattered SaaS logos → collapse into the Portal at beat 2 ── */}
      {SCATTER.map((n, i) => {
        const Logo = LOGOS[i]
        const collapsed = beat >= 2
        const cx = collapsed ? CENTER.x : n.x
        const cy = collapsed ? CENTER.y : n.y
        return (
          <g
            key={`l${i}`}
            className="hs-anim text-text-muted"
            style={anim(OP.logos[beat], { transform: `translate(${cx - LOGO_O}px, ${cy - LOGO_O}px)` })}
          >
            <g transform={`scale(${LOGO_S})`}>
              <Logo />
            </g>
          </g>
        )
      })}

      {/* ── The PTS Portal platform (beats 2+) — what the user stands on ── */}
      <g className="hs-anim" style={anim(OP.portal[beat], { transform: `translateY(${beat >= 2 ? 0 : 6}px)` })}>
        <rect x="56" y="63" width="88" height="53" rx="2" className="fill-bg stroke-border-light" strokeWidth="1.75" />
        <g className="stroke-accent" strokeWidth="1.75" fill="none" strokeLinecap="round">
          <path d="M56 71 V63 H64" />
          <path d="M136 63 H144 V71" />
          <path d="M56 108 V116 H64" />
          <path d="M136 116 H144 V108" />
        </g>
        <text x="100" y="110" textAnchor="middle" className="fill-accent font-mono" fontSize="8" letterSpacing="1">
          PORTAL
        </text>
      </g>

      {/* ── PTS accent core (beats 1+): the discovery, then the platform's heart ── */}
      <g className="hs-anim" style={anim(OP.core[beat])}>
        <rect x="93" y="87" width="14" height="14" className="fill-bg stroke-accent" strokeWidth="1.5" />
        <rect x="97.5" y="91.5" width="5" height="5" className="hs-core fill-accent" />
      </g>

      {/* ── The user: centred hub during overload, then rises to stand on the
             Portal platform (the hub ring fades once they're standing) ── */}
      <g className="hs-anim" style={{ transform: `translateY(${beat === 0 ? USER_DROP : 0}px)` }}>
        <circle
          cx={USER.x}
          cy={USER.y}
          r={USER.r}
          className="hs-anim fill-bg stroke-border-light"
          strokeWidth="1.5"
          style={anim(OP.ring[beat])}
        />
        <Person cx={USER.x} cy={USER.y} s={1.15} />
      </g>

      {/* ── Strategy thought-bubbles (beat 3): ideas rising from the user ── */}
      <g className="hs-anim" style={anim(OP.thoughts[beat], { transform: `translateY(${beat === 3 ? 0 : 12}px)` })}>
        {/* thought trail rising from the user's head */}
        <circle cx="100" cy="36" r="1.4" className="fill-border-light" />
        <circle cx="100" cy="30" r="2.1" className="fill-bg stroke-border-light" strokeWidth="1.2" />
        {/* bubbles */}
        <circle cx="66" cy="24" r="8" className="fill-bg stroke-border-light" strokeWidth="1.3" />
        <circle cx="100" cy="14" r="8" className="fill-bg stroke-border-light" strokeWidth="1.3" />
        <circle cx="134" cy="24" r="8" className="fill-bg stroke-border-light" strokeWidth="1.3" />
        {/* growth trend */}
        <g className="stroke-accent" strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round">
          <polyline points="59,28 64,23 68,25 73,18" />
          <path d="M69.5 18 h3.5 v3.5" />
        </g>
        {/* lightbulb */}
        <g className="stroke-accent" strokeWidth="1.5" fill="none" strokeLinecap="round">
          <circle cx="100" cy="11" r="4" />
          <line x1="98" y1="17" x2="102" y2="17" />
          <line x1="98.7" y1="19" x2="101.3" y2="19" />
        </g>
        {/* target */}
        <g className="stroke-accent" strokeWidth="1.5" fill="none">
          <circle cx="134" cy="24" r="4.5" />
          <circle cx="134" cy="24" r="2" className="fill-accent" stroke="none" />
        </g>
      </g>

      {/* ── Journey timeline: track + filling progress + step nodes ── */}
      <line x1="60" y1="180" x2="140" y2="180" className="stroke-border-light" strokeWidth="1.5" strokeLinecap="round" />
      <line
        x1="60"
        y1="180"
        x2="140"
        y2="180"
        className="hs-anim stroke-accent"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ transform: `scaleX(${beat / (CAPTIONS.length - 1)})`, transformBox: 'fill-box', transformOrigin: 'left' }}
      />
      {CAPTIONS.map((_, i) => {
        const on = i <= beat
        return (
          <circle
            key={`step${i}`}
            className={on ? 'hs-anim fill-accent' : 'hs-anim fill-bg stroke-border-light'}
            cx={60 + (i * 80) / (CAPTIONS.length - 1)}
            cy="180"
            r={i === beat ? 3 : 2.2}
            strokeWidth={on ? undefined : 1.3}
          />
        )
      })}

      {/* ── Caption ── */}
      {CAPTIONS.map((c, i) => (
        <text
          key={c}
          className="hs-anim fill-text-muted font-mono"
          x="100"
          y="196"
          textAnchor="middle"
          fontSize="7.5"
          letterSpacing="1.5"
          style={anim(beat === i ? 1 : 0)}
        >
          {c}
        </text>
      ))}
    </svg>
  )
}
