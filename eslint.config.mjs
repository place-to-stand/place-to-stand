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
    files: ['src/components/ui/**/*.tsx'],
    rules: {
      'design/no-raw-spacing': 'off',
      'design/no-raw-text-size': 'off',
    },
  },
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
