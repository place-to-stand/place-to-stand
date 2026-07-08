import type { CSSProperties } from 'react'
import Link from 'next/link'
import { AnimatedSection, Reveal } from '@/src/components/layout/animated-section'
import { services } from '@/src/lib/services'
import { serviceIcons } from '@/src/lib/service-icons'

export function ServicesPreview() {
  return (
    <AnimatedSection className='py-20'>
      <div className='grid gap-grid-3 md:grid-cols-[1fr_1.2fr]'>
        {/* Left: heading (sticky) */}
        <div className='flex flex-col gap-4 md:sticky md:top-32 md:self-start'>
          <Reveal index={0} className='flex flex-col gap-4'>
            <span className='bp-label font-mono'>Services</span>
            <h2 className='font-headline text-3xl font-bold leading-[0.95] tracking-tight text-text md:text-4xl'>
              What we build
            </h2>
          </Reveal>
          <Reveal index={1} className='text-md leading-relaxed text-text-muted'>
            <p>End-to-end capabilities, from strategy to deployment.</p>
          </Reveal>
          <Reveal index={2}>
            <Link
              href='/services'
              className='mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:text-accent/80'
            >
              View all services
              <span aria-hidden>&rarr;</span>
            </Link>
          </Reveal>
        </div>

        {/* Right: service list */}
        <Reveal index={2} className='flex flex-col border border-border'>
          {services.map((service, i) => {
            const Icon = serviceIcons[service.icon]
            return (
            <div
              key={service.slug}
              className='flex items-start gap-4 border-b border-border bg-bg-card p-5 last:border-b-0 md:px-6 md:py-6'
            >
              {Icon && (
                <Icon
                  className='service-icon mt-0.5 h-5 w-5 shrink-0 text-accent'
                  style={{ '--icon-delay': `${i * 0.9}s` } as CSSProperties}
                  aria-hidden
                />
              )}
              <div className='flex flex-col gap-1'>
                <h3 className='font-headline text-lg font-semibold tracking-tight text-text'>
                  {service.title}
                </h3>
                <p className='text-sm text-text-muted'>{service.tagline}</p>
              </div>
            </div>
            )
          })}
        </Reveal>
      </div>
    </AnimatedSection>
  )
}
