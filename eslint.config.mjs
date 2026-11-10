import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import { design } from './eslint/plugin.mjs'

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
  // Tiers: each tier imports only from the tiers below it
  // (docs/design-system.md, Tiers). Primitives < boxes < patterns <
  // sections < templates < pages.
  ...[
    ['primitives', ['boxes', 'patterns', 'sections', 'templates']],
    ['boxes', ['patterns', 'sections', 'templates']],
    ['patterns', ['sections', 'templates']],
    ['sections', ['templates']],
  ].map(([tier, above]) => ({
    files: [`src/components/${tier}/**/*.{ts,tsx}`],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: above.map(name => ({
            group: [`@/src/components/${name}`, `@/src/components/${name}/**`],
            message: `${tier} sit below ${name}: import only from lower tiers (docs/design-system.md, Tiers).`,
          })),
        },
      ],
    },
  })),
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
