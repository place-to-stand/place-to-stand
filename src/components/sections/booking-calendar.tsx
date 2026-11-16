import { Section } from '@/src/components/patterns/section'
import { Reveal } from '@/src/components/primitives/animated-section'
import { CTA } from '@/src/components/primitives/cta'
import { TrackedLink } from '@/src/components/primitives/tracked-link'
import { Panel, RuledRow } from '@/src/components/boxes'

/**
 * The embeddable form of CTA.book.calendarUrl: that short link redirects to
 * this appointment schedule, and `gv=true` asks Google for the framed view.
 * If the schedule is ever recreated, follow the short link again
 * (curl -sIL) and paste the new id here.
 */
const CALENDAR_EMBED_URL =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2lyEHB_c_VNvlHguxzjbAEYU_SSdaKcdD-0ijvnKxsAOohqiAVJKtcZBRPyDZjYLlSzjfhWL9V?gv=true'

/**
 * The intro call (a short fit check), sold above the calendar.
 * Copy approved by Jason on Nov 10, kept on Nov 13.
 */
const CALL = [
  {
    label: 'What happens',
    body: 'Tell us what’s wrong and roughly how big it is. We’ll say plainly if we’re the right fit.',
  },
  {
    label: 'Who you meet',
    body: 'The engineers who would build it. No account managers or project managers in between.',
  },
  {
    label: 'What you leave with',
    body: 'A straight answer on whether we can help, and if we can, the next step: a 1-hour discovery session.',
  },
  {
    label: 'What it costs',
    body: 'Nothing. Free, no commitment.',
  },
]

/**
 * Contact's call section (#call, where every Book a call button lands): the
 * four facts, then the Google booking calendar right on the page, with a plain
 * link under it in case the frame is blocked.
 */
export function BookingCalendarSection() {
  return (
    <Section
      id='call'
      // Phones: just clear the short header, so the calendar's top is in
      // view on landing. Larger screens keep the site's usual offset.
      className='flex scroll-mt-grid-3 flex-col gap-stack lg:scroll-mt-24'
    >
      <Reveal index={0}>
        {/* The page title already says "Book a call.", so this section's
            heading is its label alone. */}
        <h2 className='bp-label font-mono'>Intro Call · 30 Min · Free</h2>
      </Reveal>
      <Reveal index={1}>
        <dl className='grid gap-x-grid-2 gap-y-grid-half sm:grid-cols-2 sm:gap-y-grid-1 lg:grid-cols-4'>
          {CALL.map(item => (
            <RuledRow
              as='div'
              key={item.label}
              className='flex flex-col gap-grid-half pt-grid-half sm:pt-grid-1'
            >
              <dt className='type-card-title'>{item.label}</dt>
              <dd className='text-base text-text-muted'>{item.body}</dd>
            </RuledRow>
          ))}
        </dl>
      </Reveal>
      <Reveal index={2} className='flex flex-col gap-grid-half'>
        {/* Google's schedule stacks the day picker over the times on narrow
            screens, so the frame is tallest on phones. */}
        <Panel className='overflow-hidden p-0'>
          <iframe
            src={CALENDAR_EMBED_URL}
            title='Book a free 30-minute intro call'
            loading='lazy'
            className='block h-[60rem] w-full border-0 md:h-[52rem] lg:h-[48rem]'
          />
        </Panel>
        <p className='type-fine'>
          Calendar not loading?{' '}
          <TrackedLink
            href={CTA.book.calendarUrl}
            location='contact-calendar-fallback'
            target='_blank'
            rel='noreferrer noopener'
            className='link-inline'
          >
            Open it in a new tab.
          </TrackedLink>
        </p>
      </Reveal>
    </Section>
  )
}
