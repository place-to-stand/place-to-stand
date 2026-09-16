import { NextRequest } from 'next/server'
import { describe, expect, it } from 'vitest'
import { config, proxy } from './proxy'

const BROWSER_ACCEPT =
  'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'

function request(path: string, accept?: string, method = 'GET') {
  return new NextRequest(`https://placetostandagency.com${path}`, {
    method,
    headers: accept ? { accept } : {},
  })
}

/** NextResponse.next() marks a pass-through with this header. */
function isPassthrough(response: Response): boolean {
  return response.headers.get('x-middleware-next') === '1'
}

describe('proxy markdown negotiation', () => {
  it('serves markdown for a known page when asked', async () => {
    const response = proxy(request('/services', 'text/markdown'))
    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toBe(
      'text/markdown; charset=utf-8'
    )
    expect(response.headers.get('vary')).toBe('Accept')
    expect(isPassthrough(response)).toBe(false)
    const body = await response.text()
    expect(body.startsWith('# What we build')).toBe(true)
    expect(body).toContain('## Software Development')
  })

  it('serves the homepage markdown for /', async () => {
    const response = proxy(request('/', 'text/markdown, text/html;q=0.9'))
    expect(response.status).toBe(200)
    expect((await response.text()).startsWith('# ')).toBe(true)
  })

  it('returns a markdown 404 for a path that does not exist', async () => {
    const response = proxy(
      request('/some-path-that-does-not-exist', 'text/markdown')
    )
    expect(response.status).toBe(404)
    expect(response.headers.get('content-type')).toBe(
      'text/markdown; charset=utf-8'
    )
    expect(response.headers.get('vary')).toBe('Accept')
    expect(response.headers.get('cache-control')).toBe('no-store')
    const body = await response.text()
    expect(body).toContain('# 404')
    expect(body).toContain('https://placetostandagency.com/llms.txt')
    expect(body).toContain('https://placetostandagency.com/sitemap.xml')
  })

  it('passes HTML-only routes through rather than 404ing them', () => {
    for (const path of ['/field-notes', '/referral/pdf']) {
      const response = proxy(request(path, 'text/markdown'))
      expect(isPassthrough(response), path).toBe(true)
    }
  })

  it('passes files and API routes through untouched', () => {
    for (const path of [
      '/sitemap.xml',
      '/robots.txt',
      '/llms.txt',
      '/api/audit-progress',
    ]) {
      expect(isPassthrough(proxy(request(path, 'text/markdown'))), path).toBe(
        true
      )
    }
  })

  it('passes browsers through with Vary: Accept added', () => {
    const response = proxy(request('/services', BROWSER_ACCEPT))
    expect(isPassthrough(response)).toBe(true)
    expect(response.headers.get('vary')?.split(/,\s*/)).toContain('Accept')
  })

  it('passes requests with no Accept header through', () => {
    const response = proxy(request('/services'))
    expect(isPassthrough(response)).toBe(true)
    expect(response.headers.get('vary')).toContain('Accept')
  })

  it('never negotiates on non-GET requests', () => {
    const response = proxy(request('/contact', 'text/markdown', 'POST'))
    expect(isPassthrough(response)).toBe(true)
  })

  it('honours a markdown HEAD request', () => {
    const response = proxy(request('/team', 'text/markdown', 'HEAD'))
    expect(response.status).toBe(200)
  })
})

describe('proxy matcher', () => {
  const pattern = new RegExp(`^${config.matcher[0]}$`)

  it('matches page routes', () => {
    for (const path of ['/', '/services', '/some-path-that-does-not-exist']) {
      expect(pattern.test(path), path).toBe(true)
    }
  })

  it('skips Next internals, the API, and files', () => {
    for (const path of [
      '/_next/static/x.js',
      '/api/audit-progress',
      '/icon.png',
      '/sitemap.xml',
    ]) {
      expect(pattern.test(path), path).toBe(false)
    }
  })
})
