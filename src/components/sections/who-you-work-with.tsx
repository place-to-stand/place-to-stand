import Image from 'next/image'
import { Reveal } from '@/src/components/primitives/animated-section'
import { Section, SectionHeading } from '@/src/components/patterns/section'
import { ArrowLink } from '@/src/components/patterns/arrow-link'
import { MediaFrame } from '@/src/components/patterns/media-frame'
import { Card } from '@/src/components/boxes'
import { TrackedLink } from '@/src/components/primitives/tracked-link'
import { team } from '@/src/lib/team'
import { WHO_YOU_WORK_WITH_HOME as WHO } from '@/src/lib/home'

/**
 * Home's "Who you work with": the promise on the left, the two founders on
 * the right, each a card with a 4:5 portrait across its width, then the
 * name, title and Home's one line (not the About bio).
 * Tone: either; Home puts it in a dark band.
 */
export function WhoYouWorkWithSection() {
  return (
    <Section className='grid gap-stack lg:grid-cols-12 lg:gap-x-grid-2'>
      {/* The link follows the paragraph at the hero's intro-to-action gap
          (24, 48 on laptops), not the section's stack gap. */}
      <Reveal
        index={0}
        className='flex flex-col gap-grid-1 lg:col-span-5 lg:gap-grid-2'
      >
        <SectionHeading label={WHO.label} title={WHO.title} intro={WHO.body} />
        {/* Proof: two clients in their own words (public Google reviews),
            at the intro's size and width so the column keeps one right
            edge, each credited with a link to read it on Google. About us
            is the one action. */}
        <ul className='flex flex-col gap-grid-1'>
          {WHO.reviews.picks.map(r => (
            <li key={r.name} className='flex flex-col gap-2'>
              <blockquote className='max-w-2xl type-intro text-balance text-text'>
                &ldquo;{r.text}&rdquo;
              </blockquote>
              <p className='flex flex-wrap items-baseline gap-x-grid-1 gap-y-1'>
                <span className='type-fine'>{r.name}</span>
                <TrackedLink
                  href={WHO.reviews.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  location='home-who-reviews'
                  className='link-nav'
                >
                  Read on Google ↗
                  <span className='sr-only'> (opens in a new tab)</span>
                </TrackedLink>
              </p>
            </li>
          ))}
        </ul>
        <ArrowLink href='/about'>About us</ArrowLink>
      </Reveal>
      <Reveal index={1} className='lg:col-span-7'>
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
    </Section>
  )
}
