/* eslint-disable design/no-raw-aspect, design/no-raw-border -- the proof panel is drawn in the clients' own colors on its own grid (see PANEL_W) */
import type { Route } from 'next'
import { Section, SectionHeading } from '@/src/components/patterns/section'
import { ArrowLink } from '@/src/components/patterns/arrow-link'
import { Reveal } from '@/src/components/primitives/animated-section'
import { HOME_PROOF } from '@/src/lib/home'
import { CLIENT_FONTS } from '@/src/components/patterns/client-widgets/client-fonts'
import { HotOnesCard } from '@/src/components/patterns/client-widgets/hot-ones-card'
import {
  HeatFilter,
  TrioCard,
} from '@/src/components/patterns/client-widgets/heatonist-widgets'

const HO_BLACK = '#0d0d0d'
const HO_YELLOW = '#ffd305'

const HOUSE_SAUCE = {
  number: 2,
  name: 'House Sauce',
  notes: ['Tangy', 'Peppery', 'Packed with flavor'],
  level: 2,
  bottle: '/work/hotones-bottle-house-sauce.webp',
}
const BEACH_BONNET = {
  number: 3,
  name: 'Beach Bonnet',
  maker: 'Double Comfort',
  notes: ['Tropical fruits & island peppers'],
  level: 3,
  bottle: '/work/hotones-bottle-beach-bonnet.webp',
}

/**
 * The laptop composition's grid (Nov 15). The panel is 56 x 19 units, one
 * unit (g) being 24px at the 1344px content width and scaling with the
 * panel (container units). Inside: a 2g margin on all four sides and 12
 * columns with 1g gutters. Every piece and label sits on these lines.
 */
const PANEL_W = 56
const PANEL_H = 19
const MARGIN = 2
const COL = (PANEL_W - 2 * MARGIN - 11) / 12
const g = (n: number) => `calc(${n} * 100cqw / ${PANEL_W})`
/** Left edge of column k (1-12), in g. */
const colX = (k: number) => MARGIN + (k - 1) * (COL + 1)
/** Right edge of column k, in g. */
const colR = (k: number) => colX(k) + COL

const LABEL_INK = 'rgba(255,255,255,0.92)'
/** The Heat filter: two columns and a gutter wide (columns 2-3). */
const FILTER_W = 2 * COL + 1

/** A label left-aligned on a column line with its leader running right
 *  from the label's end to a piece's edge (the flip cards). */
function LabelThenLeader({
  at,
  to,
  y,
  title,
  detail,
}: {
  at: number
  to: number
  y: number
  title: string
  detail: string
}) {
  return (
    <div
      aria-hidden
      className='pointer-events-none absolute z-30 flex items-center gap-grid-half pl-grid-half'
      style={{
        left: g(at),
        width: g(to - at),
        top: g(y),
        transform: 'translateY(-50%)',
        color: LABEL_INK,
      }}
    >
      <span className='flex max-w-[13em] flex-col gap-0.5 font-mono text-xs leading-tight tracking-[0.1em] uppercase'>
        <span className='font-semibold'>{title}</span>
        <span className='opacity-75'>{detail}</span>
      </span>
      <span className='h-px flex-1' style={{ backgroundColor: LABEL_INK }} />
      <span
        className='size-[7px] shrink-0 rounded-full'
        style={{ backgroundColor: LABEL_INK, marginRight: -3.5 }}
      />
    </div>
  )
}

/** A callout on the grid: a dot on a piece's edge, a 1px leader to the
 *  label's column line, and the label on that line (12px off it). */
function GridCallout({
  from,
  to,
  y,
  title,
  detail,
}: {
  /** The dot (on the piece) and the label's column line, in g. When `to`
   *  is left of `from`, the label sits left of the line, right-aligned. */
  from: number
  to: number
  y: number
  title: string
  detail: string
}) {
  const left = Math.min(from, to)
  const labelLeft = to > from
  return (
    <div
      aria-hidden
      className='pointer-events-none absolute z-30 flex items-center'
      style={{
        left: g(left),
        width: g(Math.abs(to - from)),
        top: g(y),
        transform: 'translateY(-50%)',
        color: LABEL_INK,
        flexDirection: labelLeft ? 'row' : 'row-reverse',
      }}
    >
      <span
        className='size-[7px] shrink-0 rounded-full'
        style={{
          backgroundColor: LABEL_INK,
          [labelLeft ? 'marginLeft' : 'marginRight']: -3.5,
        }}
      />
      <span className='h-px flex-1' style={{ backgroundColor: LABEL_INK }} />
      <span
        className={`absolute flex flex-col gap-0.5 font-mono text-xs leading-tight tracking-[0.1em] whitespace-nowrap uppercase ${labelLeft ? 'left-full items-start pl-grid-half' : 'right-full items-end pr-grid-half'}`}
      >
        <span className='font-semibold'>{title}</span>
        <span className='opacity-75'>{detail}</span>
      </span>
    </div>
  )
}

