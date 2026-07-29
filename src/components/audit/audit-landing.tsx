'use client'

import Image from 'next/image'
import { useId, useState } from 'react'
import { usePostHog } from 'posthog-js/react'
import {
  ArrowRight,
  BarChart3,
  ChevronDown,
  Clock,
  Code2,
  Compass,
  GitBranch,
  type LucideIcon,
  ServerCog,
  Shield,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react'
import { Reveal } from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { TrackedLink } from '@/src/components/tracked-link'
import { Button } from '@/src/components/ui/button'
import { cn } from '@/src/lib/utils'
import { clients } from '@/src/lib/clients'
import { team } from '@/src/lib/team'
import { type Service, services } from '@/src/lib/services'

interface AuditLandingProps {
  onStart: (location: string) => void
}

const HIGHLIGHTS = [
  { icon: Clock, label: 'Under 2 minutes' },
  { icon: Shield, label: 'Free, no obligation' },
  { icon: Target, label: 'Personalized recommendations' },
]

const FACETS = [
  {
    title: 'Senior Builders',
    description:
      'The engineer who architects your solution is the one who builds it. No account managers, no layers of delegation.',
  },
  {
    title: 'AI-Native',
    description:
      'Fine-tuned AI systems let us design and ship exactly what you need, at 3-5x the speed of a traditional team.',
  },
  {
    title: 'Direct Access',
    description:
      'You work with the builder directly. No middle management, no handoffs, no telephone game.',
  },
]

const AUDIT_COVERS = [
  {
    icon: Compass,
    title: 'Your business phase',
    description: 'Where you are on the journey from idea to scaled operation.',
  },
  {
    icon: Target,
    title: 'Top software opportunities',
    description: 'The highest-leverage places custom software could help.',
  },
  {
    icon: Zap,
    title: 'Where to start first',
    description: 'A prioritized shortlist so you know what to build next.',
  },
  {
    icon: Sparkles,
    title: 'Tailored recommendations',
    description:
      'Specific services matched to your answers, not a generic pitch.',
  },
]

/** Trusted-by strip uses top 6 clients for a compact row. */
const FEATURED_CLIENTS = clients.slice(0, 6)

/** Maps general service icon names to lucide components. */
const SERVICE_ICONS: Record<string, LucideIcon> = {
  Code2,
  GitBranch,
  BarChart3,
  Compass,
  ServerCog,
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
  const Icon = SERVICE_ICONS[service.icon] ?? Code2

  return (
    <li className='border-b border-border last:border-b-0'>
      <button
        type='button'
        id={id}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={cn(
          'group grid w-full grid-cols-[3rem_1fr_3rem] items-stretch text-left transition-colors hover:bg-bg-elevated focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent/30 md:grid-cols-[3rem_18rem_1fr_3rem]',
          isOpen && 'bg-bg-elevated'
        )}
      >
        {/* Row-number gutter */}
        <span
          className={cn(
            'flex items-center justify-center font-mono text-xs tabular-nums transition-colors',
            isOpen ? 'text-accent' : 'text-text-muted group-hover:text-accent'
          )}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Icon + title */}
        <span className='flex items-center gap-3 px-grid-1 py-5'>
          <span
            className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center border bg-bg text-accent transition-colors',
              isOpen
                ? 'border-accent'
                : 'border-border group-hover:border-accent'
            )}
          >
            <Icon aria-hidden className='h-4 w-4' />
          </span>
          <span className='font-headline text-base font-semibold tracking-tight text-text'>
            {service.title}
          </span>
        </span>

        {/* Tagline */}
        <span className='hidden items-center px-grid-1 text-sm text-text-muted md:flex'>
          {service.tagline}
        </span>

        {/* Expand indicator */}
        <span className='flex items-center justify-center'>
          <ChevronDown
            aria-hidden
            className={cn(
              'h-4 w-4 transition-transform duration-300 ease-out',
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
          <div className='grid gap-grid-2 bg-bg px-grid-1 pt-9 pb-grid-1 md:grid-cols-2 md:pl-grid-3'>
            <p className='text-sm leading-relaxed text-text-muted'>
              {service.description}
            </p>
            <ul className='flex flex-col gap-1.5'>
              {service.features.map(feature => (
                <li
                  key={feature}
                  className='flex items-start gap-2 text-sm text-text-muted'
                >
                  <span
                    aria-hidden
                    className='mt-1.5 h-px w-3 shrink-0 bg-accent'
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </li>
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
      {/* Hero Block */}
      <Reveal index={0}>
        <div className='flex flex-col items-center gap-6 text-center'>
          <span className='bp-label font-mono'>Opportunity Audit</span>
          <h1 className='max-w-3xl font-headline text-4xl leading-[.9]! font-semibold text-balance text-text uppercase sm:text-5xl md:text-6xl'>
            Find your biggest software opportunity
          </h1>
          <p className='mx-auto max-w-xl text-base text-balance text-text-muted md:text-lg'>
            Place To Stand builds custom software for businesses ready to stop
            duct-taping tools together. Take our free, 2-minute audit to see
            where purpose-built software would give you the most leverage.
          </p>
          <Button
            type='button'
            size='lg'
            onClick={() => handleStart('hero')}
            className='mt-2 px-10'
          >
            Start the audit
            <ArrowRight className='ml-2 h-4 w-4' />
          </Button>
          <div className='mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-muted'>
            {HIGHLIGHTS.map(({ icon: Icon, label }) => (
              <span key={label} className='inline-flex items-center gap-1.5'>
                <Icon className='h-4 w-4 text-accent' />
                {label}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Client Trust Strip */}
      <Reveal index={1} className='mt-grid-4'>
        <div className='flex flex-col gap-grid-1'>
          <span className='bp-label font-mono'>Trusted by</span>
          <div className='relative border border-border p-grid-1'>
            <BlueprintCorners size={12} />
            <div className='grid grid-cols-3 gap-grid-1 md:grid-cols-6'>
              {FEATURED_CLIENTS.map(client => (
                <div
                  key={client.title}
                  className='flex h-grid-2 items-center justify-center opacity-80 md:h-grid-3'
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={client.logo}
                    alt={`${client.title} logo`}
                    loading='lazy'
                    decoding='async'
                    style={{
                      maxHeight: `${(client.logoScale ?? 1) * 100}%`,
                    }}
                    className='w-auto max-w-full object-contain'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Who We Are Block */}
      <Reveal index={2} className='mt-grid-4'>
        <div className='flex flex-col gap-grid-1'>
          <div className='flex flex-col gap-2'>
            <span className='bp-label font-mono'>Who We Are</span>
            <h2 className='font-headline text-3xl leading-[0.95] font-bold tracking-tight text-text md:text-4xl'>
              Experienced engineers with fine-tuned AI.
            </h2>
            <p className='mt-1 max-w-xl text-sm text-text-muted'>
              Senior engineers building exactly what you need, directly with the
              people who build it. No layers, no hand-offs.
            </p>
          </div>

          {/* Facets */}
          <div className='relative'>
            <BlueprintCorners size={16} />
            <div className='grid gap-px border border-border bg-border md:grid-cols-3'>
              {FACETS.map(facet => (
                <div
                  key={facet.title}
                  className='flex flex-col gap-3 bg-bg-card p-5 md:p-8'
                >
                  <h3 className='font-headline text-xl font-semibold tracking-tight text-text'>
                    {facet.title}
                  </h3>
                  <p className='text-sm leading-relaxed text-text-muted'>
                    {facet.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Team strip */}
          <div className='flex flex-wrap items-center gap-6'>
            {team.map(member => (
              <div key={member.name} className='flex items-center gap-3'>
                <div className='relative h-12 w-12 overflow-hidden rounded-full border border-border'>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className='object-cover'
                  />
                </div>
                <div>
                  <p className='text-sm font-semibold text-text'>
                    {member.name}
                  </p>
                  <p className='text-xs text-text-muted'>{member.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* What The Audit Covers */}
      <Reveal index={2} className='mt-grid-4'>
        <div className='flex flex-col gap-grid-1'>
          <div className='flex flex-col gap-2'>
            <span className='bp-label font-mono'>What You&apos;ll Learn</span>
            <h2 className='font-headline text-3xl leading-[0.95] font-bold tracking-tight text-text md:text-4xl'>
              What the audit covers
            </h2>
          </div>
          <div className='grid gap-grid-1 sm:grid-cols-2'>
            {AUDIT_COVERS.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className='relative flex flex-col gap-3 border border-border bg-bg-card p-5 transition-colors hover:border-border-light'
              >
                <BlueprintCorners size={12} />
                <div className='flex h-10 w-10 shrink-0 items-center justify-center bg-accent-muted text-accent'>
                  <Icon className='h-5 w-5' />
                </div>
                <h3 className='font-headline text-base font-semibold tracking-tight text-text uppercase'>
                  {title}
                </h3>
                <p className='text-sm text-text-muted'>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Services Overview */}
      <Reveal index={3} className='mt-grid-4'>
        <div className='flex flex-col gap-grid-1'>
          <div className='flex flex-col gap-2'>
            <span className='bp-label font-mono'>Capabilities</span>
            <h2 className='font-headline text-3xl leading-[0.95] font-bold tracking-tight text-text md:text-4xl'>
              What we can build for you
            </h2>
          </div>
          <div className='relative border border-border bg-bg-card'>
            <BlueprintCorners size={16} />
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
          </div>
        </div>
      </Reveal>

      {/* Final CTA Block */}
      <Reveal index={3} className='mt-grid-4'>
        <div className='relative flex flex-col items-center gap-6 border border-border bg-bg-card p-grid-2 text-center'>
          <BlueprintCorners size={16} />
          <h2 className='font-headline text-2xl font-semibold tracking-tight text-text uppercase sm:text-3xl'>
            Ready to find your leverage?
          </h2>
          <p className='max-w-md text-sm text-balance text-text-muted'>
            Two minutes. Zero obligation. Personalized recommendations for where
            custom software would move the needle most.
          </p>
          <Button
            type='button'
            size='lg'
            onClick={() => handleStart('bottom')}
            className='px-10'
          >
            Start the audit
            <ArrowRight className='ml-2 h-4 w-4' />
          </Button>
          <p className='text-sm text-text-muted'>
            Prefer to talk first?{' '}
            <TrackedLink
              href='/contact'
              location='audit-landing-bottom-cta'
              className='text-accent underline-offset-4 hover:underline'
            >
              Book a call
            </TrackedLink>
            .
          </p>
        </div>
      </Reveal>
    </div>
  )
}
