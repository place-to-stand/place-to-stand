import Link from 'next/link'
import type { Route } from 'next'
import { cn } from '@/src/lib/utils'

/** A small mono link with an arrow, used under a section's content. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: Route | `/${string}#${string}`
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link href={href as Route} className={cn('link-action', className)}>
      <span className='link-label'>{children}</span>
      <span aria-hidden>&rarr;</span>
    </Link>
  )
}
