import Link from 'next/link'
import {
  ArrowRight,
  Clock,
  MessageSquare,
  Target,
  Users,
  Mail,
  CalendarClock,
} from 'lucide-react'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { BookCallLink } from '@/src/components/book-call-link'
import { landingVariants } from '@/src/lib/landing-pages'

const coverage = [
  {
    icon: Target,
    title: 'The problem',
    description:
      'What you are trying to fix or build, and the business outcome you actually need from it — not the feature list.',
  },
  {
    icon: Users,
    title: 'Your situation',
    description:
      'Where you are today: team, stack, constraints, and what has already been tried so we are not retreading old ground.',
  },
  {
    icon: Clock,
    title: 'Timelines & scope',
    description:
      'A first-pass read on what fits the next 30 days, what is the next quarter, and what is honestly outside scope.',
  },
  {
    icon: MessageSquare,
    title: 'Next steps',
    description:
      'No pressure. Either a proposal, an audit, or a recommendation to use something off the shelf. Whatever is actually right.',
  },
]

const audience = [
  {
    label: 'You are',
    items: [
      'A founder or operator with a clear problem worth solving',
      'Ready to move in the next 30–90 days, not "someday this year"',
      'Comfortable being a decision-maker, not just a forwarder',
    ],
  },
  {
    label: 'We are not a fit if',
    items: [
      'You need the cheapest possible vendor on the market',
      'You want to build a generic app without a specific business goal',
      'You are looking for a 12-month strategy deck with no shipping',
    ],
  },
]

export const metadata = {
  title: 'Book a Call',
  description:
    'Our team is always happy to discuss your challenge. Book a 30-minute call and we will connect you with the right person on the team.',
}

