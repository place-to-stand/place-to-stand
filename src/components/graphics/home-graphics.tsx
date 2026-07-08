'use client'

import type { CSSProperties } from 'react'
import { BlueprintGraphic } from './blueprint-graphic'

/**
 * Animated blueprint schematics for the homepage sections. Same visual language
 * as process-graphics.tsx (100x100 viewBox, thin stroke-line lines, one
 * accent highlight, hollow nodes on fill-bg-card) but wrapped in <BlueprintGraphic> so
 * each draws itself in on scroll and settles into a subtle ongoing loop.
 *
 * Element roles (see globals.css): .bp-line = structural stroke (draws in,
 * staggered by --draw-i), .bp-node = the accent highlight (snaps in),
 * .bp-fx = a loop-dedicated element (fades in, then its loop takes over).
 */

type GraphicProps = { className?: string }

/** Draw-order helper: sets the per-element stagger index. */
const di = (i: number) => ({ ['--draw-i']: i }) as CSSProperties

// ─── Pillars — the customer-value story ───

/** No Per-Seat Pricing — a flat cost line while user seats multiply beneath it. */
export function SeatsGraphic({ className }: GraphicProps) {
  return (
    <BlueprintGraphic loop='bp-loop-pulse' className={className}>
      {/* Flat cost line — stays level no matter how many seats are added */}
      <line x1="16" y1="30" x2="84" y2="30" className="bp-line stroke-line" strokeWidth="2" strokeLinecap="round" style={di(0)} />
      <line x1="16" y1="26" x2="16" y2="34" className="bp-line stroke-line" strokeWidth="1.5" strokeLinecap="round" style={di(1)} />
      <line x1="84" y1="26" x2="84" y2="34" className="bp-line stroke-line" strokeWidth="1.5" strokeLinecap="round" style={di(1)} />
      {/* Seat baseline */}
      <line x1="16" y1="80" x2="84" y2="80" className="bp-line stroke-line" strokeWidth="1.5" strokeDasharray="3 4" strokeLinecap="round" style={di(2)} />
      {/* User seats sitting on the baseline */}
      {[26, 42, 58].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="60" r="4" className="bp-line fill-bg-card stroke-line" strokeWidth="1.5" style={di(3 + i)} />
          <path d={`M${x - 5} 80 q0 -8 5 -8 q5 0 5 8`} className="bp-line stroke-line" strokeWidth="1.5" strokeLinecap="round" style={di(3 + i)} />
        </g>
      ))}
      {/* The "+1, free" seat — accent, and it pulses */}
      <circle cx="74" cy="60" r="4.5" className="bp-node fill-accent" />
    </BlueprintGraphic>
  )
}

/** Centralized Business Data — scattered sources feeding one accent hub. */
export function CentralizedDataGraphic({ className }: GraphicProps) {
  const sources: [number, number][] = [
    [22, 24],
    [78, 24],
    [20, 72],
    [80, 72],
  ]
  return (
    <BlueprintGraphic loop='bp-loop-travel' className={className}>
      {/* Spokes */}
      {sources.map(([x, y], i) => (
        <line key={`s${x}${y}`} x1={x} y1={y} x2="50" y2="50" className="bp-line stroke-line" strokeWidth="1.5" style={di(i)} />
      ))}
      {/* Source nodes */}
      {sources.map(([x, y], i) => (
        <circle key={`n${x}${y}`} cx={x} cy={y} r="5" className="bp-line fill-bg-card stroke-line" strokeWidth="1.5" style={di(1 + i)} />
      ))}
      {/* Inbound flow along each spoke */}
      {sources.map(([x, y]) => (
        <line key={`f${x}${y}`} x1={x} y1={y} x2="50" y2="50" className="bp-fx bp-flow stroke-accent" strokeWidth="1.5" strokeDasharray="2 7" strokeLinecap="round" />
      ))}
      {/* Central hub — accent */}
      <circle cx="50" cy="50" r="8" className="bp-node fill-accent" />
    </BlueprintGraphic>
  )
}

/** No SaaS Feature Bloat — many modules funnel down to one you actually use. */
export function NoBloatGraphic({ className }: GraphicProps) {
  return (
    <BlueprintGraphic loop='bp-loop-pulse' className={className}>
      {/* Incoming modules */}
      {[22, 39, 56, 73].map((x, i) => (
        <rect key={x} x={x - 5} y="16" width="10" height="10" className="bp-line fill-bg-card stroke-line" strokeWidth="1.5" style={di(i)} />
      ))}
      {/* Funnel */}
      <path d="M18 34 L45 56 L45 66" className="bp-line stroke-line" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" style={di(4)} />
      <path d="M82 34 L55 56 L55 66" className="bp-line stroke-line" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" style={di(4)} />
      <line x1="45" y1="70" x2="55" y2="70" className="bp-line stroke-line" strokeWidth="1.5" strokeLinecap="round" style={di(5)} />
      {/* The one module you keep — accent */}
      <rect x="44" y="76" width="12" height="12" rx="1" className="bp-node fill-accent" />
    </BlueprintGraphic>
  )
}

