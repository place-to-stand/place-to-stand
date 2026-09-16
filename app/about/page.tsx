import type { Metadata } from 'next'
import Image from 'next/image'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { Button } from '@/src/components/ui/button'
import { TrackedLink } from '@/src/components/tracked-link'
import { CONTACT_EMAIL, LOCATIONS, SITE_URL } from '@/src/lib/site'
import { beliefs } from '@/src/lib/site-copy'
import { team } from '@/src/lib/team'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Who Place To Stand is, where we work from, who builds the software, and how to reach us.',
}

const facts = [
  {
    label: 'Locations',
    value: LOCATIONS.map(l => `${l.locality}, ${l.region}`).join(' · '),
  },
  { label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { label: 'Web', value: SITE_URL.replace('https://', ''), href: SITE_URL },
  { label: 'Founded by', value: team.map(m => m.name).join(' and ') },
]

export default function AboutPage() {
  return (
    <main className='flex-1 pt-10 pb-32'>
      <AnimatedSection priority className='flex flex-col gap-12'>
        <div className='flex flex-col gap-4'>
          <span className='bp-label font-mono'>About</span>
          <h1 className='max-w-4xl font-headline text-4xl leading-[.9]! font-semibold text-balance text-text uppercase md:text-6xl'>
            A place to stand
          </h1>
          <p className='max-w-2xl text-base leading-relaxed text-text-muted md:text-lg'>
            Place To Stand is a software agency operating from Austin, Texas and
            Brooklyn, New York. We build custom software, workflow systems,
            automation, and AI for businesses that have real processes but no
            in-house engineering team.
          </p>
          <p className='max-w-2xl text-base leading-relaxed text-text-muted md:text-lg'>
            The name comes from Archimedes: &ldquo;Give me a place to stand and
            a lever and I will move the world.&rdquo; Businesses do not need to
            be huge to make big moves. They need the right tools and a solid
            foundation.
          </p>
        </div>

        {/* What we believe + the facts an agent or a buyer checks first */}
        <div className='grid gap-grid-1 md:grid-cols-12 md:gap-grid-2'>
          <div className='relative flex flex-col gap-6 border border-border bg-bg-card p-6 md:col-span-8 md:p-8'>
            <BlueprintCorners size={16} />
            <h2 className='font-headline text-2xl text-text uppercase'>
              What we believe
            </h2>
            <ul className='flex flex-col gap-5'>
              {beliefs.map(belief => (
                <li key={belief.title} className='flex flex-col gap-1'>
                  <h3 className='font-headline text-lg font-semibold tracking-tight text-text'>
                    {belief.title}
                  </h3>
                  <p className='text-sm leading-relaxed text-text-muted'>
                    {belief.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <dl className='relative flex flex-col gap-4 border border-border p-6 md:col-span-4 md:p-8'>
            <BlueprintCorners size={16} />
            {facts.map(fact => (
              <div key={fact.label} className='flex flex-col gap-1'>
                <dt className='bp-label font-mono'>{fact.label}</dt>
                <dd className='text-sm text-text'>
                  {'href' in fact && fact.href ? (
                    <a
                      href={fact.href}
                      className='text-accent underline-offset-4 hover:underline'
                    >
                      {fact.value}
                    </a>
                  ) : (
                    fact.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Who builds the software */}
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <h2 className='font-headline text-2xl text-text uppercase'>
              Who builds your software
            </h2>
            <p className='max-w-2xl text-sm leading-relaxed text-text-muted'>
              Senior engineers who own your project end-to-end.
            </p>
          </div>
          <div className='grid gap-grid-1 sm:grid-cols-2'>
            {team.map(member => (
              <article
                key={member.name}
                className='relative flex gap-4 border border-border bg-bg-card p-5'
              >
                <BlueprintCorners size={12} />
                <div className='relative h-16 w-16 shrink-0 overflow-hidden border border-border'>
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.title}`}
                    fill
                    sizes='64px'
                    className='object-cover'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <h3 className='font-headline text-lg font-semibold tracking-tight text-text'>
                    {member.name}
                  </h3>
                  <p className='font-mono text-[11px] tracking-[0.1em] text-accent uppercase'>
                    {member.title}
                  </p>
                  <p className='text-sm leading-relaxed text-text-muted'>
                    {member.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
          <Button asChild size='lg'>
            <TrackedLink href='/audit' location='about-cta'>
              Start the free audit
            </TrackedLink>
          </Button>
          <Button asChild size='lg' variant='outline' className='border-2'>
            <TrackedLink href='/contact' location='about-cta'>
              Contact Us
            </TrackedLink>
          </Button>
        </div>
      </AnimatedSection>
    </main>
  )
}
