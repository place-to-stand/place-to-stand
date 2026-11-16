import Image from 'next/image'
import { Reveal } from '@/src/components/primitives/animated-section'
import { Section, SectionHeading } from '@/src/components/patterns/section'
import { ArrowLink } from '@/src/components/patterns/arrow-link'
import { MediaFrame } from '@/src/components/patterns/media-frame'
import { Card } from '@/src/components/boxes'
import { Quote } from '@/src/components/patterns/quote'
import { TrackedLink } from '@/src/components/primitives/tracked-link'
import { team } from '@/src/lib/team'
import { WHO_YOU_WORK_WITH_HOME as WHO } from '@/src/lib/home'

/**
 * Home's "Who you work with": the promise and two client quotes on the
 * left, the two founders on the right, each a card with a 4:5 portrait
 * across its width, then the name, title and Home's one line (not the
 * About bio). About us follows the row, as Process and Proof end.
 * Tone: either; Home puts it in a dark band.
 */
export function WhoYouWorkWithSection() {
  return (
    <Section className='flex flex-col gap-stack'>
      <div className='grid gap-stack xl:grid-cols-12 xl:gap-x-grid-2'>
        {/* Beside the cards the column stretches to their height: the
            promise at the top, the quotes pinned to the bottom so the last
            credit lines up with the cards' bottom edge. The intro and the
            quotes share one measure, so the column has one right edge. */}
        <Reveal index={0} className='flex flex-col gap-grid-2 xl:col-span-5'>
          <SectionHeading
            label={WHO.label}
            title={WHO.title}
            intro={WHO.body}
            className='[&>p]:max-w-[26.5rem] [&>p]:text-pretty'
          />
          <div className='flex max-w-[26.5rem] flex-col gap-grid-1 xl:mt-auto'>
            <h3 className='type-card-title text-balance text-text'>
              Don’t just take our word for&nbsp;it
            </h3>
            <ul className='flex flex-col gap-grid-1'>
              {WHO.reviews.picks.map(r => (
                <li key={r.name}>
                  <Quote
                    text={r.text}
                    name={r.name}
                    rating={5}
                    source={
                      <TrackedLink
                        href={r.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        location='home-who-reviews'
                        className='link-nav'
                      >
                        Read on Google ↗
                        <span className='sr-only'> (opens in a new tab)</span>
                      </TrackedLink>
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal index={1} className='xl:col-span-7'>
          <ul className='grid gap-grid-1 md:grid-cols-2'>
            {team.map(member => (
              <Card
                as='li'
                key={member.name}
                className='flex flex-col gap-grid-1'
              >
                {/* The photo runs the card's full content width as a 4:5
                    portrait, then the name, role and line. */}
                <MediaFrame shape='portrait'>
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.title}`}
                    fill
                    sizes='(min-width: 1024px) 320px, (min-width: 768px) 300px, 90vw'
                    className='object-cover'
                  />
                </MediaFrame>
                <div className='flex flex-col gap-2'>
                  <h3 className='type-card-title'>{member.name}</h3>
                  <span className='type-fine'>{member.title}</span>
                </div>
                <p className='text-base text-text-muted'>
                  {WHO.founders[member.name]}
                </p>
              </Card>
            ))}
          </ul>
        </Reveal>
      </div>
      {/* The section's one action, after the row, as Process and Proof end. */}
      <Reveal index={2}>
        <ArrowLink href='/about'>About us</ArrowLink>
      </Reveal>
    </Section>
  )
}
