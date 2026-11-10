import type { Metadata } from 'next'
import { pageMetadata } from '@/src/lib/page-metadata'
import {
  Band,
  PageHeader,
  Section,
  SectionHeading,
} from '@/src/components/layout/section'
import { Reveal } from '@/src/components/layout/animated-section'
import { ContactSection } from '@/src/components/sections/contact-section'
import { BookCallButton } from '@/src/components/layout/cta'
import { Button } from '@/src/components/ui/button'
import { TrackedLink } from '@/src/components/tracked-link'
import { LinkCard, RuledRow } from '@/src/components/layout/boxes'
import { CTA } from '@/src/components/layout/cta'

export const metadata: Metadata = pageMetadata({
  title: 'Book a call',
  description:
    'Book a free 30-minute intro call with the engineers who would build your software, take the free audit, or send a message.',
  path: '/contact',
})

/**
 * The intro call (a short fit check), sold before the booking button.
 * Copy approved by Jason on Nov 10.
 */
const CALL = [
  {
    label: 'What happens',
    // Approved Nov 10.
    body: "Tell us what you need and roughly how big it is. We'll say plainly if we're the right fit.",
  },
  {
    label: 'Who you meet',
    // Approved Nov 10.
    body: 'The engineers who would build it. No account managers, no handoffs.',
  },
  {
    label: 'What you leave with',
    // Approved Nov 10.
    body: 'A straight answer on whether we can help, and if we can, the next step: a 1-hour discovery session.',
  },
  {
    label: 'What it costs',
    // Approved Nov 10.
    body: 'Nothing. Free, no commitment.',
  },
]

/** The three ways in, as equal cards under the header. */
const OPTIONS = [
  {
    href: '#call',
    title: 'Book a call',
    body: "Talk it through with the people who'd build it.",
    action: 'Pick a time',
  },
  {
    href: '#audit',
    title: 'Take the audit',
    body: 'Not ready to talk? Answer a few questions and see where software would help most.',
    action: 'Start the audit',
  },
  {
    href: '#message',
    title: 'Send a message',
    body: 'Prefer to write? Use the form, or email us.',
    action: 'Write to us',
  },
] as const

export default function ContactPage() {
  return (
    <main className='flex-1 pt-page-start'>
      <Section priority className='flex flex-col gap-header pb-grid-2'>
        <PageHeader
          label='Contact'
          title="Let's talk."
          intro='Book a call, take the free audit, or send a message.'
        />
        <Reveal index={1}>
          <ul className='grid gap-grid-1 md:grid-cols-3'>
            {OPTIONS.map((option, index) => (
              <li key={option.href}>
                <LinkCard
                  href={option.href}
                  className='flex h-full flex-col gap-grid-1'
                >
                  <span className='font-mono text-sm text-text-muted'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className='flex flex-col gap-grid-half'>
                    <span className='type-card-title'>{option.title}</span>
                    <span className='text-base text-text-muted'>
                      {option.body}
                    </span>
                  </span>
                  <span className='mt-auto type-fine group-hover:text-text'>
                    {option.action} &darr;
                  </span>
                </LinkCard>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Band tone='light'>
        <Section id='call' className='flex scroll-mt-24 flex-col gap-stack'>
          <Reveal index={0}>
            <SectionHeading
              label='Intro Call · 30 Min · Free'
              title='Book a call.'
              intro="Tell us what slows you down. We'll say plainly whether we can help."
            />
          </Reveal>
          <Reveal index={1}>
            <dl className='grid gap-x-grid-2 gap-y-grid-2 sm:grid-cols-2 lg:grid-cols-4'>
              {CALL.map(item => (
                <RuledRow
                  as='div'
                  key={item.label}
                  className='flex flex-col gap-grid-half pt-grid-1'
                >
                  <dt className='type-card-title'>{item.label}</dt>
                  <dd className='text-base text-text-muted'>{item.body}</dd>
                </RuledRow>
              ))}
            </dl>
          </Reveal>
          <Reveal index={2} className='flex flex-col items-start gap-grid-half'>
            <BookCallButton
              location='contact'
              toCalendar
              className='w-full sm:w-auto sm:min-w-60'
            />
            <p className='type-fine'>Opens our calendar in a new tab.</p>
          </Reveal>
        </Section>

        <Section id='audit' className='flex scroll-mt-24 flex-col gap-stack'>
          <Reveal index={0}>
            <SectionHeading
              label='Free Audit · 2 Min'
              title='Not ready to talk?'
              intro='Answer a few questions and see where software would help most. You get a preview on screen and the full results by email.'
            />
          </Reveal>
          <Reveal index={1} className='flex flex-col items-start'>
            <Button
              asChild
              size='lg'
              variant='outline'
              className='w-full sm:w-auto sm:min-w-60'
            >
              <TrackedLink href={CTA.audit.href} location='contact-audit'>
                {CTA.audit.label}
              </TrackedLink>
            </Button>
          </Reveal>
        </Section>
      </Band>

      <Band tone='dark' className='pb-edge'>
        <ContactSection />
      </Band>
    </main>
  )
}
