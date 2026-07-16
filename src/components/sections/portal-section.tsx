'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatedSection, Reveal } from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { vendorIcons } from '@/src/components/icons/vendor-icons'
import { PortalGraphic } from '@/src/components/graphics/process-graphics'

const GitHubIcon = vendorIcons.GitHub

const features = [
  {
    title: 'AI Task Processing',
    body: 'Frontier models process development tasks — code generation, review, and testing — orchestrated by pts-worker, our open-source task runner.',
  },
  {
    title: 'Human Verification Layer',
    body: 'Every output is verified by engineers with pre-AI programming knowledge before reaching production. The portal surfaces diffs, logs, and test results for fast review.',
  },
  {
    title: 'Open Source',
    body: 'The portal is open source. Inspect the architecture, fork it, or use it as a reference for your own AI-integrated dashboard.',
  },
]

export function PortalSection() {
  return (
    <AnimatedSection id='portal' className='py-20'>
      <div className='flex flex-col gap-grid-3'>
        {/* ── Header ── */}
        <Reveal index={0} className='flex flex-col gap-4'>
          <span className='bp-label font-mono'>Our Custom Portal</span>
          <div className='flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
            <div className='flex flex-col gap-4'>
              <h2 className='max-w-2xl text-balance font-headline text-3xl font-bold tracking-tight text-text md:text-4xl'>
                Built on Our Own Tools
              </h2>
              <p className='max-w-2xl text-base leading-relaxed text-text-muted md:text-lg'>
                We built a custom portal for managing projects end-to-end.
                Frontier models are integrated directly into the tooling
                via <span className='font-mono text-accent'>pts-worker</span>,
                our AI task runner that processes code generation, review, and
                testing autonomously.
              </p>
            </div>
            {/* Open-source badge */}
            <a
              href='https://github.com/9-point-studios'
              target='_blank'
              rel='noopener noreferrer'
              className='flex shrink-0 items-center gap-2 self-start rounded border border-border px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-text-muted transition-colors hover:border-accent hover:text-accent lg:self-end'
            >
              {GitHubIcon && <GitHubIcon className='h-4 w-4' aria-hidden />}
              Open Source
            </a>
          </div>
        </Reveal>

        {/* ── Media + Graphic panel ── */}
        <Reveal index={1}>
          <div className='grid gap-grid-2 lg:grid-cols-3'>
            {/* Screenshot */}
            <div className='relative overflow-hidden border border-border lg:col-span-2'>
              <BlueprintCorners size={12} />
              <Image
                src='/portal-screenshot.png'
                alt='PTS Portal dashboard showing task management interface with AI-processed development tasks'
                width={1152}
                height={720}
                className='h-auto w-full object-cover'
                priority={false}
              />
            </div>
            {/* Graphic + caption */}
            <div className='relative flex flex-col items-center justify-center gap-6 border border-border bg-bg-card p-6'>
              <BlueprintCorners size={12} />
              <PortalGraphic className='h-32 w-32' />
              <p className='text-center text-sm leading-relaxed text-text-muted'>
                Custom dashboard with integrated AI worker — tasks flow from
                input to automated processing to human-verified output.
              </p>
            </div>
          </div>
        </Reveal>

        {/* ── Feature highlights ── */}
        <Reveal index={2}>
          <div className='relative border border-border'>
            <BlueprintCorners size={16} />
            <div className='grid gap-px bg-border md:grid-cols-3'>
              {features.map(feature => (
                <div
                  key={feature.title}
                  className='flex flex-col gap-3 bg-bg-card p-6 md:p-8'
                >
                  <h3 className='font-headline text-lg font-semibold tracking-tight text-text'>
                    {feature.title}
                  </h3>
                  <p className='text-sm leading-relaxed text-text-muted'>
                    {feature.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── "For Your Business" callout ── */}
        <Reveal index={3}>
          <div className='relative border border-border bg-bg-card p-6 md:p-10'>
            <BlueprintCorners size={16} all />
            <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
              <div className='flex flex-col gap-3'>
                <h3 className='font-headline text-2xl font-bold tracking-tight text-text md:text-3xl'>
                  We Build This For You, Too
                </h3>
                <p className='max-w-2xl text-base leading-relaxed text-text-muted'>
                  The same pattern — custom dashboard integrated with frontier
                  models — can be implemented for your business. We build
                  AI-powered operations dashboards tailored to your domain, so
                  your team gets the same leverage our engineers have, tuned to
                  your specific workflows and data.
                </p>
              </div>
              <Link
                href='/contact'
                className='inline-flex shrink-0 items-center gap-2 self-start font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:text-accent/80 lg:self-center'
              >
                Start a conversation
                <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </AnimatedSection>
  )
}
