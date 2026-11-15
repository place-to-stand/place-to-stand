'use client'

import { useState, type ReactNode } from 'react'
import { Section } from '@/src/components/patterns/section'
import { cn } from '@/src/lib/utils'
import {
  DESIGN_SECTION_GROUPS,
  type DesignGroupTitle,
  type DesignSectionId,
} from './sections'

/** Each section's number, in page order (01, 02, …). */
const SECTION_NUMBERS = Object.fromEntries(
  DESIGN_SECTION_GROUPS.flatMap(g =>
    g.sections.map(s => s.id as DesignSectionId)
  ).map((id, i) => [id, i + 1])
) as Record<DesignSectionId, number>

/**
 * Framing for /design. Everything inside a specimen is a real component or
 * class from the site; these helpers only lay the page out.
 */
export function DesignSection({
  id,
  label,
  title,
  when,
  proposed = false,
  children,
}: {
  id: DesignSectionId
  label: string
  title: string
  /** One line on when to reach for this. */
  when: ReactNode
  /** Documented but not yet used on the live site. */
  proposed?: boolean
  children: ReactNode
}) {
  const number = String(SECTION_NUMBERS[id]).padStart(2, '0')
  return (
    <Section
      id={id}
      data-design-section
      className='flex scroll-mt-24 flex-col gap-grid-2 border-t border-border px-0 pt-grid-2 lg:px-0'
    >
      {/* Quiet on purpose: a numbered mono line, a title one step under the
          group heading, and the intro in muted body text. */}
      <div className='flex flex-col gap-intro'>
        <p className='flex flex-wrap gap-x-grid-half type-fine'>
          <span>
            {number} · {label}
          </span>
          {proposed && (
            <span className='text-accent'>Proposed · not yet in use</span>
          )}
        </p>
        <h3 className='type-item-title'>{title}</h3>
        <p className='max-w-2xl text-base text-pretty text-text-muted'>
          {when}
        </p>
      </div>
      <div className='flex flex-col gap-stack'>{children}</div>
    </Section>
  )
}

/** A tier's heading (Tokens, Primitives, …): the one loud level under the
 *  page title. */
export function DesignGroup({ title }: { title: DesignGroupTitle }) {
  const group = DESIGN_SECTION_GROUPS.find(g => g.title === title)!
  return (
    <div className='flex flex-col gap-intro'>
      <h2 className='type-section-title'>{group.title}</h2>
      <p className='max-w-2xl type-intro text-pretty'>{group.intro}</p>
    </div>
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
      className='font-mono text-xs text-text-muted transition-colors hover:text-text'
      title='Copy'
    >
      {copied ? 'Copied' : name}
    </button>
  )
}

/**
 * A labeled stage. `tones` shows the same children on a dark and a light
 * band side by side, so section-aware colors can be checked at a glance.
 */
export function Specimen({
  names,
  note,
  tones = false,
  stack = false,
  children,
  className,
}: {
  /** Class or component names, each copyable. */
  names: string[]
  note?: ReactNode
  tones?: boolean
  /** Wide specimens: the dark and light stages one above the other, full
   *  width, instead of side by side. */
  stack?: boolean
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
      <div className='flex flex-wrap items-baseline gap-x-grid-half gap-y-grid-half'>
        {names.map(name => (
          <CopyName key={name} name={name} />
        ))}
        {note && (
          <span className='font-mono text-xs text-text-muted'>· {note}</span>
        )}
      </div>
      {tones ? (
        <div className={cn('grid gap-grid-1', !stack && 'md:grid-cols-2')}>
          {stage(false)}
          {stage(true)}
        </div>
      ) : (
        stage(false)
      )}
    </div>
  )
}
