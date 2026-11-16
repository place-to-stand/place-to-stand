'use client'

import Link from 'next/link'
import { usePostHog } from 'posthog-js/react'
import type { ComponentProps } from 'react'

interface TrackedLinkProps extends ComponentProps<typeof Link> {
  /** Where on the site this CTA lives, e.g. 'header' or 'home-cta-block'. */
  location: string
}

/**
 * Drop-in replacement for next/link that reports a `cta_click` event with the
 * link's destination and placement, so conversion paths can be compared across
 * the different spots the same CTA appears.
 */
export function TrackedLink({ location, onClick, ...props }: TrackedLinkProps) {
  const posthog = usePostHog()

  return (
    <Link
      {...props}
      onClick={event => {
        posthog?.capture('cta_click', {
          destination:
            typeof props.href === 'string' ? props.href : String(props.href),
          location,
        })
        onClick?.(event)
      }}
    />
  )
}
