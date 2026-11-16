/**
 * Accessibility check (docs/design-system.md, Guidelines > Accessibility):
 * every page at 390 and 1440, on a production build, in the Chrome already
 * on the machine.
 *
 * - axe-core against WCAG 2.2 A and AA. Fails on serious or critical issues;
 *   moderate and minor ones are listed.
 * - Headings: exactly one h1, and no skipped levels on the way down (an h2
 *   can't be followed by an h4).
 * - No id used twice (a label could point at the wrong element).
 * - "Skip to content" is the first thing Tab reaches and points at an
 *   existing <main id='main'>.
 *
 * Runs with reduced motion so reveals sit at their end state (a half-faded
 * heading would read as low contrast).
 *
 *   npm run build && npm start
 *   npm run test:a11y
 *   npm run test:a11y -- /about     # just some pages
 */
import { launch } from 'chrome-launcher'
import puppeteer from 'puppeteer-core'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'

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
const WIDTHS = [390, 1440]
const BASE = process.env.A11Y_URL ?? 'http://localhost:3000'
const FAIL_ON = new Set(['serious', 'critical'])

const only = process.argv.slice(2).filter(a => a.startsWith('/'))
const pages = only.length ? only : PAGES
const axeSource = readFileSync(
  createRequire(import.meta.url).resolve('axe-core/axe.min.js'),
  'utf8'
)

const chrome = await launch({ chromeFlags: ['--headless=new'] })
const browser = await puppeteer.connect({
  browserURL: `http://127.0.0.1:${chrome.port}`,
  defaultViewport: null,
})
const page = await browser.newPage()
await page.emulateMediaFeatures([
  { name: 'prefers-reduced-motion', value: 'reduce' },
])

const failures = []
const notes = []
for (const width of WIDTHS) {
  await page.setViewport({ width, height: 900 })
  for (const path of pages) {
    const where = `${path} @${width}`
    await page.goto(BASE + path, { waitUntil: 'load', timeout: 60000 })
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y)
        await new Promise(r => setTimeout(r, 30))
      }
      window.scrollTo(0, 0)
      await document.fonts.ready
    })

    // Skip link: the first Tab stop, pointing at <main id='main'>.
    await page.keyboard.press('Tab')
    const skip = await page.evaluate(() => {
      const el = document.activeElement
      return {
        first: el?.getAttribute('href') === '#main',
        main: document.querySelector('main#main') !== null,
      }
    })
    if (!skip.first)
      failures.push(`${where}  skip link is not the first Tab stop`)
    if (!skip.main)
      failures.push(`${where}  no <main id='main'> for the skip link`)

    // Duplicate ids: a label or aria reference can land on the wrong element.
    const dupes = await page.evaluate(() => {
      const seen = {}
      document
        .querySelectorAll('[id]')
        .forEach(e => (seen[e.id] = (seen[e.id] ?? 0) + 1))
      return Object.keys(seen).filter(id => seen[id] > 1)
    })
    for (const id of dupes)
      failures.push(`${where}  id "${id}" is used more than once`)

    // Headings.
    const levels = await page.evaluate(() =>
      [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')]
        .filter(h => h.getClientRects().length > 0)
        .map(h => [Number(h.tagName[1]), h.textContent.trim().slice(0, 40)])
    )
    const h1s = levels.filter(([l]) => l === 1).length
    if (h1s !== 1)
      failures.push(`${where}  ${h1s} h1 headings (needs exactly 1)`)
    levels.forEach(([level, text], i) => {
      const prev = i ? levels[i - 1][0] : 0
      if (level > prev + 1)
        failures.push(
          `${where}  h${level} "${text}" follows h${prev} (skips a level)`
        )
    })

    // axe, with focus cleared: the focused skip link sits over the header's
    // logo on purpose, which axe would read as two overlapping targets.
    await page.evaluate(() => document.activeElement?.blur())
    await page.evaluate(axeSource)
    const results = await page.evaluate(() =>
      window.axe.run(document, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
        },
      })
    )
    for (const v of results.violations) {
      const targets = v.nodes
        .slice(0, 3)
        .map(n => n.target.join(' '))
        .join(' | ')
      const line = `${where}  [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length}x) ${targets}`
      ;(FAIL_ON.has(v.impact) ? failures : notes).push(line)
    }
  }
}
await browser.disconnect()
await chrome.kill()

if (notes.length)
  console.log(`${notes.length} moderate/minor:\n  ${notes.join('\n  ')}\n`)
if (failures.length) {
  console.log(`${failures.length} problem(s):\n  ${failures.join('\n  ')}`)
  process.exit(1)
}
console.log(
  `Accessibility: ${pages.length} pages at ${WIDTHS.join(' and ')}, no serious or critical axe issues, headings in order, skip link first.`
)
