import Link from 'next/link'
import type { UrlObject } from 'url'
import { ArrowRight } from 'lucide-react'
import { formatPostDate, type PostSummary } from '@/src/lib/blog'

type LatestInsightsProps = {
  posts: PostSummary[]
  /** Section eyebrow. Defaults to "Latest insights". */
  eyebrow?: string
  /** Section heading. Defaults to "From the journal". */
  headline?: string
  /** Optional supporting paragraph under the headline. */
  description?: string
  /**
   * Optional "View all" link. Defaults to `/blog`. Accepts a `UrlObject` so
   * callers can pass paths without tripping the `typedRoutes` literal check
   * — matches the project's existing `nav-links.ts` pattern.
   */
  moreHref?: UrlObject
  /** Label for the "more" link. */
  moreLabel?: string
}

const DEFAULT_MORE_HREF: UrlObject = { pathname: '/blog' }

/**
 * Three-up grid of recent blog posts, styled to mirror the inspiration
 * site's "Latest insights" pattern: category | date | title | excerpt,
 * stacked vertically inside bordered cards. Used on the Team page and at
 * the bottom of every post.
 */
export function LatestInsights({
  posts,
  eyebrow = 'Latest insights',
  headline = 'From the journal',
  description,
  moreHref = DEFAULT_MORE_HREF,
  moreLabel = 'Discover more',
}: LatestInsightsProps) {
  if (posts.length === 0) return null

  return (
    <div className='mx-auto w-full max-w-6xl'>
      <div className='mb-10 flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between md:gap-8'>
        <div className='max-w-2xl'>
          <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
            {eyebrow}
          </span>
          <h2 className='mt-3 font-headline text-2xl font-semibold uppercase !leading-[.9] text-ink md:text-4xl'>
            {headline}
          </h2>
          {description && (
            <p className='mt-3 max-w-xl text-base text-ink/60 md:text-lg'>
              {description}
            </p>
          )}
        </div>
        <Link
          href={moreHref}
          className='group inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.1em] text-ink no-underline transition-colors hover:text-ink/70'
        >
          {moreLabel}
          <ArrowRight
            className='size-4 transition-transform group-hover:translate-x-1'
            strokeWidth={2}
          />
        </Link>
      </div>

      <div className='grid gap-5 md:grid-cols-3'>
        {posts.map(post => {
          const primaryTag = post.tags?.[0]
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className='group flex flex-col gap-3 border border-ink/15 bg-white p-6 no-underline transition-colors hover:border-ink hover:bg-white/90'
            >
              <div className='flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-ink/50'>
                {primaryTag && (
                  <>
                    <span className='text-ink'>{primaryTag}</span>
                    <span className='text-ink/25'>/</span>
                  </>
                )}
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              </div>
              <h3 className='font-headline text-lg font-semibold uppercase leading-tight text-ink transition-colors group-hover:text-ink/80 md:text-xl'>
                {post.title}
              </h3>
              <p className='text-sm leading-relaxed text-ink/70'>
                {post.description}
              </p>
              <span className='mt-auto inline-flex items-center gap-1 pt-2 text-xs font-semibold uppercase tracking-[0.1em] text-ink/60 transition-colors group-hover:text-ink'>
                Read insight
                <ArrowRight
                  className='size-3.5 transition-transform group-hover:translate-x-1'
                  strokeWidth={2}
                />
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
