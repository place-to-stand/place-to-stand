import type { Metadata } from 'next'
import {
  Band,
  Section,
  SectionHeading,
} from '@/src/components/patterns/section'
import { CtaBand } from '@/src/components/sections/cta-band'
import { pageMetadata } from '@/src/lib/page-metadata'
import { JsonLd } from '@/src/components/seo/json-ld'
import { teamJsonLd } from '@/src/lib/structured-data'
import Image from 'next/image'
import { team, type TeamMember } from '@/src/lib/team'
import { cn } from '@/src/lib/utils'
import { Reveal } from '@/src/components/primitives/animated-section'
import { ArrowLink } from '@/src/components/patterns/arrow-link'
import { SocialIcon } from '@/src/components/primitives/social-icon'
import { ALT_ROW } from '@/src/components/patterns/alt-row'
import { Hero } from '@/src/components/sections/hero'
import { MediaFrame } from '@/src/components/patterns/media-frame'

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description:
    'Place To Stand builds software its clients own, from Austin and Brooklyn. Built by experienced engineers, including a former Squarespace group engineering manager.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <main id='main' className='flex-1 pt-page-start'>
      <JsonLd data={teamJsonLd} />
      <Hero
        variant='page'
        sectionClassName='pb-grid-2'
        label='About'
        title='Founders who build.'
        intro='Experienced engineers in Austin and Brooklyn, building for clients since 2023. The people on your first call are the people who build your software.'
      />

      <Band tone='light'>
        {/* One full-width row per founder, the same alternating pattern as
            the Clients page: a big photo on one side, the person on the
            other, switching sides each row on large screens. */}
        {team.map((member, index) => {
          const flipped = index % 2 === 1
          return (
            <Section key={member.name}>
              <article
                id={member.name.toLowerCase().replace(/\s+/g, '-')}
                className={cn(
                  'scroll-mt-24 gap-y-grid-2 lg:items-center',
                  ALT_ROW
                )}
              >
                <MediaFrame
                  shape='person'
                  className={cn(
                    'lg:col-span-5 lg:row-start-1',
                    flipped ? 'lg:col-start-8' : 'lg:col-start-1'
                  )}
                >
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.title}`}
                    fill
                    loading='eager'
                    sizes='(min-width: 1440px) 552px, (min-width: 1024px) 40vw, 100vw'
                    className='object-cover'
                  />
                </MediaFrame>
                <div
                  className={cn(
                    'flex flex-col gap-stack lg:col-span-7 lg:row-start-1',
                    flipped ? 'lg:col-start-1' : 'lg:col-start-6'
                  )}
                >
                  <div className='flex flex-col gap-intro'>
                    <div className='flex flex-col gap-eyebrow'>
                      <div className='flex flex-wrap items-baseline gap-x-grid-1 gap-y-grid-half'>
                        <span className='bp-label font-mono'>
                          {member.title}
                        </span>
                        <span className='type-fine'>
                          {member.city.name}, {member.city.region}
                        </span>
                      </div>
                      <h2 className='type-section-title'>{member.name}</h2>
                    </div>
                    <p className='type-intro'>{member.bio}</p>
                  </div>
                  <SocialLinks member={member} />
                </div>
              </article>
            </Section>
          )
        })}
      </Band>

      <Band tone='dark'>
        <Section className='flex flex-col gap-stack'>
          <Reveal index={0}>
            <SectionHeading
              label='How We Work'
              title='No account managers. No handoffs.'
              intro='You talk to our engineers from the first call to launch and after. We decide what to build with you, AI agents write much of the code, and nothing ships until one of us has checked it.'
            />
          </Reveal>
          <Reveal
            index={1}
            className='flex flex-wrap gap-x-grid-2 gap-y-grid-half'
          >
            <ArrowLink href='/process'>See how we work</ArrowLink>
            <ArrowLink href='/platform#own'>What you own, in full</ArrowLink>
          </Reveal>
        </Section>
      </Band>
      <CtaBand location='about-cta-block' />
    </main>
  )
}

function SocialLinks({ member }: { member: TeamMember }) {
  const networks = ['linkedin', 'x', 'github', 'instagram'] as const
  const names = {
    linkedin: 'LinkedIn',
    x: 'X',
    github: 'GitHub',
    instagram: 'Instagram',
  }
  return (
    <div className='flex gap-grid-half'>
      {networks.map(network => {
        const href = member.socials[network]
        return href ? (
          <SocialIcon
            key={network}
            network={network}
            href={href}
            label={`${member.name} on ${names[network]}`}
          />
        ) : null
      })}
    </div>
  )
}
