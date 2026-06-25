import Link from 'next/link'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { Badge } from '@/src/components/ui/badge'
import { fieldNotes } from '@/src/lib/field-notes'

export function FieldNotesPreview() {
  const latest = fieldNotes.slice(0, 3)
  return (
    <AnimatedSection className='max-w-7xl lg:px-10'>
      <div className='grid gap-16 md:grid-cols-[1fr_1.2fr]'>
        {/* Left: heading */}
        <div className='flex flex-col gap-4 md:sticky md:top-32 md:self-start'>
          <span className='bp-label font-mono'>Field Notes</span>
          <h2 className='font-headline text-4xl font-bold leading-[0.95] tracking-tight text-text md:text-5xl'>
            From the
            <br />
            lab
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

        {/* Right: entries */}
        <div className='flex flex-col border border-border'>
          {latest.map((note, i) => (
            <a
              key={note.slug}
              href={note.url}
              target={note.url.startsWith('http') ? '_blank' : undefined}
              rel={
                note.url.startsWith('http') ? 'noopener noreferrer' : undefined
              }
              className='group flex flex-col gap-3 border-b border-border bg-bg-card px-6 py-8 transition-colors last:border-b-0 hover:bg-bg-elevated'
            >
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
              <div className='flex flex-wrap gap-2'>
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
