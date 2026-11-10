import {
  Band,
  Section,
  SectionHeading,
} from '@/src/components/patterns/section'
import { Reveal } from '@/src/components/primitives/animated-section'
import { ContactSection } from '@/src/components/sections/contact-section'
import { BookCallButton } from '@/src/components/primitives/cta'
import { Button } from '@/src/components/primitives/button'
import { TrackedLink } from '@/src/components/primitives/tracked-link'
import { LinkCard, RuledRow } from '@/src/components/boxes'
import { CTA } from '@/src/components/primitives/cta'
import { Hero } from '@/src/components/sections/hero'

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
    action: 'Book a call',
  },
  {
    href: '#audit',
    title: 'Take the audit',
    body: 'Not ready to talk? Answer a few questions and see where software would help most.',
    action: 'Take the audit',
  },
  {
    href: '#message',
    title: 'Send a message',
    body: 'Prefer to write? Use the form, or email us.',
    action: 'Send a message',
  },
] as const

/** Contact: three ways in under the hero, the call, the audit and the message form. */
export function ContactTemplate() {
  return (
    <main className='flex-1 pt-page-start'>
      <Hero
        variant='page'
        sectionClassName='flex flex-col gap-header pb-grid-2'
        label='Contact'
        title="Let's talk."
        intro='Book a call, take the free audit, or send a message.'
      >
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
      </Hero>

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
