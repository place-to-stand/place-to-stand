/**
 * "Skip to content" (Guidelines > Accessibility): the first thing Tab
 * reaches on every page. Hidden until it has keyboard focus, then it sits
 * over the header's top-left corner; it jumps past the header to <main
 * id='main'>, which every page sets.
 */
export function SkipLink() {
  return (
    <a
      href='#main'
      className='sr-only bg-accent text-sm font-semibold tracking-wider text-ink uppercase focus:not-sr-only focus:fixed focus:top-grid-half focus:left-grid-half focus:z-(--z-toast) focus:px-grid-half focus:py-2'
    >
      Skip to content
    </a>
  )
}
