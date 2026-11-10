import type { Metadata } from 'next'
import { Band, PageHeader, Section } from '@/src/components/layout/section'
import { CtaBand } from '@/src/components/layout/cta-band'
import { OwnershipSection } from '@/src/components/sections/home-story'
import { pageMetadata } from '@/src/lib/page-metadata'
import { JsonLd } from '@/src/components/seo/json-ld'
import { teamJsonLd } from '@/src/lib/structured-data'
import Image from 'next/image'
import { team, type TeamMember } from '@/src/lib/team'
import { cn } from '@/src/lib/utils'
import { SocialIcon } from '@/src/components/layout/social-icon'
import { ALT_ROW } from '@/src/components/layout/alt-row'

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description:
    'Place To Stand is a small team of senior engineers in Austin and Brooklyn who build software their clients own.',
  path: '/about',
})

/**
 * One line per founder on what they build, taken from their bios. Kris's line
 * is adapted from his bio (approved Nov 10).
 */
const WHAT_I_BUILD: Record<string, string> = {
  'Jason Desiderio': 'Apps built to perform under real-world load.',
  'Kris Crawford': 'Software built to last: measure twice, build once.',
}

export default function AboutPage() {
  return (
    <main className='flex-1 pt-page-start'>
      <JsonLd data={teamJsonLd} />
      <Section priority className='pb-grid-2'>
        <PageHeader
          label='About'
          title='Founders who build.'
          intro='We are senior engineers in Austin and Brooklyn. The people you meet on the first call are the people who build your software, and you own everything we make.'
        />
      </Section>

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
                <div
                  className={cn(
                    'relative aspect-square overflow-hidden bg-bg-card lg:col-span-5 lg:row-start-1',
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
                </div>
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
                  {WHAT_I_BUILD[member.name] && (
                    <div className='flex flex-col gap-grid-half border-t border-border-light pt-grid-1'>
                      <span className='type-fine'>What I build</span>
                      <p className='type-card-title'>
                        {WHAT_I_BUILD[member.name]}
                      </p>
                    </div>
                  )}
                  <SocialLinks member={member} />
                </div>
              </article>
            </Section>
          )
        })}
      </Band>

      <Band tone='dark'>
        <OwnershipSection />
      </Band>
      <CtaBand
        location='about-cta-block'
        title="Tell us what's slowing you down."
      />
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
