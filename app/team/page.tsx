import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { TeamGrid } from '@/src/components/sections/team-grid'
import { LatestInsights } from '@/src/components/sections/latest-insights'
import { getLatestPosts } from '@/src/lib/blog'

const principles = [
  {
    number: '01',
    title: 'Direct access',
    description:
      'You talk to the people building your project. No layered account managers, no message-relay tax. The first call is with the same engineers writing the code.',
  },
  {
    number: '02',
    title: 'Small and senior',
    description:
      'A tight group of senior builders rather than a wide pyramid of juniors. Less coordination overhead, fewer hand-off failures, more decisions made the right way the first time.',
  },
  {
    number: '03',
    title: 'Builder-led, owner-grade',
    description:
      'Engineers and designers own the work end to end — discovery, build, ship, and the boring-but-critical maintenance after. Nothing gets thrown over a wall internally either.',
  },
]

export const metadata = {
  title: 'About — Team',
  description:
    'Behind Place To Stand is a small group of senior engineers and designers who genuinely enjoy building with people as much as with technology.',
}

export default function TeamPage() {
  const latestPosts = getLatestPosts(3)

  return (
    <main className='flex-1'>
      {/* Hero — sized to let the next section peek above the fold */}
      <AnimatedSection className='relative isolate flex min-h-[80svh] max-w-none flex-col items-center justify-center gap-6 overflow-hidden bg-white px-6 pb-16 pt-28 text-center text-ink md:px-8'>
        <div className='relative z-10 flex w-full max-w-4xl flex-col items-center gap-6 text-center'>
          <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
            Our story
          </span>
          <h1 className='font-headline text-4xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl lg:text-6xl'>
            <span className='block'>Senior builders.</span>
            <span className='block'>No layers in between.</span>
          </h1>
          <p className='max-w-xl text-balance text-base text-ink/60 md:text-lg'>
            A small group of engineers and designers who do the work
            ourselves — from the first call to long-term support.
          </p>
        </div>
      </AnimatedSection>

      {/* Origin story */}
      <AnimatedSection className='max-w-none bg-white px-6 py-20 md:py-28'>
        <div className='mx-auto w-full max-w-3xl'>
          <div className='mb-10 flex flex-col gap-3'>
            <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
              The origin of Place To Stand
            </span>
            <h2 className='font-headline text-2xl font-semibold uppercase !leading-[.95] text-ink md:text-3xl lg:text-4xl'>
              A lever, a place to stand, and the will to move the world.
            </h2>
          </div>

          <div className='flex flex-col gap-6 text-base !leading-relaxed text-ink/80 md:text-lg'>
            <p>
              The company takes its name from Archimedes — give me a lever long
              enough and a place to stand, and I will move the world. That is
              the work in one line. The lever is bespoke software, applied AI,
              and good operating systems. The place to stand is whatever your
              business already is. Our job is to build the lever and put it
              under you.
            </p>
            <p>
              We started Place To Stand because most small and mid-sized
              businesses get the worst end of every technology contract.
              Enterprise vendors over-charge. Cheap vendors over-promise.
              In-house hiring takes a year you do not have. We thought there
              was a third option: a small senior team that ships fast, charges
              fairly, and stays after launch.
            </p>
            <p>
              Three years in, that is still the work. The team is small on
              purpose. The blocks are flat-rate on purpose. The clients we like
              best are the ones who want to ship and have a real problem worth
              solving.
            </p>
          </div>

          <blockquote className='mt-10 border-l-2 border-cyan pl-6 font-headline text-xl uppercase !leading-snug text-ink md:text-2xl'>
            Give us a lever long enough and a place to stand, and we will help
            you move what matters.
          </blockquote>
        </div>
      </AnimatedSection>

      {/* Our team — numbered cards */}
      <AnimatedSection className='max-w-none px-6 py-20 md:py-28'>
        <div className='mx-auto mb-10 w-full max-w-6xl'>
          <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
            Our team
          </span>
          <h2 className='mt-3 font-headline text-2xl font-semibold uppercase !leading-[.9] text-ink md:text-4xl lg:text-5xl'>
            The people you will actually work with
          </h2>
          <p className='mt-4 max-w-2xl text-base text-ink/60 md:text-lg'>
            Three senior builders. Clear ownership across engineering, AI, and
            product. The same people who scope the work are the ones writing
            the code and answering your emails.
          </p>
        </div>

        <TeamGrid numbered />
      </AnimatedSection>

      {/* How we work */}
      <AnimatedSection className='max-w-none bg-white px-6 py-20 md:py-28'>
        <div className='mx-auto w-full max-w-6xl'>
          <div className='mb-12 max-w-2xl'>
            <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
              How we work together
            </span>
            <h2 className='mt-3 font-headline text-2xl font-semibold uppercase !leading-[.9] text-ink md:text-4xl lg:text-5xl'>
              Three principles that shape the team
            </h2>
          </div>

          <div className='grid gap-8 md:grid-cols-3 md:gap-10'>
            {principles.map(item => (
              <div
                key={item.number}
                className='flex flex-col gap-3 border-t-2 border-ink/15 pt-6'
              >
                <span className='text-xs font-semibold uppercase tracking-[0.1em] text-ink/40'>
                  {item.number}
                </span>
                <h3 className='font-headline text-xl font-semibold uppercase leading-tight text-ink md:text-2xl'>
                  {item.title}
                </h3>
                <p className='text-base leading-relaxed text-ink/70'>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Latest insights */}
      {latestPosts.length > 0 && (
        <AnimatedSection className='max-w-none bg-gray-100 px-6 py-20 md:py-24'>
          <LatestInsights
            posts={latestPosts}
            description='Notes from the build — process, AI in practice, and the occasional engineering deep-dive.'
          />
        </AnimatedSection>
      )}

      {/* Final CTA */}
      <AnimatedSection className='flex min-h-[55svh] max-w-none flex-col items-center justify-center gap-6 bg-cyan px-6 text-center'>
        <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/70'>
          Want to work with us?
        </span>
        <h2 className='max-w-3xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl'>
          The opportunities are here. So why wait?
        </h2>
        <p className='max-w-xl text-balance text-base text-ink/80 md:text-lg'>
          We are always happy to discuss your challenge. Tell us what you are
          trying to build and we will figure out the right next step together.
        </p>
        <Link
          href='/book-a-call'
          className='group mt-2 inline-flex items-center border border-ink/30 bg-white text-sm uppercase tracking-[0.1em] text-ink no-underline transition-colors duration-300 hover:bg-ink hover:text-white'
        >
          <span className='px-4 py-3 font-semibold transition-transform duration-300 group-hover:translate-x-1'>
            Book a call
          </span>
          <span className='flex items-center justify-center self-stretch border-l border-ink/30 px-3 transition-colors duration-300 group-hover:border-white/30'>
            <ArrowRight
              className='size-4 transition-all delay-75 duration-200 group-hover:translate-x-1'
              strokeWidth={2}
            />
          </span>
        </Link>
      </AnimatedSection>
    </main>
  )
}
