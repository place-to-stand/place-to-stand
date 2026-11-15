/* eslint-disable design/no-raw-border -- a throwaway mock page (Nov 15): rules and tab underlines drawn inline to compare five layouts. Not linked; the chosen one gets rebuilt on the boxes. */
import type { Metadata, Route } from 'next'
import { Band, Section } from '@/src/components/patterns/section'
import { ArrowLink } from '@/src/components/patterns/arrow-link'
import { RuledRow } from '@/src/components/boxes'
import { SoundFamiliarSection } from '@/src/components/sections/sound-familiar'
import { SOUND_FAMILIAR } from '@/src/lib/home'
import { SelfCheck, SignalTabs } from './interactive'
import { Heading, Marker, SHORT } from './shared'
import { SplitSection } from '@/src/components/patterns/split-section'

/**
 * Mock (temporary, Nov 15): six takes on Home's "Warning signs", stacked,
 * for Jason to judge in the browser. Same copy in each. Not linked, not
 * indexed; drop with its commit.
 */
export const metadata: Metadata = {
  title: 'Warning signs mocks',
  robots: { index: false, follow: false },
}

const { groups } = SOUND_FAMILIAR

/** A variant: its tag and one-line description, then the variant. */
function Variant({
  letter,
  note,
  children,
}: {
  letter: string
  note: string
  children: React.ReactNode
}) {
  return (
    <Band tone='dark'>
      <div className='flex flex-col gap-grid-2'>
        <Section>
          <p className='flex gap-grid-half border-b border-border pb-grid-half font-mono text-xs tracking-[0.1em] text-text-muted uppercase'>
            <span className='font-semibold text-accent'>{letter}</span>
            <span>{note}</span>
          </p>
        </Section>
        {children}
      </div>
    </Band>
  )
}

/** F: the split. One hero (the headline, held still on the left), the
 *  signals in the voice style on the right, everything else quiet: a mono
 *  label per place, the fix in muted body text, a hairline between places.
 *  No boxes, markers or bold titles. */
function Split() {
  return (
    <SplitSection aside={<Heading />}>
      {groups.map(group => (
        <RuledRow
          key={group.name}
          as='div'
          className='flex flex-col gap-grid-1 py-grid-2 first:border-t-0 first:pt-0 last:pb-0'
        >
          <h3 className='type-fine'>{group.name}</h3>
          <ul className='flex flex-col gap-grid-1'>
            {group.quotes.map(quote => (
              <li key={quote}>
                <blockquote className='type-voice'>
                  &ldquo;{quote}&rdquo;
                </blockquote>
              </li>
            ))}
          </ul>
          <div className='flex flex-col gap-grid-half pt-grid-half'>
            <p className='text-base text-text-muted'>{group.build}</p>
            <ArrowLink href={group.link.href as Route}>
              {group.link.label}
            </ArrowLink>
          </div>
        </RuledRow>
      ))}
    </SplitSection>
  )
}

/** B: a blueprint schedule. No boxes, three ruled columns whose rows line
 *  up across: head over a 2px rule, the three signals, the answer, the
 *  link. */
function SpecSheet() {
  return (
    <Section className='flex flex-col gap-stack'>
      <Heading />
      <div className='grid gap-grid-3 lg:grid-cols-3 lg:grid-rows-[repeat(6,auto)] lg:gap-x-grid-2 lg:gap-y-0'>
        {groups.map(group => (
          <div
            key={group.name}
            className='flex flex-col lg:row-span-6 lg:grid lg:grid-rows-subgrid'
          >
            <h3 className='border-b-(length:--stroke-emphasis) border-accent-line pb-grid-half type-item-title'>
              {group.name}
            </h3>
            {group.quotes.map(quote => (
              <RuledRow
                key={quote}
                as='div'
                className='flex gap-grid-half py-grid-1 type-lead first-of-type:border-t-0'
              >
                <Marker />
                <blockquote className='text-balance'>
                  &ldquo;{quote}&rdquo;
                </blockquote>
              </RuledRow>
            ))}
            <RuledRow
              as='div'
              className='flex flex-col gap-grid-half py-grid-1'
            >
              <span className='type-fine'>What we build</span>
              <p className='text-base text-text'>{group.build}</p>
            </RuledRow>
            <div className='pt-grid-half'>
              <ArrowLink href={group.link.href as Route}>
                {group.link.label}
              </ArrowLink>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

/** E: one numbered list of all nine, each tagged with its bucket, then the
 *  three answers in a compact row. */
function BigList() {
  const signals = groups.flatMap((g, gi) =>
    g.quotes.map(quote => ({ quote, tag: SHORT[gi] }))
  )
  return (
    <Section className='flex flex-col gap-stack'>
      <Heading />
      <ol className='grid md:grid-cols-2 md:gap-x-grid-2'>
        {signals.map((s, i) => (
          <RuledRow key={s.quote} className='flex gap-grid-1 py-grid-1'>
            <span className='w-grid-1 shrink-0 pt-1 font-mono text-sm text-accent'>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className='flex flex-col gap-grid-half'>
              <blockquote className='type-item-title font-sans font-normal text-balance'>
                &ldquo;{s.quote}&rdquo;
              </blockquote>
              <span className='type-fine'>{s.tag}</span>
            </div>
          </RuledRow>
        ))}
      </ol>
      <div className='grid gap-grid-2 border-t border-border pt-grid-2 lg:grid-cols-3'>
        {groups.map((g, gi) => (
          <div key={g.name} className='flex flex-col gap-grid-half'>
            <span className='type-fine'>{SHORT[gi]} · What we build</span>
            <p className='text-base text-text'>{g.build}</p>
            <div className='mt-auto pt-grid-half'>
              <ArrowLink href={g.link.href as Route}>{g.link.label}</ArrowLink>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default function SignalsMockPage() {
  return (
    <main id='main' className='flex-1 pt-page-start'>
      <Variant
        letter='F'
        note='Split: the headline held still, the signals in a voice style'
      >
        <Split />
      </Variant>
      <Variant
        letter='A'
        note='Current: the three cards, as on Home now (reference)'
      >
        <SoundFamiliarSection />
      </Variant>
      <Variant
        letter='B'
        note='Spec sheet: no boxes, a ruled three-column schedule'
      >
        <SpecSheet />
      </Variant>
      <Variant
        letter='C'
        note='Self-check: tick what you hear, see your fix and count'
      >
        <SelfCheck />
      </Variant>
      <Variant
        letter='D'
        note='Tabs: one place at a time, signals left, answer right'
      >
        <SignalTabs />
      </Variant>
      <Variant
        letter='E'
        note='One big list: nine numbered signals, then the three answers'
      >
        <BigList />
      </Variant>
    </main>
  )
}
