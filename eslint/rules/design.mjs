/**
 * Design-system rules for the marketing site. Each rule enforces one line of
 * docs/design-system.md so drift fails `npm run lint` instead of waiting for
 * a review. They read class strings anywhere under a JSX `className` (string
 * literals, template literals, cn(...) arguments) and a few JSX elements.
 */

const DOC = 'docs/design-system.md'

/** Every string under a JSX attribute's value (cn('a', x && 'b'), `…`). */
function attributeStrings(attribute) {
  const out = []
  const visit = node => {
    if (!node || typeof node !== 'object') return
    if (node.type === 'Literal' && typeof node.value === 'string') {
      out.push({ node, value: node.value })
    } else if (node.type === 'TemplateElement') {
      out.push({ node, value: node.value.raw })
    }
    for (const key of Object.keys(node)) {
      if (key === 'parent') continue
      const child = node[key]
      if (Array.isArray(child)) child.forEach(visit)
      else if (child && typeof child.type === 'string') visit(child)
    }
  }
  visit(attribute?.value)
  return out
}

function attribute(node, name) {
  return node.attributes.find(
    attr => attr.type === 'JSXAttribute' && attr.name?.name === name
  )
}

function elementName(node) {
  const name = node.name
  if (name.type === 'JSXIdentifier') return name.name
  if (name.type === 'JSXMemberExpression') return name.property.name
  return ''
}

/** The utility itself, without variants (md:, hover:, group-hover:). */
const bare = cls => cls.split(':').pop().replace(/^!|!$/g, '')

function classRule({ description, message, test, allow = () => false }) {
  return {
    meta: {
      type: 'problem',
      docs: { description },
      schema: [],
      messages: { bad: message },
    },
    create(context) {
      return {
        JSXOpeningElement(node) {
          for (const { node: literal, value } of attributeStrings(
            attribute(node, 'className')
          )) {
            if (allow(value)) continue
            for (const cls of value.split(/\s+/).filter(Boolean)) {
              if (test(bare(cls))) {
                context.report({
                  node: literal,
                  messageId: 'bad',
                  data: { cls },
                })
              }
            }
          }
        },
      }
    },
  }
}

// Spacing: structure comes from the roles (gap-section, p-card, …) or the
// grid tokens (grid-half … grid-8). Raw Tailwind steps up to 2 (8px) are
// component micro-spacing, which CLAUDE.md allows sub-grid; anything larger,
// and any arbitrary [..] value, must be a role or grid token.
const SPACING =
  /^-?(?:p|px|py|pt|pr|pb|pl|ps|pe|m|mx|my|mt|mr|mb|ml|ms|me|gap|gap-x|gap-y|space-x|space-y|inset|inset-x|inset-y|top|right|bottom|left)-(.+)$/
const MICRO = new Set(['0', 'px', '0.5', '1', '1.5', '2', 'auto', 'full'])
export const noRawSpacing = classRule({
  description: 'Structural spacing uses the spacing roles or grid tokens',
  message: `${DOC} → Spacing roles: "{{cls}}" is a raw spacing value. Use a role (gap-section, gap-stack, p-card, …) or a grid token (grid-half … grid-8). Raw steps up to 2 (8px) are allowed for micro-spacing only.`,
  test(cls) {
    const m = SPACING.exec(cls)
    if (!m) return false
    const v = m[1]
    if (MICRO.has(v) || v.startsWith('(')) return false
    if (v.startsWith('[')) return /\d(?:px|rem)/.test(v)
    return /^\d+(?:\.\d+)?$/.test(v)
  },
})

// Text sizes: headings and labels use the type roles. Body sizes text-base
// and text-sm stay (the type floor), and 12px is allowed for short mono
// labels (text-xs with font-mono in the same class string); everything else
// is a role.
export const noRawTextSize = classRule({
  allow: value =>
    /(?:^|\s)font-mono(?:\s|$)/.test(value) &&
    !/(?:^|\s)(?:[\w-]+:)?text-(?:lg|xl|[2-9]xl)(?:\s|$)/.test(value),
  description: 'Text sizes come from the type roles',
  message: `${DOC} → Type roles: "{{cls}}" sets a raw text size. Use type-page-title, type-section-title, type-card-title, type-intro, type-stat, type-quote, type-fine or bp-label; body text is text-base (text-sm for fine print).`,
  test: cls =>
    /^text-(?:xs|lg|xl|[2-9]xl)$/.test(cls) ||
    /^text-\[\d[\d.]*(?:px|rem|em)\]$/.test(cls),
})

// Colours: tokens only. No Tailwind palette colours, no hex.
const PALETTE =
  /^(?:text|bg|border|ring|fill|stroke|outline|decoration|from|to|via|shadow)-(?:white|black|(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3})(?:\/\d+)?$/
export const noRawColor = classRule({
  description: 'Colours come from the tokens',
  message: `${DOC} → Colours: "{{cls}}" is a raw colour. Use a token (text-text, bg-bg-card, border-border, accent, accent-line, …).`,
  test: cls => PALETTE.test(cls) || /-\[#[0-9a-fA-F]{3,8}\]/.test(cls),
})

// Links: every text link is link-nav, link-action, link-inline or
// link-icon. A link that styles its own underline or accent colour is a
// fourth style. Card links (whole blocks) don't set text decoration and
// pass.
const ROLE = /(?:^|\s)link-(?:nav|action|inline|icon)(?:\s|$)/
const OWN_LINK_STYLE =
  /(?:^|\s)(?:[\w-]+:)?(?:underline|decoration-[\w/-]+|underline-offset-\d+|text-accent)(?:\s|$)/
export const linkRole = {
  meta: {
    type: 'problem',
    docs: { description: 'Text links use one of the three link roles' },
    schema: [],
    messages: {
      role: `${DOC} → Links: this link styles its own underline or accent colour. Use link-nav, link-action, link-inline (or SocialIcon / ArrowLink / AuditLink).`,
    },
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        if (!['a', 'Link', 'TrackedLink'].includes(elementName(node))) return
        const strings = attributeStrings(attribute(node, 'className')).map(
          s => s.value
        )
        const all = strings.join(' ')
        if (ROLE.test(all)) return
        if (OWN_LINK_STYLE.test(all)) {
          context.report({ node, messageId: 'role' })
        }
      },
    }
  },
}

// Sections: pages build sections from Section / PageHeader / CtaBand / Band.
// A raw <section> or a direct AnimatedSection in app/ bypasses the page-owned
// spacing.
export const sectionComponent = {
  meta: {
    type: 'problem',
    docs: { description: 'Pages use the shared section components' },
    schema: [],
    messages: {
      raw: `${DOC} → Components: use Section (and PageHeader, Band, CtaBand) instead of <{{name}}> so the page owns the gaps.`,
    },
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        const name = elementName(node)
        if (name === 'section' || name === 'AnimatedSection') {
          context.report({ node, messageId: 'raw', data: { name } })
        }
      },
    }
  },
}

export const rules = {
  'no-raw-spacing': noRawSpacing,
  'no-raw-text-size': noRawTextSize,
  'no-raw-color': noRawColor,
  'link-role': linkRole,
  'section-component': sectionComponent,
}
