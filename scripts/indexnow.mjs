/**
 * Tells IndexNow (Bing, Yandex, Seznam, Naver) that the site changed, after a
 * production build on Vercel. Bing's index feeds ChatGPT search and Copilot, so
 * new pages and edits reach AI answers sooner than waiting for a crawl.
 *
 * The key file lives at public/<key>.txt; IndexNow fetches it to prove we own
 * the host. The key is public by design.
 *
 * Runs as `postbuild`. Skips everything except Vercel production builds, and
 * never fails the build: a missed ping only means Bing crawls on its own time.
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const HOST = 'placetostandagency.com'

if (process.env.VERCEL_ENV !== 'production') {
  process.exit(0)
}

try {
  const keyFile = readdirSync('public').find(f => /^[0-9a-f]{32}\.txt$/.test(f))
  if (!keyFile) throw new Error('no IndexNow key file in public/')
  const key = readFileSync(join('public', keyFile), 'utf8').trim()

  const sitemap = readFileSync('.next/server/app/sitemap.xml.body', 'utf8')
  const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])
  if (urlList.length === 0) throw new Error('sitemap has no URLs')

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key,
      keyLocation: `https://${HOST}/${keyFile}`,
      urlList,
    }),
    signal: AbortSignal.timeout(10_000),
  })
  console.log(`IndexNow: ${res.status} for ${urlList.length} URLs`)
} catch (error) {
  console.warn(
    'IndexNow ping skipped:',
    error instanceof Error ? error.message : error
  )
}
