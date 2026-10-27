import type { Metadata } from 'next'
import { PageHeader, Section } from '@/src/components/layout/section'
import { pageMetadata } from '@/src/lib/page-metadata'
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
    <main className='flex-1 pt-page-start pb-section'>
      <Section priority className='flex flex-col gap-header'>
        <PageHeader
          label='Field Notes'
          title='From the lab'
          intro="Experiments, open-source projects, and things we're learning along the way."
          align='center'
        />
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
                    <h2 className='type-section-title uppercase transition-colors group-hover:text-accent'>
                      {note.title}
                    </h2>
                    <p className='max-w-2xl type-intro'>{note.description}</p>
                  </div>
                  <p className='font-mono text-sm tracking-[0.05em] text-text-muted uppercase md:col-span-3 md:pt-1.5 md:text-right'>
                    {note.tags.join(' · ')}
                  </p>
                </a>
              </li>
            )
          })}
        </ol>
      </Section>
    </main>
  )
}
