import type { Metadata } from 'next'
import Link from 'next/link'
import { pageMetadata } from '@/src/lib/page-metadata'
import { Band, Section } from '@/src/components/layout/section'
import { CtaBand } from '@/src/components/layout/cta-band'
import { SubscribeForm } from '@/src/components/blog/subscribe-form'
import {
  formatPostDate,
  getAllPosts,
  postSummary,
  readingMinutes,
} from '@/src/lib/blog'

export const metadata: Metadata = pageMetadata({
  title: 'Blog',
  description:
    'Notes on AI, software and how technology changes the way we work, from the Place To Stand team.',
  path: '/blog',
})

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className='flex-1 pt-page-start'>
      <Section priority className='pb-grid-2'>
        {/* What the blog covers on the left, why it exists on the right */}
        <div className='dots-hero grid gap-grid-1 lg:grid-cols-12 lg:gap-x-grid-1'>
          <div className='flex flex-col gap-intro lg:col-span-7'>
            <div className='flex flex-col gap-eyebrow'>
              <span className='bp-label font-mono'>Blog</span>
              <h1 className='max-w-4xl type-page-title text-balance'>
                Thinking out loud
              </h1>
            </div>
            <p className='max-w-2xl type-intro text-balance'>
              Notes on AI, software and how technology changes the way we work.
            </p>
          </div>
          <p className='type-lead text-pretty lg:col-span-4 lg:col-start-9 lg:self-end'>
            AI can produce an answer to anything now. What it can&apos;t give
            you is a point of view. These are ours.
          </p>
        </div>
      </Section>
      <Band tone='light'>
        <Section className='flex flex-col gap-section'>
          {/* One ruled row per post: title on the left, date and reading time
            on the right, where "Read" appears on hover */}
          <ul className='flex flex-col border-b border-border'>
            {posts.map(post => (
              // The hero's rule closes the top of the list, so the first row
              // drops its own border rather than doubling it.
              <li
                key={post.slug}
                className='border-t border-border first:border-t-0'
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className='group grid gap-grid-half py-grid-1 no-underline lg:grid-cols-12 lg:gap-x-grid-1 lg:py-grid-2'
                >
                  <div className='flex flex-col gap-grid-half lg:col-span-8'>
                    <h2 className='type-item-title text-balance transition-colors group-hover:text-text-muted'>
                      {post.title}
                    </h2>
                    <p className='type-intro'>{postSummary(post)}</p>
                  </div>
                  <div className='flex gap-grid-half font-mono text-xs tracking-wider text-text-muted uppercase lg:col-span-3 lg:col-start-10 lg:flex-col lg:items-end lg:gap-1 lg:text-right'>
                    <time dateTime={post.date}>
                      {formatPostDate(post.date)}
                    </time>
                    <span aria-hidden className='lg:hidden'>
                      ·
                    </span>
                    <span>{readingMinutes(post)} min read</span>
                    <span
                      aria-hidden
                      className='mt-grid-half hidden text-sm text-accent opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 lg:block'
                    >
                      Read →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <SubscribeForm />
        </Section>
      </Band>
      <CtaBand location='blog-cta-block' />
    </main>
  )
}
