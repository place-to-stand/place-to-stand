import { describe, it } from 'node:test'

import { RuleTester } from 'oxlint/plugins-dev'
import { design } from '../plugin.mjs'

RuleTester.describe = describe
RuleTester.it = it

// Oxlint's RuleTester, so each case runs the rule the way `npm run lint`
// does. `eslintCompat` keeps ESLint's 1-based columns the cases were
// written against.
const tester = new RuleTester({
  eslintCompat: true,
  languageOptions: { sourceType: 'module', parserOptions: { lang: 'tsx' } },
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

run('no-raw-border', {
  valid: [
    "<Card className='flex flex-col gap-grid-1' />",
    "<RuledRow className='first:border-t-0 pt-grid-1' />",
    "<table className='border-collapse' />",
    "<div className='focus-visible:outline-2' />",
  ],
  invalid: [
    { code: "<div className='border border-border p-card' />", errors: 2 },
    { code: "<li className='border-t border-rule pt-grid-1' />", errors: 2 },
    { code: "<div className={cn('flex', 'border-l-4')} />", errors: 1 },
    { code: "<ul className='divide-y divide-border' />", errors: 2 },
    { code: "<a className='hover:border-accent' />", errors: 1 },
  ],
})

run('no-raw-focus', {
  valid: [
    "<button className='bg-bg-card text-text' />",
    "<input className='disabled:cursor-not-allowed disabled:text-text-muted' />",
    "<div className='opacity-60' />",
  ],
  invalid: [
    {
      code: "<input className='focus-visible:ring-1 focus-visible:ring-accent-subtle' />",
      errors: 2,
    },
    { code: "<a className='focus-visible:outline-2' />", errors: 1 },
    { code: "<div className='outline-none' />", errors: 1 },
    { code: "<button className='disabled:opacity-50' />", errors: 1 },
  ],
})

run('no-raw-aspect', {
  valid: [
    "<MediaFrame shape='work' className='w-full' />",
    "<div className='relative overflow-hidden' />",
  ],
  invalid: [
    { code: "<div className='aspect-[4/3] w-full' />", errors: 1 },
    { code: "<div className='md:aspect-[21/9]' />", errors: 1 },
    { code: "<div className={cn('aspect-square', x)} />", errors: 1 },
  ],
})
