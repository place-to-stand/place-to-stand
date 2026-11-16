/**
 * SVG filters the client logos use, defined once for every page.
 *
 * #logo-lum: for full-color marks on a black outline (Hot Ones). Every pixel
 * turns white, with an opacity set by its red channel past a cutoff
 * (1.4 x red - 0.45), times its own opacity. The mark's yellow letter lines,
 * red flame and white chicken are all high in red and stay solid; its black
 * outline and fills drop out instead of sitting on the band as a dark shape;
 * and the neutral gray fringe left around that outline from the file's
 * original background (red ~0.29, which a brightness filter lifted into a
 * halo) falls below the cutoff and disappears. The image file is untouched.
 */
export function LogoFilters() {
  return (
    <svg aria-hidden width='0' height='0' className='absolute'>
      <filter id='logo-lum' colorInterpolationFilters='sRGB'>
        <feColorMatrix
          type='matrix'
          values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1.4 0 0 0 -0.45'
          result='lum'
        />
        <feComposite in='lum' in2='SourceAlpha' operator='in' />
      </filter>
    </svg>
  )
}
