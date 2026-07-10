import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { Badge } from '@/src/components/ui/badge'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { getAllFieldNotes, getFieldNoteBySlug } from '@/src/lib/field-notes'

type FieldNoteParams = {
  slug: string
}

type FieldNoteRouteProps = {
  params: Promise<FieldNoteParams>
}

export async function generateStaticParams() {
  return getAllFieldNotes().map(note => ({ slug: note.slug }))
}

export async function generateMetadata({
  params,
}: FieldNoteRouteProps): Promise<Metadata> {
  const { slug } = await params
  const note = getFieldNoteBySlug(slug)

  if (!note) {
    return {
      title: 'Field Note Not Found',
    }
  }

  return {
    title: note.title,
    description: note.description,
    openGraph: {
      title: note.title,
      description: note.description,
      type: 'article',
      publishedTime: note.date,
    },
  }
}

export default async function FieldNoteDetailPage({
  params,
}: FieldNoteRouteProps) {
  const { slug } = await params
  const note = getFieldNoteBySlug(slug)

  if (!note) {
    notFound()
  }

  return (
    <main className='flex-1 pt-10 pb-32'>
      <AnimatedSection className='flex flex-col gap-12'>
        {/* Back link */}
        <Link
          href='/field-notes'
          className='inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:text-accent/80'
        >
          <span aria-hidden>&larr;</span>
          Back to Field Notes
        </Link>

        {/* Article header */}
        <div className='relative border border-border bg-bg-card p-6 md:p-10'>
          <BlueprintCorners />
          <div className='flex flex-col gap-4'>
            <span className='bp-label font-mono'>Field Notes</span>
            <h1 className='max-w-4xl font-headline text-3xl font-semibold uppercase !leading-[.9] text-text md:text-5xl'>
              {note.title}
            </h1>
            <div className='flex flex-wrap items-center gap-4'>
              <span className='font-mono text-[11px] text-text-muted'>{note.date}</span>
              {note.repo && (
                <a
                  href={note.repo}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='border border-accent/30 px-2 py-0.5 font-mono text-[10px] uppercase text-accent transition-colors hover:bg-accent/10'
                >
                  Open Source ↗
                </a>
              )}
            </div>
            <div className='flex flex-wrap gap-2'>
              {note.tags.map(tag => (
                <Badge key={tag} variant='outline'>{tag}</Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Article body */}
        <article
          className='prose prose-lg max-w-none prose-headings:font-headline prose-headings:uppercase prose-headings:tracking-tight prose-a:no-underline prose-a:border-b prose-a:border-accent/40 hover:prose-a:border-accent prose-pre:border prose-pre:border-border prose-hr:border-border prose-blockquote:border-l-accent prose-table:text-sm'
          dangerouslySetInnerHTML={{ __html: note.contentHtml }}
        />
      </AnimatedSection>
    </main>
  )
}
