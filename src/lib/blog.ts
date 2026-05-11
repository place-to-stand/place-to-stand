import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

/**
 * Filesystem-backed blog.
 *
 * Each `.md` file under `content/blog` becomes a post. Frontmatter drives
 * metadata; the raw markdown body is parsed at build time and handed to
 * `react-markdown` on the page, so we never inject raw HTML. There is no
 * runtime filesystem access — all reads happen during static generation, so
 * this is safe to deploy on any Vercel runtime tier.
 */

const POSTS_DIR = path.join(process.cwd(), 'content', 'blog')

export type PostFrontmatter = {
  title: string
  description: string
  date: string
  author?: string
  tags?: string[]
}

export type PostSummary = PostFrontmatter & {
  slug: string
  readingTimeMinutes: number
}

export type Post = PostSummary & {
  content: string
}

function readPostFile(filename: string): Post {
  const slug = filename.replace(/\.md$/, '')
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf8')
  const { data, content } = matter(raw)

  const frontmatter = data as Partial<PostFrontmatter>

  if (!frontmatter.title || !frontmatter.date || !frontmatter.description) {
    throw new Error(
      `Blog post "${filename}" is missing required frontmatter (title, date, description).`
    )
  }

  // Rough reading-time heuristic: 220 words per minute, minimum 1.
  const words = content.trim().split(/\s+/).filter(Boolean).length
  const readingTimeMinutes = Math.max(1, Math.round(words / 220))

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date,
    author: frontmatter.author,
    tags: frontmatter.tags ?? [],
    readingTimeMinutes,
    content,
  }
}

function listPostFilenames(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter(name => name.endsWith('.md') && !name.startsWith('_'))
}

export function getAllPosts(): PostSummary[] {
  return listPostFilenames()
    .map(readPostFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(toSummary)
}

function toSummary(post: Post): PostSummary {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    author: post.author,
    tags: post.tags,
    readingTimeMinutes: post.readingTimeMinutes,
  }
}

export function getPostBySlug(slug: string): Post | null {
  const filename = `${slug}.md`
  const fullPath = path.join(POSTS_DIR, filename)
  if (!fs.existsSync(fullPath)) return null
  return readPostFile(filename)
}

export function getAllPostSlugs(): string[] {
  return listPostFilenames().map(name => name.replace(/\.md$/, ''))
}

/**
 * Latest N posts, newest first. Used by "Latest insights" surfaces on the
 * Team page and at the bottom of individual posts. Pass `excludeSlug` to
 * skip the post the reader is already on (for the "Other insights" block).
 */
export function getLatestPosts(
  limit: number,
  options: { excludeSlug?: string } = {}
): PostSummary[] {
  const { excludeSlug } = options
  return getAllPosts()
    .filter(post => post.slug !== excludeSlug)
    .slice(0, limit)
}

/**
 * Format an ISO date string (YYYY-MM-DD) into a long human-readable form.
 * Always renders in UTC so server/client output matches and we avoid hydration
 * mismatches around timezones.
 */
export function formatPostDate(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