// ─── Services — schematic versions of the accordion icons ───

/** Software Development — a code window with a blinking accent cursor. */
function CodeGraphic({ className }: GraphicProps) {
  return (
    <BlueprintGraphic loop='bp-loop-pulse' className={className}>
      <rect x="14" y="22" width="72" height="56" rx="2" className="bp-line fill-bg-card stroke-line" strokeWidth="1.5" style={di(0)} />
      <line x1="14" y1="36" x2="86" y2="36" className="bp-line stroke-line" strokeWidth="1.5" style={di(1)} />
      <line x1="24" y1="48" x2="58" y2="48" className="bp-line stroke-line" strokeWidth="1.5" strokeLinecap="round" style={di(2)} />
      <line x1="24" y1="58" x2="48" y2="58" className="bp-line stroke-line" strokeWidth="1.5" strokeLinecap="round" style={di(3)} />
      <line x1="24" y1="68" x2="52" y2="68" className="bp-line stroke-line" strokeWidth="1.5" strokeLinecap="round" style={di(4)} />
      <rect x="60" y="54" width="6" height="9" className="bp-node fill-accent" />
    </BlueprintGraphic>
  )
}

/** Workflow Systems — a branch splitting off a mainline, with flow along it. */
function BranchGraphic({ className }: GraphicProps) {
  return (
    <BlueprintGraphic loop='bp-loop-travel' className={className}>
      <line x1="34" y1="20" x2="34" y2="80" className="bp-line stroke-line" strokeWidth="2" strokeLinecap="round" style={di(0)} />
      <path d="M34 50 q0 16 16 16 h6" className="bp-line stroke-line" strokeWidth="1.5" fill="none" strokeLinecap="round" style={di(1)} />
      <line x1="34" y1="20" x2="34" y2="80" className="bp-fx bp-flow stroke-accent" strokeWidth="2" strokeDasharray="2 8" strokeLinecap="round" />
      <circle cx="34" cy="30" r="5" className="bp-line fill-bg-card stroke-line" strokeWidth="1.5" style={di(2)} />
      <circle cx="34" cy="70" r="5" className="bp-line fill-bg-card stroke-line" strokeWidth="1.5" style={di(3)} />
      <circle cx="62" cy="66" r="5.5" className="bp-node fill-accent" />
    </BlueprintGraphic>
  )
}

/** Data Intelligence — bars with a rising accent trend line. */
function ChartGraphic({ className }: GraphicProps) {
  return (
    <BlueprintGraphic loop='bp-loop-pulse' className={className}>
      <line x1="16" y1="82" x2="86" y2="82" className="bp-line stroke-line" strokeWidth="1.5" strokeLinecap="round" style={di(0)} />
      <rect x="22" y="62" width="12" height="20" className="bp-line fill-bg-card stroke-line" strokeWidth="1.5" style={di(1)} />
      <rect x="42" y="50" width="12" height="32" className="bp-line fill-bg-card stroke-line" strokeWidth="1.5" style={di(2)} />
      <rect x="62" y="34" width="12" height="48" className="bp-line fill-bg-card stroke-line" strokeWidth="1.5" style={di(3)} />
      <polyline points="22,60 40,48 60,40 74,24" className="bp-line stroke-accent" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" style={di(4)} />
      <circle cx="74" cy="24" r="4.5" className="bp-node fill-accent" />
    </BlueprintGraphic>
  )
}

