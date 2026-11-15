/* eslint-disable @next/next/no-img-element, design/no-raw-color, design/no-raw-border -- a throwaway mock page (Nov 15): plain images and the clients' own colors, to judge two directions. Not linked; drop with its commit. */
import type { Metadata, Route } from 'next'
import {
  Band,
  Section,
  SectionHeading,
} from '@/src/components/patterns/section'
import { ArrowLink } from '@/src/components/patterns/arrow-link'
import { BlueprintCorners } from '@/src/components/boxes/corners'
import { HOME_PROOF } from '@/src/lib/home'
import { MockA2 } from './mock-a2'

export const metadata: Metadata = {
  title: 'Proof mocks',
  robots: { index: false, follow: false },
}

/** Hot Ones' black and yellow, sampled from the hotones.com captures. */
const HO_BLACK = '#0d0d0d'
const HO_YELLOW = '#ffd305'

function Header() {
  return (
    <div className='flex flex-col gap-grid-1 lg:flex-row lg:items-end lg:justify-between lg:gap-grid-2'>
      <SectionHeading
        label={HOME_PROOF.label}
        title={HOME_PROOF.title}
        intro={HOME_PROOF.body}
      />
      <div className='flex shrink-0 flex-wrap gap-x-grid-2 gap-y-grid-1'>
        {HOME_PROOF.links.map(link => (
          <ArrowLink key={link.href} href={link.href as Route}>
            {link.label}
          </ArrowLink>
        ))}
      </div>
    </div>
  )
}

function MockHeading({ children }: { children: string }) {
  return (
    <p className='font-mono text-xs tracking-[0.1em] text-text-muted uppercase'>
      {children}
    </p>
  )
}

/** A lifted piece of real UI: white, a 1px edge and a soft shadow. */
function Piece({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={`block h-auto border border-black/10 bg-white shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)] ${className ?? ''}`}
    />
  )
}

function MockA() {
  return (
    <figure className='flex flex-col gap-grid-half'>
      <div
        className='relative overflow-hidden'
        style={{ backgroundColor: HO_BLACK }}
      >
        <BlueprintCorners size={20} all />
        {/* Hot Ones yellow: the right half on laptops, the lower half on
            phones, behind the flip cards. */}
        <div
          className='absolute inset-x-0 bottom-0 h-[46%] lg:inset-y-0 lg:right-0 lg:left-auto lg:h-auto lg:w-[46%]'
          style={{ backgroundColor: HO_YELLOW }}
        />
        <div className='relative grid gap-grid-3 p-grid-2 lg:grid-cols-2 lg:items-center lg:p-grid-3'>
          {/* Heatonist: the Heat filter over the Trio Pack card. */}
          <div className='relative mx-auto flex w-full max-w-[34rem] items-start justify-end pr-[6%]'>
            <Piece
              src='/mock/trio-card.webp'
              alt='Heatonist product card: Hot Ones Hot Sauce Trio Pack, Season 31, $40.'
              className='w-[58%]'
            />
            <Piece
              src='/mock/heat-filter.webp'
              alt='Heatonist filter: Heat, from Mild to Hottest, with counts.'
              className='absolute top-[30%] left-0 w-[46%]'
            />
          </div>
          {/* Hot Ones: lineup card #2, front and back. */}
          <div className='mx-auto flex w-full max-w-[30rem] items-center justify-center'>
            <img
              src='/mock/card2-front.webp'
              alt='Hot Ones lineup card #2, front: the House Sauce bottle.'
              className='relative z-10 w-[46%] -rotate-3 rounded-[5%/3.2%] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)]'
            />
            <img
              src='/mock/card2-back.webp'
              alt='Card #2, back: House Sauce. Tangy, peppery, packed with flavor. Heat level 2/10.'
              className='-ml-[6%] w-[46%] rotate-3 rounded-[5%/3.2%] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)]'
            />
          </div>
        </div>
      </div>
      <figcaption className='type-fine'>Heatonist.com · Hotones.com</figcaption>
    </figure>
  )
}

function MockB() {
  return (
    <figure className='flex flex-col gap-grid-half'>
      <div className='relative bg-bg-card p-grid-1 lg:p-grid-2'>
        <BlueprintCorners size={20} all />
        <div className='overflow-hidden border border-border'>
          {/* Minimal chrome: a hairline bar with the address, no window
              buttons. */}
          <div className='flex items-center border-b border-border bg-bg px-grid-half py-1.5'>
            <span className='font-mono text-xs tracking-[0.05em] text-text-muted'>
              heatonist.com
            </span>
          </div>
          <img
            src='/mock/heatonist-hero.webp'
            alt='The heatonist.com home page: the Heatonist header and menu, then "Spice up the season" beside a Hot Ones gift box and sauces.'
            className='block h-auto w-full'
          />
        </div>
      </div>
      <figcaption className='type-fine'>Home page · heatonist.com</figcaption>
    </figure>
  )
}

/** Two directions for Home's proof, under the same header (Nov 15). */
export default function ProofMocks() {
  return (
    <main id='main' className='flex-1 pt-page-start'>
      <Band tone='light'>
        <Section className='flex flex-col gap-stack'>
          <MockHeading>Mock A2 · showcase</MockHeading>
          <Header />
          <MockA2 />
        </Section>
      </Band>
      <Band tone='light'>
        <Section className='flex flex-col gap-stack'>
          <MockHeading>Mock A · composed image</MockHeading>
          <Header />
          <MockA />
        </Section>
      </Band>
      <Band tone='light'>
        <Section className='flex flex-col gap-stack'>
          <MockHeading>Mock B · browser frame</MockHeading>
          <Header />
          <MockB />
        </Section>
      </Band>
    </main>
  )
}
