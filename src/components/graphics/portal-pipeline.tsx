import type { CSSProperties, ReactNode } from 'react'
import { BlueprintGraphic } from './blueprint-graphic'

/**
 * The whole portal, told as one wide set piece: comms → task → plan feed a
 * central cloud sandbox where a deployed agent writes the code, which flows on to
 * GitHub and deploy. Marching-dash accent connectors keep moving between the
 * stages. Rather than swapping graphics, the autoplay spotlights one stage at a
 * time (the `active` index): the active stage zooms up and the rest shrink back
 * and dim, so the eye is drawn to it. Pass `active = null` to rest everything
 * evenly (used under reduced motion). Same blueprint vocabulary as
 * hero-graphic.tsx.
 *
 * Layout: each stage is authored in local coordinates, placed by an outer
 * translate that centres its box on the mid-line, and scaled by an inner group
 * about its own centre. Connectors are computed from the *resting* edges, so a
 * zoomed stage only ever grows over its connector (covered by the opaque box) —
 * it never opens a gap. The stages are deliberately small relative to the
 * viewBox: generous side padding, wide gaps, and vertical breathing room, so
 * each stage renders narrow with plenty of air around it rather than filling a
 * stretched strip.
 */

const di = (i: number) => ({ ['--draw-i']: i }) as CSSProperties

const VB_H = 210
const MID_Y = VB_H / 2
/** Rendered window, cropped close to the content (with a small margin so
 *  active-zoom stages don't clip). Removes the dead space around the now-
 *  transparent graphic without repositioning any stage. */
const VIEW = { x: 30, y: 25, w: 636, h: 160 }
/** Resting scale for every stage, and the zoom for the active one. */
const BASE = 1.0
const ACTIVE = 1.16
/** Inset each connector this far from both boxes, so a stage zooming to ACTIVE
 *  (which grows ~w/2·(ACTIVE−BASE) past its resting edge) never swallows the
 *  arrowhead — it keeps a little breathing room around every stage. */
const CONNECT_GAP = 8

type StageMeta = { key: string; xo: number; w: number; cy: number }

// xo = local x placement; w = content width; cy = local y of the box centre
// (used to sit each box on the mid-line). Stages stay compact while the viewBox
// carries ~50u of side padding and ~46u gaps, so each graphic reads narrow with
// wide margins around it.
const STAGES: StageMeta[] = [
  { key: 'board', xo: 50, w: 114, cy: 57 },
  { key: 'plan', xo: 210, w: 68, cy: 65 },
  { key: 'cloud', xo: 324, w: 118, cy: 80 },
  { key: 'github', xo: 488, w: 66, cy: 65 },
  { key: 'deploy', xo: 600, w: 52, cy: 62 },
]

const LINK_LABELS = [undefined, 'DISPATCH', 'PUSH', undefined]

const centerX = (s: StageMeta) => s.xo + s.w / 2
const restRight = (s: StageMeta) => centerX(s) + (s.w / 2) * BASE
const restLeft = (s: StageMeta) => centerX(s) - (s.w / 2) * BASE

/** Stacked "text" rows — schematic stand-in for real copy. */
function rows(
  x: number,
  y: number,
  widths: number[],
  gap: number,
  startI: number,
  sw = 0.8
): ReactNode {
  return widths.map((w, k) => (
    <line
      key={`r${x}-${y}-${k}`}
      x1={x}
      y1={y + k * gap}
      x2={x + w}
      y2={y + k * gap}
      className='bp-line stroke-line'
      style={di(startI + k)}
      strokeWidth={sw}
      strokeLinecap='round'
    />
  ))
}

/** A small mono label; fades in with the schematic (bp-fx). */
function Txt({
  x,
  y,
  children,
  size = 3.6,
  tone = 'muted',
  anchor = 'start',
}: {
  x: number
  y: number
  children: string
  size?: number
  tone?: 'muted' | 'accent' | 'dark'
  anchor?: 'start' | 'middle' | 'end'
}) {
  const fill =
    tone === 'accent'
      ? 'fill-accent'
      : tone === 'dark'
        ? 'fill-bg'
        : 'fill-text-muted'
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className={`bp-fx ${fill} font-mono transition-colors duration-500 ease-out`}
      fontSize={size}
      letterSpacing='0.1'
    >
      {children}
    </text>
  )
}

