import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { LatestInsights } from '@/src/components/sections/latest-insights'
import {
  formatPostDate,
  getAllPostSlugs,
  getLatestPosts,
  getPostBySlug,
} from '@/src/lib/blog'

type BlogPostParams = {
  slug: string
}

type BlogPostRouteProps = {
  params: Promise<BlogPostParams>
}

export async function generateStaticParams() {
  return getAllPostSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({
  params,
}: BlogPostRouteProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return { title: 'Post not found' }
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostRouteProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const otherPosts = getLatestPosts(3, { excludeSlug: post.slug })
  const primaryTag = post.tags?.[0]

  return (
    <main className='flex-1'>
      <article className='mx-auto w-full max-w-3xl px-6 pb-16 pt-32 md:pt-40'>
        {/* Back link — primary tag if available, else generic */}
        <Link
          href='/blog'
          className='group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-ink/60 no-underline transition-colors hover:text-ink'
        >
          <ArrowLeft
            className='size-4 transition-transform group-hover:-translate-x-1'
            strokeWidth={2}
          />
          {primaryTag ? primaryTag : 'All posts'}
        </Link>

        {/* Header — Category | Date | Author breadcrumb above title */}
        <header className='mt-10 flex flex-col gap-5 border-b border-ink/15 pb-10'>
          <div className='flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-ink/55'>
            {primaryTag && (
              <>
                <span className='text-ink'>{primaryTag}</span>
                <span className='text-ink/25'>/</span>
              </>
            )}
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span className='text-ink/25'>/</span>
            <span>{post.readingTimeMinutes} min read</span>
            {post.author && (
              <>
                <span className='text-ink/25'>/</span>
                <span>By {post.author}</span>
              </>
            )}
          </div>
          <h1 className='font-headline text-3xl font-semibold uppercase !leading-[.95] text-ink md:text-5xl'>
            {post.title}
          </h1>
          <p className='max-w-2xl text-base !leading-snug text-ink/70 md:text-lg'>
            {post.description}
          </p>
        </header>

        {/* Body — react-markdown builds a React tree, no raw HTML injection. */}
        <div className='pts-prose mt-10'>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Soft narrative CTA in body voice — mirrors inspiration */}
        <div className='mt-12 border-t border-ink/15 pt-10 text-base !leading-relaxed text-ink/75 md:text-lg'>
          <p>
            At Place To Stand, we translate ideas like this into clear,
            practical builds for the businesses we partner with. If you want
            to talk through what it would look like in your specific context,
            we are happy to explore that together.{' '}
            <Link
              href='/book-a-call'
              className='font-semibold text-ink underline decoration-cyan decoration-2 underline-offset-4 hover:text-ink/70'
            >
              Book a call →
            </Link>
          </p>
        </div>
      </article>

      {/* Other insights */}
      {otherPosts.length > 0 && (
        <AnimatedSection className='max-w-none bg-gray-100 px-6 py-20 md:py-24'>
          <LatestInsights
            posts={otherPosts}
            eyebrow='Other insights'
            headline='Keep reading'
          />
        </AnimatedSection>
      )}
    </main>
  )
}
