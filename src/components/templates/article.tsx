import { Suspense, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Band, Section } from '@/src/components/patterns/section'
import { CtaBand } from '@/src/components/sections/cta-band'
import { RuledList, RuledRow } from '@/src/components/boxes'
import { BlogBody } from '@/src/components/patterns/rich-text'
import { SubscribeForm } from '@/src/components/sections/subscribe-form'
import type { TeamMember } from '@/src/lib/team'
import { formatPostDate, readingMinutes, type BlogPost } from '@/src/lib/blog'
import { MediaFrame } from '@/src/components/patterns/media-frame'

/**
 * An article (blog post). The shell is shared by every post so it can be
 * prefetched once; the post itself streams in inside it.
 */
export function ArticleShell({
  children,
  location,
}: {
  children: ReactNode
  location: string
}) {
  return (
    <main className='flex-1 pt-page-start'>
      <Suspense fallback={<div className='min-h-svh' />}>{children}</Suspense>
      <CtaBand location={location} />
    </main>
  )
}

/** The post: title block, byline, body, newer and older posts, subscribe. */
export function ArticleBody({
  post,
  newer,
  older,
  author,
}: {
  post: BlogPost
  newer?: BlogPost
  older?: BlogPost
  author?: TeamMember
}) {
  return (
    <>
      {/* Title block */}
      <Section priority className='pb-grid-2'>
        <div className='dots-hero flex flex-col gap-intro'>
          <Link href='/blog' className='link-action'>
            ← All posts
          </Link>
          <h1 className='max-w-5xl type-page-title text-balance'>
            {post.title}
          </h1>
          {post.description && (
            <p className='max-w-2xl type-intro text-balance'>
              {post.description}
            </p>
          )}
        </div>
      </Section>

      <Band tone='light'>
        {/* Byline on the left third, the post in the body column */}
        <Section>
          <div className='grid gap-grid-2 lg:grid-cols-12 lg:gap-x-grid-1'>
            <aside className='flex flex-col gap-grid-half lg:sticky lg:top-grid-4 lg:col-span-3 lg:self-start'>
              {author && (
                <div className='flex items-center gap-grid-half'>
                  <MediaFrame shape='person' className='size-12 rounded-dot'>
                    <Image
                      src={author.image}
                      alt={author.name}
                      fill
                      sizes='48px'
                      className='object-cover'
                    />
                  </MediaFrame>
                  <div className='flex flex-col'>
                    <span className='text-base font-semibold text-text'>
                      {author.name}
                    </span>
                    <span className='text-sm text-text-muted'>
                      {author.title}
                    </span>
                  </div>
                </div>
              )}
              <RuledRow
                as='div'
                className='flex flex-col gap-1 pt-grid-half font-mono text-xs tracking-wider text-text-muted uppercase'
              >
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                <span>{readingMinutes(post)} min read</span>
              </RuledRow>
            </aside>

            <article className='lg:col-span-7 lg:col-start-5'>
              <BlogBody blocks={post.body} />
            </article>
          </div>
        </Section>

        {/* Newer and older posts */}
        {(newer || older) && (
          <Section>
            {/* Older on the left, newer on the right, each set to its outer
              edge with a rule between them */}
            <RuledList
              as='nav'
              aria-label='More posts'
              top
              className='grid md:grid-cols-2'
            >
              {older ? (
                <Link
                  href={`/blog/${older.slug}`}
                  className='group flex flex-col items-start gap-grid-half py-grid-1 no-underline md:py-grid-2 md:pr-grid-2'
                >
                  <span className='font-mono text-sm tracking-wider text-accent uppercase'>
                    <span
                      aria-hidden
                      className='mr-2 inline-block transition-transform group-hover:-translate-x-1'
                    >
                      ←
                    </span>
                    Older post
                  </span>
                  <span className='type-card-title text-balance transition-colors group-hover:text-text-muted'>
                    {older.title}
                  </span>
                </Link>
              ) : (
                <span aria-hidden className='hidden md:block' />
              )}
              {newer && (
                <Link
                  href={`/blog/${newer.slug}`}
                  className='group flex flex-col items-end gap-grid-half py-grid-1 text-right no-underline md:py-grid-2 md:pl-grid-2'
                >
                  <span className='font-mono text-sm tracking-wider text-accent uppercase'>
                    Newer post
                    <span
                      aria-hidden
                      className='ml-2 inline-block transition-transform group-hover:translate-x-1'
                    >
                      →
                    </span>
                  </span>
                  <span className='type-card-title text-balance transition-colors group-hover:text-text-muted'>
                    {newer.title}
                  </span>
                </Link>
              )}
            </RuledList>
          </Section>
        )}
        <Section>
          <SubscribeForm />
        </Section>
      </Band>
    </>
  )
}
