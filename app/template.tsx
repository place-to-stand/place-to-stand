import { ViewTransition, type ReactNode } from 'react'

/**
 * Cross-fades page content on client-side navigation.
 *
 * A template rather than the layout: templates remount on every navigation, so
 * the outgoing page fires `exit` and the incoming one fires `enter`. Layouts
 * persist, so neither would ever fire there.
 *
 * `default="none"` limits this to those enter/exit events. Without it, any
 * transition inside a page (the audit wizard's steps, form submissions) would
 * cross-fade the whole page. The first load is not a transition, so it never
 * animates either, which keeps every page's headline eligible for LCP (see
 * `AnimatedSection`'s `priority`).
 *
 * The animations live in globals.css under "Page transitions".
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter='page-enter' exit='page-exit' default='none'>
      {children}
    </ViewTransition>
  )
}
