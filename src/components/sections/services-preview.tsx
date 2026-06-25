import Link from 'next/link'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { services } from '@/src/lib/services'

export function ServicesPreview() {
  return (
    <AnimatedSection className='max-w-7xl lg:px-10'>
      <div className='grid gap-16 md:grid-cols-[1.2fr_1fr]'>
        {/* Left: service list */}
        <div className='flex flex-col'>
          {services.map((service, i) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}` as '/services/ai-automation'}
              className={`group flex items-start justify-between gap-6 py-6 transition-colors ${i < services.length - 1 ? 'border-b border-border' : ''}`}
            >
              <div className='flex flex-col gap-1'>
                <h3 className='font-headline text-lg font-semibold tracking-tight text-text transition-colors group-hover:text-accent'>
                  {service.title}
                </h3>
                <p className='text-sm text-text-muted'>{service.tagline}</p>
              </div>
              <span
                className='mt-1 shrink-0 font-mono text-xs text-text-muted transition-colors group-hover:text-accent'
                aria-hidden
              >
                &rarr;
              </span>
            </Link>
          ))}
        </div>

        {/* Right: heading (sticky) */}
        <div className='flex flex-col gap-4 md:sticky md:top-32 md:self-start md:text-right'>
          <span className='font-mono text-[11px] uppercase tracking-[0.2em] text-accent'>
            Services
          </span>
          <h2 className='font-headline text-4xl font-bold leading-[0.95] tracking-tight text-text md:text-5xl'>
            What we
            <br />
            build
          </h2>
          <p className='text-sm leading-relaxed text-text-muted'>
            End-to-end capabilities, from strategy to deployment.
          </p>
          <Link
            href='/services'
            className='mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:text-accent/80 md:justify-end'
          >
            View all services
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  )
}
