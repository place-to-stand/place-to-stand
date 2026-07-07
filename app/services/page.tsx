import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { Button } from '@/src/components/ui/button'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { services } from '@/src/lib/services'
import { serviceIcons } from '@/src/lib/service-icons'

export const metadata: Metadata = {
  title: 'Services',
  description: 'AI automation, software development, workflow systems, and strategic advisory services from Place To Stand.',
}

export default function ServicesPage() {
  return (
    <main className='flex-1 pt-10 pb-32'>
      <AnimatedSection className='flex flex-col gap-12 md:gap-20'>
        <div className='flex flex-col gap-4'>
          <span className='bp-label font-mono'>Services</span>
          <h1 className='max-w-4xl text-balance font-headline text-4xl font-semibold uppercase !leading-[.9] text-text md:text-6xl'>
            What we build
          </h1>
          <p className='max-w-2xl text-balance text-base text-text-muted md:text-lg'>
            End-to-end capabilities from strategy to deployment.
          </p>
        </div>
        <div className='grid gap-6 md:grid-cols-2 md:gap-10'>
          {services.map((service) => {
            const Icon = serviceIcons[service.icon]
            return (
            <div
              key={service.slug}
              className={`relative flex flex-col gap-4 border border-border bg-bg-card p-6 md:p-8${
                service.slug === 'managed-services' ? ' md:col-span-2' : ''
              }`}
            >
              <BlueprintCorners />
              {Icon && <Icon className='h-5 w-5 text-accent' aria-hidden />}
              <h2 className='font-headline text-2xl uppercase text-text'>
                {service.title}
              </h2>
              <p className='text-sm text-text-muted'>{service.tagline}</p>
              {service.description && (
                <p className='text-sm leading-relaxed text-text-muted/80'>
                  {service.description}
                </p>
              )}
              <ul className='mt-2 flex flex-col gap-2 border-t border-border pt-4'>
                {service.features.map(feature => (
                  <li
                    key={feature}
                    className='flex items-start gap-3 text-sm text-text-muted'
                  >
                    <span className='mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent' aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            )
          })}
        </div>
      </AnimatedSection>

      {/* CTA Block */}
      <AnimatedSection>
        <div className='relative border border-border bg-bg-card p-6 md:p-16'>
          <BlueprintCorners size={20} all />
          <div className='flex flex-col gap-8 md:flex-row md:items-center md:justify-between'>
            <div className='flex flex-col gap-3'>
              <span className='bp-label font-mono'>Next Step</span>
              <h2 className='font-headline text-3xl font-bold tracking-tight text-text md:text-4xl'>
                Ready to build?
              </h2>
              <p className='max-w-md text-sm leading-relaxed text-text-muted'>
                Tell us what you are trying to build. We will scope the work,
                timeline, and cost, with no obligation.
              </p>
            </div>
            <div className='flex w-full shrink-0 flex-col gap-4 sm:w-auto'>
              <Button asChild size='lg' className='w-full'>
                <Link href='/contact'>Start a Project</Link>
              </Button>
              <div className='flex flex-col gap-2'>
                <Button asChild size='lg' variant='outline' className='w-full border-2'>
                  <Link href='/audit'>Opportunity Audit</Link>
                </Button>
                <p className='max-w-xs text-xs leading-relaxed text-text-muted'>
                  Not sure where to start? This two-minute audit pinpoints
                  where custom software pays off first.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </main>
  )
}
