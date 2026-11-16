import {
  Band,
  Section,
  SectionHeading,
} from '@/src/components/patterns/section'
import { Reveal } from '@/src/components/primitives/animated-section'
import { ContactSection } from '@/src/components/sections/contact-section'
import { BookingCalendarSection } from '@/src/components/sections/booking-calendar'
import { Button } from '@/src/components/primitives/button'
import { TrackedLink } from '@/src/components/primitives/tracked-link'
import { CTA } from '@/src/components/primitives/cta'
import { Hero } from '@/src/components/sections/hero'

/** Contact: the header, the call with its calendar, the audit and the message form. */
export function ContactTemplate() {
  return (
    <main id='main' className='flex-1 pt-page-start'>
      <Hero
        variant='page'
        sectionClassName='pb-grid-2'
        label='Contact'
        title='Book a call.'
        intro={
          <>
            A free 30-minute call with the engineers who would build it. Or{' '}
            <a href='#message' className='link-inline'>
              send us a note
            </a>
            , or{' '}
            <a href='#audit' className='link-inline'>
              take the free audit
            </a>
            .
          </>
        }
      />

      <Band tone='light'>
        <BookingCalendarSection />

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
              className='w-full sm:w-auto'
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
