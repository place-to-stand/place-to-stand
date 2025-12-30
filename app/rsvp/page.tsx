import Image from 'next/image'
import type { Metadata } from 'next'

import { FilloutForm } from '../../src/components/fillout-form'

const filloutFormId = 'dtJoNAa9CEus'

const eventDescription =
  'Learn how to streamline the everyday admin work so you can focus on the parts you love. We’ll show you how AI can handle the “dishes” while you create the art — all while saving time, cutting costs, and helping you compete against the big brands.'

const eventDetails = [
  {
    term: 'Date & Time',
    lines: ['Wednesday', 'November 5, 2025', '6:30–8:00pm'],
  },
  {
    term: 'Location',
    lines: ['Hold Out Brewing', '1208 W 4th St', 'Austin, TX 78703'],
  },
  {
    term: 'Admission',
    lines: ['FREE', 'Presentation + Q&A'],
  },
]

const eventStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'AI Playbook Workshop',
  description: eventDescription,
  startDate: '2025-11-05T18:30:00-06:00',
  endDate: '2025-11-05T20:00:00-06:00',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: {
    '@type': 'Place',
    name: 'Hold Out Brewing',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1208 W 4th St',
      addressLocality: 'Austin',
      addressRegion: 'TX',
      postalCode: '78703',
      addressCountry: 'US',
    },
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
}

export const metadata: Metadata = {
  title: 'RSVP | Place to Stand',
  description:
    'Save your spot and connect with the Place to Stand team. RSVP to the AI Playbook and schedule time to talk right away.',
}

export default function RsvpPage() {
  return (
    <>
      <main className='flex-1 pb-16 pt-32 sm:pt-40'>
        <div className='container mx-auto w-full max-w-6xl px-6'>
          <header className='grid gap-12 lg:grid-cols-2 lg:items-start'>
            <div className='flex justify-center lg:justify-start'>
              <div className='relative aspect-[500/647] w-full overflow-hidden rounded-xl border border-ink-light/10 bg-white/10'>
                <Image
                  src='/pts-ai-playbook-flyer.png'
                  alt='Place to Stand AI Playbook flyer'
                  fill
                  priority
                  sizes='(min-width: 1024px) 440px, 100vw'
                  className='object-cover'
                />
              </div>
            </div>

            <div>
              <div className='flex flex-col gap-2'>
                <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink-light/60'>
                  RSVP to
                </span>
                <h2 className='max-w-5xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-ink-light md:text-5xl'>
                  The Emerging AI Playbook for SMBs
                </h2>
                <p className='max-w-xl text-balance text-lg !leading-snug text-ink-light/60'>
                  Complete the short form below to lock in your spot for the
                  presentation + Q&A. We look forward to seeing you there!
                </p>
              </div>

              <div className='mt-8 overflow-hidden rounded-2xl border border-ink-light/10 bg-white/10 shadow-sm'>
                <FilloutForm filloutId={filloutFormId} />
              </div>
            </div>
          </header>

          <section className='mt-16 rounded-2xl border border-ink-light/10 bg-white/10 p-8 shadow-sm'>
            <div className='max-w-3xl'>
              <h2 className='text-3xl font-semibold tracking-tight text-ink-light sm:text-4xl'>
                Event Details
              </h2>
              <p className='mt-4 text-base text-ink-light/70 sm:text-lg'>
                {eventDescription}
              </p>
            </div>

            <dl className='mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
              {eventDetails.map(detail => (
                <div key={detail.term}>
                  <dt className='text-xs font-semibold uppercase tracking-[0.1em] text-ink-light/60'>
                    {detail.term}
                  </dt>
                  <dd className='mt-3 text-lg font-medium text-ink-light sm:text-xl'>
                    {detail.lines.map(line => (
                      <span key={line} className='block'>
                        {line}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className='mt-36 rounded-2xl md:p-8'>
            <div className='flex flex-col items-center gap-4 text-center'>
              <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink-light/60'>
                Book A Consultation
              </span>
              <h2 className='max-w-5xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-ink-light md:text-5xl'>
                Want to talk sooner?
              </h2>
              <p className='max-w-xl text-balance text-lg !leading-snug text-ink-light/60'>
                Grab some time with our team right now to learn more about the
                emerging AI playbook for SMBs and how it can benefit your
                business.
              </p>
            </div>

            <div className='mt-8 overflow-hidden rounded-xl border border-ink-light/10 bg-white/10'>
              <iframe
                title='Book a consultation'
                src='https://calendar.google.com/calendar/appointments/schedules/AcZssZ0IvygeLpVOdv1HQkUQLSHv6H-P6Wm6F7KGySphJhsFUNWU8Y6wQhXh4q8iE_YH02hL4ZBUr2-f?gv=true'
                style={{ border: 0 }}
                width='100%'
                height='600'
                frameBorder={0}
              />
            </div>
          </section>
        </div>
      </main>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventStructuredData),
        }}
      />
    </>
  )
}
