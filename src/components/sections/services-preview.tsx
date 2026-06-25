import Link from 'next/link'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { services } from '@/src/lib/services'

export function ServicesPreview() {
  return (
    <AnimatedSection className='flex flex-col gap-12'>
      <div className='flex flex-col items-center gap-4 text-center'>
        <span className='font-mono text-xs uppercase tracking-[0.2em] text-accent'>
          Services
        </span>
        <h2 className='max-w-4xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-text md:text-5xl'>
          What we build
        </h2>
        <p className='max-w-xl text-balance text-base text-text-muted'>
          End-to-end capabilities, from strategy to deployment.
        </p>
      </div>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {services.map(service => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}` as '/services/ai-automation'}
            className='group flex flex-col gap-3 rounded-xl border border-border bg-bg-card p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(181,245,66,0.05)]'
          >
            <span className='font-mono text-xs text-accent'>{service.icon}</span>
            <h3 className='font-headline text-xl uppercase text-text transition-colors group-hover:text-accent'>
              {service.title}
            </h3>
            <p className='text-sm leading-relaxed text-text-muted'>{service.tagline}</p>
          </Link>
        ))}
      </div>
      <div className='text-center'>
        <Link
          href='/services'
          className='inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-accent transition-colors hover:text-accent/80'
        >
          View all services
          <span aria-hidden>&rarr;</span>
        </Link>
      </div>
    </AnimatedSection>
  )
}
