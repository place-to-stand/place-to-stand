import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { Badge } from '@/src/components/ui/badge'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { getAllFieldNotes } from '@/src/lib/field-notes'

export const metadata: Metadata = {
  title: 'Field Notes',
  description: 'Experiments, open-source projects, and insights from the Place To Stand team.',
}

export default function FieldNotesPage() {
  const notes = getAllFieldNotes()

  return (
    <main className='flex-1 pt-10 pb-32'>
      <AnimatedSection className='flex flex-col gap-12'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <span className='bp-label font-mono'>Field Notes</span>
          <h1 className='max-w-4xl text-balance font-headline text-4xl font-semibold uppercase !leading-[.9] text-text md:text-6xl'>
            From the lab
          </h1>
          <p className='max-w-2xl text-balance text-base text-text-muted md:text-lg'>
            Experiments, open-source projects, and things we&apos;re learning along the way.
          </p>
        </div>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {notes.map(note => {
            const isExternal = !!note.externalUrl
            const cardContent = (
              <>
                <BlueprintCorners />
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
              </>
            )

            const className = 'group relative flex flex-col gap-4 border border-border bg-bg-card p-6 transition-colors duration-300 hover:border-accent/40'

            return isExternal ? (
              <a
                key={note.slug}
                href={note.externalUrl}
                target='_blank'
                rel='noopener noreferrer'
                className={className}
              >
                {cardContent}
              </a>
            ) : (
              <Link
                key={note.slug}
                href={`/field-notes/${note.slug}` as '/field-notes/[slug]'}
                className={className}
              >
                {cardContent}
              </Link>
            )
          })}
        </div>
      </AnimatedSection>
    </main>
  )
}
