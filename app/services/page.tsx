import type { Metadata } from 'next'
import { PageHeader, Section } from '@/src/components/layout/section'
import { CtaBand } from '@/src/components/layout/cta-band'
import { pageMetadata } from '@/src/lib/page-metadata'
import { JsonLd } from '@/src/components/seo/json-ld'
import { servicesJsonLd } from '@/src/lib/structured-data'
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
    <main className='flex-1 pt-page-start'>
      <JsonLd data={servicesJsonLd} />
      <div className='pb-edge'>
        <Section priority className='flex flex-col gap-header'>
          <PageHeader
            label='Services'
            title='What we build'
            intro='End-to-end capabilities from strategy to deployment.'
          />
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
                      {Icon && (
                        <Icon className='h-5 w-5 text-text' aria-hidden />
                      )}
                    </div>
                    <h2 className='type-section-title'>{service.title}</h2>
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
        </Section>
      </div>

      <CtaBand
        location='services-cta-block'
        title='Not sure which you need?'
        description='The free audit pinpoints the phase your business is in and picks the services that pay off first. Two minutes, results on screen, no obligation.'
      />
    </main>
  )
}
