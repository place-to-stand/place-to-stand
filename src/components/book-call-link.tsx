'use client'

import { usePostHog } from 'posthog-js/react'
import { Button } from '@/src/components/ui/button'
import { bookingLink } from '@/src/lib/landing-pages'

type BookCallLinkProps = {
  label: string
  variantSlug?: string
  placement: 'hero' | 'bottom' | 'floating'
  buttonSize?: 'sm' | 'md' | 'lg'
  className?: string
}

export function BookCallLink({
  label,
  variantSlug,
  placement,
  buttonSize = 'lg',
  className,
}: BookCallLinkProps) {
  const posthog = usePostHog()

  function handleClick() {
    posthog?.capture('book_a_call_click', {
      variant: variantSlug,
      placement,
      label,
    })

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: 'AW-18004452791/4aXfCKGLl4YcELfLmIlD',
        value: 1.0,
        currency: 'USD',
      })
    }
  }

  return (
    <Button asChild size={buttonSize} className={className}>
      <a
        href={bookingLink}
        target='_blank'
        rel='noopener noreferrer'
        onClick={handleClick}
      >
        {label}
      </a>
    </Button>
  )
}