/** Strategic Advisory — a compass with a slowly rotating bearing needle. */
function CompassGraphic({ className }: GraphicProps) {
  return (
    <BlueprintGraphic loop='bp-loop-gear' className={className}>
      <circle cx="50" cy="50" r="30" className="bp-line fill-bg-card stroke-line" strokeWidth="1.5" style={di(0)} />
      <line x1="50" y1="18" x2="50" y2="25" className="bp-line stroke-line" strokeWidth="1.5" strokeLinecap="round" style={di(1)} />
      <line x1="50" y1="75" x2="50" y2="82" className="bp-line stroke-line" strokeWidth="1.5" strokeLinecap="round" style={di(1)} />
      <line x1="18" y1="50" x2="25" y2="50" className="bp-line stroke-line" strokeWidth="1.5" strokeLinecap="round" style={di(1)} />
      <line x1="75" y1="50" x2="82" y2="50" className="bp-line stroke-line" strokeWidth="1.5" strokeLinecap="round" style={di(1)} />
      {/* Bearing needle — fades in, then rotates in place */}
      <g className="bp-fx bp-gear">
        <path d="M36 64 L50 50 L64 36" className="stroke-accent" strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      </g>
      <circle cx="50" cy="50" r="3.5" className="bp-node fill-accent" />
    </BlueprintGraphic>
  )
}

/** Managed Services — a server stack with a running cog and a status light. */
function ServerGraphic({ className }: GraphicProps) {
  return (
    <BlueprintGraphic loop='bp-loop-gear bp-loop-pulse' className={className}>
      {[24, 44, 64].map((y, i) => (
        <g key={y}>
          <rect x="16" y={y} width="46" height="14" className="bp-line fill-bg-card stroke-line" strokeWidth="1.5" style={di(i)} />
          <line x1="22" y1={y + 7} x2="30" y2={y + 7} className="bp-line stroke-line" strokeWidth="1.5" strokeLinecap="round" style={di(i)} />
        </g>
      ))}
      {/* Cog — fades in, then spins */}
      <g className="bp-fx bp-gear">
        <circle cx="76" cy="38" r="8" className="stroke-accent" strokeWidth="1.5" fill="none" />
        <g className="stroke-accent" strokeWidth="1.5" strokeLinecap="round">
          <line x1="76" y1="26" x2="76" y2="30" />
          <line x1="76" y1="46" x2="76" y2="50" />
          <line x1="64" y1="38" x2="68" y2="38" />
          <line x1="84" y1="38" x2="88" y2="38" />
        </g>
      </g>
      {/* Status light — accent, pulses */}
      <circle cx="54" cy="31" r="3" className="bp-node fill-accent" />
    </BlueprintGraphic>
  )
}

/** Icon-key → schematic, mirroring serviceIcons in src/lib/service-icons.ts. */
export const serviceGraphics: Record<
  string,
  (props: GraphicProps) => React.ReactElement
> = {
  Code2: CodeGraphic,
  GitBranch: BranchGraphic,
  BarChart3: ChartGraphic,
  Compass: CompassGraphic,
  ServerCog: ServerGraphic,
}

// ─── Manifesto — who we are ───

/** Senior Builders — a drafting compass sweeping an accent arc. */
export function DraftingGraphic({ className }: GraphicProps) {
  return (
    <BlueprintGraphic loop='bp-loop-pulse' className={className}>
      {/* Compass legs */}
      <line x1="50" y1="20" x2="30" y2="78" className="bp-line stroke-line" strokeWidth="2" strokeLinecap="round" style={di(0)} />
      <line x1="50" y1="20" x2="70" y2="78" className="bp-line stroke-line" strokeWidth="2" strokeLinecap="round" style={di(0)} />
      <line x1="44" y1="37" x2="56" y2="37" className="bp-line stroke-line" strokeWidth="1.5" strokeLinecap="round" style={di(1)} />
      {/* The drawn arc */}
      <path d="M30 78 A 34 34 0 0 0 70 78" className="bp-line stroke-line" strokeWidth="1.5" fill="none" strokeDasharray="3 4" strokeLinecap="round" style={di(2)} />
      {/* Pivot — accent */}
      <circle cx="50" cy="20" r="5" className="bp-node fill-accent" />
    </BlueprintGraphic>
  )
}

/** AI-Native — nodes wired into a running cog. */
export function AiNativeGraphic({ className }: GraphicProps) {
  return (
    <BlueprintGraphic loop='bp-loop-gear bp-loop-pulse' className={className}>
      {/* Input nodes wired to the core */}
      {[
        [20, 28],
        [20, 72],
      ].map(([x, y], i) => (
        <g key={x + '' + y}>
          <line x1={x} y1={y} x2="44" y2="50" className="bp-line stroke-line" strokeWidth="1.5" style={di(i)} />
          <circle cx={x} cy={y} r="4.5" className="bp-line fill-bg-card stroke-line" strokeWidth="1.5" style={di(i)} />
        </g>
      ))}
      {/* Cog core — spins */}
      <g className="bp-fx bp-gear">
        <circle cx="60" cy="50" r="14" className="stroke-line" strokeWidth="1.5" fill="none" />
        <g className="stroke-line" strokeWidth="1.5" strokeLinecap="round">
          <line x1="60" y1="30" x2="60" y2="36" />
          <line x1="60" y1="64" x2="60" y2="70" />
          <line x1="40" y1="50" x2="46" y2="50" />
          <line x1="74" y1="50" x2="80" y2="50" />
          <line x1="46" y1="36" x2="50" y2="40" />
          <line x1="70" y1="60" x2="74" y2="64" />
        </g>
      </g>
      {/* Core — accent, pulses */}
      <circle cx="60" cy="50" r="4" className="bp-node fill-accent" />
    </BlueprintGraphic>
  )
}

