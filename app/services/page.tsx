import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { services } from '@/src/lib/services'
import { serviceIcons } from '@/src/lib/service-icons'

export const metadata: Metadata = {
  title: 'Services',
  description: 'AI automation, software development, workflow systems, and strategic advisory services from Place To Stand.',
}

export default function ServicesPage() {
  return (
    <main className='flex-1 pt-grid-4'>
      <AnimatedSection className='flex flex-col gap-12'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <span className='bp-label font-mono'>Services</span>
          <h1 className='max-w-4xl text-balance font-headline text-4xl font-semibold uppercase !leading-[.9] text-text md:text-6xl'>
            What we build
          </h1>
          <p className='max-w-2xl text-balance text-base text-text-muted md:text-lg'>
            End-to-end capabilities from strategy to deployment. One builder + AI workflows replaces the traditional agency structure.
          </p>
        </div>
        <div className='grid gap-6 md:grid-cols-2'>
          {services.map((service, i) => {
            const Icon = serviceIcons[service.icon]
            return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}` as any}
              className='group relative flex flex-col gap-4 border border-border bg-bg-card p-8 transition-colors duration-300 hover:border-accent/40'
            >
              <BlueprintCorners />
              <div className='flex items-center gap-3'>
                <span className='inline-flex h-6 w-6 items-center justify-center border border-accent/30 font-mono text-[9px] text-accent'>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {Icon && <Icon className='h-5 w-5 text-accent' aria-hidden />}
              </div>
              <h2 className='font-headline text-2xl uppercase text-text transition-colors group-hover:text-accent'>
                {service.title}
              </h2>
              <p className='text-sm text-text-muted'>{service.tagline}</p>
              <p className='text-sm leading-relaxed text-text-muted/80'>{service.description}</p>
              <span className='mt-auto inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-accent'>
                Learn more <span aria-hidden>&rarr;</span>
              </span>
            </Link>
            )
          })}
        </div>
      </AnimatedSection>
    </main>
  )
}
