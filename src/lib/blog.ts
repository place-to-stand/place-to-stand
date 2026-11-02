import fs from 'node:fs'
import path from 'node:path'

/**
 * Blog posts live in content/blog, one JSON file per post. The file name is
 * the slug (content/blog/my-post.json → /blog/my-post). To publish a post, add
 * a file in the same shape as the others.
 *
 * Text fields take a small inline markdown subset: **bold**, *italic* and
 * [links](https://…). See src/components/blog/rich-text.tsx.
 */

export type BlogBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }

export type BlogPost = {
  slug: string
  title: string
  /** One line under the title. Optional: the first paragraph stands in. */
  description: string
  /** Publish date, YYYY-MM-DD. */
  date: string
  author: string
  body: BlogBlock[]
}

const POSTS_DIR = path.join(process.cwd(), 'content/blog')

function readPost(slug: string): BlogPost {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.json`), 'utf8')
  return { slug, ...(JSON.parse(raw) as Omit<BlogPost, 'slug'>) }
}

/** Every post, newest first. */
export function getAllPosts(): BlogPost[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter(file => file.endsWith('.json'))
    .map(file => readPost(file.replace(/\.json$/, '')))
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find(post => post.slug === slug)
}

/** Plain text with the inline markdown removed, for meta tags and excerpts. */
export function plainText(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*|\*/g, '')
}

/** The post's description, or the start of its first paragraph. */
export function postSummary(post: BlogPost): string {
  if (post.description) return post.description
  const first = post.body.find(block => block.type === 'paragraph')
  if (!first) return ''
  const text = plainText(first.text)
  return text.length > 160 ? `${text.slice(0, 157).trimEnd()}…` : text
}

/** Reading time in minutes at 230 words a minute. */
export function readingMinutes(post: BlogPost): number {
  const words = post.body
    .flatMap(block => (block.type === 'list' ? block.items : [block.text]))
    .join(' ')
    .split(/\s+/).length
  return Math.max(1, Math.round(words / 230))
}

/** "April 1, 2026". Parsed as UTC so the day never shifts by time zone. */
export function formatPostDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
