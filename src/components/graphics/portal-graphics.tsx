import type { SVGProps } from 'react'

/**
 * Blueprint schematic icons for the "The Portal" section on how-we-work. Same
 * language as process-graphics: thin border-light strokes on a 100x100 viewBox
 * with accent highlights, hollow nodes filled with the page background so
 * connecting lines don't show through. Used for the execution-pipeline nodes and
 * the claim cards below it.
 */

type GraphicProps = SVGProps<SVGSVGElement>

const base = {
  viewBox: '0 0 100 100',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
} as const

/** Task — a scoped work card entering the portal. */
export function TaskIcon(props: GraphicProps) {
  return (
    <svg {...base} {...props}>
      <rect x="22" y="16" width="56" height="68" className="fill-bg stroke-border-light" strokeWidth="2" />
      <line x1="32" y1="36" x2="68" y2="36" className="stroke-border-light" strokeWidth="2" />
      <line x1="32" y1="48" x2="68" y2="48" className="stroke-border-light" strokeWidth="2" />
      <line x1="32" y1="60" x2="54" y2="60" className="stroke-border-light" strokeWidth="2" />
      <rect x="22" y="16" width="14" height="8" className="fill-accent" />
    </svg>
  )
}

/** Frontier model — a central accent node with radiating satellites. */
export function ModelIcon(props: GraphicProps) {
  return (
    <svg {...base} {...props}>
      <g className="stroke-border-light" strokeWidth="2">
        <line x1="50" y1="50" x2="24" y2="28" />
        <line x1="50" y1="50" x2="76" y2="28" />
        <line x1="50" y1="50" x2="24" y2="74" />
        <line x1="50" y1="50" x2="76" y2="74" />
      </g>
      <g className="fill-bg stroke-border-light" strokeWidth="2">
        <circle cx="24" cy="28" r="6" />
        <circle cx="76" cy="28" r="6" />
        <circle cx="24" cy="74" r="6" />
        <circle cx="76" cy="74" r="6" />
      </g>
      <circle cx="50" cy="50" r="9" className="fill-accent" />
    </svg>
  )
}

/** Deployed agent — a processor chip with pins and an accent run triangle. */
export function AgentIcon(props: GraphicProps) {
  return (
    <svg {...base} {...props}>
      <rect x="30" y="30" width="40" height="40" className="fill-bg stroke-border-light" strokeWidth="2" />
      <g className="stroke-border-light" strokeWidth="2" strokeLinecap="round">
        <line x1="40" y1="30" x2="40" y2="20" />
        <line x1="50" y1="30" x2="50" y2="20" />
        <line x1="60" y1="30" x2="60" y2="20" />
        <line x1="40" y1="70" x2="40" y2="80" />
        <line x1="50" y1="70" x2="50" y2="80" />
        <line x1="60" y1="70" x2="60" y2="80" />
        <line x1="30" y1="40" x2="20" y2="40" />
        <line x1="30" y1="60" x2="20" y2="60" />
        <line x1="70" y1="40" x2="80" y2="40" />
        <line x1="70" y1="60" x2="80" y2="60" />
      </g>
      <path d="M45 42 L45 58 L59 50 Z" className="fill-accent" />
    </svg>
  )
}

/** Cloud sandbox — an isolated terminal container with a prompt + input line. */
export function SandboxIcon(props: GraphicProps) {
  return (
    <svg {...base} {...props}>
      <rect x="18" y="24" width="64" height="52" className="fill-bg stroke-border-light" strokeWidth="2" />
      <line x1="18" y1="36" x2="82" y2="36" className="stroke-border-light" strokeWidth="2" />
      <path d="M28 50 l8 6 l-8 6" className="stroke-accent" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="44" y1="62" x2="60" y2="62" className="stroke-border-light" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/** Human verification — a shield with an accent check. */
export function VerifyIcon(props: GraphicProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M50 16 L78 26 V52 C78 68 66 80 50 86 C34 80 22 68 22 52 V26 Z"
        className="fill-bg stroke-border-light"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M38 50 l8 9 l16 -20" className="stroke-accent" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Shipped — an accent deploy arrow rising through the production line. */
export function ShipIcon(props: GraphicProps) {
  return (
    <svg {...base} {...props}>
      <line x1="20" y1="76" x2="80" y2="76" className="stroke-border-light" strokeWidth="2" strokeDasharray="3 4" strokeLinecap="round" />
      <line x1="50" y1="70" x2="50" y2="26" className="stroke-accent" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M38 38 l12 -14 l12 14" className="stroke-accent" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

/** Throughput — many tasks funneling through one accent output. */
export function ThroughputIcon(props: GraphicProps) {
  return (
    <svg {...base} {...props}>
      <g className="stroke-border-light" strokeWidth="2" strokeLinecap="round">
        <line x1="18" y1="30" x2="50" y2="50" />
        <line x1="18" y1="50" x2="46" y2="50" />
        <line x1="18" y1="70" x2="50" y2="50" />
      </g>
      <line x1="50" y1="50" x2="80" y2="50" className="stroke-accent" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M70 42 l10 8 l-10 8" className="stroke-accent" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="50" cy="50" r="4" className="fill-accent" />
    </svg>
  )
}
