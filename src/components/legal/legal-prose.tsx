import type { ReactNode } from 'react'
import { PageHeader } from '@/src/components/layout/section'

type LegalHeaderProps = {
  title: string
  updated: string
  summary: string
}

/** Title block shared by the privacy and terms pages. */
export function LegalHeader({ title, updated, summary }: LegalHeaderProps) {
  return (
    <PageHeader
      label='Legal'
      title={title}
      intro={summary}
      meta={`Last updated: ${updated}`}
    />
  )
}

type LegalSectionProps = {
  index: number
  title: string
  children: ReactNode
}

/** One numbered clause, using the same row-number gutter as the audit list. */
export function LegalSection({ index, title, children }: LegalSectionProps) {
  return (
    <section className='grid gap-grid-half border-t border-border pt-grid-1 md:grid-cols-[3rem_1fr] md:gap-0'>
      <span className='font-mono text-sm text-text-muted tabular-nums'>
        {String(index).padStart(2, '0')}
      </span>
      <div className='flex flex-col gap-3'>
        <h2 className='type-card-title'>{title}</h2>
        <div className='flex flex-col gap-3 text-base text-text-muted'>
          {children}
        </div>
      </div>
    </section>
  )
}

/** Bulleted list styled with the accent tick used elsewhere on the site. */
export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className='flex flex-col gap-2'>
      {items.map((item, index) => (
        <li key={index} className='flex items-start gap-2'>
          <span aria-hidden className='mt-2 h-px w-3 shrink-0 bg-accent' />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
