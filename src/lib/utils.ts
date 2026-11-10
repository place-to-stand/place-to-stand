import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * The spacing names from the @theme block in app/globals.css. tailwind-merge
 * only resolves conflicts between classes it recognises, so without these a
 * base `py-grid-3` and a later `py-0` both stayed on the element and the CSS
 * order, not the caller, decided which won.
 */
const SPACING = [
  'grid-half',
  'grid-1',
  'grid-2',
  'grid-3',
  'grid-4',
  'grid-5',
  'grid-6',
  'grid-8',
  'page-start',
  'page-top',
  'section',
  'edge',
  'header',
  'stack',
  'intro',
  'label',
  'eyebrow',
  'card',
  'callout',
  'band',
  'band-pad',
]

const twMerge = extendTailwindMerge({
  extend: { theme: { spacing: SPACING } },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
