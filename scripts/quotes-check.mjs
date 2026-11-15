/**
 * Typography check, run by scripts/voice.mjs: copy uses curly quotes
 * (’ ‘ “ ”), never straight ' or ". Copy means string literals and JSX text
 * that read as prose (a letter and a space), and blog post text. Code is
 * left alone: import paths, JSX attribute values, object keys, code-ish
 * keys (href, className, …), comparisons, calls like querySelector, and in
 * prose, URLs, markdown link targets, inline code, HTML tags and ${}.
 *
 * Opt a line out with `voice-ok` in a comment, or add to ALLOW_QUOTES.
 */
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const ts = require('typescript')

/** Real exceptions: copy that must keep a straight quote. */
export const ALLOW_QUOTES = []

const CODE_KEYS = new Set([
  'href',
  'src',
  'path',
  'url',
  'className',
  'id',
  'slug',
  'type',
  'key',
  'location',
  'as',
  'variant',
  'size',
  'icon',
  'tone',
  'side',
  'rel',
  'target',
  'method',
  'contentType',
  'pattern',
  'format',
  'lang',
  'locale',
  'color',
  'value',
  'event',
  'field',
  'route',
  'anchor',
  'hash',
  'image',
  'logo',
  'bottle',
  'photo',
  'file',
  'mime',
  'kind',
  'status',
  'action',
  'role',
  'mode',
  'tag',
  'tier',
  'scope',
  'domain',
  'email',
])
const SKIP_CALLS =
  /^(console\.\w+|require|import|cn|clsx|fetch|track|capture|posthog\.\w+|.*\.(querySelector|querySelectorAll|getElementById|addEventListener|setAttribute|getAttribute|includes|startsWith|endsWith|split|replace|replaceAll|match|test|indexOf|get|set|has|delete))$/
const PROTECT =
  /(\w+=(?:"[^"]*"|'[^']*')|https?:\/\/[^\s)'"]+|\]\([^)]*\)|`[^`]*`|<[^>]+>|\$\{[^}]*\})/g
const STRAIGHT = /\\'|\\"|&apos;|&#39;|&quot;|&#34;|'|"/

const isProse = s =>
  /[A-Za-z]/.test(s) &&
  /\s/.test(s.trim()) &&
  /['"]|&apos;|&quot;|&#39;|&#34;/.test(s)
const straightIn = text => {
  const plain = text.replace(PROTECT, '')
  const m = plain.match(STRAIGHT)
  return m && !ALLOW_QUOTES.some(re => re.test(text)) ? m[0] : null
}

/** Straight quotes in a .ts/.tsx file's copy: [{ line, text }]. */
function checkTs(file, src) {
  const kind = file.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, kind)
  const found = []
  const visit = node => {
    if (
      ts.isImportDeclaration(node) ||
      ts.isExportDeclaration(node) ||
      ts.isImportTypeNode(node) ||
      ts.isLiteralTypeNode(node) ||
      ts.isExternalModuleReference(node) ||
      ts.isThrowStatement(node) ||
      ts.isElementAccessExpression(node) ||
      ts.isComputedPropertyName(node) ||
      ts.isCaseClause(node) ||
      ts.isTaggedTemplateExpression(node)
    )
      return
    if (
      ts.isBinaryExpression(node) &&
      /^(===|!==|==|!=)$/.test(node.operatorToken.getText(sf))
    )
      return
    if (
      (ts.isCallExpression(node) || ts.isNewExpression(node)) &&
      SKIP_CALLS.test(node.expression.getText(sf))
    )
      return
    if (
      ts.isNewExpression(node) &&
      /RegExp|URL/.test(node.expression.getText(sf))
    )
      return
    if (ts.isJsxAttribute(node)) {
      // Plain HTML attributes (alt, aria-*, className) stay as they are; a
      // component's text props (title, intro, …) are copy, code props aren't.
      const tag = node.parent.parent.tagName.getText(sf)
      const name = node.name.getText(sf)
      if (
        /^[a-z]/.test(tag) ||
        CODE_KEYS.has(name) ||
        /^(aria-|data-)/.test(name)
      )
        return
    }
    const isStr =
      ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)
    if (isStr || ts.isJsxText(node)) {
      const p = node.parent
      if (isStr && ts.isPropertyAssignment(p)) {
        if (p.name === node) return
        if (CODE_KEYS.has(p.name.getText(sf).replace(/['"]/g, ''))) return
      }
      const raw = node.getText(sf)
      if (!isProse(isStr ? node.text : raw)) return
      const hit = straightIn(isStr ? raw.slice(1, -1) : raw)
      if (hit) {
        const line = sf.getLineAndCharacterOfPosition(node.getStart(sf)).line
        if (!src.split('\n')[line].includes('voice-ok'))
          found.push({ line: line + 1, text: raw.trim().slice(0, 60) })
      }
      return
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  return found
}

/** Straight quotes in a blog post's text: [{ line, text }]. */
function checkPost(src) {
  const post = JSON.parse(src)
  const lines = src.split('\n')
  const texts = [post.title, post.description]
  for (const b of post.body ?? []) {
    if (typeof b.text === 'string') texts.push(b.text)
    if (Array.isArray(b.items)) texts.push(...b.items)
  }
  return texts
    .filter(t => typeof t === 'string' && isProse(t) && straightIn(t))
    .map(t => {
      const key = JSON.stringify(t).slice(1, 40)
      return {
        line: lines.findIndex(l => l.includes(key)) + 1,
        text: t.slice(0, 60),
      }
    })
}

/** Problems for one file, in the voice check's format. */
export function quoteProblems(file) {
  const src = readFileSync(file, 'utf8')
  let found = []
  if (/^content\/blog\/.*\.json$/.test(file)) found = checkPost(src)
  else if (/^(src|app)\/.*\.tsx?$/.test(file) && !file.endsWith('.d.ts'))
    found = checkTs(file, src)
  return found.map(
    f => `${file}:${f.line}  straight quote (use ’ ‘ “ ”): ${f.text}`
  )
}
