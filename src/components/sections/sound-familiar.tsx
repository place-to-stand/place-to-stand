import type { Route } from 'next'
import { Reveal } from '@/src/components/primitives/animated-section'
import { Section, SectionHeading } from '@/src/components/patterns/section'
import { ArrowLink } from '@/src/components/patterns/arrow-link'
import { Card, RuledRow } from '@/src/components/boxes'
import { SOUND_FAMILIAR } from '@/src/lib/home'

/**
 * Home's "Sound familiar?": three groups of things clients say, in their own
 * words, each closed by what we build for it and where to read more.
 * Tone: dark (Nov 14).
 */
export function SoundFamiliarSection() {
  return (
    <Section className='flex flex-col gap-stack'>
      <Reveal index={0}>
        <SectionHeading
          label={SOUND_FAMILIAR.label}
          title={SOUND_FAMILIAR.title}
          intro={SOUND_FAMILIAR.intro}
        />
      </Reveal>
      <Reveal index={1}>
        <ul className='grid gap-grid-1 lg:grid-cols-3'>
          {/* Each card spans three rows of a shared grid: the quotes, the
              payoff and the link. The "What we build" labels start level
              across the three cards, and each card's one link sits on the
              same line at the card's bottom; any slack sits above it. */}
          {SOUND_FAMILIAR.groups.map(group => (
            <Card
              as='li'
              key={group.name}
              className='flex flex-col gap-grid-1 lg:row-span-3 lg:grid lg:grid-rows-subgrid'
            >
              <div className='flex flex-col gap-grid-1'>
                <h3 className='type-card-title'>{group.name}</h3>
                {/* The visitor's own words, so they read as quotes. */}
                <ul className='flex flex-col'>
                  {group.quotes.map(quote => (
                    <RuledRow key={quote} className='py-grid-half'>
                      <blockquote className='type-lead text-balance'>
                        &ldquo;{quote}&rdquo;
                      </blockquote>
                    </RuledRow>
                  ))}
                </ul>
              </div>
              <div className='flex flex-col gap-grid-half'>
                <span className='type-fine'>What we build</span>
                <p className='text-base text-text'>{group.build}</p>
              </div>
              <div className='mt-auto lg:self-end'>
                <ArrowLink href={group.link.href as Route}>
                  {group.link.label}
                </ArrowLink>
              </div>
            </Card>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
SoundFamiliarSection.tone = 'dark' as const
