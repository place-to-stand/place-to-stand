import type { SVGProps } from 'react'

/**
 * Blueprint schematic graphics for the how-we-work process steps. Thin
 * border-light strokes with accent highlights, drawn on a 100x100 viewBox so
 * they read as small technical diagrams that fill the right side of each row.
 * Hollow nodes are filled with the page background so connecting lines don't
 * show through.
 */

type GraphicProps = SVGProps<SVGSVGElement>

const base = {
  viewBox: '0 0 100 100',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
} as const

/** Quick Wins — a rising step line that lands on an accent milestone. */
export function QuickWinsGraphic(props: GraphicProps) {
  return (
    <svg {...base} {...props}>
      <line x1="12" y1="86" x2="88" y2="86" strokeDasharray="3 4" className="stroke-border-light" strokeWidth="1.5" strokeLinecap="round" />
      <polyline points="16,78 36,78 36,58 56,58 56,38 74,38 74,24" className="stroke-border-light" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M69 17 l5 -5 l5 5" className="stroke-accent" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <line x1="74" y1="24" x2="74" y2="14" className="stroke-accent" strokeWidth="2" strokeLinecap="round" />
      <circle cx="74" cy="38" r="4.5" className="fill-accent" />
    </svg>
  )
}

/** Ontology — an entity-relationship node graph, root node in accent. */
export function OntologyGraphic(props: GraphicProps) {
  return (
    <svg {...base} {...props}>
      <g className="stroke-border-light" strokeWidth="1.5">
        <line x1="50" y1="24" x2="24" y2="60" />
        <line x1="50" y1="24" x2="78" y2="54" />
        <line x1="24" y1="60" x2="40" y2="86" />
        <line x1="78" y1="54" x2="40" y2="86" />
        <line x1="24" y1="60" x2="78" y2="54" />
      </g>
      <g className="fill-bg stroke-border-light" strokeWidth="1.5">
        <circle cx="24" cy="60" r="5" />
        <circle cx="78" cy="54" r="5" />
        <circle cx="40" cy="86" r="5" />
      </g>
      <circle cx="50" cy="24" r="6.5" className="fill-accent" />
    </svg>
  )
}

/** Automated Execution & Human Verification — input, a process gear, accent check. */
export function AutomationGraphic(props: GraphicProps) {
  return (
    <svg {...base} {...props}>
      <rect x="10" y="42" width="16" height="16" className="fill-bg stroke-border-light" strokeWidth="1.5" />
      <line x1="26" y1="50" x2="42" y2="50" className="stroke-border-light" strokeWidth="1.5" />
      <circle cx="55" cy="50" r="11" className="fill-bg stroke-border-light" strokeWidth="1.5" />
      <g className="stroke-border-light" strokeWidth="1.5" strokeLinecap="round">
        <line x1="55" y1="33" x2="55" y2="39" />
        <line x1="55" y1="61" x2="55" y2="67" />
        <line x1="38" y1="50" x2="44" y2="50" />
        <line x1="66" y1="50" x2="72" y2="50" />
      </g>
      <circle cx="55" cy="50" r="3" className="fill-border-light" />
      <line x1="72" y1="50" x2="80" y2="50" className="stroke-border-light" strokeWidth="1.5" />
      <path d="M80 50 l4 5 l7 -12" className="stroke-accent" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Taste — a refined bezier curve with accent control points. */
export function TasteGraphic(props: GraphicProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14 80 C 32 22, 68 92, 88 30" className="stroke-border-light" strokeWidth="2" strokeLinecap="round" />
      <g className="stroke-border-light" strokeWidth="1" strokeDasharray="3 3">
        <line x1="14" y1="80" x2="32" y2="22" />
        <line x1="88" y1="30" x2="68" y2="92" />
      </g>
      <g className="fill-bg stroke-border-light" strokeWidth="1.5">
        <circle cx="14" cy="80" r="4" />
        <circle cx="88" cy="30" r="4" />
      </g>
      <circle cx="32" cy="22" r="4" className="fill-accent" />
      <circle cx="68" cy="92" r="4" className="fill-accent" />
    </svg>
  )
}
