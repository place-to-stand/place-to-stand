import type { Metadata } from 'next'
import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { pageMetadata } from '@/src/lib/page-metadata'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { BlogBody } from '@/src/components/blog/rich-text'
import { SubscribeForm } from '@/src/components/blog/subscribe-form'
import { JsonLd } from '@/src/components/seo/json-ld'
import { ORGANIZATION_ID } from '@/src/lib/structured-data'
import { absoluteUrl } from '@/src/lib/site'
import { team } from '@/src/lib/team'
import {
  formatPostDate,
  getAllPosts,
  getPost,
  postSummary,
  readingMinutes,
  type BlogPost,
} from '@/src/lib/blog'

export function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const post = getPost((await params).slug)
  if (!post) return {}
  const base = pageMetadata({
    title: post.title,
    description: postSummary(post),
    path: `/blog/${post.slug}`,
  })
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

function blogPostingJsonLd(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: postSummary(post),
    datePublished: post.date,
    url: absoluteUrl(`/blog/${post.slug}`),
    author: { '@type': 'Person', name: post.author, url: absoluteUrl('/team') },
    publisher: { '@id': ORGANIZATION_ID },
  }
}

export default function BlogPostPage({ params }: PageProps<'/blog/[slug]'>) {
  // The slug is read inside Suspense so the page shell, which every post
  // shares, stays free of URL data and can be prefetched once for all posts.
  return (
    <main className='flex-1 pt-10'>
      <Suspense fallback={<div className='min-h-svh' />}>
        <Post params={params} />
      </Suspense>

      <AnimatedSection className='pt-0! pb-grid-4! md:pb-grid-6!'>
        <SubscribeForm />
      </AnimatedSection>
    </main>
  )
}

async function Post({ params }: Pick<PageProps<'/blog/[slug]'>, 'params'>) {
  const { slug } = await params
  const posts = getAllPosts()
  const index = posts.findIndex(post => post.slug === slug)
  if (index === -1) notFound()

  const post = posts[index]
  // Newest first, so the next post along is the older one.
  const newer = posts[index - 1]
  const older = posts[index + 1]
  const author = team.find(member => member.name === post.author)

  return (
    <>
      <JsonLd data={blogPostingJsonLd(post)} />

      {/* Title block */}
      <AnimatedSection priority className='pb-grid-3! md:pb-grid-4!'>
        <div className='dots-hero flex flex-col gap-4'>
          <Link
            href='/blog'
            className='bp-label font-mono no-underline transition-colors hover:text-accent'
          >
            ← All posts
          </Link>
          <h1 className='max-w-5xl font-headline text-4xl leading-[.9]! font-bold text-balance text-text uppercase md:text-7xl'>
            {post.title}
          </h1>
          {post.description && (
            <p className='max-w-2xl text-base text-balance text-text-muted md:text-lg'>
              {post.description}
            </p>
          )}
        </div>
      </AnimatedSection>

      {/* Byline on the left third, the post in the body column */}
      <AnimatedSection className='pt-0! pb-grid-3! md:pb-grid-4!'>
        <div className='grid gap-grid-2 lg:grid-cols-12 lg:gap-x-grid-1'>
          <aside className='flex flex-col gap-4 lg:sticky lg:top-grid-4 lg:col-span-3 lg:self-start'>
            {author && (
              <div className='flex items-center gap-3'>
                <Image
                  src={author.image}
                  alt=''
                  width={48}
                  height={48}
                  className='size-12 rounded-full object-cover'
                />
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
            <div className='flex flex-col gap-1 border-t border-border pt-4 font-mono text-xs tracking-wider text-text-muted uppercase'>
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span>{readingMinutes(post)} min read</span>
            </div>
          </aside>

          <article className='lg:col-span-7 lg:col-start-5'>
            <BlogBody blocks={post.body} />
          </article>
        </div>
      </AnimatedSection>

      {/* Newer and older posts */}
      {(newer || older) && (
        <AnimatedSection className='pt-0! pb-grid-3! md:pb-grid-4!'>
          {/* Older on the left, newer on the right, each set to its outer
              edge with a rule between them */}
          <nav
            aria-label='More posts'
            className='grid divide-y divide-border border-y border-border md:grid-cols-2 md:divide-x md:divide-y-0'
          >
            {older ? (
              <Link
                href={`/blog/${older.slug}`}
                className='group flex flex-col items-start gap-3 py-grid-1 no-underline md:py-grid-2 md:pr-grid-2'
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
                <span className='font-headline text-xl leading-tight font-bold tracking-tight text-balance text-text uppercase transition-colors group-hover:text-accent md:text-2xl'>
                  {older.title}
                </span>
              </Link>
            ) : (
              <span aria-hidden className='hidden md:block' />
            )}
            {newer && (
              <Link
                href={`/blog/${newer.slug}`}
                className='group flex flex-col items-end gap-3 py-grid-1 text-right no-underline md:py-grid-2 md:pl-grid-2'
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
                <span className='font-headline text-xl leading-tight font-bold tracking-tight text-balance text-text uppercase transition-colors group-hover:text-accent md:text-2xl'>
                  {newer.title}
                </span>
              </Link>
            )}
          </nav>
        </AnimatedSection>
      )}
    </>
  )
}
