import type { Metadata } from 'next'
import { pageMetadata } from '@/src/lib/page-metadata'
import {
  Band,
  PageHeader,
  Section,
  SectionHeading,
} from '@/src/components/layout/section'
import { Reveal } from '@/src/components/layout/animated-section'
import { CtaBand } from '@/src/components/layout/cta-band'
import { PortalSection } from '@/src/components/sections/portal-section'
import { PhasesSection } from '@/src/components/sections/phases-section'
import { vendors } from '@/src/lib/vendors'
import { vendorIcons } from '@/src/components/icons/vendor-icons'
import { BILLING, FAQ, STEPS } from '@/src/lib/offers'

export const metadata: Metadata = pageMetadata({
  title: 'Process',
  description:
    'How we work: a free 30-minute intro call, a one-hour discovery session, time with your team, one problem solved completely, then the next. You pay only for hands-on human time.',
  path: '/process',
})

const ONCE_IT_WORKS = [
  'We keep it running, and you reach us in a shared channel in your Slack, Teams or Google Chat.',
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
    <main className='flex-1 pt-page-start'>
      <Section priority className='pb-grid-2'>
        <PageHeader
          label='Process'
          title='We start with the people, not a feature list.'
          intro='Most software fails because no one asked the people who use it. So we meet them first, fix one thing all the way, and grow from there.'
        />
      </Section>

      <Band tone='light'>
        <Section className='flex flex-col gap-stack'>
          <Reveal index={0}>
            <SectionHeading
              label='The Steps'
              title='Five steps, each with a time.'
            />
          </Reveal>
          <Reveal index={1}>
            <ol className='flex flex-col'>
              {STEPS.map(step => (
                <li
                  key={step.number}
                  className='grid gap-grid-1 border-t border-border-light py-grid-2 last:pb-0 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-grid-3'
                >
                  <div className='flex flex-col gap-grid-1'>
                    <div className='flex items-center gap-grid-1'>
                      <span className='font-mono text-sm text-text-muted'>
                        {step.number}
                      </span>
                      <span className='bp-label font-mono after:hidden'>
                        {step.time}
                      </span>
                    </div>
                    <h3 className='type-item-title'>{step.name}</h3>
                  </div>
                  <p className='max-w-2xl type-intro'>{step.detail}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </Section>

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
                  <li
                    key={line}
                    className='flex gap-grid-half border-t border-border-light py-grid-1 text-base text-text'
                  >
                    <span
                      aria-hidden
                      className='mt-2 h-1.5 w-1.5 shrink-0 bg-accent-line'
                    />
                    {line}
                  </li>
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
        <PhasesSection showHowWeWorkLink={false} />
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
                <div
                  key={item.q}
                  className='flex flex-col gap-grid-half border-t border-border-light py-grid-1'
                >
                  <dt className='type-card-title'>{item.q}</dt>
                  <dd className='text-base text-text-muted'>{item.a}</dd>
                </div>
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
