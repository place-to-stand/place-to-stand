import { describe, it } from 'node:test'

import { RuleTester } from 'eslint'
import { design } from '../plugin.mjs'

RuleTester.describe = describe
RuleTester.it = it

const tester = new RuleTester({
  // The rules only read JSX, so ESLint's default parser is enough.
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
})

const run = (id, cases) => tester.run(id, design.rules[id], cases)

run('no-raw-spacing', {
  valid: [
    "<div className='flex gap-section py-band-pad' />",
    "<div className='gap-grid-half p-card md:px-grid-2' />",
    // micro-spacing up to 8px is allowed
    "<span className='gap-1.5 px-2 mt-0.5' />",
    "<div className={cn('gap-stack', open && 'pt-px')} />",
  ],
  invalid: [
    { code: "<div className='gap-4' />", errors: 1 },
    { code: "<div className='md:py-12' />", errors: 1 },
    { code: "<div className={cn('flex', 'mt-[13px]')} />", errors: 1 },
    { code: '<div className={`px-6 ${x}`} />', errors: 1 },
  ],
})

run('no-raw-text-size', {
  valid: [
    "<h2 className='type-section-title' />",
    "<p className='text-base text-text-muted' />",
    // 12px mono labels are allowed
    "<span className='font-mono text-xs uppercase' />",
  ],
  invalid: [
    { code: "<h3 className='text-2xl font-bold' />", errors: 1 },
    { code: "<p className='text-base md:text-lg' />", errors: 1 },
    { code: "<span className='text-xs' />", errors: 1 },
    { code: "<span className='text-[17px]' />", errors: 1 },
  ],
})

run('no-raw-color', {
  valid: ["<p className='text-danger bg-bg-card border-accent-line' />"],
  invalid: [
    { code: "<p className='text-red-400' />", errors: 1 },
    { code: "<div className='bg-white/80' />", errors: 1 },
    { code: "<div className='text-[#b5f542]' />", errors: 1 },
  ],
})

run('link-role', {
  valid: [
    "<Link href='/' className='link-nav' />",
    "<a className='link-inline'>Privacy</a>",
    "<Link href='/x' className='link-action'>Go</Link>",
    // card links style no text decoration
    "<Link href='/x' className='group block border border-border' />",
  ],
  invalid: [
    // the footer newsletter's old Privacy link
    {
      code: "<Link href='/privacy' className='underline underline-offset-4'>Privacy</Link>",
      errors: [{ messageId: 'role' }],
    },
    {
      code: "<a className='text-accent hover:underline'>Terms</a>",
      errors: [{ messageId: 'role' }],
    },
    {
      code: "<TrackedLink className='font-semibold decoration-accent-subtle' />",
      errors: [{ messageId: 'role' }],
    },
  ],
})

run('section-component', {
  valid: ["<Section className='flex' />", "<PageHeader title='x' />"],
  invalid: [
    { code: '<section className="py-20" />', errors: 1 },
    { code: '<AnimatedSection className="py-20" />', errors: 1 },
  ],
})
