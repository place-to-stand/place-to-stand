/**
 * Visual check: full-page screenshots of every page at four widths, compared
 * pixel by pixel against committed baselines in tests/visual/baselines (WebP
 * at quality 90: Chrome encodes the same page to the same bytes, and the files
 * are a fraction of the PNG size).
 *
 * Runs against a production build (VISUAL_URL, default localhost:3000) in the
 * Chrome already on the machine, with prefers-reduced-motion on so every
 * animation sits at its end state: the Home hero intro, drawings and reveals
 * are all settled and the screenshots are stable run to run.
 *
 *   npm run build && npm start
 *   npm run test:visual            # compare, writes diffs on failure
 *   npm run test:visual:update     # accept the current pages as the baseline
 *   npm run test:visual -- /about  # just some pages
 *
 * Photos and video are hidden (their frames stay), since their pixels vary a
 * little from run to run; logos stay. A page passes when no more than 0.05% of
 * its pixels differ (anti-aliasing noise). Failures write the new screenshot and a red diff image to
 * tests/visual/current and tests/visual/diff (both git-ignored).
 */
import { launch } from 'chrome-launcher'
import puppeteer from 'puppeteer-core'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const PAGES = [
  '/',
  '/platform',
  '/process',
  '/contact',
  '/clients',
  '/clients/heatonist',
  '/about',
  '/referral',
  '/audit',
  '/blog',
  '/blog/to-build-or-not-to-build',
  '/platform/portal',
  '/privacy',
  '/terms',
  '/nope-404',
]
const WIDTHS = [390, 768, 1024, 1440]
const TOLERANCE = 0.0005
const BASE = process.env.VISUAL_URL ?? 'http://localhost:3000'
const DIR = 'tests/visual'

const args = process.argv.slice(2)
const update = args.includes('--update')
const only = args.filter(a => a.startsWith('/'))
const pages = only.length ? only : PAGES
const slug = p => (p === '/' ? 'home' : p.slice(1).replace(/\//g, '-'))
for (const d of ['baselines', 'current', 'diff']) {
  mkdirSync(join(DIR, d), { recursive: true })
}

const chrome = await launch({
  // Software rendering keeps photos pixel-identical run to run.
  chromeFlags: [
    '--headless=new',
    '--hide-scrollbars',
    '--force-color-profile=srgb',
    '--disable-gpu',
    '--disable-partial-raster',
  ],
})
const browser = await puppeteer.connect({
  browserURL: `http://127.0.0.1:${chrome.port}`,
  defaultViewport: null,
})
const page = await browser.newPage()
await page.emulateMediaFeatures([
  { name: 'prefers-reduced-motion', value: 'reduce' },
])

// Compares two PNGs in the page with a canvas; returns the share of pixels
// that differ and a diff image (changed pixels in red over a faded copy).
async function compare(a, b) {
  return page.evaluate(
    async (aUrl, bUrl) => {
      const load = src =>
        new Promise((res, rej) => {
          const img = new Image()
          img.onload = () => res(img)
          img.onerror = rej
          img.src = src
        })
      const [ia, ib] = await Promise.all([load(aUrl), load(bUrl)])
      if (ia.width !== ib.width || ia.height !== ib.height) {
        return {
          ratio: 1,
          size: `${ia.width}x${ia.height} vs ${ib.width}x${ib.height}`,
        }
      }
      const c = document.createElement('canvas')
      c.width = ia.width
      c.height = ia.height
      const ctx = c.getContext('2d', { willReadFrequently: true })
      ctx.drawImage(ia, 0, 0)
      const da = ctx.getImageData(0, 0, c.width, c.height)
      ctx.clearRect(0, 0, c.width, c.height)
      ctx.drawImage(ib, 0, 0)
      const db = ctx.getImageData(0, 0, c.width, c.height)
      const out = ctx.createImageData(c.width, c.height)
      let changed = 0
      for (let i = 0; i < da.data.length; i += 4) {
        const d =
          Math.abs(da.data[i] - db.data[i]) +
          Math.abs(da.data[i + 1] - db.data[i + 1]) +
          Math.abs(da.data[i + 2] - db.data[i + 2])
        if (d > 60) {
          changed++
          out.data.set([255, 0, 0, 255], i)
        } else {
          const g = (db.data[i] + db.data[i + 1] + db.data[i + 2]) / 3
          out.data.set([g, g, g, 60], i)
        }
      }
      ctx.putImageData(out, 0, 0)
      return {
        ratio: changed / (c.width * c.height),
        diff: c.toDataURL('image/png').split(',')[1],
      }
    },
    `data:image/webp;base64,${a.toString('base64')}`,
    `data:image/webp;base64,${b.toString('base64')}`
  )
}

let failed = 0
let written = 0
for (const width of WIDTHS) {
  await page.setViewport({ width, height: 900, deviceScaleFactor: 1 })
  for (const path of pages) {
    const name = `${width}-${slug(path)}.webp`
    await page.goto(BASE + path, { waitUntil: 'load', timeout: 60000 })
    // Load every image (lazy ones too) and wait until each is decoded, so a
    // photo is never caught half-drawn; then settle at the top.
    await page.evaluate(async () => {
      document.querySelectorAll('img').forEach(img => (img.loading = 'eager'))
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y)
        await new Promise(r => setTimeout(r, 30))
      }
      await Promise.all(
        [...document.images].map(img =>
          img.complete
            ? img.decode().catch(() => {})
            : new Promise(r => {
                img.onload = img.onerror = r
              })
        )
      )
      window.scrollTo(0, 0)
      await document.fonts.ready
      // Photos and video vary by a few pixels from run to run; hide them so
      // the check compares layout, type, color and boxes (their frames stay).
      const style = document.createElement('style')
      style.textContent =
        'img:not([src*="/logos/"]), video { visibility: hidden !important }'
      document.head.append(style)
    })
    await new Promise(r => setTimeout(r, 400))
    const shot = Buffer.from(
      await page.screenshot({ fullPage: true, type: 'webp', quality: 90 })
    )
    const basePath = join(DIR, 'baselines', name)
    if (update || !existsSync(basePath)) {
      writeFileSync(basePath, shot)
      written++
      continue
    }
    const result = await compare(readFileSync(basePath), shot)
    if (result.ratio > TOLERANCE) {
      failed++
      writeFileSync(join(DIR, 'current', name), shot)
      if (result.diff) {
        writeFileSync(
          join(DIR, 'diff', name.replace('.webp', '.png')),
          Buffer.from(result.diff, 'base64')
        )
      }
      console.log(
        `FAIL ${name}: ${result.size ?? `${(result.ratio * 100).toFixed(2)}% of pixels changed`}`
      )
    }
  }
}
await browser.disconnect()
await chrome.kill()

if (written) console.log(`Wrote ${written} baseline screenshots.`)
const total = WIDTHS.length * pages.length - written
if (total) {
  console.log(
    failed
      ? `${failed} of ${total} screenshots changed. See ${DIR}/diff.`
      : `All ${total} screenshots match the baseline.`
  )
}
process.exit(failed ? 1 : 0)
