import type { Metadata } from 'next'
import { pageMetadata } from '@/src/lib/page-metadata'
import { JsonLd } from '@/src/components/seo/json-ld'
import { servicesJsonLd } from '@/src/lib/structured-data'
import { TrackedLink } from '@/src/components/tracked-link'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { Button } from '@/src/components/ui/button'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { services } from '@/src/lib/services'
import { serviceIcons } from '@/src/lib/service-icons'

export const metadata: Metadata = pageMetadata({
  title: 'Services',
  description:
    'AI automation, software development, workflow systems, and strategic advisory services from Place To Stand.',
  path: '/services',
})

export default function ServicesPage() {
  return (
    <main className='flex-1 pt-10'>
      <JsonLd data={servicesJsonLd} />
      <AnimatedSection priority className='flex flex-col gap-12 md:gap-20'>
        <div className='dots-hero flex flex-col gap-4'>
          <span className='bp-label font-mono'>Services</span>
          <h1 className='max-w-4xl font-headline text-4xl leading-[.9]! font-semibold text-balance text-text uppercase md:text-6xl'>
            What we build
          </h1>
          <p className='max-w-2xl text-base text-balance text-text-muted md:text-lg'>
            End-to-end capabilities from strategy to deployment.
          </p>
        </div>
        {/* One open row per service, split by a rule: no boxed cards */}
        <ol className='flex flex-col divide-y divide-border'>
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon]
            return (
              <li
                key={service.slug}
                className='grid gap-grid-1 py-grid-2 last:pb-0 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-grid-3'
              >
                <div className='flex flex-col gap-3 md:gap-4'>
                  <div className='flex items-center gap-3 text-text-muted'>
                    <span className='font-mono text-xs tabular-nums'>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {Icon && <Icon className='h-5 w-5 text-text' aria-hidden />}
                  </div>
                  <h2 className='font-headline text-3xl leading-[0.95] font-bold tracking-tight text-text md:text-4xl'>
                    {service.title}
                  </h2>
                  <p className='text-lg text-text-muted'>{service.tagline}</p>
                </div>
                <div className='flex flex-col gap-grid-1'>
                  {service.description && (
                    <p className='text-base text-text-muted'>
                      {service.description}
                    </p>
                  )}
                  <ul className='grid gap-x-grid-1 gap-y-2 sm:grid-cols-2'>
                    {service.features.map(feature => (
                      <li
                        key={feature}
                        className='flex items-start gap-3 text-base text-text'
                      >
                        <span
                          className='mt-2 h-1.5 w-1.5 shrink-0 bg-accent'
                          aria-hidden
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            )
          })}
        </ol>
      </AnimatedSection>

      {/* CTA Block */}
      <AnimatedSection className='pt-26 pb-grid-4 md:pb-grid-6'>
        <div className='dots-band border border-border bg-bg-card p-6 md:p-16'>
          <BlueprintCorners size={20} all colorClassName='border-accent' />
          <div className='flex flex-col gap-8 md:flex-row md:items-center md:justify-between'>
            <div className='flex flex-col gap-2.25 md:gap-3'>
              <span className='bp-label font-mono'>Next Step</span>
              <h2 className='font-headline text-3xl font-bold tracking-tight text-text md:text-4xl'>
                Not sure which you need?
              </h2>
              <p className='mt-0.75 max-w-md text-base text-text-muted md:mt-1'>
                The free audit pinpoints the phase your business is in and picks
                the services that pay off first. Two minutes, results on screen,
                no obligation.
              </p>
            </div>
            <div className='flex w-full shrink-0 flex-col gap-4 sm:w-auto'>
              <Button asChild size='lg' className='w-full'>
                <TrackedLink href='/audit' location='services-cta-block'>
                  Start the free audit
                </TrackedLink>
              </Button>
              <div className='flex flex-col gap-2'>
                <Button
                  asChild
                  size='lg'
                  variant='outline'
                  className='w-full border-2'
                >
                  <TrackedLink href='/contact' location='services-cta-block'>
                    Contact Us
                  </TrackedLink>
                </Button>
                <p className='max-w-xs text-sm text-text-muted'>
                  Already know what you want built, or want a bespoke mapping of
                  your systems? Talk to us directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </main>
  )
}
