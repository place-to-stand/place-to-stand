import Link from 'next/link'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { Badge } from '@/src/components/ui/badge'
import { fieldNotes } from '@/src/lib/field-notes'

export function FieldNotesPreview() {
  const latest = fieldNotes.slice(0, 3)
  return (
    <AnimatedSection className='py-16 md:py-32'>
      <div className='flex flex-col gap-12'>
        {/* Header — left aligned */}
        <div className='flex flex-col gap-4'>
          <span className='bp-label font-mono'>Field Notes</span>
          <h2 className='font-headline text-3xl font-bold leading-[0.95] tracking-tight text-text md:text-4xl'>
            From the lab
          </h2>
          <p className='max-w-sm text-sm leading-relaxed text-text-muted'>
            Experiments, open-source projects, and things we&apos;re learning.
          </p>
          <Link
            href='/field-notes'
            className='mt-2 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:text-accent/80'
          >
            Explore field notes
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>

        {/* Entries — 3-column card grid */}
        <div className='grid gap-6 md:grid-cols-3'>
          {latest.map(note => (
            <a
              key={note.slug}
              href={note.url}
              target={note.url.startsWith('http') ? '_blank' : undefined}
              rel={
                note.url.startsWith('http') ? 'noopener noreferrer' : undefined
              }
              className='group relative flex flex-col gap-3 border border-border bg-bg-card p-6 transition-colors hover:bg-bg-elevated'
            >
              <BlueprintCorners size={12} />
              <div className='flex items-center gap-4'>
                <span className='font-mono text-[11px] text-text-muted'>
                  {note.date}
                </span>
                {note.repo && (
                  <span className='border border-accent/30 px-2 py-0.5 font-mono text-[10px] uppercase text-accent'>
                    Open Source
                  </span>
                )}
              </div>
              <h3 className='font-headline text-xl font-semibold tracking-tight text-text transition-colors group-hover:text-accent'>
                {note.title}
              </h3>
              <p className='text-sm leading-relaxed text-text-muted'>
                {note.description}
              </p>
              <div className='mt-auto flex flex-wrap gap-2 pt-2'>
                {note.tags.map(tag => (
                  <Badge key={tag} variant='outline'>
                    {tag}
                  </Badge>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
