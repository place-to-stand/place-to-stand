import type { Metadata } from 'next'
import { pageMetadata } from '@/src/lib/page-metadata'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { fieldNotes } from '@/src/lib/field-notes'

export const metadata: Metadata = pageMetadata({
  title: 'Field Notes',
  description:
    'Experiments, open-source projects, and insights from the Place To Stand team.',
  path: '/field-notes',
})

/** "2025-11-05" -> "Nov 2025". Read as UTC so the month never slips. */
function formatNoteDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export default function FieldNotesPage() {
  return (
    <main className='flex-1 pt-10 pb-32'>
      <AnimatedSection priority className='flex flex-col gap-12'>
        <div className='dots-hero mb-12 flex flex-col items-center gap-4 text-center md:mb-20'>
          <span className='bp-label font-mono'>Field Notes</span>
          <h1 className='max-w-4xl font-headline text-4xl leading-[.9]! font-semibold text-balance text-text uppercase md:text-6xl'>
            From the lab
          </h1>
          <p className='max-w-2xl text-base text-balance text-text-muted md:text-lg'>
            Experiments, open-source projects, and things we&apos;re learning
            along the way.
          </p>
        </div>
        {/* One open row per note, split by a rule: no boxed cards */}
        <ol className='flex flex-col divide-y divide-border border-y border-border'>
          {fieldNotes.map(note => {
            const external = note.url.startsWith('http')
            return (
              <li key={note.slug}>
                <a
                  href={note.url}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className='group grid gap-4 py-grid-2 no-underline md:grid-cols-12 md:gap-x-grid-1'
                >
                  <div className='flex items-center gap-4 font-mono text-sm text-text-muted md:col-span-3 md:flex-col md:items-start md:gap-2 md:pt-1.5'>
                    <time dateTime={note.date}>
                      {formatNoteDate(note.date)}
                    </time>
                    {note.repo && (
                      <span className='text-accent uppercase'>Open Source</span>
                    )}
                  </div>
                  <div className='flex flex-col gap-3 md:col-span-6'>
                    <h2 className='font-headline text-2xl leading-[0.95] font-bold tracking-tight text-text uppercase transition-colors group-hover:text-accent md:text-4xl'>
                      {note.title}
                    </h2>
                    <p className='max-w-2xl text-base text-text-muted md:text-lg'>
                      {note.description}
                    </p>
                  </div>
                  <p className='font-mono text-sm tracking-[0.05em] text-text-muted uppercase md:col-span-3 md:pt-1.5 md:text-right'>
                    {note.tags.join(' · ')}
                  </p>
                </a>
              </li>
            )
          })}
        </ol>
      </AnimatedSection>
    </main>
  )
}
