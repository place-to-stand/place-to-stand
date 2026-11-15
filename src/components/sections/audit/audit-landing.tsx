'use client'

import Image from 'next/image'
import { useId, useState } from 'react'
import { usePostHog } from 'posthog-js/react'
import {
  Icon,
  ArrowRight,
  BarChart3,
  ChevronDown,
  Code2,
  Compass,
  GitBranch,
  type LucideIcon,
  ServerCog,
  Users,
} from '@/src/components/primitives/icon'
import { Reveal } from '@/src/components/primitives/animated-section'
import { Callout, Card, Panel, RuledRow } from '@/src/components/boxes'
import { TrackedLink } from '@/src/components/primitives/tracked-link'
import { Button } from '@/src/components/primitives/button'
import { cn } from '@/src/lib/utils'
import { team } from '@/src/lib/team'
import { WHO_YOU_WORK_WITH } from '@/src/lib/offers'
import { type Service, services } from '@/src/lib/services'
import { AuditLogoMarquee } from '@/src/components/sections/audit/audit-logo-marquee'
import { MediaFrame } from '@/src/components/patterns/media-frame'

interface AuditLandingProps {
  onStart: (location: string) => void
}

const HIGHLIGHTS = [
  'Under 2 minutes',
  'Free, no obligation',
  'Preview on screen, full results by email',
]

const FACETS = WHO_YOU_WORK_WITH.facets

const AUDIT_COVERS = [
  {
    title: 'Your business phase',
    description: 'Where you are on the journey from idea to scaled operation.',
  },
  {
    title: 'Top software opportunities',
    description: 'The highest-leverage places custom software could help.',
  },
  {
    title: 'Where to start first',
    description: 'A prioritized shortlist so you know what to build next.',
  },
  {
    title: 'Tailored recommendations',
    description:
      'Specific services matched to your answers, not a generic pitch.',
  },
]

/** Maps general service icon names to lucide components. */
const SERVICE_ICONS: Record<string, LucideIcon> = {
  Code2,
  GitBranch,
  BarChart3,
  Compass,
  ServerCog,
  Users,
}

type ServiceRowProps = {
  service: Service
  index: number
  isOpen: boolean
  onToggle: () => void
}

