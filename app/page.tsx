import Link from 'next/link'
import { ArrowRight, ScanSearch, Blocks, Workflow, Rocket } from 'lucide-react'
import { HeroSection } from '@/src/components/sections/hero-section'
import { AnimatedSection } from '@/src/components/layout/animated-section'

export default function HomePage() {
  return (
    <main className='flex-1'>
      <HeroSection />

      {/* Problem Statement */}
      <AnimatedSection
        className='flex min-h-[100svh] max-w-none items-center justify-center bg-white px-6'
      >
        <div className='mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-2 md:items-center md:gap-16'>
          <div className='flex flex-col gap-6'>
            <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
              Sound familiar?
            </span>
            <h2 className='font-headline text-2xl font-semibold uppercase !leading-[.9] text-ink md:text-4xl lg:text-5xl'>
              You know AI could help. You just don&apos;t know where to start.
            </h2>
            <p className='text-base font-semibold text-ink md:text-lg'>
              We start with an AI opportunity audit to find what actually moves the needle — sometimes
              that&apos;s a custom build, sometimes it&apos;s off-the-shelf software. Not everything needs AI,
              and not everything needs to be bespoke.
            </p>
            <Link
              href='/contact'
              className='group mt-2 inline-flex w-fit items-center border border-ink/30 text-sm uppercase tracking-[0.1em] text-ink transition-colors duration-300 hover:bg-ink hover:text-white'
            >
              <span className='px-4 py-3 font-semibold transition-transform duration-300 group-hover:translate-x-1'>
                Start your audit
              </span>
              <span className='flex items-center justify-center self-stretch border-l border-ink/30 px-3 transition-colors duration-300 group-hover:border-cyan group-hover:bg-cyan'>
                <ArrowRight className='size-4 transition-all delay-75 duration-200 group-hover:translate-x-1 group-hover:text-ink' strokeWidth={2} />
              </span>
            </Link>
          </div>
          <div className='flex flex-col gap-4'>
            <div className='bg-gray-100 p-6'>
              <h3 className='font-headline text-lg font-semibold uppercase leading-tight text-ink'>
                Drowning in manual work
              </h3>
              <p className='mt-2 text-base text-ink/75'>
                Your team spends hours on repetitive tasks that should be automated — data entry,
                status updates, report generation. It&apos;s expensive and it doesn&apos;t scale.
              </p>
            </div>
            <div className='bg-gray-100 p-6'>
              <h3 className='font-headline text-lg font-semibold uppercase leading-tight text-ink'>
                AI hype, no clarity
              </h3>
              <p className='mt-2 text-base text-ink/75'>
                You&apos;ve seen the demos and the pitch decks. But nothing maps to your actual
                workflows, and no one can tell you where AI will create real ROI in your business.
              </p>
            </div>
            <div className='bg-gray-100 p-6'>
              <h3 className='font-headline text-lg font-semibold uppercase leading-tight text-ink'>
                Vendors who don&apos;t get it
              </h3>
              <p className='mt-2 text-base text-ink/75'>
                Every agency promises transformation, but they ship cookie-cutter solutions
                that don&apos;t fit your operations. You need a partner who understands your business first.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Services */}
      <AnimatedSection
        className='max-w-none bg-white px-6 py-24 md:py-32'
      >
        <div className='mx-auto w-full max-w-6xl'>
          <div className='mb-16 max-w-2xl'>
            <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
              What we do
            </span>
            <h2 className='mt-3 font-headline text-2xl font-semibold uppercase !leading-[.9] text-ink md:text-4xl lg:text-5xl'>
              End-to-end, not piecemeal
            </h2>
          </div>

          <div className='grid gap-4 md:grid-cols-2'>
            <div className='group flex flex-col gap-4 bg-gray-100 p-8 transition-colors duration-300 hover:border-white/30 md:col-span-2'>
              <ScanSearch className='size-6 text-ink/40' strokeWidth={1.5} />
              <h3 className='font-headline text-xl font-semibold uppercase leading-tight text-ink md:text-2xl'>
                AI Opportunity Audit
              </h3>
              <p className='max-w-2xl text-base leading-relaxed text-ink/75'>
                We analyze your operations, workflows, and data to find where technology creates
                real leverage. The result is a clear, prioritized roadmap — sometimes AI, sometimes
                off-the-shelf tools, always the right fit for your business.
              </p>
            </div>

            <div className='group flex flex-col gap-4 bg-gray-100 p-8 transition-colors duration-300 hover:border-white/30'>
              <Blocks className='size-6 text-ink/40' strokeWidth={1.5} />
              <h3 className='font-headline text-xl font-semibold uppercase leading-tight text-ink md:text-2xl'>
                Bespoke Enterprise Apps
              </h3>
              <p className='text-base leading-relaxed text-ink/75'>
                Custom-built applications tailored to your exact business needs — without the
                enterprise price tag. We design, build, and ship production-ready software
                that scales with you.
              </p>
            </div>

            <div className='group flex flex-col gap-4 bg-gray-100 p-8 transition-colors duration-300 hover:border-white/30'>
              <Workflow className='size-6 text-ink/40' strokeWidth={1.5} />
              <h3 className='font-headline text-xl font-semibold uppercase leading-tight text-ink md:text-2xl'>
                Business Process Refinement
              </h3>
              <p className='text-base leading-relaxed text-ink/75'>
                We map your existing processes, identify bottlenecks, and rebuild them with
                modern tooling and automation. Less manual work, fewer errors, more time
                for what matters.
              </p>
            </div>

            <div className='group flex flex-col gap-4 bg-gray-100 p-8 transition-colors duration-300 hover:border-white/30'>
              <Rocket className='size-6 text-ink/40' strokeWidth={1.5} />
              <h3 className='font-headline text-xl font-semibold uppercase leading-tight text-ink md:text-2xl'>
                Rapid Prototyping
              </h3>
              <p className='text-base leading-relaxed text-ink/75'>
                Got an idea but no code? We take new concepts from napkin sketch to functional
                prototype fast — so you can validate, pitch, or launch before the window closes.
              </p>
            </div>
          </div>

          <div className='mt-12'>
            <Link
              href='/services'
              className='group inline-flex items-center border border-ink/30 text-sm uppercase tracking-[0.1em] text-ink transition-colors duration-300 hover:bg-ink hover:text-white'
            >
              <span className='px-4 py-3 font-semibold transition-transform duration-300 group-hover:translate-x-1'>
                All services
              </span>
              <span className='flex items-center justify-center self-stretch border-l border-ink/30 px-3 transition-colors duration-300 group-hover:border-cyan group-hover:bg-cyan'>
                <ArrowRight className='size-4 transition-all delay-75 duration-200 group-hover:translate-x-1 group-hover:text-ink' strokeWidth={2} />
              </span>
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* How It Works */}
      <AnimatedSection
        id='how-it-works'
        className='max-w-none bg-white px-6 py-24 md:py-32'
      >
        <div className='mx-auto w-full max-w-6xl'>
          <div className='grid gap-12 md:grid-cols-3 md:gap-16'>
            <div className='flex flex-col gap-6 md:col-span-1'>
              <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
                Our Process
              </span>
              <h2 className='font-headline text-2xl font-semibold uppercase !leading-[.9] text-ink md:text-4xl'>
                Dead-simple process. Zero surprises.
              </h2>
              <p className='text-base text-ink/60 md:text-lg'>
                Flat-rate blocks, your own Portal, and a team that ships.
                Unused time never expires.
              </p>
              <Link
                href='/how-it-works'
                className='group mt-2 inline-flex w-fit items-center border border-ink/30 text-sm uppercase tracking-[0.1em] text-ink transition-colors duration-300 hover:bg-ink hover:text-white'
              >
                <span className='px-4 py-3 font-semibold transition-transform duration-300 group-hover:translate-x-1'>
                  See our process
                </span>
                <span className='flex items-center justify-center self-stretch border-l border-ink/30 px-3 transition-colors duration-300 group-hover:border-cyan group-hover:bg-cyan'>
                  <ArrowRight className='size-4 transition-all delay-75 duration-200 group-hover:translate-x-1 group-hover:text-ink' strokeWidth={2} />
                </span>
              </Link>
            </div>

            <div className='flex flex-col gap-8 md:col-span-2'>
              <div className='flex flex-col gap-3 border-l-2 border-ink/20 pl-8'>
                <span className='text-xs font-semibold uppercase tracking-[0.1em] text-ink/40'>01</span>
                <h3 className='font-headline text-xl font-semibold uppercase leading-none text-ink md:text-2xl'>
                  Discover
                </h3>
                <p className='text-base text-ink/60 md:text-lg'>
                  What&apos;s holding your business back? We audit your workflows, identify
                  the highest-impact opportunities, and propose a custom solution.
                </p>
              </div>

              <div className='flex flex-col gap-3 border-l-2 border-ink/20 pl-8'>
                <span className='text-xs font-semibold uppercase tracking-[0.1em] text-ink/40'>02</span>
                <h3 className='font-headline text-xl font-semibold uppercase leading-none text-ink md:text-2xl'>
                  Build
                </h3>
                <p className='text-base text-ink/60 md:text-lg'>
                  Buy flat-rate blocks, track progress and approve builds in your
                  task tracking Portal. No surprises, no scope creep.
                </p>
              </div>

              <div className='flex flex-col gap-3 border-l-2 border-ink/20 pl-8'>
                <span className='text-xs font-semibold uppercase tracking-[0.1em] text-ink/40'>03</span>
                <h3 className='font-headline text-xl font-semibold uppercase leading-none text-ink md:text-2xl'>
                  Iterate
                </h3>
                <p className='text-base text-ink/60 md:text-lg'>
                  Refine and adapt your unique system. Unused blocks never expire.
                  Top up with one click inside your Portal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Get Started */}
      <AnimatedSection
        className='flex min-h-[100svh] max-w-none flex-col items-center justify-center gap-8 bg-white px-6'
      >
        <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
          Ready to start?
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
            <ArrowRight className='size-4 transition-all delay-75 duration-200 group-hover:translate-x-1 group-hover:text-ink' strokeWidth={2} />
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
