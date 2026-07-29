import type { ReactNode } from 'react'

type LegalHeaderProps = {
  title: string
  updated: string
  summary: string
}

/** Title block shared by the privacy and terms pages. */
export function LegalHeader({ title, updated, summary }: LegalHeaderProps) {
  return (
    <header className='flex flex-col gap-grid-1'>
      <span className='bp-label font-mono'>Legal</span>
      <h1 className='font-headline text-4xl leading-[0.95] font-bold tracking-tight text-text uppercase md:text-5xl'>
        {title}
      </h1>
      <p className='max-w-2xl text-base text-text-muted'>{summary}</p>
      <p className='font-mono text-xs text-text-muted'>
        Last updated: {updated}
      </p>
    </header>
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
      <span className='font-mono text-xs text-text-muted tabular-nums'>
        {String(index).padStart(2, '0')}
      </span>
      <div className='flex flex-col gap-3'>
        <h2 className='font-headline text-xl font-semibold tracking-tight text-text'>
          {title}
        </h2>
        <div className='flex flex-col gap-3 text-sm leading-relaxed text-text-muted'>
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
