import { clients } from '@/src/lib/clients'
import { TrackedLink } from '@/src/components/primitives/tracked-link'
import { cn } from '@/src/lib/utils'

/**
 * The home hero's proof line (approved Nov 14): no box, just the Hot Ones and
 * Heatonist marks in white (the logo wall's treatment, small and optically
 * matched) and an action link to the Heatonist case study. Hot Ones uses a
 * white wordmark cut from its logo (its letter outlines only): the full badge
 * turns to mud in a white silhouette at this size.
 */
const MARKS = [
  {
    title: 'Hot Ones',
    src: '/logos/hot-ones-wordmark-white.png',
    height: 20,
  },
  { title: 'Heatonist', src: '/logos/heatonist.svg', height: 18 },
] as const

export function HeroProofLine({
  location,
  className,
}: {
  location: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-center gap-x-grid-1 gap-y-grid-half md:justify-start',
        className
      )}
    >
      <span className='flex items-center gap-grid-1'>
        {MARKS.map(mark => {
          const client = clients.find(c => c.title === mark.title)
          return (
            // eslint-disable-next-line @next/next/no-img-element -- small static marks, one SVG
            <img
              key={mark.title}
              src={mark.src}
              alt={`${client?.title ?? mark.title} logo`}
              decoding='async'
              style={{ height: mark.height }}
              className='w-auto opacity-80 brightness-0 invert'
            />
          )
        })}
      </span>
      <TrackedLink
        href='/clients/heatonist'
        location={location}
        className='link-action'
      >
        <span className='link-label'>See what we built for them</span>
        <span aria-hidden>&rarr;</span>
      </TrackedLink>
    </div>
  )
}
