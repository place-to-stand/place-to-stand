/**
 * WCAG AA contrast check for the color tokens, on dark and light bands.
 *
 * Reads the tokens straight from app/globals.css: the dark values in the
 * @theme block and the light overrides in `.theme-light`. Each pair below is
 * text the site actually sets on a background it actually uses. Translucent
 * backgrounds are blended over the band's page color first.
 *
 * AA: 4.5:1 for normal text, 3:1 for large text (24px+, or 19px+ bold) and for
 * non-text UI that identifies a control or its state, such as a focus ring.
 * Exits 1 on any failure there. Decorative lines (card borders, ruled rows)
 * and pairs the site doesn't use yet are reported as warnings: WCAG doesn't
 * require them, but they show where the palette is soft.
 *
 *   npm run test:contrast
 */
import { readFileSync } from 'node:fs'

const css = readFileSync('app/globals.css', 'utf8')

function block(selector) {
  const start = css.indexOf(selector)
  if (start === -1) throw new Error(`no ${selector} in globals.css`)
  const open = css.indexOf('{', start)
  let depth = 0
  for (let i = open; i < css.length; i++) {
    if (css[i] === '{') depth++
    if (css[i] === '}' && --depth === 0) return css.slice(open + 1, i)
  }
  throw new Error(`unclosed ${selector}`)
}
function tokens(text) {
  const out = {}
  for (const m of text.matchAll(/--color-([\w-]+):\s*([^;]+);/g)) {
    out[m[1]] = m[2].trim()
  }
  return out
}
const dark = tokens(block('@theme {'))
const light = { ...dark, ...tokens(block('.theme-light {')) }

function parse(value) {
  const hex = value.match(/^#([0-9a-f]{6})([0-9a-f]{2})?$/i)
  if (hex) {
    const n = parseInt(hex[1], 16)
    const a = hex[2] ? parseInt(hex[2], 16) / 255 : 1
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255, a]
  }
  const rgba = value.match(/^rgba?\(([^)]+)\)$/)
  if (rgba) {
    const [r, g, b, a = '1'] = rgba[1].split(/[\s,/]+/).filter(Boolean)
    return [Number(r), Number(g), Number(b), Number(a)]
  }
  throw new Error(`can't read color ${value}`)
}
function over(top, bottom) {
  const [r, g, b, a] = top
  return [
    r * a + bottom[0] * (1 - a),
    g * a + bottom[1] * (1 - a),
    b * a + bottom[2] * (1 - a),
    1,
  ]
}
function luminance([r, g, b]) {
  const lin = c => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}
function ratio(fg, bg) {
  const [a, b] = [luminance(fg), luminance(bg)].sort((x, y) => y - x)
  return (a + 0.05) / (b + 0.05)
}

// [foreground token, background token, minimum, what it is, level]
// level: 'required' fails the check; 'advisory' warns.
const PAIRS = [
  ['text', 'bg', 4.5, 'body text on the page', 'required'],
  ['text', 'bg-card', 4.5, 'body text on cards', 'required'],
  ['text', 'bg-elevated', 4.5, 'body text on hovered cards', 'required'],
  ['text', 'bg-panel', 4.5, 'body text on panels', 'required'],
  ['text-muted', 'bg', 4.5, 'muted text on the page', 'required'],
  ['text-muted', 'bg-card', 4.5, 'muted text on cards', 'required'],
  ['text-muted', 'bg-elevated', 4.5, 'muted text on hovered cards', 'required'],
  ['text-muted', 'bg-panel', 4.5, 'muted text on panels', 'required'],
  ['focus', 'bg', 3, 'focus rings (non-text, shows state)', 'required'],
  ['focus', 'bg-card', 3, 'focus rings on cards', 'required'],
  ['border', 'bg', 3, 'card borders (decorative)', 'advisory'],
  ['border', 'bg-card', 3, 'lines inside cards (decorative)', 'advisory'],
  ['rule', 'bg', 3, 'ruled-row lines (decorative)', 'advisory'],
]
// Pairs that appear on dark bands only (lime is never text on light).
const DARK_ONLY = [
  ['accent', 'bg', 4.5, 'lime text and labels on the page', 'required'],
  ['accent', 'bg-card', 4.5, 'lime stats on cards', 'required'],
  ['ink', 'accent', 4.5, 'button text on the lime button', 'required'],
  ['danger', 'bg', 4.5, 'form errors (forms sit on dark bands)', 'required'],
  ['danger', 'bg-card', 4.5, 'form errors on cards', 'required'],
]
// Light-band pairs the site doesn't use yet, reported so they're known.
const LIGHT_ONLY = [
  [
    'danger',
    'bg',
    4.5,
    'form errors, if a form ever sits on light',
    'advisory',
  ],
]

const failures = []
const warnings = []
function check(name, set, pairs) {
  console.log(`\n${name}`)
  for (const [fgName, bgName, min, what, level] of pairs) {
    const page = parse(set.bg)
    const bg = over(parse(set[bgName]), page)
    const fg = over(parse(set[fgName]), bg)
    const r = ratio(fg, bg)
    const ok = r >= min
    const mark = ok ? 'pass' : level === 'required' ? 'FAIL' : 'warn'
    console.log(
      `  ${mark}  ${r.toFixed(2).padStart(5)}:1 (needs ${min})  ${fgName} on ${bgName}: ${what}`
    )
    const line = `${name}: ${fgName} on ${bgName} ${r.toFixed(2)}:1 (${what})`
    if (!ok) (level === 'required' ? failures : warnings).push(line)
  }
}
check('Dark bands', dark, [...PAIRS, ...DARK_ONLY])
check('Light bands', light, [...PAIRS, ...LIGHT_ONLY])

if (warnings.length) {
  console.log(`\n${warnings.length} advisory:\n  ${warnings.join('\n  ')}`)
}
if (failures.length) {
  console.log(`\n${failures.length} below WCAG AA:\n  ${failures.join('\n  ')}`)
  process.exit(1)
}
console.log('\nEvery required pair meets WCAG AA.')
