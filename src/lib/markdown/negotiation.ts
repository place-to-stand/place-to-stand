/**
 * Accept-header negotiation for text/markdown, per acceptmarkdown.com: when a
 * client asks for `text/markdown`, serve markdown and say `Vary: Accept` so
 * caches keep the HTML and markdown variants apart.
 */

export const MARKDOWN_MEDIA_TYPE = 'text/markdown'
export const MARKDOWN_CONTENT_TYPE = 'text/markdown; charset=utf-8'

type AcceptEntry = { type: string; q: number }

/** Parse an Accept header into media ranges with their q-values. */
export function parseAccept(header: string | null | undefined): AcceptEntry[] {
  if (!header) return []
  return header
    .split(',')
    .map(part => part.trim())
    .filter(Boolean)
    .map(part => {
      const [rawType, ...params] = part.split(';')
      let q = 1
      for (const param of params) {
        const [key, value] = param.split('=').map(s => s.trim().toLowerCase())
        if (key === 'q') {
          const parsed = Number.parseFloat(value)
          q = Number.isFinite(parsed) ? Math.min(Math.max(parsed, 0), 1) : 0
        }
      }
      return { type: rawType.trim().toLowerCase(), q }
    })
}

function explicitQuality(entries: AcceptEntry[], type: string): number | null {
  const match = entries.find(entry => entry.type === type)
  return match ? match.q : null
}

/**
 * True when the client asked for markdown. Only an explicit `text/markdown`
 * range counts: `text/*` and `*​/*` do not, so browsers keep getting HTML. When
 * both markdown and HTML are listed, markdown wins ties, since a client that
 * names markdown at all is telling us it can use it.
 */
export function prefersMarkdown(header: string | null | undefined): boolean {
  const entries = parseAccept(header)
  const markdown = explicitQuality(entries, MARKDOWN_MEDIA_TYPE)
  if (markdown === null || markdown <= 0) return false
  const html = explicitQuality(entries, 'text/html')
  if (html === null) return true
  return markdown >= html
}

/**
 * Add `Accept` to a Vary header without dropping what is already there.
 * Returns the merged header value.
 */
export function withVaryAccept(existing: string | null | undefined): string {
  const parts = (existing ?? '')
    .split(',')
    .map(part => part.trim())
    .filter(Boolean)
  if (!parts.some(part => part.toLowerCase() === 'accept')) {
    parts.unshift('Accept')
  }
  return parts.join(', ')
}