/** One capability: a schematic table row that expands to its detail panel. */
function ServiceRow({ service, index, isOpen, onToggle }: ServiceRowProps) {
  const id = useId()
  const panelId = `${id}-panel`
  const glyph = SERVICE_ICONS[service.icon] ?? Code2

  return (
    <RuledRow className='first:border-t-0'>
      <button
        type='button'
        id={id}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={cn(
          'group grid w-full cursor-pointer grid-cols-[3rem_1fr_3rem] items-stretch text-left transition-colors hover:bg-bg-elevated md:grid-cols-[3rem_18rem_1fr_3rem]',
          isOpen && 'bg-bg-elevated'
        )}
      >
        {/* Row-number gutter */}
        <span
          className={cn(
            'flex items-center justify-center font-mono text-sm tabular-nums transition-colors',
            isOpen ? 'text-accent' : 'text-text-muted group-hover:text-accent'
          )}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Icon + title */}
        <span className='flex items-center gap-grid-half px-grid-1 py-grid-1'>
          <span
            className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center border bg-bg text-text transition-colors',
              isOpen
                ? 'border-accent'
                : 'border-border group-hover:border-accent'
            )}
          >
            <Icon icon={glyph} />
          </span>
          <span className='font-headline text-base font-semibold tracking-tight text-text'>
            {service.title}
          </span>
        </span>

        {/* Tagline */}
        <span className='hidden items-center px-grid-1 text-base text-text-muted md:flex'>
          {service.tagline}
        </span>

        {/* Expand indicator */}
        <span className='flex items-center justify-center'>
          <Icon
            icon={ChevronDown}
            className={cn(
              'transition-transform duration-300 ease-out',
              isOpen ? 'rotate-180 text-accent' : 'text-text-muted'
            )}
          />
        </span>
      </button>

      {/* Detail panel */}
      <div
        id={panelId}
        role='region'
        aria-labelledby={id}
        aria-hidden={!isOpen}
        className={cn(
          'grid overflow-hidden transition-all duration-500 ease-in-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className='overflow-hidden'>
          <div className='grid gap-grid-2 bg-bg px-grid-1 pt-grid-1 pb-grid-1 md:grid-cols-2 md:pl-grid-3'>
            <p className='text-base text-text-muted'>{service.description}</p>
            <ul className='flex flex-col gap-1.5'>
              {service.features.map(feature => (
                <li
                  key={feature}
                  className='flex items-start gap-2 text-base text-text-muted'
                >
                  <span
                    aria-hidden
                    className='mt-1.5 h-px w-3 shrink-0 bg-accent-line'
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </RuledRow>
  )
}

export function AuditLandingContent({ onStart }: AuditLandingProps) {
  const posthog = usePostHog()
  const [openService, setOpenService] = useState<number | null>(0)

  const handleStart = (location: string) => {
    posthog?.capture('audit_landing_cta_click', { location })
    onStart(location)
  }

  return (
    <div>
      <div className='flex flex-col gap-section pb-edge'>
        {/* Hero Block */}
        <Reveal index={0}>
          <div className='dots-hero flex flex-col items-center gap-intro text-center'>
            <div className='flex flex-col items-center gap-eyebrow'>
              <span className='bp-label font-mono'>Opportunity Audit</span>
              <h1 className='max-w-3xl type-page-title text-balance'>
                Find your biggest software opportunity
              </h1>
            </div>
            <p className='mx-auto max-w-xl type-intro text-balance'>
              Place To Stand builds custom software for businesses that have
              outgrown a stack of tools that don’t talk to each other. Take our
              free, 2-minute audit: see a preview on screen, then get the full
              results by email.
            </p>
            <Button
              type='button'
              size='lg'
              onClick={() => handleStart('hero')}
              className='mt-grid-1 px-grid-2'
            >
              Start the audit
              <Icon icon={ArrowRight} className='ml-2' />
            </Button>
            <div className='flex flex-wrap items-center justify-center gap-x-grid-1 gap-y-2 text-base text-text-muted'>
              {HIGHLIGHTS.map(label => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Client Trust Strip */}
        <Reveal index={1}>
          <div className='flex flex-col gap-label'>
            <span className='bp-label font-mono'>Trusted by</span>
            <div className='relative'>
              <AuditLogoMarquee />
            </div>
          </div>
        </Reveal>

        {/* Who We Are Block */}
        <Reveal index={2}>
          <div className='flex flex-col gap-stack'>
            <div className='flex flex-col gap-intro'>
              <div className='flex flex-col gap-eyebrow'>
                <span className='bp-label font-mono'>Who You Work With</span>
                <h2 className='type-section-title'>
                  {WHO_YOU_WORK_WITH.title}
                </h2>
              </div>
              <p className='max-w-xl text-base text-text-muted'>
                {WHO_YOU_WORK_WITH.intro}
              </p>
            </div>

            {/* Facets */}
            <div className='relative'>
              <div className='grid gap-grid-1 md:grid-cols-3'>
                {FACETS.map(facet => (
                  <Card
                    key={facet.title}
                    className='flex flex-col gap-grid-half'
                  >
                    <h3 className='type-card-title'>{facet.title}</h3>
                    <p className='text-base text-text-muted'>{facet.body}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Team strip */}
            <div className='flex flex-wrap items-center gap-grid-1'>
              {team.map(member => (
                <div
                  key={member.name}
                  className='flex items-center gap-grid-half'
                >
                  <MediaFrame
                    shape='person'
                    className='h-12 w-12 rounded-dot border border-border'
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      // The avatar is a fixed 48px at every breakpoint, so this is
                      // exact rather than a viewport estimate.
                      sizes='48px'
                      className='object-cover'
                    />
                  </MediaFrame>
                  <div>
                    <p className='text-base font-semibold text-text'>
                      {member.name}
                    </p>
                    <p className='text-sm text-text-muted'>{member.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* What The Audit Covers */}
        <Reveal index={2}>
          <div className='flex flex-col gap-stack'>
            <div className='flex flex-col gap-eyebrow'>
              <span className='bp-label font-mono'>What You’ll Learn</span>
              <h2 className='type-section-title'>What the audit covers</h2>
            </div>
            {/* Four open columns under a shared rule: no boxed cards */}
            <RuledRow
              as='ol'
              className='grid gap-x-grid-1 gap-y-grid-2 pt-grid-1 sm:grid-cols-2 lg:grid-cols-4'
            >
              {AUDIT_COVERS.map(({ title, description }, index) => (
                <li key={title} className='flex flex-col gap-grid-half'>
                  <span className='font-mono text-xs text-text-muted tabular-nums'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className='type-card-title'>{title}</h3>
                  <p className='text-base text-text-muted'>{description}</p>
                </li>
              ))}
            </RuledRow>
          </div>
        </Reveal>

        {/* Services Overview */}
        <Reveal index={3}>
          <div className='flex flex-col gap-stack'>
            <div className='flex flex-col gap-eyebrow'>
              <span className='bp-label font-mono'>Capabilities</span>
              <h2 className='type-section-title'>What we can build for you</h2>
            </div>
            <Panel className='p-0'>
              <ul className='flex flex-col'>
                {services.map((service, index) => (
                  <ServiceRow
                    key={service.slug}
                    service={service}
                    index={index}
                    isOpen={openService === index}
                    onToggle={() =>
                      setOpenService(prev => (prev === index ? null : index))
                    }
                  />
                ))}
              </ul>
            </Panel>
          </div>
        </Reveal>
      </div>

      {/* Final CTA Block: one edge gap under the last block to the dots'
          top rule, then the band role of dots above the box. */}
      <Reveal index={3} className='pt-band'>
        <Callout
          band
          className='flex flex-col items-center gap-stack text-center'
        >
          <div className='flex flex-col items-center gap-intro'>
            <h2 className='type-section-title uppercase'>
              Ready to find your leverage?
            </h2>
            <p className='max-w-md text-base text-balance text-text-muted'>
              Two minutes. Zero obligation. A preview on screen, then the full
              results by email, showing where custom software would help most.
            </p>
          </div>
          <Button
            type='button'
            size='lg'
            onClick={() => handleStart('bottom')}
            className='px-grid-2'
          >
            Start the audit
            <Icon icon={ArrowRight} className='ml-2' />
          </Button>
          <p className='text-base text-text-muted'>
            Prefer to talk first?{' '}
            <TrackedLink
              href='/contact'
              location='audit-landing-bottom-cta'
              className='link-inline'
            >
              Book a call
            </TrackedLink>
            .
          </p>
        </Callout>
      </Reveal>
    </div>
  )
}
