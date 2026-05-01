import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AnimatedSection } from '@/src/components/layout/animated-section'

const stages = [
  {
    number: '01',
    title: 'Discover',
    description:
      "Our AI opportunity audit digs into your operations, workflows, and data to find where technology creates real leverage. The result is a prioritized roadmap, not a slide deck.",
    callout: "Sometimes the answer is off-the-shelf — and we'll tell you when.",
  },
  {
    number: '02',
    title: 'Propose',
    description:
      'For bespoke recommendations, we send a clear proposal with scope, timeline, and a flat-rate quote. You approve before any production work begins. No surprises.',
  },
  {
    number: '03',
    title: 'Build',
    description:
      'Your project enters our 4-day production cycle — an AI-powered rhythm that keeps many apps shipping in parallel without sacrificing quality.',
    cycleLink: true,
  },
  {
    number: '04',
    title: 'Support',
    description:
      "Once stable, your app enters long-term support — security patches, hosting/DNS, code updates, and general IT for the products we ship for you.",
  },
]

const cycle = [
  {
    label: 'Day 1',
    title: 'Feedback intake',
    description:
      "We collect your latest feedback, requirements, and priorities. The team scopes what's next and feeds the queue.",
    overnight: 'AI build work',
  },
  {
    label: 'Day 2',
    title: 'Human QA & review',
    description:
      'Our team reviews what was built, tests it, and refines until it meets our quality bar.',
    overnight: 'Update emails sent to clients',
  },
  {
    label: 'Day 3',
    title: 'Feedback intake',
    description:
      "Your reactions to Day 2's update come back in. We reprioritize, scope refinements, and queue the next pass.",
    overnight: 'AI build work',
  },
  {
    label: 'Day 4',
    title: 'Human QA & ship',
    description:
      'Final review, then we ship the update. The cycle restarts on Day 1 with your fresh feedback.',
  },
]

const support = [
  {
    title: 'Security updates',
    description:
      'Patches, dependency upgrades, and security audits — handled before they become incidents.',
  },
  {
    title: 'Hosting & DNS',
    description:
      "We manage hosting, DNS, certificates, and uptime so you don't have to. One less vendor to chase.",
  },
  {
    title: 'Code updates',
    description:
      'Minor improvements, refactors, and small fixes — pulled from the same block of hours, no separate contract.',
  },
  {
    title: 'General IT',
    description:
      'For the products we built: account access, integrations, internal tooling questions. We know your stack because we built it.',
  },
]

const tools = [
  { name: 'Claude', domain: 'anthropic.com' },
  { name: 'OpenAI', domain: 'openai.com' },
  { name: 'Next.js', domain: 'nextjs.org' },
  { name: 'React', domain: 'react.dev' },
  { name: 'Tailwind', domain: 'tailwindcss.com' },
  { name: 'Vercel', domain: 'vercel.com' },
  { name: 'Supabase', domain: 'supabase.com' },
  { name: 'GitHub', domain: 'github.com' },
  { name: 'Linear', domain: 'linear.app' },
  { name: 'Zapier', domain: 'zapier.com' },
  { name: 'Node.js', domain: 'nodejs.org' },
  { name: 'TypeScript', domain: 'typescriptlang.org' },
]

export const metadata = {
  title: 'Our Process',
  description:
    'Our development process, powered by our own custom solution. AI-driven audits, a four-day production cycle, and long-term support.',
}

