import { clients, logoToneClass } from '@/src/lib/clients'

/** Seconds per logo, so the pace stays the same as the client list grows. */
const SECONDS_PER_LOGO = 5

/**
 * The audit page's "Trusted by" strip: every client logo on a slow loop,
 * sized and centred the same way as the homepage grid (`logoScale`,
 * `logoNudge`). The list is drawn twice and slides one copy's width
 * (`.marquee` in app/globals.css), pausing on hover and standing still for
 * reduced motion.
 */
export function AuditLogoMarquee() {
  return (
    <div className='marquee'>
      <ul
        className='marquee-track'
        style={{ animationDuration: `${clients.length * SECONDS_PER_LOGO}s` }}
      >
        {[...clients, ...clients].map((client, i) => {
          const copy = i >= clients.length
          return (
            <li
              key={`${client.title}-${i}`}
              aria-hidden={copy || undefined}
              className='flex h-grid-2 shrink-0 items-center px-grid-1 md:h-grid-3 md:px-grid-2'
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={client.logo}
                alt={copy ? '' : `${client.title} logo`}
                loading='lazy'
                decoding='async'
                style={{
                  height: `${(client.logoScale ?? 1) * 100}%`,
                  transform: client.logoNudge
                    ? `translateY(${client.logoNudge}%)`
                    : undefined,
                }}
                className={`w-auto opacity-80 ${logoToneClass(client)}`}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