/** A marching-dash accent connector between two stages, on the mid-line, with an
 *  arrowhead and an optional label. Always lit (not dimmed with the stages). */
function Flow({ x1, x2, label }: { x1: number; x2: number; label?: string }) {
  const y = MID_Y
  const a = x1 + CONNECT_GAP // tail, clear of the previous box
  const b = x2 - CONNECT_GAP // head, clear of the next box
  return (
    <g>
      <line
        x1={a}
        y1={y}
        x2={b}
        y2={y}
        className='bp-line stroke-line'
        style={di(0)}
        strokeWidth='0.5'
        strokeLinecap='round'
      />
      <line
        x1={a}
        y1={y}
        x2={b - 3}
        y2={y}
        className='bp-fx bp-flow stroke-accent'
        strokeWidth='1.2'
        strokeDasharray='2 6'
        strokeLinecap='round'
      />
      <path
        d={`M${b - 4} ${y - 3} l4 3 l-4 3`}
        className='bp-fx stroke-accent'
        strokeWidth='1.2'
        fill='none'
        strokeLinejoin='round'
        strokeLinecap='round'
      />
      {label && (
        <Txt
          x={(x1 + x2) / 2}
          y={y - 6}
          size={2.8}
          tone='accent'
          anchor='middle'
        >
          {label}
        </Txt>
      )}
    </g>
  )
}

