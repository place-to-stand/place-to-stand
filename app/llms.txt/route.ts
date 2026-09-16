import { buildLlmsTxt } from '@/src/lib/markdown/llms'

export const dynamic = 'force-static'

/** llms.txt per llmstxt.org: the site index written for language-model agents. */
export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
