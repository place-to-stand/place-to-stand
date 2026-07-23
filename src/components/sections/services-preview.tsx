'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import {
  AnimatedSection,
  Reveal,
} from '@/src/components/layout/animated-section'
import { services, type Service } from '@/src/lib/services'
import { serviceGraphics } from '@/src/components/graphics/home-graphics'
import { cn } from '@/src/lib/utils'

type ServiceRowProps = {
  service: Service
  isOpen: boolean
  onToggle: () => void
}

function ServiceRow({ service, isOpen, onToggle }: ServiceRowProps) {
  const id = useId()
  const contentId = `${id}-content`
  const Graphic = serviceGraphics[service.icon]

  return (
    <div className='border-b border-border bg-bg-card last:border-b-0'>
      <button
        type='button'
        id={id}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className='flex w-full items-start gap-4 p-5 text-left transition-colors hover:bg-bg-elevated focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent/30 md:px-6 md:py-6'
      >
        {Graphic && <Graphic className='mt-0.5 h-grid-2 w-grid-2 shrink-0' />}
        <div className='flex flex-col gap-1'>
          <h3 className='font-headline text-lg font-semibold tracking-tight text-text'>
            {service.title}
          </h3>
          <p className='text-sm text-text-muted'>{service.tagline}</p>
        </div>
        <ChevronDown
          aria-hidden
          className={cn(
            'mt-0.5 ml-auto h-5 w-5 shrink-0 text-text-muted transition-transform duration-300 ease-out',
            isOpen && 'rotate-180 text-accent'
          )}
        />
      </button>
      <div
        id={contentId}
        role='region'
        aria-labelledby={id}
        aria-hidden={!isOpen}
        className={cn(
          'grid overflow-hidden transition-all duration-500 ease-in-out',
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className='overflow-hidden'>
          <div className='flex flex-col gap-4 px-5 pb-6 md:px-6 md:pl-[5.5rem]'>
            <p className='text-sm leading-relaxed text-text-muted'>
              {service.description}
            </p>
            <ul className='flex flex-col gap-2'>
              {service.features.map(feature => (
                <li
                  key={feature}
                  className='flex items-start gap-2 text-sm text-text-muted'
                >
                  <span
                    aria-hidden
                    className='mt-[0.4rem] h-1 w-1 shrink-0 bg-accent'
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ServicesPreview() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <AnimatedSection className='py-20'>
      <div className='grid gap-grid-3 md:grid-cols-[1fr_1.2fr]'>
        {/* Left: heading (sticky) */}
        <div className='flex flex-col gap-4 md:sticky md:top-32 md:self-start'>
          <Reveal index={0} className='flex flex-col gap-4'>
            <span className='bp-label font-mono'>Services</span>
            <h2 className='font-headline text-3xl leading-[0.95] font-bold tracking-tight text-text md:text-4xl'>
              What we build
            </h2>
          </Reveal>
          <Reveal index={1} className='text-md leading-relaxed text-text-muted'>
            <p>End-to-end capabilities, from strategy to deployment.</p>
          </Reveal>
          <Reveal index={2}>
            <Link
              href='/services'
              className='mt-4 inline-flex items-center gap-2 font-mono text-xs tracking-wider text-accent uppercase transition-colors hover:text-accent/80'
            >
              View all services
              <span aria-hidden>&rarr;</span>
            </Link>
          </Reveal>
        </div>

        {/* Right: service accordion */}
        <Reveal index={2} className='flex flex-col border border-border'>
          {services.map((service, i) => (
            <ServiceRow
              key={service.slug}
              service={service}
              isOpen={activeIndex === i}
              onToggle={() => setActiveIndex(prev => (prev === i ? null : i))}
            />
          ))}
        </Reveal>
      </div>
    </AnimatedSection>
  )
}
