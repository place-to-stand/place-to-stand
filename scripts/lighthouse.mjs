/**
 * Lab measurement for the routes we care about, so LCP regressions are caught
 * with numbers instead of vibes. PostHog field data is the source of truth for
 * what real visitors see, but this site's traffic gives only a handful of
 * $web_vitals samples per page, which is too thin to confirm a fix.
 *
 * Usage (needs a production build already serving on PERF_URL):
 *
 *   npm run build && npm start
 *   npm run perf                       # mobile preset, 3 runs, median
 *   npm run perf -- --desktop
 *   npm run perf -- --runs=5 /audit
 *
 * Lab numbers wobble run to run, hence the median. Compare like for like: same
 * machine, same preset, nothing else hammering the CPU.
 */
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const DEFAULT_ROUTES = ['/', '/audit', '/how-we-work']
const BASE_URL = process.env.PERF_URL ?? 'http://localhost:3000'
const OUT_DIR = '.lighthouse'

const args = process.argv.slice(2)
const desktop = args.includes('--desktop')
const runs = Number(args.find(a => a.startsWith('--runs='))?.split('=')[1] ?? 3)
const routes = args.filter(a => a.startsWith('/'))
const targets = routes.length > 0 ? routes : DEFAULT_ROUTES

const slug = route =>
  route === '/' ? 'home' : route.replace(/\//g, '-').replace(/^-/, '')
const median = values =>
  [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)]
const ms = value => `${Math.round(value)} ms`

function runLighthouse(url, outPath) {
  execFileSync(
    join('node_modules', '.bin', 'lighthouse'),
    [
      url,
      '--only-categories=performance',
      ...(desktop ? ['--preset=desktop'] : []),
      '--output=json',
      `--output-path=${outPath}`,
      '--chrome-flags=--headless=new',
      '--quiet',
    ],
    { stdio: ['ignore', 'ignore', 'inherit'] }
  )
  return JSON.parse(readFileSync(outPath, 'utf8'))
}

/**
 * The node Lighthouse observed as the LCP element. Note this comes from the
 * observed pass, while the LCP number above is Lantern's *simulated* estimate —
 * the two are not measurements of the same run, which is why they can disagree.
 * `npm run perf:lcp` is the trustworthy read on both.
 */
function lcpElement(report) {
  const items = report.audits['lcp-breakdown-insight']?.details?.items ?? []
  const node = items.find(i => i.type === 'node')
  return node?.selector ?? node?.snippet ?? 'unknown'
}

rmSync(OUT_DIR, { recursive: true, force: true })
mkdirSync(OUT_DIR, { recursive: true })

console.log(
  `Lighthouse · ${desktop ? 'desktop' : 'mobile'} · ${runs} run(s) · ${BASE_URL}\n`
)

const results = []

for (const route of targets) {
  const url = `${BASE_URL}${route}`
  const samples = []
  let last

  for (let i = 0; i < runs; i++) {
    process.stdout.write(`  ${route} … run ${i + 1}/${runs}\r`)
    last = runLighthouse(url, join(OUT_DIR, `${slug(route)}-${i + 1}.json`))
    samples.push({
      lcp: last.audits['largest-contentful-paint'].numericValue,
      fcp: last.audits['first-contentful-paint'].numericValue,
      tbt: last.audits['total-blocking-time'].numericValue,
      cls: last.audits['cumulative-layout-shift'].numericValue,
      score: last.categories.performance.score * 100,
    })
  }

  results.push({
    route,
    lcp: median(samples.map(s => s.lcp)),
    fcp: median(samples.map(s => s.fcp)),
    tbt: median(samples.map(s => s.tbt)),
    cls: median(samples.map(s => s.cls)),
    score: median(samples.map(s => s.score)),
    element: lcpElement(last),
  })
  process.stdout.write(' '.repeat(40) + '\r')
}

console.table(
  results.map(r => ({
    route: r.route,
    perf: Math.round(r.score),
    FCP: ms(r.fcp),
    LCP: ms(r.lcp),
    TBT: ms(r.tbt),
    CLS: r.cls.toFixed(3),
  }))
)

console.log('LCP element observed per route:')
for (const r of results) console.log(`  ${r.route}  ${r.element}`)
console.log(
  `\nLCP above is Lighthouse's simulated estimate and is largely insensitive to` +
    `\nentrance animations. Use "npm run perf:lcp" for what a browser actually records.` +
    `\n\nFull reports in ${OUT_DIR}/`
)