export function PortalPipeline({
  active,
  paused = false,
  className,
}: {
  active: number | null
  paused?: boolean
  className?: string
}) {
  const stageStyle = (i: number): CSSProperties => ({
    transformBox: 'fill-box',
    transformOrigin: 'center',
    transform: `scale(${active === i ? ACTIVE : BASE})`,
    opacity: active === null || active === i ? 1 : 0.26,
    transition: 'transform 500ms ease-out, opacity 500ms ease-out',
  })

  const place = (i: number) =>
    `translate(${STAGES[i].xo} ${MID_Y - STAGES[i].cy})`

  // The stage's heading lights up accent while it holds the spotlight.
  const titleTone = (i: number): 'muted' | 'accent' =>
    active === i ? 'accent' : 'muted'

  return (
    <BlueprintGraphic
      viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
      className={`bp-loop-travel bp-loop-gear bp-loop-slow ${paused ? 'bp-paused' : ''} ${className ?? ''}`}
    >
      {/* ── Connectors (resting edges → never gap when a stage zooms) ── */}
      {STAGES.slice(0, -1).map((s, i) => (
        <Flow
          key={`link${i}`}
          x1={restRight(s)}
          x2={restLeft(STAGES[i + 1])}
          label={LINK_LABELS[i]}
        />
      ))}

      {/* ── 0 · Board: comms → task, with the information flowing in ── */}
      <g transform={place(0)}>
        <g style={stageStyle(0)}>
          <Txt x={0} y={15} size={7.5} tone={titleTone(0)}>
            COMMS
          </Txt>
          {/* email */}
          <rect
            x={0}
            y={24}
            width={14}
            height={9}
            className='bp-line fill-bg-card stroke-line'
            style={di(0)}
            strokeWidth='0.9'
          />
          <path
            d='M0 24 L7 28.5 L14 24'
            className='bp-line stroke-line'
            style={di(0)}
            strokeWidth='0.7'
            fill='none'
            strokeLinejoin='round'
          />
          {/* transcript */}
          <rect
            x={0}
            y={42}
            width={14}
            height={11}
            className='bp-line fill-bg-card stroke-line'
            style={di(1)}
            strokeWidth='0.9'
          />
          {rows(3, 46, [8, 6, 8], 3, 1, 0.6)}
          {/* meeting: two people talking */}
          <g
            className='bp-line stroke-line'
            style={di(2)}
            strokeWidth='0.9'
            strokeLinejoin='round'
            strokeLinecap='round'
          >
            {/* back person */}
            <path d='M6 70 a4 4 0 0 1 8 0 z' className='fill-bg' />
            <circle cx={10} cy={62} r={2} className='fill-bg' />
            {/* front person */}
            <path d='M0.5 71 a4.5 4.5 0 0 1 9 0 z' className='fill-bg' />
            <circle cx={5} cy={64} r={2.3} className='fill-bg' />
          </g>
          {/* collect the comms onto a bus, then feed the board with a plain
              grey line (accent arrows are reserved for between steps) */}
          <g
            className='bp-line stroke-line'
            style={di(3)}
            strokeWidth='0.5'
            strokeLinecap='round'
            fill='none'
          >
            <path d='M16 28.5 H24' />
            <path d='M16 47.5 H24' />
            <path d='M16 65.5 H24' />
            <path d='M24 28.5 V65.5' />
            <path d='M24 47.5 H58' />
          </g>
          {/* task board: kanban columns of little cards, one in progress */}
          <Txt x={60} y={15} size={7.5} tone={titleTone(0)}>
            TASK
          </Txt>
          {[
            { x: 58, header: 12, cards: [40, 52, 64], accent: -1 },
            { x: 78, header: 9, cards: [40, 52], accent: 0 },
            { x: 98, header: 10, cards: [40], accent: -1 },
          ].map((col, ci) => (
            <g key={`col${ci}`}>
              {/* column header */}
              <line
                x1={col.x + 1}
                y1={34}
                x2={col.x + 1 + col.header}
                y2={34}
                className='bp-line stroke-line'
                style={di(5 + ci)}
                strokeWidth='1.2'
                strokeLinecap='round'
              />
              {col.cards.map((cy, cj) =>
                col.accent === cj ? (
                  <rect
                    key={`c${ci}-${cj}`}
                    x={col.x + 1}
                    y={cy}
                    width={15}
                    height={10}
                    rx={1}
                    className='bp-node fill-accent'
                  />
                ) : (
                  <g key={`c${ci}-${cj}`}>
                    <rect
                      x={col.x + 1}
                      y={cy}
                      width={15}
                      height={10}
                      rx={1}
                      className='bp-line fill-bg-card stroke-line'
                      style={di(5 + ci)}
                      strokeWidth='0.8'
                    />
                    <line
                      x1={col.x + 3}
                      y1={cy + 4}
                      x2={col.x + 13}
                      y2={cy + 4}
                      className='stroke-line'
                      strokeWidth='0.6'
                      strokeLinecap='round'
                    />
                  </g>
                )
              )}
            </g>
          ))}
        </g>
      </g>

      {/* ── 1 · Plan ── */}
      <g transform={place(1)}>
        <g style={stageStyle(1)}>
          <Txt x={0} y={13} tone={titleTone(1)} size={6.5}>
            HUMAN + AGENT
          </Txt>
          <Txt x={0} y={22} tone={titleTone(1)} size={6.5}>
            PLANNING
          </Txt>
          <rect
            x={0}
            y={28}
            width={68}
            height={74}
            className='fill-bg-card stroke-line'
            strokeWidth='0.9'
          />
          {/* plan heading */}
          <line
            x1={6}
            y1={40}
            x2={46}
            y2={40}
            className='bp-line stroke-line'
            style={di(1)}
            strokeWidth='1.5'
            strokeLinecap='round'
          />
          {/* agent step checklist — each step ticked off */}
          {[50, 61, 72].map((cy, i) => (
            <g key={`step${i}`}>
              <path
                d={`M6 ${cy} l2.4 2.6 l4.6 -6`}
                className='bp-line stroke-accent'
                style={di(2 + i)}
                strokeWidth='1.3'
                strokeLinejoin='round'
                strokeLinecap='round'
                fill='none'
              />
              <line
                x1={15}
                y1={cy}
                x2={15 + [46, 40, 44][i]}
                y2={cy}
                className='bp-line stroke-line'
                style={di(2 + i)}
                strokeWidth='0.7'
                strokeLinecap='round'
              />
            </g>
          ))}
          {/* model badge */}
          <rect
            x={6}
            y={88}
            width={24}
            height={9}
            className='bp-line stroke-line'
            style={di(6)}
            strokeWidth='0.8'
          />
          <Txt x={9} y={94.5} size={3}>
            OPUS
          </Txt>
        </g>
      </g>

      {/* ── 2 · Cloud sandbox (centrepiece) ── */}
      <g transform={place(2)}>
        <g style={stageStyle(2)}>
          <rect
            x={0}
            y={20}
            width={118}
            height={120}
            rx={4}
            className='fill-none stroke-border-light'
            strokeWidth='0.8'
            strokeDasharray='4 4'
          />
          <Txt x={6} y={33} size={7.5} tone={titleTone(2)}>
            DISPATCH CLOUD AGENT
          </Txt>
          {/* small terminal — code being written */}
          <rect
            x={8}
            y={44}
            width={30}
            height={22}
            className='fill-bg stroke-line'
            strokeWidth='0.8'
          />
          <line
            x1={8}
            y1={50}
            x2={38}
            y2={50}
            className='stroke-line'
            strokeWidth='0.5'
          />
          {[11.5, 14.5, 17.5].map(dx => (
            <circle
              key={`td${dx}`}
              cx={dx}
              cy={47}
              r={0.8}
              className='fill-bg stroke-line'
              strokeWidth='0.5'
            />
          ))}
          <path
            d='M12 55 l2.4 2 l-2.4 2'
            className='bp-line stroke-line'
            style={di(1)}
            strokeWidth='0.9'
            strokeLinejoin='round'
            strokeLinecap='round'
            fill='none'
          />
          {rows(18, 55.5, [14, 9], 4.5, 2, 0.6)}

          {/* server rack — cloud compute */}
          {[44, 52, 60].map((sy, i) => (
            <g key={`srv${i}`}>
              <rect
                x={82}
                y={sy}
                width={28}
                height={6.5}
                className='fill-bg stroke-line'
                strokeWidth='0.7'
              />
              <circle
                cx={86}
                cy={sy + 3.25}
                r={0.9}
                className='fill-bg stroke-line'
                strokeWidth='0.6'
              />
              <line
                x1={90}
                y1={sy + 3.25}
                x2={105}
                y2={sy + 3.25}
                className='stroke-line'
                strokeWidth='0.5'
              />
            </g>
          ))}

          {/* database — cloud storage */}
          <g className='stroke-line' strokeWidth='0.8' fill='none'>
            <path d='M13 106 v11 a9 3 0 0 0 18 0 v-11' className='fill-bg' />
            <ellipse cx={22} cy={106} rx={9} ry={3} className='fill-bg' />
            <path d='M13 111.5 a9 3 0 0 0 18 0' />
          </g>

          {/* the agent: a spinning cog at the centre */}
          <g className='bp-fx bp-gear'>
            {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
              <rect
                key={`tooth${deg}`}
                x={58}
                y={73}
                width={4}
                height={6}
                rx={0.6}
                className='fill-bg stroke-line'
                strokeWidth='1'
                transform={`rotate(${deg} 60 88)`}
              />
            ))}
            <circle
              cx={60}
              cy={88}
              r={10}
              className='fill-bg stroke-line'
              strokeWidth='1.1'
            />
            <circle
              cx={60}
              cy={88}
              r={5}
              className='fill-none stroke-line'
              strokeWidth='0.9'
            />
          </g>
          <circle cx={60} cy={88} r={3.4} className='bp-node fill-accent' />
          <Txt x={60} y={112} size={3.4} anchor='middle'>
            AGENT
          </Txt>
        </g>
      </g>

      {/* ── 3 · GitHub / pull request ── */}
      <g transform={place(3)}>
        <g style={stageStyle(3)}>
          <Txt x={0} y={13} size={6.5} tone={titleTone(3)}>
            HUMAN QA +
          </Txt>
          <Txt x={0} y={22} size={6.5} tone={titleTone(3)}>
            TASTEMAKING
          </Txt>
          {/* monitor: the work under review */}
          <rect
            x={9}
            y={33}
            width={48}
            height={30}
            className='fill-bg stroke-line'
            strokeWidth='0.9'
          />
          {rows(15, 41, [30, 24, 27], 5, 1, 0.7)}
          {/* human sign-off on screen */}
          <path
            d='M15 56 l2.4 2.6 l4.6 -6'
            className='bp-node stroke-accent'
            strokeWidth='1.6'
            strokeLinejoin='round'
            strokeLinecap='round'
            fill='none'
          />
          {/* monitor stand + desk */}
          <rect
            x={31}
            y={63}
            width={4}
            height={3}
            className='fill-bg stroke-line'
            strokeWidth='0.7'
          />
          <line
            x1={2}
            y1={67}
            x2={64}
            y2={67}
            className='stroke-line'
            strokeWidth='0.7'
          />
          {/* the reviewer, seated at the desk */}
          <path
            d='M18 90 a14 11 0 0 1 30 0 z'
            className='fill-bg stroke-line'
            strokeWidth='0.9'
            strokeLinejoin='round'
          />
          <circle
            cx={33}
            cy={70}
            r={6.5}
            className='fill-bg stroke-line'
            strokeWidth='0.9'
          />
        </g>
      </g>

      {/* ── 4 · Deploy: the live website in a browser ── */}
      <g transform={place(4)}>
        <g style={stageStyle(4)}>
          <Txt x={0} y={13} size={6.5} tone={titleTone(4)}>
            VERIFY &
          </Txt>
          <Txt x={0} y={22} size={6.5} tone={titleTone(4)}>
            DEPLOY
          </Txt>
          {/* browser window */}
          <rect
            x={0}
            y={26}
            width={52}
            height={72}
            className='fill-bg stroke-line'
            strokeWidth='0.9'
          />
          {/* chrome: traffic lights, address bar, live dot */}
          <line
            x1={0}
            y1={37}
            x2={52}
            y2={37}
            className='stroke-line'
            strokeWidth='0.6'
          />
          {[4, 8, 12].map(dx => (
            <circle
              key={`dp${dx}`}
              cx={dx}
              cy={31.5}
              r={1.2}
              className='fill-bg stroke-line'
              strokeWidth='0.6'
            />
          ))}
          <rect
            x={18}
            y={29}
            width={26}
            height={5}
            rx={2}
            className='fill-bg stroke-line'
            strokeWidth='0.6'
          />
          <circle cx={48} cy={31.5} r={1.7} className='bp-node fill-accent' />
          {/* rendered page: header — logo + nav links */}
          <line
            x1={5}
            y1={44}
            x2={19}
            y2={44}
            className='bp-line stroke-line'
            style={di(1)}
            strokeWidth='1.4'
            strokeLinecap='round'
          />
          <g
            className='bp-line stroke-line'
            style={di(1)}
            strokeWidth='0.7'
            strokeLinecap='round'
          >
            <line x1={34} y1={44} x2={40} y2={44} />
            <line x1={42} y1={44} x2={47} y2={44} />
          </g>
          {/* hero banner: headline, subtext, CTA button */}
          <rect
            x={5}
            y={50}
            width={42}
            height={20}
            className='fill-bg-card stroke-line'
            strokeWidth='0.8'
          />
          <line
            x1={10}
            y1={56}
            x2={34}
            y2={56}
            className='bp-line stroke-line'
            style={di(2)}
            strokeWidth='1.1'
            strokeLinecap='round'
          />
          <line
            x1={10}
            y1={60}
            x2={26}
            y2={60}
            className='bp-line stroke-line'
            style={di(3)}
            strokeWidth='0.7'
            strokeLinecap='round'
          />
          <rect
            x={10}
            y={64}
            width={13}
            height={3.5}
            rx={0.6}
            className='bp-line stroke-line'
            style={di(4)}
            strokeWidth='0.7'
          />
          {/* content below the fold */}
          {rows(5, 78, [42, 34, 38], 5, 6, 0.7)}
        </g>
      </g>
    </BlueprintGraphic>
  )
}
