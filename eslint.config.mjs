import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import { design } from './eslint/plugin.mjs'

const ICON_PRIMITIVE = 'src/components/primitives/icon.tsx'
const LUCIDE = {
  name: 'lucide-react',
  message:
    'Use the Icon primitive (@/src/components/primitives/icon): it fixes icon size and line width.',
}

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Design-system rules (eslint/rules/design.mjs, docs/design-system.md).
  {
    files: ['app/**/*.tsx', 'src/**/*.tsx'],
    plugins: { design },
    rules: {
      'design/no-raw-spacing': 'error',
      'design/no-raw-text-size': 'error',
      'design/no-raw-color': 'error',
      'design/no-raw-border': 'error',
      'design/no-raw-aspect': 'error',
      'design/no-raw-focus': 'error',
      'design/link-role': 'error',
    },
  },
  // Pages build their sections from Section / PageHeader / Band / CtaBand.
  // Components may use a semantic <section> inside themselves.
  {
    files: ['app/**/*.tsx'],
    plugins: { design },
    rules: { 'design/section-component': 'error' },
  },
  // shadcn-style UI primitives: their internal sizes and offsets are their
  // own API, used through Button, Input, Checkbox and friends.
  {
    files: [
      'src/components/primitives/{button,input,textarea,checkbox,label,toast,use-toast}.tsx',
    ],
    rules: {
      'design/no-raw-spacing': 'off',
      'design/no-raw-text-size': 'off',
      'design/no-raw-border': 'off',
    },
  },
  // The media frame is where aspect ratios live.
  {
    files: ['src/components/patterns/media-frame.tsx'],
    rules: { 'design/no-raw-aspect': 'off' },
  },
  // Where borders are allowed outside the shared boxes: the boxes
  // themselves and the corner marks; site chrome (header, footer, the hero's
  // closing rule, the logo square); form controls and the audit tool, whose
  // borders show state (selected, active step, locked); the portal flow's
  // step dots; and /design, which shows raw specimens.
  {
    files: [
      'src/components/boxes/*.tsx',
      'src/components/sections/header.tsx',
      'src/components/sections/footer.tsx',
      'src/components/primitives/logo-mark.tsx',
      'src/components/sections/hero-section.tsx',
      'src/components/sections/portal-flow.tsx',
      'src/components/primitives/heard-from-field.tsx',
      'src/components/sections/audit/**/*.tsx',
      'app/design/**/*.tsx',
    ],
    rules: { 'design/no-raw-border': 'off' },
  },
  // Icons: lucide-react is imported only by the Icon primitive, which fixes
  // size and line width (docs/design-system.md, Guidelines > Icons).
  {
    files: ['app/**/*.{ts,tsx}', 'src/**/*.{ts,tsx}'],
    ignores: [ICON_PRIMITIVE],
    rules: { 'no-restricted-imports': ['error', { paths: [LUCIDE] }] },
  },
  // Tiers: each tier imports only from the tiers below it
  // (docs/design-system.md, Tiers). Primitives < boxes < patterns <
  // sections < templates < pages. These blocks repeat the Lucide rule, since a
  // later no-restricted-imports replaces an earlier one for the same file.
  ...[
    ['primitives', ['boxes', 'patterns', 'sections', 'templates']],
    ['boxes', ['patterns', 'sections', 'templates']],
    ['patterns', ['sections', 'templates']],
    ['sections', ['templates']],
  ].flatMap(([tier, above]) => {
    const patterns = above.map(name => ({
      group: [`@/src/components/${name}`, `@/src/components/${name}/**`],
      message: `${tier} sit below ${name}: import only from lower tiers (docs/design-system.md, Tiers).`,
    }))
    const files = [`src/components/${tier}/**/*.{ts,tsx}`]
    return [
      {
        files,
        ignores: [ICON_PRIMITIVE],
        rules: {
          'no-restricted-imports': ['error', { paths: [LUCIDE], patterns }],
        },
      },
      ...(tier === 'primitives'
        ? [
            {
              files: [ICON_PRIMITIVE],
              rules: { 'no-restricted-imports': ['error', { patterns }] },
            },
          ]
        : []),
    ]
  }),
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Other Claude worktrees checked out inside this repo.
    '.claude/**',
  ]),
])

export default eslintConfig
