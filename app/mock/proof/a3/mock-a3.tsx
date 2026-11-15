/* eslint-disable design/no-raw-border -- a throwaway mock (Nov 15): the clients' colors, a composition placed by percent */
import type { Route } from 'next'
import { Section, SectionHeading } from '@/src/components/patterns/section'
import { ArrowLink } from '@/src/components/patterns/arrow-link'
import { HOME_PROOF } from '@/src/lib/home'
import { CLIENT_FONTS } from './fonts'
import { HotOnesCard } from './hot-ones-card'
import { HeatFilter, TrioCard } from './heatonist'

const HO_BLACK = '#0d0d0d'
const HO_YELLOW = '#ffd305'

const HOUSE_SAUCE = {
  number: 2,
  name: 'House Sauce',
  notes: ['Tangy', 'Peppery', 'Packed with flavor'],
  level: 2,
  bottle: '/mock/a3/bottle-house-sauce.webp',
}
const BEACH_BONNET = {
  number: 3,
  name: 'Beach Bonnet',
  maker: 'Double Comfort',
  notes: ['Tropical fruits & island peppers'],
  level: 3,
  bottle: '/mock/a3/bottle-beach-bonnet.webp',
}

/** One leader for every callout: a 7px dot on the piece, a 40px rule and the
 *  label 12px off its end. White on the black, ink on the yellow. */
const LEADER = 40
function Callout({
  x,
  y,
  dir,
  tone,
  title,
  detail,
}: {
  x: number
  y: number
  dir: 'left' | 'right'
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
        transform: `translate(${dir === 'right' ? '-3.5px' : 'calc(-100% + 3.5px)'}, -50%)`,
        flexDirection: dir === 'right' ? 'row' : 'row-reverse',
        color: ink,
      }}
    >
      <span
        className='size-[7px] shrink-0 rounded-full'
        style={{ backgroundColor: ink }}
      />
      <span
        className='h-px shrink-0'
        style={{ width: LEADER, backgroundColor: ink }}
      />
      <span
        className={`flex flex-col gap-0.5 font-mono text-xs leading-tight tracking-[0.1em] uppercase ${dir === 'right' ? 'pl-grid-half text-left' : 'pr-grid-half text-right'}`}
      >
        <span className='font-semibold whitespace-nowrap'>{title}</span>
        <span className='max-w-[13em] opacity-75'>{detail}</span>
      </span>
    </div>
  )
}

const CALLOUTS = [
  { title: 'Flip cards', detail: 'Tasting notes + heat level' },
  { title: 'Heat filter', detail: '4 levels' },
  { title: 'Bundles', detail: 'Trio pack' },
]

/**
 * Mock A3 (Nov 15): the proof section with the widgets rebuilt as HTML,
 * the links moved to the end of the section, and the hero card breaking out
 * of the panel's top into the space beside the copy.
 */
export function ProofA3() {
  return (
    // Laptops: the whole section, label to links, is one screen under the
    // nav; the panel takes what's left (see the figure).
    <Section className='flex flex-col gap-stack lg:min-h-[calc(100svh-var(--nav-height))]'>
      <SectionHeading
        label={HOME_PROOF.label}
        title={HOME_PROOF.title}
        intro={HOME_PROOF.body}
      />
      <figure
        className={`flex flex-col gap-grid-half lg:flex-1 ${CLIENT_FONTS}`}
      >
        {/* Laptops: the panel takes the height the section leaves on one
            screen (384-760px). Inside it, the composition keeps its
            1344:576 shape (sized by container units, centered), so every
            piece stays in place; the black and the yellow fill the rest. */}
        <div
          className='[container-type:size] relative hidden min-h-96 flex-1 basis-0 lg:block lg:max-h-[760px]'
          style={{
            backgroundColor: HO_BLACK,
            // Let the hero rise out of the top; clip the sides.
            clipPath: 'inset(-600px 0 0 0)',
          }}
        >
          <div
            className='absolute inset-y-0 right-0'
            style={{
              width:
                'calc((100cqw - min(100cqw, 233.333cqh)) / 2 + min(100cqw, 233.333cqh) * 0.4)',
              backgroundColor: HO_YELLOW,
              backgroundImage:
                'radial-gradient(rgba(14,15,17,0.14) 1px, transparent 1.2px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div
            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
            style={{
              width: 'min(100cqw, 233.333cqh)',
              height: 'min(100cqh, 42.857cqw)',
            }}
          >
            <TrioCard className='absolute top-[14%] left-[5.4%] w-[13.5%]' />
            <HeatFilter className='absolute top-[34%] left-[14%] z-10 w-[14.5%]' />
            {/* Card #3, leaning left across the seam, under the hero. */}
            <HotOnesCard
              {...BEACH_BONNET}
              className='absolute top-[34%] left-[48%] z-10 w-[14%] -rotate-[7deg] brightness-[0.94]'
            />
            {/* The hero, leaning right, rising out of the panel's top into
                the space beside the section's copy. */}
            <HotOnesCard
              {...HOUSE_SAUCE}
              autoFlip
              className='absolute -top-[10%] left-[60%] z-20 w-[22%] rotate-[5deg] xl:-top-[30%]'
            />
            <Callout x={61} y={14} dir='left' tone='light' {...CALLOUTS[0]} />
            <Callout
              x={28.5}
              y={44}
              dir='right'
              tone='light'
              {...CALLOUTS[1]}
            />
            <Callout
              x={18.9}
              y={22}
              dir='right'
              tone='light'
              {...CALLOUTS[2]}
            />
          </div>
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
          <div className='flex items-start justify-center gap-grid-1 border-x border-b border-border bg-bg-card p-grid-1'>
            <TrioCard className='w-[44%] max-w-[15rem]' />
            <HeatFilter className='mt-grid-2 w-[44%] max-w-[15rem]' />
          </div>
        </div>
        <figcaption className='type-fine'>
          Heatonist.com · Hotones.com
        </figcaption>
      </figure>
      <div className='flex flex-wrap gap-x-grid-2 gap-y-grid-1'>
        {HOME_PROOF.links.map(link => (
          <ArrowLink key={link.href} href={link.href as Route}>
            {link.label}
          </ArrowLink>
        ))}
      </div>
    </Section>
  )
}
