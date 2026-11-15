/**
 * SVG filters the client logos use, defined once for every page.
 *
 * #logo-lum: for full-color marks on a black outline (Hot Ones). Every pixel
 * turns white, as opaque as it is bright (times 1.3, so the yellow letter
 * lines read as fully white), times its own opacity. The mark's black
 * outline and fills drop out instead of sitting on the band as a dark shape,
 * and the faint gray fringe left around that outline from the file's
 * original background (which a brightness filter lifted into a halo) is
 * nearly transparent. The image file itself is untouched.
 */
export function LogoFilters() {
  return (
    <svg aria-hidden width='0' height='0' className='absolute'>
      <filter id='logo-lum' colorInterpolationFilters='sRGB'>
        <feColorMatrix
          type='matrix'
          values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.2764 0.9298 0.0939 0 0'
          result='lum'
        />
        <feComposite in='lum' in2='SourceAlpha' operator='in' />
      </filter>
    </svg>
  )
}
