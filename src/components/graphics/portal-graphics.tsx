import type { SVGProps } from 'react'

/**
 * Blueprint schematic icons for the "Our Portal" pipeline steps. Same language as
 * process-graphics: thin border-light strokes on a 100x100 viewBox with accent
 * highlights, hollow nodes filled with the page background so connecting lines
 * don't show through. One icon per pipeline stage.
 */

type GraphicProps = SVGProps<SVGSVGElement>

const base = {
  viewBox: '0 0 100 100',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
} as const

/** Comms -> Task — communications converging through an accent arrow into a task card. */
export function CommsTaskIcon(props: GraphicProps) {
  return (
    <svg {...base} {...props}>
      {/* comm sources: three stacked message lines with terminal dots */}
      <g className="stroke-border-light" strokeWidth="2" strokeLinecap="round">
        <line x1="16" y1="34" x2="34" y2="34" />
        <line x1="16" y1="50" x2="34" y2="50" />
        <line x1="16" y1="66" x2="34" y2="66" />
      </g>
      <g className="fill-border-light">
        <circle cx="16" cy="34" r="2.5" />
        <circle cx="16" cy="50" r="2.5" />
        <circle cx="16" cy="66" r="2.5" />
      </g>
      {/* accent arrow into the task */}
      <line x1="40" y1="50" x2="54" y2="50" className="stroke-accent" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M49 44 l6 6 l-6 6" className="stroke-accent" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {/* task card */}
      <rect x="62" y="28" width="26" height="44" className="fill-bg stroke-border-light" strokeWidth="2" />
      <line x1="68" y1="44" x2="82" y2="44" className="stroke-border-light" strokeWidth="2" />
      <line x1="68" y1="54" x2="82" y2="54" className="stroke-border-light" strokeWidth="2" />
      <rect x="62" y="28" width="8" height="6" className="fill-accent" />
    </svg>
  )
}

/** Human + Agent Handoff — a person and an agent chip joined by an accent plus. */
export function HandoffIcon(props: GraphicProps) {
  return (
    <svg {...base} {...props}>
      {/* human */}
      <circle cx="24" cy="36" r="9" className="fill-bg stroke-border-light" strokeWidth="2" />
      <path d="M10 70 C10 54, 38 54, 38 70" className="stroke-border-light" strokeWidth="2" strokeLinecap="round" />
      {/* accent plus, joining human and agent */}
      <g className="stroke-accent" strokeWidth="2.5" strokeLinecap="round">
        <line x1="50" y1="44" x2="50" y2="58" />
        <line x1="43" y1="51" x2="57" y2="51" />
      </g>
      {/* agent chip */}
      <rect x="62" y="38" width="26" height="26" className="fill-bg stroke-border-light" strokeWidth="2" />
      <g className="stroke-border-light" strokeWidth="2" strokeLinecap="round">
        <line x1="70" y1="38" x2="70" y2="32" />
        <line x1="80" y1="38" x2="80" y2="32" />
        <line x1="70" y1="64" x2="70" y2="70" />
        <line x1="80" y1="64" x2="80" y2="70" />
      </g>
      <circle cx="75" cy="51" r="4" className="fill-accent" />
    </svg>
  )
}

/** Human Verification, Taste & Iterate — a refinement curve with iteration nodes,
 *  rising into an accent verification check. */
export function VerifyTasteIterateIcon(props: GraphicProps) {
  return (
    <svg {...base} {...props}>
      {/* refinement / iteration curve */}
      <path d="M16 80 C 30 68, 40 58, 52 48" className="stroke-border-light" strokeWidth="2" strokeLinecap="round" />
      {/* iteration nodes along the curve */}
      <g className="fill-bg stroke-border-light" strokeWidth="1.5">
        <circle cx="16" cy="80" r="3.5" />
        <circle cx="34" cy="63" r="3.5" />
      </g>
      {/* accent verification check at the end */}
      <path d="M54 54 l6 6 l14 -18" className="stroke-accent" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

/** Build, Validate & Deploy — build blocks launched by an accent deploy arrow. */
export function BuildDeployIcon(props: GraphicProps) {
  return (
    <svg {...base} {...props}>
      {/* build blocks */}
      <g className="fill-bg stroke-border-light" strokeWidth="2">
        <rect x="16" y="58" width="16" height="16" />
        <rect x="34" y="58" width="16" height="16" />
        <rect x="25" y="42" width="16" height="16" />
      </g>
      {/* accent deploy arrow */}
      <line x1="72" y1="74" x2="72" y2="34" className="stroke-accent" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M64 42 l8 -9 l8 9" className="stroke-accent" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}
