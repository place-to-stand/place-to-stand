'use client'

import { useState, type ReactNode } from 'react'
import { Section, SectionHeading } from '@/src/components/layout/section'
import { cn } from '@/src/lib/utils'
import type { DesignSectionId } from './sections'

/**
 * Framing for /design. Everything inside a specimen is a real component or
 * class from the site; these helpers only lay the page out.
 */
export function DesignSection({
  id,
  label,
  title,
  when,
  children,
}: {
  id: DesignSectionId
  label: string
  title: string
  /** One line on when to reach for this. */
  when: ReactNode
  children: ReactNode
}) {
  return (
    <Section
      id={id}
      data-design-section
      className='flex scroll-mt-24 flex-col gap-stack px-0 lg:px-0'
    >
      <SectionHeading label={label} title={title} intro={when} />
      <div className='flex flex-col gap-stack'>{children}</div>
    </Section>
  )
}

/** A name you can copy: the class or component behind a specimen. */
export function CopyName({ name }: { name: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type='button'
      onClick={() => {
        void navigator.clipboard?.writeText(name)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1200)
      }}
      className='link-nav normal-case'
      title='Copy'
    >
      {copied ? 'Copied' : name}
    </button>
  )
}

/**
 * A labelled stage. `tones` shows the same children on a dark and a light
 * band side by side, so section-aware colours can be checked at a glance.
 */
export function Specimen({
  names,
  note,
  tones = false,
  children,
  className,
}: {
  /** Class or component names, each copyable. */
  names: string[]
  note?: ReactNode
  tones?: boolean
  children: ReactNode
  className?: string
}) {
  const stage = (light: boolean) => (
    <div
      className={cn(
        'border border-border bg-bg p-card',
        light && 'theme-light',
        className
      )}
    >
      {children}
    </div>
  )
  return (
    <div className='flex flex-col gap-grid-half'>
      <div className='flex flex-wrap items-baseline gap-x-grid-1 gap-y-grid-half'>
        {names.map(name => (
          <CopyName key={name} name={name} />
        ))}
        {note && <span className='text-sm text-text-muted'>{note}</span>}
      </div>
      {tones ? (
        <div className='grid gap-grid-1 md:grid-cols-2'>
          {stage(false)}
          {stage(true)}
        </div>
      ) : (
        stage(false)
      )}
    </div>
  )
}
