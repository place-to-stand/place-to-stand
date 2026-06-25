import type { Metadata } from 'next'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { Badge } from '@/src/components/ui/badge'
import { fieldNotes } from '@/src/lib/field-notes'

export const metadata: Metadata = {
  title: 'Field Notes',
  description: 'Experiments, open-source projects, and insights from the Place To Stand team.',
}

export default function FieldNotesPage() {
  return (
    <main className='flex-1 pt-28'>
      <AnimatedSection className='flex flex-col gap-12'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <span className='font-mono text-xs uppercase tracking-[0.2em] text-accent'>
            Field Notes
          </span>
          <h1 className='max-w-4xl text-balance font-headline text-4xl font-semibold uppercase !leading-[.9] text-text md:text-6xl'>
            From the lab
          </h1>
          <p className='max-w-2xl text-balance text-base text-text-muted md:text-lg'>
            Experiments, open-source projects, and things we&apos;re learning along the way.
          </p>
        </div>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {fieldNotes.map(note => (
            <a
              key={note.slug}
              href={note.url}
              target={note.url.startsWith('http') ? '_blank' : undefined}
              rel={note.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className='group flex flex-col gap-4 border border-border bg-bg-card p-6 transition-colors duration-300 hover:border-accent/40'
            >
              <div className='flex items-center justify-between'>
                <span className='font-mono text-[11px] text-text-muted'>{note.date}</span>
                {note.repo && (
                  <span className='font-mono text-[11px] uppercase text-accent'>Open Source</span>
                )}
              </div>
              <h2 className='font-headline text-xl uppercase text-text transition-colors group-hover:text-accent'>
                {note.title}
              </h2>
              <p className='text-sm leading-relaxed text-text-muted'>{note.description}</p>
              <div className='mt-auto flex flex-wrap gap-2'>
                {note.tags.map(tag => (
                  <Badge key={tag} variant='outline'>{tag}</Badge>
                ))}
              </div>
            </a>
          ))}
        </div>
      </AnimatedSection>
    </main>
  )
}
