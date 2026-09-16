import { buildLlmsFullTxt } from '@/src/lib/markdown/llms'

export const dynamic = 'force-static'

/** llms-full.txt: every page's markdown rendition in one document. */
export function GET() {
  return new Response(buildLlmsFullTxt(), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
