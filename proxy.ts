import { NextResponse, type NextRequest } from 'next/server'
import {
  MARKDOWN_CONTENT_TYPE,
  prefersMarkdown,
  withVaryAccept,
} from '@/src/lib/markdown/negotiation'
import {
  getMarkdownPage,
  normalizePath,
  renderMarkdownPage,
  renderNotFoundMarkdown,
} from '@/src/lib/markdown/pages'

/**
 * Markdown content negotiation (acceptmarkdown.com). A client that sends
 * `Accept: text/markdown` gets the markdown rendition of the page it asked for,
 * or a markdown 404 when there is no such page. Every other request passes
 * through to the HTML app. Both branches carry `Vary: Accept`, so a CDN keeps
 * the HTML and markdown variants of one URL apart.
 */

/**
 * Routes that exist as HTML (or as a file) but have no markdown rendition.
 * A markdown request for one of these passes through instead of 404ing, so
 * an agent is never told a real page does not exist.
 */
const HTML_ONLY_ROUTES = new Set([
  '/field-notes',
  '/referral/pdf',
  '/opengraph-image',
  '/twitter-image',
])

const PASSTHROUGH_PREFIXES = ['/api/', '/_next/', '/_vercel/']

function isPassthrough(pathname: string): boolean {
  if (PASSTHROUGH_PREFIXES.some(prefix => pathname.startsWith(prefix))) {
    return true
  }
  // Anything with a file extension (sitemap.xml, robots.txt, llms.txt,
  // images, fonts) is served as the file it is.
  return /\.[a-z0-9]+$/i.test(pathname)
}

function markdownResponse(body: string, status: number): NextResponse {
  return new NextResponse(body, {
    status,
    headers: {
      'Content-Type': MARKDOWN_CONTENT_TYPE,
      Vary: 'Accept',
      'Cache-Control':
        status === 200 ? 'public, max-age=3600, s-maxage=86400' : 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}

export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl
  const method = request.method.toUpperCase()

  if (
    (method === 'GET' || method === 'HEAD') &&
    !isPassthrough(pathname) &&
    prefersMarkdown(request.headers.get('accept'))
  ) {
    const page = getMarkdownPage(pathname)
    if (page) {
      return markdownResponse(renderMarkdownPage(page), 200)
    }
    if (!HTML_ONLY_ROUTES.has(normalizePath(pathname))) {
      return markdownResponse(renderNotFoundMarkdown(pathname), 404)
    }
  }

  const response = NextResponse.next()
  response.headers.set('Vary', withVaryAccept(response.headers.get('Vary')))
  return response
}

export const config = {
  // Page routes only; static assets and Next internals never negotiate.
  matcher: ['/((?!_next/|_vercel/|api/|.*\\.[a-z0-9]+$).*)'],
}
