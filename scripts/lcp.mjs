/**
 * Direct LCP probe.
 *
 * Why this exists alongside `npm run perf`: Lighthouse reports a *simulated*
 * (Lantern) LCP, which is driven by the network graph and barely moves when the
 * thing actually delaying the headline is a CSS animation. It scored these pages
 * identically before and after a change that completely altered what the browser
 * measures. It is also not a reliable read on *which* element was chosen.
 *
 * This script reads the real PerformanceObserver entries out of a real page load
 * and reports both the timing and the element Chrome settled on. Use it, not the
 * Lighthouse number, to judge anything animation-related.
 *
 * Watch the element as much as the number. An element that first paints at
 * `opacity: 0` or under a `clip-path` is disqualified as an LCP candidate for
 * the life of the page, so a fast number can simply mean the real headline is
 * not being measured at all. If the reported element is the header logo, that is
 * what has happened.
 *
 * Usage (needs a production build already serving on PERF_URL):
 *
 *   npm run build && npm start
 *   npm run perf:lcp
 *   npm run perf:lcp -- --wait=12000 /audit
 *   npm run perf:lcp -- --no-throttle
 */
import { launch } from 'chrome-launcher'
import puppeteer from 'puppeteer-core'

const DEFAULT_ROUTES = ['/', '/audit', '/how-we-work']
const BASE_URL = process.env.PERF_URL ?? 'http://localhost:3000'

const args = process.argv.slice(2)
const throttle = !args.includes('--no-throttle')
const wait = Number(
  args.find(a => a.startsWith('--wait='))?.split('=')[1] ?? 10000
)
const routes = args.filter(a => a.startsWith('/'))
const targets = routes.length > 0 ? routes : DEFAULT_ROUTES

// Roughly Lighthouse's mobile profile, so numbers are comparable to `npm run perf`.
const MOBILE = {
  width: 412,
  height: 823,
  deviceScaleFactor: 1.75,
  isMobile: true,
  hasTouch: true,
}
const SLOW_4G = {
  offline: false,
  latency: 150,
  downloadThroughput: (1.6 * 1024 * 1024) / 8,
  uploadThroughput: (750 * 1024) / 8,
}

/** Collects every LCP candidate, then reports the last one Chrome settled on. */
function readLcp() {
  return new Promise(resolve => {
    const entries = []
    new PerformanceObserver(list => entries.push(...list.getEntries())).observe(
      {
        type: 'largest-contentful-paint',
        buffered: true,
      }
    )
    window.__lcpDone = () => {
      const last = entries[entries.length - 1]
      const paint = performance.getEntriesByName('first-contentful-paint')[0]
      resolve({
        lcp: last?.startTime ?? null,
        fcp: paint?.startTime ?? null,
        candidates: entries.length,
        size: last?.size ?? null,
        element: last?.element
          ? `${last.element.tagName.toLowerCase()}${last.element.className ? '.' + String(last.element.className).trim().split(/\s+/).slice(0, 2).join('.') : ''}`
          : null,
        text: last?.element?.textContent?.trim().slice(0, 60) ?? null,
      })
    }
  })
}

const chrome = await launch({
  chromeFlags: ['--headless=new', '--disable-gpu', '--no-sandbox'],
})
const browser = await puppeteer.connect({
  browserURL: `http://localhost:${chrome.port}`,
  defaultViewport: null,
})

console.log(
  `LCP probe · ${throttle ? 'mobile, 4x CPU, slow 4G' : 'unthrottled'} · ${wait}ms window · ${BASE_URL}\n`
)

const rows = []

try {
  for (const route of targets) {
    // A fresh browser context per route, so each one is measured cold. Sharing
    // one context lets route 2 onward reuse the CSS, fonts and JS that route 1
    // pulled down, which on a throttled connection is most of the critical path
    // — it made later routes look ~5x faster than a first-time visitor sees.
    const context = await browser.createBrowserContext()
    const page = await context.newPage()
    await page.setViewport(MOBILE)
    const cdp = await page.createCDPSession()

    if (throttle) {
      await cdp.send('Network.enable')
      await cdp.send('Network.emulateNetworkConditions', SLOW_4G)
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 })
    }

    // Register the observer before any page script runs, so no candidate is missed.
    await page.evaluateOnNewDocument(
      `window.__lcpReady = (${readLcp.toString()})()`
    )
    await page.goto(`${BASE_URL}${route}`, {
      waitUntil: 'load',
      timeout: 60000,
    })

    await new Promise(r => setTimeout(r, wait))
    const result = await page.evaluate(async () => {
      window.__lcpDone()
      return window.__lcpReady
    })

    rows.push({ route, ...result })
    await page.close()
    await context.close()
  }
} finally {
  await browser.disconnect()
  await chrome.kill()
}

const ms = v => (v == null ? 'n/a' : `${Math.round(v)} ms`)

console.table(
  rows.map(r => ({
    route: r.route,
    FCP: ms(r.fcp),
    LCP: ms(r.lcp),
    'LCP - FCP': r.lcp != null && r.fcp != null ? ms(r.lcp - r.fcp) : 'n/a',
    candidates: r.candidates,
  }))
)

console.log('LCP element per route:')
for (const r of rows) {
  console.log(
    `  ${r.route.padEnd(14)} ${r.element ?? 'none'}  ${r.text ? `"${r.text}"` : ''}`
  )
}