/** Columns, gutters and margins, drawn when <html> has data-grid
 *  (for checking the layout). */
function GridOverlay() {
  return (
    <div
      aria-hidden
      className='pointer-events-none absolute inset-0 z-50 hidden [[data-grid]_&]:block'
    >
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={i}
          className='absolute bg-[rgba(0,160,255,0.18)]'
          style={{
            left: g(colX(i + 1)),
            width: g(COL),
            top: g(MARGIN),
            height: g(PANEL_H - 2 * MARGIN),
          }}
        />
      ))}
    </div>
  )
}

const CALLOUTS = [
  { title: 'Flip cards', detail: 'Tasting notes + heat level' },
  { title: 'Heat filter', detail: '4 levels' },
  { title: 'Bundles', detail: 'Trio pack' },
]

/**
 * Home's proof (#results): the Heatonist and Hot Ones work, approved Nov 15.
 * The copy, then one panel in the clients' colors, black for Heatonist and
 * yellow for Hot Ones, on its own grid: the Trio Pack card and Heat filter,
 * and lineup cards #2 and #3, all rebuilt in HTML from the live sites so
 * they stay sharp, with blueprint callouts saying what we built and each
 * site's name in its half. The cards flip on click, tap, Enter or Space
 * (#2 once on scroll). Phones: the hero card, the callouts as a list, then
 * the Heatonist pieces. The links close the section.
 * Tone: light.
 */
