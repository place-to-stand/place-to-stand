/**
 * Voice check (docs/design-system.md, Guidelines > Voice): fails on the
 * banned phrases and on British spellings anywhere in the site's text, in
 * app/, src/, public/ (llms.txt and other text files) and content/ (blog
 * posts). Runs as part of `npm run lint`.
 *
 * /design is skipped: it quotes the banned phrases to explain the rules.
 * A line can opt out with `voice-ok` in a comment on the same line, for
 * quoted third-party text (a report title, a URL); JSON files, which can't
 * hold comments, use the ALLOW list instead.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const ROOTS = ['app', 'src', 'public', 'content']
const SKIP = [/^app\/design\//]
const EXTENSIONS = /\.(tsx?|mjs|js|json|md|txt)$/

const BANNED = [
  [/fine-tuned/i, 'fine-tuned (say "tuned")'],
  [/\b3-5x\b/i, '3-5x (use "up to 5x")'],
  [/fractional cto/i, 'Fractional CTO (say "technical consulting")'],
  [/small business/i, 'small business'],
  [/next\.js (agency|development)/i, 'Next.js agency/development'],
  [/duct-tap/i, 'duct-tape'],
  [/move the needle/i, 'move the needle'],
  [/earns its keep/i, 'earns its keep'],
  [/telephone game/i, 'telephone game'],
  [/shopify alone can/i, `what Shopify alone can't`],
]
const BRITISH = [
  /\bcolour(s|ed|ing|ful)?\b/i,
  /\bcentre(s|d)?\b/i,
  /\bgrey(s|ed|ish)?\b/i,
  /\blicence(s|d)?\b/i,
  /\bbehaviour(s|al)?\b/i,
  /\bfavourite(s)?\b/i,
  /\bcatalogue(s|d)?\b/i,
  /\bprogramme(s)?\b/i,
  /(?<!aria-)\blabelled\b/i,
  /\bcancelled\b/i,
  /\bfulfil(s|ment)?\b/i,
  /\bwhilst\b/i,
  /\bamongst\b/i,
  /\bmetres?\b/i,
  /\btheatres?\b/i,
  /\bdefence\b/i,
  /\bpractise(s|d)?\b/i,
  /\b\w*(organis|recognis|optimis|customis|prioritis|summaris|categoris|visualis|standardis|minimis|maximis|apologis|authoris|realis|emphasis|initialis|analys)(e|es|ed|ing|ation|ations)\b/i,
]
// Quoted third-party text in files that can't hold a voice-ok comment (JSON).
const ALLOW = [
  /UK Adults' Behaviour and Attitudes/,
  /adults-behaviour-and-attitudes/,
]

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) walk(path, out)
    else if (EXTENSIONS.test(name)) out.push(path)
  }
  return out
}

const problems = []
for (const file of ROOTS.flatMap(root => walk(root))) {
  if (SKIP.some(re => re.test(file))) continue
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      if (line.includes('voice-ok')) return
      for (const [re, label] of BANNED) {
        if (re.test(line))
          problems.push(`${file}:${i + 1}  banned phrase: ${label}`)
      }
      const text = ALLOW.reduce(
        (t, re) => t.replace(new RegExp(re, 'g'), ''),
        line
      )
      for (const re of BRITISH) {
        const m = text.match(re)
        if (m) problems.push(`${file}:${i + 1}  British spelling: "${m[0]}"`)
      }
    })
}

if (problems.length) {
  console.log(
    `Voice check: ${problems.length} problem(s)\n  ${problems.join('\n  ')}`
  )
  process.exit(1)
}
console.log('Voice check: no banned phrases or British spellings.')
