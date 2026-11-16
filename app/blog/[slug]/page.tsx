import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { pageMetadata } from '@/src/lib/page-metadata'
import { JsonLd } from '@/src/components/seo/json-ld'
import { ArticleBody, ArticleShell } from '@/src/components/templates/article'
import { ORGANIZATION_ID } from '@/src/lib/structured-data'
import { absoluteUrl } from '@/src/lib/site'
import { team } from '@/src/lib/team'
import {
  getAllPosts,
  getPost,
  postSummary,
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
    author: {
      '@type': 'Person',
      name: post.author,
      url: absoluteUrl('/about'),
    },
    publisher: { '@id': ORGANIZATION_ID },
  }
}

export default function BlogPostPage({ params }: PageProps<'/blog/[slug]'>) {
  // The slug is read inside Suspense so the page shell, which every post
  // shares, stays free of URL data and can be prefetched once for all posts.
  return (
    <ArticleShell location='blog-post-cta-block'>
      <Post params={params} />
    </ArticleShell>
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
      <ArticleBody post={post} newer={newer} older={older} author={author} />
    </>
  )
}
