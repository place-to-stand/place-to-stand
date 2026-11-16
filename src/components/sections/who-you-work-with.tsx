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
 * Home's "Who you work with": the heading across the top, then the two
 * founders (a 4:5 portrait, name, title and Home's one line) and what
 * clients say, from our public Google reviews.
 * Tone: either; Home puts it in a dark band.
 */
export function WhoYouWorkWithSection() {
  return (
    <Section className='flex flex-col gap-stack'>
      <Reveal index={0}>
        <SectionHeading label={WHO.label} title={WHO.title} intro={WHO.body} />
      </Reveal>
      {/* From 1280: Jason | Kris | what clients say, on the same three
          columns as the warning-signs chats, so the eye runs headline →
          faces → proof. 768-1279: the cards side by side, the quotes
          below them in two columns. Phones: stacked. */}
      <Reveal
        index={1}
        className='grid gap-grid-1 md:grid-cols-2 xl:grid-cols-3'
      >
        {team.map(member => (
          <Card key={member.name} className='flex flex-col gap-grid-1'>
            {/* The photo runs the card's full content width as a 4:5
                portrait, then the name, role and line. */}
            <MediaFrame shape='portrait'>
              <Image
                src={member.image}
                alt={`${member.name}, ${member.title}`}
                fill
                sizes='(min-width: 1280px) 360px, (min-width: 768px) 300px, 90vw'
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
        <div className='flex flex-col gap-grid-1 pt-grid-1 md:col-span-2 xl:col-span-1 xl:pt-0'>
          <span className='type-fine'>What clients say</span>
          {/* Two clients in their own words, from our public Google
              reviews; each credit links to them on Google. */}
          <ul className='grid gap-grid-1 md:grid-cols-2 md:gap-x-grid-2 xl:grid-cols-1'>
            {WHO.reviews.picks.map(r => (
              <li key={r.name} className='flex flex-col gap-2'>
                <blockquote className='type-intro text-text'>
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
          <div className='pt-grid-1 xl:mt-auto'>
            <ArrowLink href='/about'>About us</ArrowLink>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
