/* eslint-disable @next/next/no-img-element, design/no-raw-color, design/no-raw-border, design/no-raw-spacing, design/no-raw-aspect -- a throwaway mock (Nov 15): the clients' own colors and a composition placed by percent. Drop with its commit. */
import { BlueprintCorners } from '@/src/components/boxes/corners'
import { FlipCard } from './flip-card'

const HO_BLACK = '#0d0d0d'
const HO_YELLOW = '#ffd305'

/** Our signature on their brand: a dot on the piece, a 1px leader line and a
 *  mono label saying what we built. White on the black, ink on the yellow. */
function Callout({
  x,
  y,
  dir,
  len,
  tone,
  title,
  detail,
}: {
  /** The dot, in percent of the composition. */
  x: number
  y: number
  dir: 'left' | 'right'
  len: number
  tone: 'light' | 'dark'
  title: string
  detail: string
}) {
  const ink = tone === 'light' ? 'rgba(255,255,255,0.92)' : '#0e0f11'
  return (
    <div
      aria-hidden
      className='pointer-events-none absolute z-30 flex items-center'
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(${dir === 'right' ? '-3px' : 'calc(-100% + 3px)'}, -50%)`,
        flexDirection: dir === 'right' ? 'row' : 'row-reverse',
        color: ink,
      }}
    >
      <span
        className='size-[7px] shrink-0 rounded-full'
        style={{
          backgroundColor: ink,
          boxShadow: `0 0 0 3px ${tone === 'light' ? 'rgba(255,255,255,0.18)' : 'rgba(14,15,17,0.15)'}`,
        }}
      />
      <span
        className='h-px shrink-0'
        style={{ width: len, backgroundColor: ink }}
      />
      <span
        className={`flex flex-col gap-0.5 font-mono text-xs leading-tight tracking-[0.1em] uppercase ${dir === 'right' ? 'pl-2.5 text-left' : 'pr-2.5 text-right'}`}
      >
        <span className='font-semibold whitespace-nowrap'>{title}</span>
        <span className='max-w-[13em] opacity-75'>{detail}</span>
      </span>
    </div>
  )
}

/** Lifted pieces share one light source (top left): shadows fall down and
 *  to the right, softer and longer the higher the piece sits. */
const SHADOW_LOW = 'shadow-[10px_16px_32px_-10px_rgba(0,0,0,0.6)]'
const SHADOW_MID = 'shadow-[14px_22px_40px_-12px_rgba(0,0,0,0.6)]'

/** A Heatonist piece as an object, not a screenshot: heatonist.com's 8px
 *  card radius, its red top rule (from the line across the top of
 *  their site), a hairline edge and the shared shadow. */
function HeatonistPiece({
  src,
  alt,
  className,
  shadow,
}: {
  src: string
  alt: string
  className: string
  shadow: string
}) {
  return (
    <div
      className={`absolute overflow-hidden rounded-lg border border-black/10 bg-white ${shadow} ${className}`}
    >
      <div className='h-[3px]' style={{ backgroundColor: '#ce2a39' }} />
      <img src={src} alt={alt} className='block h-auto w-full' />
    </div>
  )
}

const CALLOUTS = {
  flip: { title: 'Flip cards', detail: 'Tasting notes + heat level' },
  heat: { title: 'Heat filter', detail: '4 levels' },
  bundle: { title: 'Bundles', detail: 'Trio pack' },
}

export function MockA2() {
  return (
    <figure className='flex flex-col gap-grid-half'>
      {/* Laptops: one composition, placed by percent so it scales whole. */}
      <div className='hidden pt-grid-3 lg:block'>
        <div
          className='relative aspect-[1344/620]'
          style={{ backgroundColor: HO_BLACK }}
        >
          <BlueprintCorners size={20} all />
          {/* Hot Ones yellow, with a faint version of our dot grid. */}
          <div
            className='absolute inset-y-0 right-0 w-[40%]'
            style={{
              backgroundColor: HO_YELLOW,
              backgroundImage:
                'radial-gradient(rgba(14,15,17,0.14) 1px, transparent 1.2px)',
              backgroundSize: '24px 24px',
            }}
          />
          <img
            src='/mock/explore-headline.webp'
            alt=''
            className='absolute top-[9%] left-[5%] w-[38%] opacity-95'
          />
          {/* Secondary: the Trio Pack card, the Heat filter over its edge. */}
          <HeatonistPiece
            src='/mock/trio-card.webp'
            alt='Heatonist product card: Hot Ones Hot Sauce Trio Pack, Season 31, $40.'
            className='top-[27%] left-[15%] w-[14.5%]'
            shadow={SHADOW_LOW}
          />
          <HeatonistPiece
            src='/mock/heat-filter.webp'
            alt='Heatonist filter: Heat, from Mild to Hottest.'
            className='top-[54%] left-[25.5%] z-10 w-[15%]'
            shadow={SHADOW_MID}
          />
          {/* Hero: card #2 across the black/yellow seam, out of the top. */}
          {/* Card #3 tucked behind, lower right: smaller, deeper, a
              touch dimmer, so the hero stays the hero. */}
          <img
            src='/mock/card3-front.webp'
            alt='Hot Ones lineup card #3: Double Comfort Beach Bonnet.'
            className='absolute top-[48%] left-[67%] z-10 w-[15%] rotate-[7deg] rounded-[5%/3.3%] shadow-[10px_16px_32px_-10px_rgba(0,0,0,0.45)] brightness-[0.9]'
          />
          <div className='absolute -top-[9%] left-[47%] z-20 w-[25%] -rotate-[4deg]'>
            <FlipCard />
          </div>
          <Callout
            x={72.5}
            y={36}
            dir='right'
            len={40}
            tone='dark'
            {...CALLOUTS.flip}
          />
          <Callout
            x={38.5}
            y={80}
            dir='right'
            len={36}
            tone='light'
            {...CALLOUTS.heat}
          />
          <Callout
            x={15}
            y={44}
            dir='left'
            len={28}
            tone='light'
            {...CALLOUTS.bundle}
          />
        </div>
      </div>

      {/* Phones: the hero card on the black/yellow split, then the callouts
          as a short list, then the supporting pieces. */}
      <div className='flex flex-col lg:hidden'>
        <div
          className='relative overflow-hidden'
          style={{ backgroundColor: HO_BLACK }}
        >
          <BlueprintCorners size={16} all />
          <div
            className='absolute inset-x-0 bottom-0 h-[42%]'
            style={{ backgroundColor: HO_YELLOW }}
          />
          <div className='relative flex flex-col items-center gap-grid-1 px-grid-1 pt-grid-2 pb-grid-2'>
            <img src='/mock/explore-headline.webp' alt='' className='w-[78%]' />
            <div className='w-[58%] -rotate-[3deg]'>
              <FlipCard />
            </div>
          </div>
        </div>
        <ul className='flex flex-col border-x border-b border-border bg-bg-card'>
          {Object.values(CALLOUTS).map(c => (
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
        <div className='flex items-start justify-center gap-grid-1 bg-bg-card px-grid-1 pt-grid-1 pb-grid-1'>
          <img
            src='/mock/trio-card.webp'
            alt=''
            className={`w-[44%] rounded-lg border border-black/10 bg-white shadow-[6px_10px_20px_-8px_rgba(0,0,0,0.35)]`}
          />
          <img
            src='/mock/heat-filter.webp'
            alt=''
            className={`mt-grid-2 w-[44%] rounded-lg border border-black/10 bg-white shadow-[6px_10px_20px_-8px_rgba(0,0,0,0.35)]`}
          />
        </div>
      </div>
      <figcaption className='type-fine'>Heatonist.com · Hotones.com</figcaption>
    </figure>
  )
}
