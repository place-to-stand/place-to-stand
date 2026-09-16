import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import sitemap from '@/app/sitemap'
import { SITE_URL } from '@/src/lib/site'
import {
  getMarkdownPage,
  markdownPages,
  normalizePath,
  renderMarkdownPage,
  renderNotFoundMarkdown,
} from './pages'

/** Clause titles from a legal page's TSX, so the markdown copy cannot drift. */
function clauseTitles(file: string): string[] {
  const source = readFileSync(file, 'utf8')
  return [
    ...source.matchAll(/<LegalSection[^>]*?title=(?:'([^']+)'|"([^"]+)")/g),
  ].map(m => m[1] ?? m[2])
}

describe('markdownPages', () => {
  it('covers every URL in the sitemap', () => {
    const sitemapPaths = sitemap().map(entry =>
      normalizePath(new URL(entry.url).pathname)
    )
    const markdownPaths = markdownPages.map(page => page.path)
    for (const path of sitemapPaths) {
      expect(markdownPaths, `missing markdown for ${path}`).toContain(path)
    }
  })

  it('lists only paths the sitemap knows about', () => {
    const sitemapPaths = new Set(
      sitemap().map(entry => normalizePath(new URL(entry.url).pathname))
    )
    for (const page of markdownPages) {
      expect(sitemapPaths.has(page.path), `${page.path} not in sitemap`).toBe(
        true
      )
    }
  })

  it('uses normalized paths, unique entries, and short labels', () => {
    const paths = markdownPages.map(page => page.path)
    expect(new Set(paths).size).toBe(paths.length)
    for (const page of markdownPages) {
      expect(page.label.length).toBeGreaterThan(0)
      expect(page.label.length).toBeLessThan(30)
    }
    for (const path of paths) {
      expect(path.startsWith('/')).toBe(true)
      expect(path === '/' || !path.endsWith('/')).toBe(true)
    }
  })

  it('gives every page an H1, a summary, and at least 500 characters', () => {
    for (const page of markdownPages) {
      const doc = renderMarkdownPage(page)
      expect(doc.startsWith(`# ${page.title}\n`)).toBe(true)
      expect(doc).toContain(`> ${page.description}`)
      expect(doc).toContain(
        `Canonical HTML: ${SITE_URL}${page.path === '/' ? '/' : page.path}`
      )
      expect(doc.length, `${page.path} is too short`).toBeGreaterThan(500)
    }
  })

  it('keeps heading levels sequential inside each page', () => {
    for (const page of markdownPages) {
      const levels = [...renderMarkdownPage(page).matchAll(/^(#{1,6}) /gm)].map(
        m => m[1].length
      )
      let previous = 0
      for (const level of levels) {
        expect(
          level - previous,
          `${page.path} jumps to h${level}`
        ).toBeLessThanOrEqual(1)
        previous = level
      }
    }
  })

  it('mirrors every clause heading of the privacy and terms pages', () => {
    const privacy = renderMarkdownPage(getMarkdownPage('/privacy')!)
    for (const title of clauseTitles('app/privacy/page.tsx')) {
      expect(privacy).toContain(`## ${title.replace(/&apos;/g, "'")}`)
    }
    const terms = renderMarkdownPage(getMarkdownPage('/terms')!)
    for (const title of clauseTitles('app/terms/page.tsx')) {
      expect(terms).toContain(`## ${title}`)
    }
    expect(clauseTitles('app/privacy/page.tsx').length).toBeGreaterThan(5)
  })

  it('describes the about page with contact facts', () => {
    const about = renderMarkdownPage(getMarkdownPage('/about')!)
    expect(about).toContain('hello@placetostandagency.com')
    expect(about).toContain('Austin, TX')
    expect(about).toContain('Brooklyn, NY')
  })
})

describe('getMarkdownPage', () => {
  it('matches with or without a trailing slash', () => {
    expect(getMarkdownPage('/services/')?.path).toBe('/services')
    expect(getMarkdownPage('/services')?.path).toBe('/services')
    expect(getMarkdownPage('/')?.path).toBe('/')
    expect(getMarkdownPage('')?.path).toBe('/')
  })

  it('returns nothing for unknown paths', () => {
    expect(getMarkdownPage('/nope')).toBeUndefined()
    expect(getMarkdownPage('/services/extra')).toBeUndefined()
  })
})

describe('renderNotFoundMarkdown', () => {
  it('names the path and points at the index, full text, and sitemap', () => {
    const doc = renderNotFoundMarkdown('/some-path-that-does-not-exist/')
    expect(doc.startsWith('# 404: Page not found')).toBe(true)
    expect(doc).toContain('`/some-path-that-does-not-exist`')
    expect(doc).toContain(`${SITE_URL}/llms.txt`)
    expect(doc).toContain(`${SITE_URL}/llms-full.txt`)
    expect(doc).toContain(`${SITE_URL}/sitemap.xml`)
    for (const page of markdownPages) {
      expect(doc).toContain(
        `](${SITE_URL}${page.path === '/' ? '/' : page.path})`
      )
    }
  })
})
