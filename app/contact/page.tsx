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
import { CtaBand } from '@/src/components/layout/cta-band'

export const metadata: Metadata = pageMetadata({
  title: 'Book a call',
  description:
    'Book a free 30-minute intro call with the engineers who would build your software. Or send a message, or take the free two-minute audit.',
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

export default function ContactPage() {
  return (
    <main className='flex-1 pt-page-start'>
      <Section priority className='pb-grid-2'>
        <PageHeader
          label='Contact'
          title="Let's talk."
          // Approved Nov 10.
          intro='Book a call, send a message, or take the free audit.'
        />
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
                <div
                  key={item.label}
                  className='flex flex-col gap-grid-half border-t border-border-light pt-grid-1'
                >
                  <dt className='type-card-title'>{item.label}</dt>
                  <dd className='text-base text-text-muted'>{item.body}</dd>
                </div>
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
      </Band>

      <Band tone='dark'>
        <ContactSection />
      </Band>

      <CtaBand
        location='contact-audit'
        label='Free Audit'
        title='Not ready to talk?'
        description='See where custom software would help first, in two minutes.'
        action='audit'
      />
    </main>
  )
}