export function ProofSection() {
  return (
    <Section id='results' className='flex scroll-mt-24 flex-col gap-stack'>
      <Reveal index={0}>
        <SectionHeading
          label={HOME_PROOF.label}
          title={HOME_PROOF.title}
          intro={HOME_PROOF.body}
        />
      </Reveal>
      <Reveal index={1}>
        <figure className={`flex flex-col ${CLIENT_FONTS}`}>
          {/* Laptops: the composition on its grid (see PANEL_W). The panel's
            height is its own 56:19 shape: 456px at the 1344px content
            width. */}
          <div
            className='[container-type:inline-size] relative hidden aspect-[56/19] lg:block'
            style={{
              backgroundColor: HO_BLACK,
              // Let the hero rise out of the top; clip the sides.
              clipPath: 'inset(-600px 0 0 0)',
            }}
          >
            {/* Yellow from the column-9 line to the panel's right edge. */}
            <div
              className='absolute inset-y-0 right-0'
              style={{
                left: g(colX(9)),
                backgroundColor: HO_YELLOW,
                backgroundImage:
                  'radial-gradient(rgba(14,15,17,0.14) 1px, transparent 1.2px)',
                backgroundSize: '24px 24px',
              }}
            />
            {/* Heatonist: the Trio card in columns 1-2, top margin to bottom
              margin; the filter in columns 2-3 over the right half of its
              photo, one row down, clear of its text. */}
            <TrioCard
              className='absolute'
              style={{
                left: g(colX(1)),
                width: g(colR(2) - colX(1)),
                top: g(MARGIN),
              }}
            />
            <HeatFilter
              className='absolute z-10'
              style={{
                left: g(colX(3) - 2),
                width: g(FILTER_W),
                top: g(MARGIN + 3),
              }}
            />
            {/* Hot Ones: #3 across the seam (columns 8-9), its bottom on the
              bottom margin; #2 in columns 10-12, rising 4g out of the top. */}
            <HotOnesCard
              {...BEACH_BONNET}
              className='absolute z-10 origin-bottom -rotate-[7deg] brightness-[0.94]'
              style={{
                left: g(colX(8) - COL / 2),
                width: g(2 * COL + 1),
                bottom: g(MARGIN),
              }}
            />
            <HotOnesCard
              {...HOUSE_SAUCE}
              autoFlip
              className='absolute z-20 rotate-[5deg]'
              style={{
                left: g(colX(9)),
                width: g(colR(11) - colX(9)),
                top: g(-4),
              }}
            />
            {/* Labels: the two Heatonist ones share the column-5 line; the
              flip-cards one is right-aligned to the column-7 line, its
              leader on the top margin, above #3. */}
            {/* All three labels left-aligned on the column-5 line, stacked:
              bundles at the Trio card's top, the filter at its middle, the
              flip cards low, its leader running right to #3's edge. */}
            <GridCallout
              from={colR(2)}
              to={colX(5)}
              y={MARGIN + 0.5}
              {...CALLOUTS[2]}
            />
            <GridCallout
              from={colX(3) - 2 + FILTER_W}
              to={colX(5)}
              y={MARGIN + 6.5}
              {...CALLOUTS[1]}
            />
            <LabelThenLeader
              at={colX(5)}
              to={colX(8) - COL / 2 + 0.6}
              y={MARGIN + 12}
              {...CALLOUTS[0]}
            />
            {/* Site credits on the margin, one per half. */}
            <span
              aria-hidden
              className='absolute font-mono text-xs tracking-[0.1em] uppercase'
              style={{
                color: 'rgba(255,255,255,0.72)',
                left: g(MARGIN),
                bottom: g(MARGIN / 2),
                transform: 'translateY(50%)',
              }}
            >
              Heatonist.com
            </span>
            <span
              aria-hidden
              className='absolute font-mono text-xs tracking-[0.1em] uppercase'
              style={{
                color: 'rgba(14,15,17,0.78)',
                right: g(MARGIN),
                bottom: g(MARGIN / 2),
                transform: 'translateY(50%)',
              }}
            >
              Hotones.com
            </span>
            <GridOverlay />
          </div>

          {/* Phones and tablets: the headline and hero card on the split, the
            callouts as a list, then the Heatonist pieces. */}
          <div className='flex flex-col lg:hidden'>
            <div
              className='relative overflow-hidden'
              style={{ backgroundColor: HO_BLACK }}
            >
              <div
                className='absolute inset-x-0 bottom-0 h-[42%]'
                style={{ backgroundColor: HO_YELLOW }}
              />
              <div className='relative flex flex-col items-center gap-grid-1 px-grid-1 py-grid-2'>
                <HotOnesCard
                  {...HOUSE_SAUCE}
                  autoFlip
                  className='w-[58%] max-w-[18rem] rotate-[3deg]'
                />
                <span
                  aria-hidden
                  className='self-end font-mono text-xs tracking-[0.1em] uppercase'
                  style={{ color: 'rgba(14,15,17,0.78)' }}
                >
                  Hotones.com
                </span>
              </div>
            </div>
            <ul className='flex flex-col border-x border-b border-border bg-bg-card'>
              {CALLOUTS.map(c => (
                <li
                  key={c.title}
                  className='flex items-baseline gap-grid-half border-t border-border px-grid-1 py-grid-half font-mono text-xs tracking-[0.1em] uppercase first:border-t-0'
                >
                  <span className='font-semibold whitespace-nowrap text-text'>
                    {c.title}
                  </span>
                  <span className='text-text-muted'>{c.detail}</span>
                </li>
              ))}
            </ul>
            <div className='flex flex-col gap-grid-1 border-x border-b border-border bg-bg-card p-grid-1'>
              <div className='flex items-start justify-center gap-grid-1'>
                <TrioCard className='w-[44%] max-w-[15rem]' />
                <HeatFilter className='mt-grid-2 w-[44%] max-w-[15rem]' />
              </div>
              <span
                aria-hidden
                className='font-mono text-xs tracking-[0.1em] text-text-muted uppercase'
              >
                Heatonist.com
              </span>
            </div>
          </div>
        </figure>
      </Reveal>
      <Reveal index={2} className='flex flex-wrap gap-x-grid-2 gap-y-grid-1'>
        {HOME_PROOF.links.map(link => (
          <ArrowLink key={link.href} href={link.href as Route}>
            {link.label}
          </ArrowLink>
        ))}
      </Reveal>
    </Section>
  )
}
ProofSection.tone = 'light' as const
