import Link from 'next/link'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { Badge } from '@/src/components/ui/badge'
import { fieldNotes } from '@/src/lib/field-notes'

export function FieldNotesPreview() {
  const latest = fieldNotes.slice(0, 3)
  return (
    <AnimatedSection className='flex flex-col gap-12'>
      <div className='flex flex-col items-center gap-4 text-center'>
        <span className='font-mono text-xs uppercase tracking-[0.2em] text-accent'>
          Field Notes
        </span>
        <h2 className='max-w-4xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-text md:text-5xl'>
          From the lab
        </h2>
        <p className='max-w-xl text-balance text-base text-text-muted'>
          Experiments, open-source projects, and things we're learning.
        </p>
      </div>
      <div className='grid gap-4 md:grid-cols-3'>
        {latest.map(note => (
          <a
            key={note.slug}
            href={note.url}
            target={note.url.startsWith('http') ? '_blank' : undefined}
            rel={note.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            className='group flex flex-col gap-4 rounded-xl border border-border bg-bg-card p-6 transition-all duration-300 hover:border-accent/40'
          >
            <div className='flex items-center justify-between'>
              <span className='font-mono text-[11px] text-text-muted'>{note.date}</span>
              {note.repo && (
                <span className='font-mono text-[11px] uppercase text-accent'>Open Source</span>
              )}
            </div>
            <h3 className='font-headline text-lg uppercase text-text transition-colors group-hover:text-accent'>
              {note.title}
            </h3>
            <p className='text-sm leading-relaxed text-text-muted'>{note.description}</p>
            <div className='mt-auto flex flex-wrap gap-2'>
              {note.tags.map(tag => (
                <Badge key={tag} variant='outline'>{tag}</Badge>
              ))}
            </div>
          </a>
        ))}
      </div>
      <div className='text-center'>
        <Link
          href='/field-notes'
          className='inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-accent transition-colors hover:text-accent/80'
        >
          Explore field notes
          <span aria-hidden>&rarr;</span>
        </Link>
      </div>
    </AnimatedSection>
  )
}
