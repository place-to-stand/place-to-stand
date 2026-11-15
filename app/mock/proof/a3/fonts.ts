import { Bangers, Open_Sans, Passion_One, Poppins } from 'next/font/google'

/**
 * The clients' own type, for the mock widgets only (loaded by this page, set
 * as variables on the panel, so nothing leaks into the site):
 * - Passion One: hotones.com's card numbers, names, notes and headline (the
 *   same Google font they use).
 * - Bangers: stands in for the brush script on their "Flip for more!" badge
 *   (theirs, ccsignlanguage, is custom).
 * - Poppins and Open Sans: heatonist.com's headings and body (the same Google
 *   fonts they use).
 */
export const passionOne = Passion_One({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-passion-one',
  display: 'swap',
})
export const bangers = Bangers({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bangers',
  display: 'swap',
})
export const poppins = Poppins({
  weight: ['700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})
export const openSans = Open_Sans({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
})

export const CLIENT_FONTS = [passionOne, bangers, poppins, openSans]
  .map(f => f.variable)
  .join(' ')