export default function HowItWorksPage() {
  const logos = [...tools, ...tools]

  return (
    <main className='flex-1'>
      {/* Hero */}
      <AnimatedSection className='relative isolate flex min-h-[100svh] max-w-none flex-col items-center justify-end gap-6 overflow-hidden bg-white px-6 pb-16 pt-28 text-center text-ink md:px-8'>
        <div className='relative z-10 flex w-full flex-1 flex-col items-center justify-center gap-6 text-center'>
          <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
            Our Process
          </span>
          <h1 className='max-w-4xl font-headline text-4xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl lg:text-6xl'>
            <span className='block'>Our development process,</span>
            <span className='block'>powered by our custom solution.</span>
          </h1>
          <p className='max-w-xl text-balance text-base text-ink/60 md:text-lg'>
            From AI opportunity audit to a four-day production cycle to
            long-term support — bespoke software at a pace that wasn&apos;t
            possible before.
          </p>
        </div>

        {/* Tools carousel pinned to bottom */}
        <div className='w-full'>
          <p className='mb-4 text-center text-xs font-semibold uppercase tracking-[0.15em] text-ink/40'>
            Best-in-class, vendor-independent
          </p>
          <div className='group relative mx-auto w-full max-w-4xl overflow-hidden'>
            <div className='pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent md:w-32' />
            <div className='pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent md:w-32' />
            <div className='relative border-y border-ink/10'>
              <div className='flex w-max items-stretch [animation:scroll_60s_linear_infinite] group-hover:[animation-play-state:paused]'>
                {logos.map((tool, i) => (
                  <div
                    key={`${tool.name}-${i}`}
                    className='flex h-20 w-40 shrink-0 flex-col items-center justify-center gap-1.5 border-r border-ink/10 bg-white px-4 md:h-24 md:w-52'
                  >
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=64`}
                      alt=''
                      className='h-8 w-8 shrink-0 md:h-10 md:w-10'
                    />
                    <span className='text-[10px] font-semibold uppercase leading-tight text-ink/50 md:text-xs'>
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Four stages */}
      <AnimatedSection className='max-w-none bg-white px-6 py-24 md:py-32'>
        <div className='mx-auto w-full max-w-6xl'>
          <div className='mb-16 max-w-2xl'>
            <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
              The four stages
            </span>
            <h2 className='mt-3 font-headline text-2xl font-semibold uppercase !leading-[.9] text-ink md:text-4xl lg:text-5xl'>
              From audit to long-term support
            </h2>
          </div>

          <div className='flex flex-col gap-8 md:gap-10'>
            {stages.map(stage => (
              <div
                key={stage.number}
                className='flex flex-col gap-3 border-l-2 border-ink/20 pl-8 md:flex-row md:items-start md:gap-12 md:pl-10'
              >
                <div className='flex shrink-0 items-baseline gap-4 md:w-56'>
                  <span className='text-xs font-semibold uppercase tracking-[0.1em] text-ink/40'>
                    {stage.number}
                  </span>
                  <h3 className='font-headline text-xl font-semibold uppercase leading-none text-ink md:text-2xl'>
                    {stage.title}
                  </h3>
                </div>
                <div className='flex flex-col gap-3'>
                  <p className='max-w-2xl text-base leading-relaxed text-ink/70'>
                    {stage.description}
                  </p>
                  {stage.callout && (
                    <p className='max-w-2xl text-sm font-semibold uppercase tracking-[0.05em] text-cyan'>
                      {stage.callout}
                    </p>
                  )}
                  {stage.cycleLink && (
                    <a
                      href='#cycle'
                      className='group inline-flex w-fit items-center text-sm font-semibold uppercase tracking-[0.05em] text-ink transition-colors hover:text-ink/70'
                    >
                      See how the cycle runs
                      <ArrowRight
                        className='ml-1.5 size-4 transition-transform group-hover:translate-x-1'
                        strokeWidth={2}
                      />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 4-day production cycle */}
      <AnimatedSection
        id='cycle'
        className='max-w-none bg-gray-100 px-6 py-24 md:py-32'
      >
        <div className='mx-auto w-full max-w-6xl'>
          <div className='mb-16 max-w-2xl'>
            <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
              Production cycle
            </span>
            <h2 className='mt-3 font-headline text-2xl font-semibold uppercase !leading-[.9] text-ink md:text-4xl lg:text-5xl'>
              The machine is already running
            </h2>
            <p className='mt-4 max-w-xl text-base !leading-snug text-ink/60 md:text-lg'>
              Our 4-day production cycle is a continuous rhythm of human review
              by day and AI build work overnight. We plug your project into the
              loop.
            </p>
          </div>

          <ol className='mx-auto flex max-w-3xl flex-col'>
            {cycle.map((day, i) => (
              <li key={day.label} className='flex flex-col'>
                <div className='bg-white p-6 md:p-8'>
                  <div className='flex items-baseline gap-4'>
                    <span className='text-xs font-semibold uppercase tracking-[0.1em] text-ink/40'>
                      {day.label}
                    </span>
                    <h3 className='font-headline text-lg font-semibold uppercase leading-none text-ink md:text-xl'>
                      {day.title}
                    </h3>
                  </div>
                  <p className='mt-3 text-base text-ink/70'>{day.description}</p>
                </div>
                {day.overnight && (
                  <div className='ml-8 flex items-center gap-2 border-l-2 border-dashed border-ink/30 px-6 py-4'>
                    <span className='text-xs font-semibold uppercase tracking-[0.15em] text-ink/50'>
                      Overnight
                    </span>
                    <span className='text-ink/30'>·</span>
                    <span className='text-xs font-semibold uppercase tracking-[0.05em] text-ink/50'>
                      {day.overnight}
                    </span>
                  </div>
                )}
                {!day.overnight && i === cycle.length - 1 && (
                  <div className='ml-8 flex items-center gap-2 border-l-2 border-dashed border-ink/30 px-6 py-4'>
                    <span className='text-xs font-semibold uppercase tracking-[0.15em] text-ink/50'>
                      Cycle restarts
                    </span>
                    <span className='text-ink/30'>·</span>
                    <span className='text-xs font-semibold uppercase tracking-[0.05em] text-ink/50'>
                      Day 1 with fresh feedback
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ol>

          {/* Built by us, for us callout */}
          <div className='mx-auto mt-16 max-w-4xl bg-ink p-8 text-ink-light md:p-10'>
            <div className='flex flex-col gap-4 md:flex-row md:items-start md:gap-8'>
              <span className='text-sm font-semibold uppercase tracking-[0.1em] text-cyan md:w-48 md:shrink-0'>
                Built by us, for us
              </span>
              <div className='flex flex-col gap-3'>
                <h3 className='font-headline text-xl font-semibold uppercase leading-tight text-white md:text-2xl'>
                  We don&apos;t just sell bespoke. We use it.
                </h3>
                <p className='text-base text-white/70 md:text-lg'>
                  This entire production rhythm runs on a bespoke internal
                  platform we built ourselves — the same caliber of work we
                  ship for clients. It&apos;s the proof of capability behind
                  every recommendation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Feedback loop */}
      <AnimatedSection className='max-w-none bg-white px-6 py-24 md:py-32'>
        <div className='mx-auto w-full max-w-6xl'>
          <div className='mb-16 max-w-2xl'>
            <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
              How we move fast together
            </span>
            <h2 className='mt-3 font-headline text-2xl font-semibold uppercase !leading-[.9] text-ink md:text-4xl lg:text-5xl'>
              Single-digit-day delivery, when we move together
            </h2>
            <p className='mt-4 max-w-xl text-base !leading-snug text-ink/60 md:text-lg'>
              New app ideas can ship in single-digit days — but only when the
              loop is closed. Here&apos;s the deal.
            </p>
          </div>

          <div className='grid gap-4 md:grid-cols-2'>
            <div className='bg-gray-100 p-8'>
              <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/40'>
                Your part
              </span>
              <h3 className='mt-3 font-headline text-xl font-semibold uppercase leading-tight text-ink md:text-2xl'>
                Funded blocks. Timely feedback.
              </h3>
              <p className='mt-3 text-base text-ink/70'>
                Keep your hour blocks topped up so the team isn&apos;t waiting.
                Respond to update emails on Day 2 and Day 4 so the next cycle
                doesn&apos;t stall on your end.
              </p>
            </div>
            <div className='bg-gray-100 p-8'>
              <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/40'>
                Our part
              </span>
              <h3 className='mt-3 font-headline text-xl font-semibold uppercase leading-tight text-ink md:text-2xl'>
                Show up every cycle. Ship every cycle.
              </h3>
              <p className='mt-3 text-base text-ink/70'>
                We hold the cadence. Two passes a week, every week — review,
                build, review, ship. Your project is one of many on the
                rhythm, and we plan capacity to keep it that way.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Long-term support */}
      <AnimatedSection className='max-w-none bg-gray-100 px-6 py-24 md:py-32'>
        <div className='mx-auto w-full max-w-6xl'>
          <div className='mb-12 max-w-2xl'>
            <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
              Long-term support
            </span>
            <h2 className='mt-3 font-headline text-2xl font-semibold uppercase !leading-[.9] text-ink md:text-4xl lg:text-5xl'>
              We don&apos;t disappear after launch
            </h2>
            <p className='mt-4 max-w-xl text-base !leading-snug text-ink/60 md:text-lg'>
              Once your app is stable, it enters our long-term support tier.
              Same team, same Portal, same flat-rate blocks.
            </p>
          </div>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            {support.map(item => (
              <div key={item.title} className='bg-white p-6'>
                <h3 className='font-headline text-lg font-semibold uppercase leading-tight text-ink'>
                  {item.title}
                </h3>
                <p className='mt-2 text-base text-ink/75'>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Pricing model */}
      <AnimatedSection className='max-w-none bg-white px-6 py-24 md:py-32'>
        <div className='mx-auto w-full max-w-6xl'>
          <div className='grid gap-12 md:grid-cols-2 md:items-start md:gap-16'>
            <div className='flex flex-col gap-6'>
              <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
                Pricing model
              </span>
              <h2 className='font-headline text-2xl font-semibold uppercase !leading-[.9] text-ink md:text-4xl lg:text-5xl'>
                Funded blocks keep you on the rhythm
              </h2>
              <p className='text-base text-ink/60 md:text-lg'>
                We bill in flat-rate hour blocks instead of project quotes or
                hourly time sheets. Topped-up blocks are what guarantee your
                project a seat in every 4-day cycle.
              </p>
              <Link
                href='/contact'
                className='group mt-2 inline-flex w-fit items-center border border-ink/30 text-sm uppercase tracking-[0.1em] text-ink transition-colors duration-300 hover:bg-ink hover:text-white'
              >
                <span className='px-4 py-3 font-semibold transition-transform duration-300 group-hover:translate-x-1'>
                  Book a call
                </span>
                <span className='flex items-center justify-center self-stretch border-l border-ink/30 px-3 transition-colors duration-300 group-hover:border-cyan group-hover:bg-cyan'>
                  <ArrowRight
                    className='size-4 transition-all delay-75 duration-200 group-hover:translate-x-1 group-hover:text-ink'
                    strokeWidth={2}
                  />
                </span>
              </Link>
            </div>

            <div className='flex flex-col gap-4'>
              <div className='bg-gray-100 p-6'>
                <h3 className='font-headline text-lg font-semibold uppercase leading-tight text-ink'>
                  Flat-rate blocks
                </h3>
                <p className='mt-2 text-base text-ink/75'>
                  No mystery hourly rates and no fixed-bid surprises. You buy
                  blocks at a known price and decide when to use them.
                </p>
              </div>
              <div className='bg-gray-100 p-6'>
                <h3 className='font-headline text-lg font-semibold uppercase leading-tight text-ink'>
                  Unused time never expires
                </h3>
                <p className='mt-2 text-base text-ink/75'>
                  Need to pause for a quarter? No pressure. Whatever blocks you
                  haven&apos;t used will be waiting when you come back.
                </p>
              </div>
              <div className='bg-gray-100 p-6'>
                <h3 className='font-headline text-lg font-semibold uppercase leading-tight text-ink'>
                  Your own Portal
                </h3>
                <p className='mt-2 text-base text-ink/75'>
                  Track progress, approve builds, leave feedback, and top up
                  blocks — all in a private workspace built for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Final CTA */}
      <AnimatedSection className='flex min-h-[100svh] max-w-none flex-col items-center justify-center gap-8 bg-white px-6'>
        <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
          Like how we think?
        </span>
        <h2 className='max-w-3xl text-balance text-center font-headline text-2xl font-semibold uppercase !leading-[.9] text-ink md:text-4xl lg:text-5xl'>
          Let&apos;s talk about your next project
        </h2>
        <p className='max-w-xl text-balance text-center text-base text-ink/60 md:text-lg'>
          Send a message or book a call directly to our calendars. We respond
          within one business day.
        </p>
        <Link
          href='/contact'
          className='group mt-2 inline-flex items-center border border-ink/30 text-sm uppercase tracking-[0.1em] text-ink transition-colors duration-300 hover:bg-ink hover:text-white'
        >
          <span className='px-4 py-3 font-semibold transition-transform duration-300 group-hover:translate-x-1'>
            Book a call
          </span>
          <span className='flex items-center justify-center self-stretch border-l border-ink/30 px-3 transition-colors duration-300 group-hover:border-cyan group-hover:bg-cyan'>
            <ArrowRight
              className='size-4 transition-all delay-75 duration-200 group-hover:translate-x-1 group-hover:text-ink'
              strokeWidth={2}
            />
          </span>
        </Link>
        <p className='mt-4 text-sm text-ink/50'>
          Not ready yet?{' '}
          <Link href='/faq' className='underline transition-colors hover:text-ink'>
            Read the FAQ
          </Link>
        </p>
      </AnimatedSection>
    </main>
  )
}
