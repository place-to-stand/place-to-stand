import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { formatPostDate, getAllPosts } from '@/src/lib/blog'

export const metadata = {
  title: 'Blog — Latest insights',
  description:
    'Featured articles on bespoke software, applied AI, automation, and proven results. Tips, trends, and notes from the build.',
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <main className='flex-1'>
      {/* Hero — full 80svh like other pages so text sits at the same y-position */}
      <AnimatedSection className='relative isolate flex min-h-[80svh] max-w-none flex-col items-center justify-center gap-6 overflow-hidden bg-white px-6 pb-16 pt-28 text-center text-ink md:px-8'>
        <div className='relative z-10 flex w-full max-w-4xl flex-col items-center gap-6 text-center'>
          <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
            Discover our latest insights
          </span>
          <h1 className='font-headline text-4xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl lg:text-6xl'>
            <span className='block'>Notes from</span>
            <span className='block'>the build.</span>
          </h1>
          <p className='max-w-xl text-balance text-base text-ink/60 md:text-lg'>
            Short pieces on bespoke software, applied AI, and the four-day
            production cycle — plus the occasional deep-dive.
          </p>
        </div>
      </AnimatedSection>

      {/* Post list — natural flow under the hero, matching the FAQ layout */}
      <AnimatedSection className='pb-16 md:pb-24'>
        {posts.length === 0 ? (
          <div className='mx-auto max-w-2xl border border-dashed border-ink/20 bg-white/50 p-12 text-center'>
            <p className='font-headline text-xl uppercase text-ink/70'>
              First post coming soon
            </p>
            <p className='mt-3 text-ink/60'>
              Drop a markdown file into{' '}
              <code className='rounded bg-ink/5 px-1.5 py-0.5 text-sm text-ink/80'>
                content/blog
              </code>{' '}
              and it will scaffold to a page on the next deploy.
            </p>
          </div>
        ) : (
          <ul className='mx-auto flex max-w-3xl flex-col'>
            {posts.map((post, i) => {
              const primaryTag = post.tags?.[0]
              return (
                <li
                  key={post.slug}
                  className={
                    i === 0
                      ? 'border-y border-ink/15'
                      : 'border-b border-ink/15'
                  }
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className='group flex flex-col gap-3 py-10 no-underline transition-colors hover:bg-white/50 md:py-12'
                  >
                    <div className='flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-ink/55'>
                      {primaryTag && (
                        <>
                          <span className='text-ink'>{primaryTag}</span>
                          <span className='text-ink/25'>/</span>
                        </>
                      )}
                      <time dateTime={post.date}>
                        {formatPostDate(post.date)}
                      </time>
                      <span className='text-ink/25'>/</span>
                      <span>{post.readingTimeMinutes} min read</span>
                    </div>
                    <h2 className='font-headline text-2xl font-semibold uppercase leading-tight text-ink transition-colors group-hover:text-ink/75 md:text-3xl'>
                      {post.title}
                    </h2>
                    <p className='max-w-2xl text-base leading-relaxed text-ink/70'>
                      {post.description}
                    </p>
                    <span className='mt-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-ink/70 transition-colors group-hover:text-ink'>
                      Read insight
                      <ArrowRight
                        className='size-4 transition-transform group-hover:translate-x-1'
                        strokeWidth={2}
                      />
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </AnimatedSection>

      {/* Soft CTA — inspiration voice, not a heavy hero pad */}
      <AnimatedSection className='flex max-w-none flex-col items-center gap-5 bg-white px-6 py-20 text-center md:py-24'>
        <h2 className='max-w-3xl text-balance font-headline text-2xl font-semibold uppercase !leading-[.9] text-ink md:text-4xl'>
          Like how we think? Let&apos;s talk.
        </h2>
        <p className='max-w-xl text-balance text-base text-ink/60 md:text-lg'>
          We are always happy to discuss your challenge. Reach out and we will
          connect you with the right person on the team.
        </p>
        <Link
          href='/book-a-call'
          className='group mt-2 inline-flex items-center border border-ink/30 text-sm uppercase tracking-[0.1em] text-ink no-underline transition-colors duration-300 hover:bg-ink hover:text-white'
        >
          <span className='px-4 py-3 font-semibold transition-transform duration-300 group-hover:translate-x-1'>
            Book a call
          </span>
          <span className='flex items-center justify-center self-stretch border-l border-ink/30 px-3 transition-colors duration-300 group-hover:border-cyan group-hover:bg-cyan'>
            <ArrowRight
              className='size-4 transition-all delay-75 duration-200 group-hover:translate-x-1 group-hover:text-ink'
              strokeWidth={2}
            />
          </span>
        </Link>
      </AnimatedSection>
    </main>
  )
}
