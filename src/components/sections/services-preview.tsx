import type { CSSProperties } from 'react'
import Link from 'next/link'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { services } from '@/src/lib/services'
import { serviceIcons } from '@/src/lib/service-icons'

export function ServicesPreview() {
  return (
    <AnimatedSection className='py-16 md:py-32'>
      <div className='grid gap-grid-3 md:grid-cols-[1fr_1.2fr]'>
        {/* Left: heading (sticky) */}
        <div className='flex flex-col gap-4 md:sticky md:top-32 md:self-start'>
          <span className='bp-label font-mono'>Services</span>
          <h2 className='font-headline text-3xl font-bold leading-[0.95] tracking-tight text-text md:text-4xl'>
            What we build
          </h2>
          <p className='text-md leading-relaxed text-text-muted'>
            End-to-end capabilities, from strategy to deployment.
          </p>
          <Link
            href='/services'
            className='mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:text-accent/80'
          >
            View all services
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>

        {/* Right: service list */}
        <div className='flex flex-col border border-border'>
          {services.map((service, i) => {
            const Icon = serviceIcons[service.icon]
            return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}` as '/services/ai-automation'}
              className='group flex items-start justify-between gap-6 border-b border-border bg-bg-card px-6 py-6 transition-colors last:border-b-0 hover:bg-bg-elevated'
            >
              <div className='flex items-start gap-4'>
                {Icon && (
                  <Icon
                    className='service-icon mt-0.5 h-5 w-5 shrink-0 text-accent'
                    style={{ '--icon-delay': `${i * 0.9}s` } as CSSProperties}
                    aria-hidden
                  />
                )}
                <div className='flex flex-col gap-1'>
                  <h3 className='font-headline text-lg font-semibold tracking-tight text-text transition-colors group-hover:text-accent'>
                    {service.title}
                  </h3>
                  <p className='text-sm text-text-muted'>{service.tagline}</p>
                </div>
              </div>
              <span
                className='mt-1 shrink-0 font-mono text-xs text-text-muted transition-colors group-hover:text-accent'
                aria-hidden
              >
                &rarr;
              </span>
            </Link>
            )
          })}
        </div>
      </div>
    </AnimatedSection>
  )
}