/** Direct Access — one clean line between two nodes, with flow along it. */
export function DirectAccessGraphic({ className }: GraphicProps) {
  return (
    <BlueprintGraphic loop='bp-loop-travel' className={className}>
      {/* The detour we skip */}
      <path d="M26 50 q24 -34 48 0" className="bp-line stroke-line" strokeWidth="1.5" fill="none" strokeDasharray="3 5" strokeLinecap="round" style={di(0)} />
      {/* The direct line */}
      <line x1="26" y1="50" x2="74" y2="50" className="bp-line stroke-line" strokeWidth="2" strokeLinecap="round" style={di(1)} />
      <line x1="26" y1="50" x2="74" y2="50" className="bp-fx bp-flow stroke-accent" strokeWidth="2" strokeDasharray="2 8" strokeLinecap="round" />
      <circle cx="26" cy="50" r="6" className="bp-line fill-bg-card stroke-line" strokeWidth="1.5" style={di(2)} />
      {/* You — accent endpoint */}
      <circle cx="74" cy="50" r="6" className="bp-node fill-accent" />
    </BlueprintGraphic>
  )
}

// ─── Who We Work With ───

/** Lean Mid-Market — an established building gaining an accent capability. */
export function LeanMarketGraphic({ className }: GraphicProps) {
  return (
    <BlueprintGraphic loop='bp-loop-scan' className={className}>
      <rect x="30" y="34" width="40" height="48" className="bp-line fill-bg-card stroke-line" strokeWidth="1.5" style={di(0)} />
      {[
        [38, 44],
        [54, 44],
        [38, 60],
        [54, 60],
      ].map(([x, y]) => (
        <rect key={x + '' + y} x={x} y={y} width="8" height="8" className="bp-line stroke-line" strokeWidth="1.5" style={di(1)} />
      ))}
      <line x1="26" y1="82" x2="74" y2="82" className="bp-line stroke-line" strokeWidth="1.5" strokeLinecap="round" style={di(2)} />
      {/* Scan sweep */}
      <line x1="30" y1="36" x2="70" y2="36" className="bp-fx bp-scan stroke-accent" strokeWidth="1.5" strokeLinecap="round" />
      {/* Added capability — accent */}
      <rect x="45" y="20" width="10" height="10" className="bp-node fill-accent" />
    </BlueprintGraphic>
  )
}

/** Technical Founder — a terminal prompt with a blinking accent cursor. */
export function FounderGraphic({ className }: GraphicProps) {
  return (
    <BlueprintGraphic loop='bp-loop-pulse' className={className}>
      <rect x="16" y="26" width="68" height="48" rx="2" className="bp-line fill-bg-card stroke-line" strokeWidth="1.5" style={di(0)} />
      <line x1="16" y1="38" x2="84" y2="38" className="bp-line stroke-line" strokeWidth="1.5" style={di(1)} />
      <path d="M26 50 l8 6 l-8 6" className="bp-line stroke-line" strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" style={di(2)} />
      <line x1="40" y1="62" x2="58" y2="62" className="bp-line stroke-line" strokeWidth="1.5" strokeLinecap="round" style={di(3)} />
      <rect x="62" y="54" width="7" height="10" className="bp-node fill-accent" />
    </BlueprintGraphic>
  )
}

/** Design-Led Team — an artboard with a bezier curve and accent control point. */
export function DesignLedGraphic({ className }: GraphicProps) {
  return (
    <BlueprintGraphic loop='bp-loop-travel' className={className}>
      <rect x="18" y="20" width="64" height="60" className="bp-line fill-bg-card stroke-line" strokeWidth="1.5" style={di(0)} />
      <path d="M28 68 C 40 30, 60 74, 72 34" className="bp-line stroke-line" strokeWidth="2" fill="none" strokeLinecap="round" style={di(1)} />
      <path d="M28 68 C 40 30, 60 74, 72 34" className="bp-fx bp-flow stroke-accent" strokeWidth="2" fill="none" strokeDasharray="2 9" strokeLinecap="round" />
      <line x1="28" y1="68" x2="40" y2="30" className="bp-line stroke-line" strokeWidth="1" strokeDasharray="3 3" style={di(2)} />
      <circle cx="28" cy="68" r="3.5" className="bp-line fill-bg-card stroke-line" strokeWidth="1.5" style={di(3)} />
      {/* Control point — accent */}
      <circle cx="40" cy="30" r="4.5" className="bp-node fill-accent" />
    </BlueprintGraphic>
  )
}

