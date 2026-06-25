import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { services } from '@/src/lib/services'

export const metadata: Metadata = {
  title: 'Services',
  description: 'AI automation, software development, workflow systems, and strategic advisory services from Place To Stand.',
}

export default function ServicesPage() {
  return (
    <main className='flex-1 pt-28'>
      <AnimatedSection className='flex flex-col gap-12'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <span className='font-mono text-xs uppercase tracking-[0.2em] text-accent'>
            Services
          </span>
          <h1 className='max-w-4xl text-balance font-headline text-4xl font-semibold uppercase !leading-[.9] text-text md:text-6xl'>
            What we build
          </h1>
          <p className='max-w-2xl text-balance text-base text-text-muted md:text-lg'>
            End-to-end capabilities from strategy to deployment. One builder + AI workflows replaces the traditional agency structure.
          </p>
        </div>
        <div className='grid gap-6 md:grid-cols-2'>
          {services.map(service => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}` as any}
              className='group flex flex-col gap-4 rounded-xl border border-border bg-bg-card p-8 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(181,245,66,0.05)]'
            >
              <span className='font-mono text-xs text-accent'>{service.icon}</span>
              <h2 className='font-headline text-2xl uppercase text-text transition-colors group-hover:text-accent'>
                {service.title}
              </h2>
              <p className='text-sm text-text-muted'>{service.tagline}</p>
              <p className='text-sm leading-relaxed text-text-muted/80'>{service.description}</p>
              <span className='mt-auto inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-accent'>
                Learn more <span aria-hidden>&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </AnimatedSection>
    </main>
  )
}
