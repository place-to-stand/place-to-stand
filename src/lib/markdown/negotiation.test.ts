import { describe, expect, it } from 'vitest'
import { parseAccept, prefersMarkdown, withVaryAccept } from './negotiation'

describe('parseAccept', () => {
  it('reads media ranges with their q-values', () => {
    expect(parseAccept('text/html, text/markdown;q=0.5')).toEqual([
      { type: 'text/html', q: 1 },
      { type: 'text/markdown', q: 0.5 },
    ])
  })

  it('ignores parameters other than q and clamps bad values', () => {
    expect(parseAccept('text/markdown;charset=utf-8;q=abc')).toEqual([
      { type: 'text/markdown', q: 0 },
    ])
    expect(parseAccept('text/markdown;q=7')).toEqual([
      { type: 'text/markdown', q: 1 },
    ])
  })

  it('returns nothing for a missing header', () => {
    expect(parseAccept(null)).toEqual([])
    expect(parseAccept(undefined)).toEqual([])
  })
})

describe('prefersMarkdown', () => {
  it('is true for a bare text/markdown request', () => {
    expect(prefersMarkdown('text/markdown')).toBe(true)
  })

  it('is true when markdown outranks or ties html', () => {
    expect(prefersMarkdown('text/markdown, text/html;q=0.9')).toBe(true)
    expect(prefersMarkdown('text/html, text/markdown')).toBe(true)
  })

  it('is false when html outranks markdown', () => {
    expect(prefersMarkdown('text/html, text/markdown;q=0.5')).toBe(false)
  })

  it('is false when markdown is refused with q=0', () => {
    expect(prefersMarkdown('text/markdown;q=0, */*')).toBe(false)
  })

  it('is false for a browser Accept header and for wildcards', () => {
    expect(
      prefersMarkdown(
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
      )
    ).toBe(false)
    expect(prefersMarkdown('*/*')).toBe(false)
    expect(prefersMarkdown('text/*')).toBe(false)
    expect(prefersMarkdown(null)).toBe(false)
  })

  it('is case-insensitive', () => {
    expect(prefersMarkdown('Text/Markdown')).toBe(true)
  })
})

describe('withVaryAccept', () => {
  it('adds Accept to an empty Vary', () => {
    expect(withVaryAccept(null)).toBe('Accept')
    expect(withVaryAccept('')).toBe('Accept')
  })

  it('keeps the existing values', () => {
    expect(withVaryAccept('rsc, Accept-Encoding')).toBe(
      'Accept, rsc, Accept-Encoding'
    )
  })

  it('does not duplicate Accept', () => {
    expect(withVaryAccept('accept, rsc')).toBe('accept, rsc')
  })
})