// ─── Phases (How We Work) ───

/** Prototype — an experiment flask with a bubbling accent core. */
export function PrototypeGraphic({ className }: GraphicProps) {
  return (
    <BlueprintGraphic loop='bp-loop-pulse' className={className}>
      <line x1="40" y1="20" x2="60" y2="20" className="bp-line stroke-line" strokeWidth="2" strokeLinecap="round" style={di(0)} />
      <path d="M43 21 V42 L31 70 Q31 78 39 78 H61 Q69 78 69 70 L57 42 V21" className="bp-line stroke-line" strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" style={di(1)} />
      <line x1="34" y1="65" x2="66" y2="65" className="bp-line stroke-line" strokeWidth="1.5" strokeDasharray="3 3" style={di(2)} />
      <circle cx="50" cy="61" r="5" className="bp-node fill-accent" />
    </BlueprintGraphic>
  )
}

/** Refine — tuning sliders with one accent knob. */
export function RefineGraphic({ className }: GraphicProps) {
  return (
    <BlueprintGraphic loop='bp-loop-pulse' className={className}>
      <line x1="20" y1="34" x2="80" y2="34" className="bp-line stroke-line" strokeWidth="1.5" strokeLinecap="round" style={di(0)} />
      <line x1="20" y1="50" x2="80" y2="50" className="bp-line stroke-line" strokeWidth="1.5" strokeLinecap="round" style={di(1)} />
      <line x1="20" y1="66" x2="80" y2="66" className="bp-line stroke-line" strokeWidth="1.5" strokeLinecap="round" style={di(2)} />
      <circle cx="60" cy="34" r="5" className="bp-line fill-bg-card stroke-line" strokeWidth="1.5" style={di(0)} />
      <circle cx="34" cy="66" r="5" className="bp-line fill-bg-card stroke-line" strokeWidth="1.5" style={di(2)} />
      {/* The knob we tune — accent */}
      <circle cx="44" cy="50" r="5.5" className="bp-node fill-accent" />
    </BlueprintGraphic>
  )
}

/** Scale — a stack of layers with an accent arrow rising off it. */
export function ScaleGraphic({ className }: GraphicProps) {
  return (
    <BlueprintGraphic loop='bp-loop-pulse' className={className}>
      <rect x="26" y="60" width="40" height="11" className="bp-line fill-bg-card stroke-line" strokeWidth="1.5" style={di(0)} />
      <rect x="26" y="46" width="40" height="11" className="bp-line fill-bg-card stroke-line" strokeWidth="1.5" style={di(1)} />
      <rect x="26" y="32" width="40" height="11" className="bp-line fill-bg-card stroke-line" strokeWidth="1.5" style={di(2)} />
      <line x1="76" y1="46" x2="76" y2="24" className="bp-line stroke-accent" strokeWidth="2" strokeLinecap="round" style={di(3)} />
      <path d="M71 29 l5 -5 l5 5" className="bp-line stroke-accent" strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" style={di(3)} />
      <circle cx="76" cy="46" r="3.5" className="bp-node fill-accent" />
    </BlueprintGraphic>
  )
}

/** R&D — an atom: orbits slowly turning around an accent nucleus. */
export function RnDGraphic({ className }: GraphicProps) {
  return (
    <BlueprintGraphic loop='bp-loop-gear' className={className}>
      <g className="bp-fx bp-gear">
        <ellipse cx="50" cy="50" rx="30" ry="12" className="stroke-line" strokeWidth="1.5" fill="none" />
        <ellipse cx="50" cy="50" rx="30" ry="12" className="stroke-line" strokeWidth="1.5" fill="none" transform="rotate(60 50 50)" />
        <ellipse cx="50" cy="50" rx="30" ry="12" className="stroke-line" strokeWidth="1.5" fill="none" transform="rotate(120 50 50)" />
      </g>
      {/* Nucleus — accent */}
      <circle cx="50" cy="50" r="5.5" className="bp-node fill-accent" />
    </BlueprintGraphic>
  )
}