export default function BookACallPage() {
  return (
    <main className='flex-1'>
      {/* Hero — sized to let the next section peek above the fold */}
      <AnimatedSection className='relative isolate flex min-h-[80svh] max-w-none flex-col items-center justify-center gap-8 overflow-hidden bg-white px-6 pb-16 pt-28 text-center text-ink md:px-8'>
        <div className='relative z-10 flex w-full max-w-4xl flex-col items-center gap-6 text-center'>
          <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
            Get in touch
          </span>
          <h1 className='font-headline text-4xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl lg:text-6xl'>
            <span className='block'>Tell us what</span>
            <span className='block'>you&apos;re building.</span>
          </h1>
          <p className='max-w-xl text-balance text-base text-ink/60 md:text-lg'>
            We&apos;re always happy to discuss your challenge — even if it
            turns out we&apos;re not the right team for the job.
          </p>
          <div className='mt-4 flex w-full flex-col items-center justify-center gap-4 sm:flex-row'>
            <BookCallLink
              label='Book a 30-minute call'
              placement='hero'
              className='w-full sm:w-auto'
            />
            <a
              href='mailto:hello@placetostandagency.com'
              className='group inline-flex w-full items-center justify-center border border-ink/30 text-sm uppercase tracking-[0.1em] text-ink no-underline transition-colors duration-300 hover:bg-ink hover:text-white sm:w-auto'
            >
              <span className='px-4 py-3 font-semibold transition-transform duration-300 group-hover:translate-x-1'>
                Send an email
              </span>
              <span className='flex items-center justify-center self-stretch border-l border-ink/30 px-3 transition-colors duration-300 group-hover:border-cyan group-hover:bg-cyan'>
                <Mail
                  className='size-4 transition-all delay-75 duration-200 group-hover:text-ink'
                  strokeWidth={2}
                />
              </span>
            </a>
          </div>
          <p className='text-sm text-ink/50'>
            Calendar opens in a new tab. We respond to emails within one
            business day.
          </p>
        </div>
      </AnimatedSection>

      {/* "Opportunities are here" interlude — verbatim from inspiration */}
      <AnimatedSection className='flex max-w-none flex-col items-center justify-center gap-3 bg-ink px-6 py-16 text-center md:py-20'>
        <h2 className='max-w-3xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-white md:text-5xl'>
          The opportunities are here.
        </h2>
        <p className='font-headline text-xl uppercase !leading-snug text-cyan md:text-3xl'>
          So why wait?
        </p>
      </AnimatedSection>

      {/* What we'll cover */}
      <AnimatedSection className='max-w-none bg-white px-6 py-20 md:py-28'>
        <div className='mx-auto w-full max-w-6xl'>
          <div className='mb-12 max-w-2xl'>
            <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
              What we&apos;ll cover
            </span>
            <h2 className='mt-3 font-headline text-2xl font-semibold uppercase !leading-[.9] text-ink md:text-4xl lg:text-5xl'>
              Four things in 30 minutes
            </h2>
            <p className='mt-4 max-w-xl text-base text-ink/60 md:text-lg'>
              We come prepared. You don&apos;t need a brief — just bring the
              problem and we&apos;ll structure the conversation.
            </p>
          </div>

          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
            {coverage.map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className='flex flex-col gap-3 border-t-2 border-ink/15 pt-6'
                >
                  <div className='flex items-center justify-between'>
                    <span className='text-xs font-semibold uppercase tracking-[0.15em] text-ink/40'>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <Icon className='size-5 text-ink/60' strokeWidth={1.5} />
                  </div>
                  <h3 className='font-headline text-lg font-semibold uppercase leading-tight text-ink md:text-xl'>
                    {item.title}
                  </h3>
                  <p className='text-base leading-relaxed text-ink/70'>
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* Who this is for */}
      <AnimatedSection className='max-w-none bg-gray-100 px-6 py-20 md:py-28'>
        <div className='mx-auto w-full max-w-6xl'>
          <div className='mb-12 max-w-2xl'>
            <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
              Honest fit check
            </span>
            <h2 className='mt-3 font-headline text-2xl font-semibold uppercase !leading-[.9] text-ink md:text-4xl lg:text-5xl'>
              Who this is for
            </h2>
            <p className='mt-4 max-w-xl text-base text-ink/60 md:text-lg'>
              We would rather tell you we are not the right team on the first
              call than waste six weeks of discovery.
            </p>
          </div>

          <div className='grid gap-6 md:grid-cols-2'>
            {audience.map(group => (
              <div key={group.label} className='bg-white p-8'>
                <span className='text-xs font-semibold uppercase tracking-[0.1em] text-ink/40'>
                  {group.label}
                </span>
                <ul className='mt-4 flex flex-col gap-3'>
                  {group.items.map(item => (
                    <li
                      key={item}
                      className='flex gap-3 text-base leading-relaxed text-ink/80'
                    >
                      <span
                        className='mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan'
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* When you can reach us */}
      <AnimatedSection className='max-w-none bg-white px-6 py-20 md:py-24'>
        <div className='mx-auto w-full max-w-6xl'>
          <div className='mb-10 max-w-2xl'>
            <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
              When you can reach us
            </span>
            <h2 className='mt-3 font-headline text-2xl font-semibold uppercase !leading-[.9] text-ink md:text-3xl'>
              We respond within one business day.
            </h2>
          </div>

          <div className='grid gap-4 md:grid-cols-3'>
            <div className='flex flex-col gap-3 border border-ink/15 bg-white p-6'>
              <CalendarClock className='size-5 text-ink/60' strokeWidth={1.5} />
              <h3 className='font-headline text-base font-semibold uppercase leading-tight text-ink'>
                Office hours
              </h3>
              <p className='text-sm leading-relaxed text-ink/70'>
                Monday to Friday, 9:00 – 18:00 ET. Async-friendly outside of
                that — we will get back to you the next morning.
              </p>
            </div>
            <div className='flex flex-col gap-3 border border-ink/15 bg-white p-6'>
              <Mail className='size-5 text-ink/60' strokeWidth={1.5} />
              <h3 className='font-headline text-base font-semibold uppercase leading-tight text-ink'>
                Email
              </h3>
              <p className='text-sm leading-relaxed text-ink/70'>
                <a
                  href='mailto:hello@placetostandagency.com'
                  className='text-ink underline decoration-cyan decoration-2 underline-offset-4 hover:text-ink/70'
                >
                  hello@placetostandagency.com
                </a>
                <br />
                Best for written briefs or context-heavy questions.
              </p>
            </div>
            <div className='flex flex-col gap-3 border border-ink/15 bg-white p-6'>
              <Clock className='size-5 text-ink/60' strokeWidth={1.5} />
              <h3 className='font-headline text-base font-semibold uppercase leading-tight text-ink'>
                Response SLA
              </h3>
              <p className='text-sm leading-relaxed text-ink/70'>
                We answer every serious inquiry within one business day. If we
                are not the right fit, we will say so on the first call.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Tailored conversations */}
      <AnimatedSection className='max-w-none bg-gray-100 px-6 py-20 md:py-24'>
        <div className='mx-auto w-full max-w-6xl'>
          <div className='mb-10 max-w-2xl'>
            <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
              Tailored conversations
            </span>
            <h2 className='mt-3 font-headline text-2xl font-semibold uppercase !leading-[.9] text-ink md:text-3xl'>
              Have a specific angle in mind?
            </h2>
            <p className='mt-3 max-w-xl text-base text-ink/60'>
              The default call covers the basics. If one of these framings fits
              your situation better, start there and we will tailor the
              conversation.
            </p>
          </div>

          <div className='grid gap-3 md:grid-cols-2 lg:grid-cols-3'>
            {landingVariants.slice(0, 9).map(variant => (
              <Link
                key={variant.slug}
                href={`/book-a-call/${variant.slug}`}
                className='group flex flex-col gap-2 border border-ink/15 bg-white p-5 no-underline transition-colors hover:border-ink hover:bg-white/80'
              >
                <span className='text-xs font-semibold uppercase tracking-[0.1em] text-ink/50'>
                  {variant.eyebrow.split('·')[0]?.trim()}
                </span>
                <h3 className='font-headline text-base font-semibold uppercase leading-tight text-ink'>
                  {variant.headline}
                </h3>
                <span className='mt-auto inline-flex items-center gap-1 pt-2 text-xs font-semibold uppercase tracking-[0.1em] text-ink/70 transition-colors group-hover:text-ink'>
                  Start here
                  <ArrowRight
                    className='size-3.5 transition-transform group-hover:translate-x-1'
                    strokeWidth={2}
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Final CTA */}
      <AnimatedSection className='flex min-h-[55svh] max-w-none flex-col items-center justify-center gap-6 bg-cyan px-6 text-center'>
        <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/70'>
          Ready when you are
        </span>
        <h2 className='max-w-3xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl'>
          Pick a time that works.
        </h2>
        <p className='max-w-xl text-balance text-base text-ink/80 md:text-lg'>
          30 minutes. No pressure. You leave with a real next step regardless
          of whether we end up working together.
        </p>
        <BookCallLink
          label='Book a 30-minute call'
          placement='bottom'
          className='mt-2'
        />
      </AnimatedSection>
    </main>
  )
}
