/**
 * Speed budget for Home on a production build.
 *
 * Loads the page in the Chrome already on the machine, reads the real
 * PerformanceObserver timings (FCP, LCP, CLS) and the bytes of everything it
 * loaded on first view, on two presets:
 * - desktop: 1440x900, no throttling.
 * - mobile: 390x844, 4x CPU slowdown and slow 4G (150ms, 1.6Mbps down),
 *   roughly Lighthouse's mobile preset.
 * Each preset runs 3 times and the median is compared with the limits in
 * scripts/budget.json. Exits 1 if any metric is over its limit.
 *
 *   npm run build && npm start
 *   npm run test:budget
 *   npm run test:budget -- --report   # print numbers, don't fail
 */
import { launch } from 'chrome-launcher'
import puppeteer from 'puppeteer-core'
import { readFileSync } from 'node:fs'

const BASE = process.env.BUDGET_URL ?? 'http://localhost:3000'
const report = process.argv.includes('--report')
const limits = JSON.parse(readFileSync('scripts/budget.json', 'utf8'))
const RUNS = 3

const PRESETS = {
  desktop: { width: 1440, height: 900, mobile: false },
  mobile: {
    width: 390,
    height: 844,
    mobile: true,
    cpu: 4,
    network: { latency: 150, download: (1.6 * 1024 * 1024) / 8 },
  },
}

const chrome = await launch({ chromeFlags: ['--headless=new'] })
const browser = await puppeteer.connect({
  browserURL: `http://127.0.0.1:${chrome.port}`,
  defaultViewport: null,
})

async function measure(preset) {
  const page = await browser.newPage()
  const cdp = await page.createCDPSession()
  await cdp.send('Network.enable')
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true })
  await page.setViewport({
    width: preset.width,
    height: preset.height,
    isMobile: preset.mobile,
    deviceScaleFactor: preset.mobile ? 3 : 1,
  })
  if (preset.cpu)
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: preset.cpu })
  if (preset.network) {
    await cdp.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: preset.network.latency,
      downloadThroughput: preset.network.download,
      uploadThroughput: preset.network.download / 2,
    })
  }
  // Bytes count up to the load event: what Home needs for its first view,
  // not the routes Next prefetches afterwards.
  const bytes = { js: 0, css: 0, font: 0, image: 0, total: 0 }
  const types = new Map()
  let loaded = false
  cdp.on('Network.responseReceived', e => types.set(e.requestId, e.type))
  cdp.on('Network.loadingFinished', e => {
    if (loaded) return
    const kind = {
      Script: 'js',
      Stylesheet: 'css',
      Font: 'font',
      Image: 'image',
    }[types.get(e.requestId)]
    if (kind) bytes[kind] += e.encodedDataLength
    bytes.total += e.encodedDataLength
  })
  await page.evaluateOnNewDocument(() => {
    window.__v = { cls: 0 }
    new PerformanceObserver(list => {
      const e = list.getEntries()
      window.__v.lcp = e[e.length - 1].startTime
    }).observe({ type: 'largest-contentful-paint', buffered: true })
    new PerformanceObserver(list => {
      for (const e of list.getEntries())
        if (!e.hadRecentInput) window.__v.cls += e.value
    }).observe({ type: 'layout-shift', buffered: true })
  })
  await page.goto(BASE + '/', { waitUntil: 'load', timeout: 90000 })
  loaded = true
  await new Promise(r => setTimeout(r, preset.mobile ? 6000 : 3000))
  const v = await page.evaluate(() => ({
    fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
    ...window.__v,
  }))
  await page.close()
  return {
    fcp: Math.round(v.fcp),
    lcp: Math.round(v.lcp),
    cls: Number(v.cls.toFixed(3)),
    jsKB: Math.round(bytes.js / 1024),
    cssKB: Math.round(bytes.css / 1024),
    fontKB: Math.round(bytes.font / 1024),
    imageKB: Math.round(bytes.image / 1024),
    totalKB: Math.round(bytes.total / 1024),
  }
}

const median = values =>
  [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)]

let over = 0
for (const [name, preset] of Object.entries(PRESETS)) {
  const runs = []
  for (let i = 0; i < RUNS; i++) runs.push(await measure(preset))
  console.log(`\nHome, ${name} (median of ${RUNS})`)
  for (const metric of Object.keys(runs[0])) {
    const value = median(runs.map(r => r[metric]))
    const limit = limits[name]?.[metric]
    const bad = limit != null && value > limit
    if (bad) over++
    console.log(
      `  ${bad ? 'OVER' : 'ok  '}  ${metric.padEnd(8)} ${String(value).padStart(6)}${limit != null ? `  (limit ${limit})` : ''}`
    )
  }
}
await browser.disconnect()
await chrome.kill()
if (over && !report) {
  console.log(`\n${over} metric(s) over budget.`)
  process.exit(1)
}
