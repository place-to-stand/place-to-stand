import { describe, expect, it } from 'vitest'
import { SITE_URL } from '@/src/lib/site'
import { buildLlmsFullTxt, buildLlmsTxt, WHEN_TO_USE } from './llms'
import { markdownPages } from './pages'

const LINK_LINE = /^- \[[^\]]+\]\(https?:\/\/[^)]+\)(: .+)?$/

describe('llms.txt', () => {
  const text = buildLlmsTxt()
  const lines = text.split('\n')

  it('starts with the H1 and a blockquote summary', () => {
    expect(lines[0]).toBe('# Place To Stand')
    expect(lines[1]).toBe('')
    expect(lines[2].startsWith('> ')).toBe(true)
  })

  it('has no headings other than the H1 before the first H2', () => {
    const firstH2 = lines.findIndex(line => line.startsWith('## '))
    expect(firstH2).toBeGreaterThan(2)
    const between = lines.slice(1, firstH2)
    expect(between.some(line => /^#/.test(line))).toBe(false)
  })

  it('tells agents when to use the agency, in the free-form block', () => {
    const firstH2 = lines.findIndex(line => line.startsWith('## '))
    const preamble = lines.slice(0, firstH2).join('\n')
    expect(preamble).toContain('When to use Place To Stand')
    expect(preamble).toContain('When not to use Place To Stand')
    expect(preamble).toContain('How to engage us')
    for (const item of WHEN_TO_USE) expect(preamble).toContain(`- ${item}`)
  })

  it('keeps every H2 section to link lines only, with Optional last', () => {
    const h2s = lines.filter(line => line.startsWith('## '))
    expect(h2s.at(-1)).toBe('## Optional')
    let inSection = false
    for (const line of lines) {
      if (line.startsWith('## ')) {
        inSection = true
        continue
      }
      if (!inSection || line.trim() === '') continue
      expect(line, `unexpected line in H2 section: ${line}`).toMatch(LINK_LINE)
    }
  })

  it('links every markdown page once', () => {
    for (const page of markdownPages) {
      const url = `${SITE_URL}${page.path === '/' ? '/' : page.path}`
      const count = lines.filter(line => line.includes(`](${url})`)).length
      expect(count, `${url} listed ${count} times`).toBe(1)
    }
    expect(text).toContain(`${SITE_URL}/llms-full.txt`)
  })
})

describe('llms-full.txt', () => {
  const text = buildLlmsFullTxt()

  it('opens with the guide and its when-to-use section', () => {
    expect(text.startsWith('# Place To Stand: full site text\n')).toBe(true)
    expect(text).toContain('\n## When to use Place To Stand\n')
    expect(text).toContain('\n## How to engage us\n')
  })

  it('includes every page as a section with its H1', () => {
    for (const page of markdownPages) {
      expect(text).toContain(`\n# ${page.title}\n`)
      expect(text).toContain(
        `<!-- ${SITE_URL}${page.path === '/' ? '/' : page.path} -->`
      )
    }
  })
})
