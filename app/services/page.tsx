import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AnimatedSection } from '@/src/components/layout/animated-section'

const services = [
  {
    number: '01',
    title: 'Bespoke Enterprise Apps',
    subtitle: 'Priced for SMBs',
    description:
      'Custom-built applications tailored to your exact business needs — without the enterprise price tag. We design, build, and ship production-ready software that scales with you.',
  },
  {
    number: '02',
    title: 'AI Opportunity Audit',
    subtitle: 'Find where AI fits',
    description:
      'We analyze your operations, workflows, and data to identify the highest-impact opportunities for AI. You get a clear, prioritized roadmap — not a slide deck full of buzzwords.',
  },
  {
    number: '03',
    title: 'Fast Production Cycles',
    subtitle: 'AI-powered delivery',
    description:
      'We leverage AI across our entire development workflow to ship faster without cutting corners. Weeks, not months. Real product, not prototypes that never launch.',
  },
  {
    number: '04',
    title: 'Business Process Refinement',
    subtitle: 'Streamline what matters',
    description:
      'We map your existing processes, identify bottlenecks, and rebuild them with modern tooling and automation. Less manual work, fewer errors, more time for what matters.',
  },
  {
    number: '05',
    title: 'Greenfield Rapid Prototyping',
    subtitle: 'From zero to working product',
    description:
      'Got an idea but no code? We take new concepts from napkin sketch to functional prototype fast — so you can validate, pitch, or launch before the window closes.',
  },
]

export default function ServicesPage() {
  return (
    <main className='flex-1'>
      {/* Hero — Our Process pattern, sized so next section peeks above fold */}
      <AnimatedSection className='relative isolate flex min-h-[80svh] max-w-none flex-col items-center justify-center gap-6 overflow-hidden bg-white px-6 pb-16 pt-28 text-center text-ink md:px-8'>
        <div className='relative z-10 flex w-full max-w-4xl flex-col items-center gap-6 text-center'>
          <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
            Services
          </span>
          <h1 className='font-headline text-4xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl lg:text-6xl'>
            <span className='block'>End-to-end builds,</span>
            <span className='block'>for serious teams.</span>
          </h1>
          <p className='max-w-xl text-balance text-base text-ink/60 md:text-lg'>
            Bespoke software, applied AI, and operating systems for businesses
            that need to move fast and build right.
          </p>
        </div>
      </AnimatedSection>

      {/* Services list */}
      <section className='mx-auto w-full max-w-5xl px-6 py-16 md:py-24'>
        <div className='flex flex-col'>
          {services.map((service, i) => (
            <div
              key={service.number}
              className='group flex flex-col gap-4 border-t border-ink/15 py-10 md:flex-row md:items-start md:gap-12 md:py-14'
            >
              <div className='flex shrink-0 items-baseline gap-4 md:w-48'>
                <span className='text-xs font-semibold uppercase tracking-[0.1em] text-ink/40'>
                  {service.number}
                </span>
                <h2 className='font-headline text-xl font-semibold uppercase leading-tight text-ink md:text-2xl'>
                  {service.title}
                </h2>
              </div>
              <div className='flex flex-1 flex-col gap-2'>
                <p className='text-sm font-semibold uppercase tracking-[0.05em] text-cyan'>
                  {service.subtitle}
                </p>
                <p className='max-w-xl text-base leading-relaxed text-ink/70'>
                  {service.description}
                </p>
              </div>
            </div>
          ))}
          <div className='border-t border-ink/15' />
        </div>
      </section>

      {/* CTA */}
      <section className='flex flex-col items-center gap-8 px-6 py-20 text-center md:py-28'>
        <h2 className='max-w-3xl font-headline text-2xl font-semibold uppercase !leading-[.9] text-ink md:text-4xl'>
          Ready to get started?
        </h2>
        <Link
          href='/contact'
          className='group inline-flex items-center bg-ink text-sm uppercase tracking-[0.1em] text-white'
        >
          <span className='px-4 py-3 font-semibold transition-transform duration-300 group-hover:translate-x-1'>
            Book a call
          </span>
          <span className='flex items-center justify-center self-stretch bg-cyan px-3'>
            <ArrowRight
              className='size-4 text-ink transition-all delay-75 duration-200 group-hover:translate-x-1'
              strokeWidth={2}
            />
          </span>
        </Link>
      </section>
    </main>
  )
}
