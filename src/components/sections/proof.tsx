/* eslint-disable design/no-raw-aspect, design/no-raw-border -- the proof panel is drawn in the clients' own colors on its own grid (see PANEL_W) */
import type { Route } from 'next'
import { Section, SectionHeading } from '@/src/components/patterns/section'
import { ArrowLink } from '@/src/components/patterns/arrow-link'
import { Reveal } from '@/src/components/primitives/animated-section'
import { HOME_PROOF } from '@/src/lib/home'
import { ClientFontsScope } from '@/src/components/patterns/client-widgets/client-fonts-scope'
import { HotOnesCard } from '@/src/components/patterns/client-widgets/hot-ones-card'
import {
  HeatFilter,
  BundleCard,
} from '@/src/components/patterns/client-widgets/heatonist-widgets'

const HO_BLACK = '#0d0d0d'

const HOUSE_SAUCE = {
  number: 2,
  name: 'House Sauce',
  notes: ['Tangy', 'Peppery', 'Packed with flavor'],
  level: 2,
  bottle: '/work/hotones-bottle-house-sauce.webp',
}
const LOS_CALIENTES_ROJO = {
  number: 5,
  name: 'Los Calientes Rojo',
  notes: ['Red jalapeño & habanero', 'Sweet apricot', 'Vibrant citrus'],
  level: 5,
  bottle: '/work/hotones-bottle-los-calientes-rojo.webp',
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

/** The three callouts sit 5.5 rows apart, centered on the panel's middle
 *  (Jason, Nov 15): at 4, 9.5 and 15 units down. */
const LABEL_STEP = 5.5

/** The search filter: two columns and a gutter wide (columns 2-3). */
const FILTER_W = 2 * COL + 1

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

/** The label column: one shared left edge, centered (by the widest line,
 *  "Know the flavor", 126px) in the black between the filter's right edge
 *  and the small card's leftmost tilted point (measured at 31.08 units at its -9deg tilt) (Jason, Nov
 *  15). The gap always leaves at least 36px leaders either side, so the
 *  lines never wrap past their set two. */
const GAP_LEFT = colX(3) - 2 + FILTER_W
const GAP_RIGHT = 31.08
const LABEL_W = `min(127px, ${GAP_RIGHT - GAP_LEFT} * 100cqw / ${PANEL_W} - 72px)`
const LABEL_X = `calc(${(GAP_LEFT + GAP_RIGHT) / 2} * 100cqw / ${PANEL_W} - ${LABEL_W} / 2)`

/** A callout: the label on the shared column, a 1px leader level with it,
 *  and a dot on its piece's edge. `side` says which side of the column the
 *  piece is on; the leader runs from the dot's center to 12px off the
 *  label. */
function Callout({
  dot,
  side,
  y,
  title,
  detail,
}: {
  /** The dot's x on the piece, in units. */
  dot: number
  side: 'left' | 'right'
  y: number
  title: string
  detail: readonly [string, string]
}) {
  const line =
    side === 'left'
      ? { left: g(dot), width: `calc(${LABEL_X} - 12px - ${g(dot)})` }
      : {
          left: `calc(${LABEL_X} + ${LABEL_W} + 12px)`,
          width: `calc(${g(dot)} - ${LABEL_X} - ${LABEL_W} - 12px)`,
        }
  return (
    <div aria-hidden className='pointer-events-none absolute inset-0 z-30'>
      <span
        className='absolute h-px'
        style={{ ...line, top: g(y), backgroundColor: LABEL_INK }}
      />
      <span
        className='absolute size-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full'
        style={{
          left: g(dot),
          top: `calc(${g(y)} + 0.5px)`,
          backgroundColor: LABEL_INK,
        }}
      />
      <span
        className='absolute flex -translate-y-1/2 flex-col gap-0.5 font-mono text-xs leading-tight tracking-[0.1em] uppercase'
        style={{
          left: LABEL_X,
          width: LABEL_W,
          top: `calc(${g(y)} + 0.5px)`,
          color: LABEL_INK,
        }}
      >
        <span className='font-semibold'>{title}</span>
        <span className='opacity-75'>
          {detail.map(l => (
            <span key={l} className='block whitespace-nowrap'>
              {l}
            </span>
          ))}
        </span>
      </span>
    </div>
  )
}

/** Each sub line is set as two lines on purpose, so the three labels have
 *  the same shape at every desktop width (Jason, Nov 15). The phone list
 *  joins them. */
const CALLOUTS = [
  {
    title: 'Flip cards',
    detail: ['Know the flavor', 'before you buy'],
  },
  { title: 'Search filters', detail: ['Find your', 'sauce faster'] },
  { title: 'Bundles', detail: ['A whole season', 'in one box'] },
] as const

/**
 * Home's proof (#results): the Heatonist and Hot Ones work, approved Nov 15.
 * The copy, then one black panel (Hot Ones' black; the yellow half was
 * removed Nov 15) on its own grid: the 10 Pack card and search filter,
 * and two of Hot Ones' own sauces as lineup cards (House Sauce big, Los
 * Calientes Rojo small), all rebuilt in HTML from the live sites so
 * they stay sharp, with blueprint callouts saying what we built. The cards flip on click, tap, Enter or Space
 * (the small one once on scroll). Phones: the hero card, the callouts as a list, then
 * the Heatonist pieces. The link closes the section.
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
        <ClientFontsScope>
          <figure className='flex flex-col'>
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
              {/* Heatonist: the 10 Pack card in columns 1-2, top margin to bottom
              margin; the filter in columns 2-3 over the right half of its
              photo, one row down, clear of its text. */}
              <BundleCard
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
                  top: g(MARGIN + 4),
                }}
              />
              {/* Hot Ones: the small card (Los Calientes Rojo, flips once on
              view) in columns 8-9, its bottom on the bottom
              margin; the big card (House Sauce) in columns 10-12, rising 5
              rows out of the top (2 below 1280px). */}
              <HotOnesCard
                {...LOS_CALIENTES_ROJO}
                autoFlip
                className='absolute z-10 origin-bottom -rotate-[9deg] brightness-[0.94]'
                style={{
                  left: g(colX(8)),
                  width: g(2 * COL + 1),
                  bottom: g(MARGIN),
                }}
              />
              <HotOnesCard
                {...HOUSE_SAUCE}
                // Rises 5 rows out of the panel from 1280px up; 2 rows below
                // that, where the intro runs wide and the card would cover
                // its last line. Below 1280 it also sits 1 unit right, so
                // it clears the small card's HEAT LEVEL slab.
                className='absolute z-20 rotate-[6deg] [--rise:2] [--shift:1] xl:[--rise:5] xl:[--shift:0]'
                style={{
                  left: `calc(${g(colX(9) + COL / 2)} + var(--shift) * 100cqw / ${PANEL_W})`,
                  width: g(colR(11) - colX(9)),
                  top: `calc(var(--rise) * -100cqw / ${PANEL_W})`,
                }}
              />
              {/* All three labels left-aligned on the column-5 line, evenly
              spaced and centered on the panel's middle (LABEL_STEP); each
              leader runs level to a dot on its piece's edge: the 10 Pack
              card, the filter, and the small card's left edge. */}
              <Callout
                dot={colR(2)}
                side='left'
                y={PANEL_H / 2 - LABEL_STEP}
                {...CALLOUTS[2]}
              />
              <Callout
                dot={GAP_LEFT}
                side='left'
                y={PANEL_H / 2}
                {...CALLOUTS[1]}
              />
              <Callout
                dot={colX(8) - 0.42}
                side='right'
                y={PANEL_H / 2 + LABEL_STEP}
                {...CALLOUTS[0]}
              />
              <GridOverlay />
            </div>

            {/* Phones and tablets: the hero card on black, the
            callouts as a list, then the Heatonist pieces. */}
            <div className='flex flex-col lg:hidden'>
              <div
                className='relative overflow-hidden'
                style={{ backgroundColor: HO_BLACK }}
              >
                <div className='relative flex flex-col items-center gap-grid-1 px-grid-1 py-grid-2'>
                  <HotOnesCard
                    {...LOS_CALIENTES_ROJO}
                    autoFlip
                    className='w-[58%] max-w-[18rem] rotate-[3deg]'
                  />
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
                    <span className='text-text-muted'>
                      {c.detail.join(' ')}
                    </span>
                  </li>
                ))}
              </ul>
              <div className='flex flex-col gap-grid-1 border-x border-b border-border bg-bg-card p-grid-1'>
                <div className='flex items-start justify-center gap-grid-1'>
                  <BundleCard className='w-[44%] max-w-[15rem]' />
                  <HeatFilter className='mt-grid-2 w-[44%] max-w-[15rem]' />
                </div>
              </div>
            </div>
          </figure>
        </ClientFontsScope>
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
