import type { Metadata } from 'next'
import { pageMetadata } from '@/src/lib/page-metadata'
import { RuledRow } from '@/src/components/boxes'
import {
  Band,
  Section,
  SectionHeading,
} from '@/src/components/patterns/section'
import { Reveal } from '@/src/components/primitives/animated-section'
import { CtaBand } from '@/src/components/sections/cta-band'
import { PortalSection } from '@/src/components/sections/portal-section'
import { StepsSection } from '@/src/components/sections/process'
import { vendors } from '@/src/lib/vendors'
import { vendorIcons } from '@/src/components/primitives/vendor-icons'
import { BILLING, FAQ } from '@/src/lib/offers'
import { Hero } from '@/src/components/sections/hero'

export const metadata: Metadata = pageMetadata({
  title: 'Process',
  description:
    'How we work: a free 30-minute intro call, a one-hour discovery session, time with your team, one problem solved completely, then the next. You pay only for hands-on human time.',
  path: '/process',
})

const ONCE_IT_WORKS = [
  'We keep it running, and you reach us in a shared channel in your Slack, Teams, Google Chat or Discord.',
  'We teach your team to change it themselves, starting while we build.',
  "When you're ready, we start on the next problem.",
]

// The stack, grouped by role.
const stackGroups = [
  { label: 'AI Models', items: vendors.filter(v => v.category === 'ai') },
  {
    label: 'Infrastructure',
    items: vendors.filter(v => v.category === 'infra'),
  },
]

export default function ProcessPage() {
  return (
    <main id='main' className='flex-1 pt-page-start'>
      <Hero
        variant='page'
        sectionClassName='pb-grid-2'
        label='Process'
        title='We start with the people, not a feature list.'
        intro='Most software fails because no one asked the people who use it. So we meet them first, fix one thing all the way, and grow from there.'
      />

      <Band tone='light'>
        <StepsSection variant='rows' />

        <Section className='grid gap-stack lg:grid-cols-2 lg:gap-grid-4'>
          <div className='flex flex-col gap-stack'>
            <Reveal index={0}>
              <SectionHeading
                label='Once It Works'
                title='You choose what happens next.'
              />
            </Reveal>
            <Reveal index={1}>
              <ul className='flex flex-col'>
                {ONCE_IT_WORKS.map(line => (
                  <RuledRow
                    key={line}
                    className='flex gap-grid-half py-grid-1 text-base text-text'
                  >
                    <span
                      aria-hidden
                      className='mt-2 h-1.5 w-1.5 shrink-0 bg-accent-line'
                    />
                    {line}
                  </RuledRow>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal index={2} className='flex flex-col gap-stack'>
            <SectionHeading
              label='How You Pay'
              title={BILLING.title}
              intro={BILLING.body}
            />
          </Reveal>
        </Section>
      </Band>

      <Band tone='dark'>
        <PortalSection />
        <Section className='flex flex-col gap-stack'>
          <Reveal index={0}>
            <SectionHeading
              label='Our Stack'
              title='What we build with.'
              intro='Our preferred tools for speed and security. We have worked with plenty of others, and we fit in with what you already run.'
            />
          </Reveal>
          <Reveal index={1} className='flex flex-col gap-grid-2'>
            {stackGroups.map(group => (
              <div key={group.label} className='flex flex-col gap-grid-1'>
                <span className='type-fine'>{group.label}</span>
                <div className='grid grid-cols-2 gap-x-grid-half gap-y-grid-1 sm:grid-cols-4 md:flex md:flex-wrap md:items-center md:gap-x-grid-1 md:gap-y-grid-half'>
                  {group.items.map(vendor => {
                    const Icon = vendorIcons[vendor.name]
                    return (
                      <div
                        key={vendor.name}
                        className='flex flex-col items-center gap-grid-half md:w-24'
                      >
                        {Icon && (
                          <Icon
                            className='h-9 w-9 shrink-0 text-text'
                            aria-hidden
                          />
                        )}
                        <span className='type-fine whitespace-nowrap'>
                          {vendor.name}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </Reveal>
        </Section>
      </Band>

      <Band tone='light'>
        <Section id='faq' className='flex scroll-mt-24 flex-col gap-stack'>
          <Reveal index={0}>
            <SectionHeading
              label='Questions'
              title='What people ask before they start.'
            />
          </Reveal>
          <Reveal index={1}>
            <dl className='grid gap-x-grid-3 md:grid-cols-2'>
              {FAQ.map(item => (
                <RuledRow
                  as='div'
                  key={item.q}
                  className='flex flex-col gap-grid-half py-grid-1'
                >
                  <dt className='type-card-title'>{item.q}</dt>
                  <dd className='text-base text-text-muted'>{item.a}</dd>
                </RuledRow>
              ))}
            </dl>
          </Reveal>
        </Section>
      </Band>

      <CtaBand
        location='process-cta-block'
        title="Tell us what's slowing you down."
      />
    </main>
  )
}
