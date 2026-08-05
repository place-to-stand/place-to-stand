'use client'

import { useEffect } from 'react'
import { usePostHog } from 'posthog-js/react'
import { RotateCcw } from 'lucide-react'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { TrackedLink } from '@/src/components/tracked-link'
import { Button } from '@/src/components/ui/button'
import { getAuditSessionSnapshot } from '@/src/lib/audit/session'

/**
 * Recovery screen for a client-side crash anywhere in the audit page.
 *
 * A finished audit that dies at the results swap is the worst failure on the
 * site: a paid click that produced answers, a score, and no lead. Before this
 * existed the crash fell through to Next's blank "Application error" page and
 * the visitor lost everything.
 *
 * Because the result is now rebuilt from stored answers (see
 * `isResultRecoverable`), retrying is usually enough to land the visitor back on
 * their own results with the email form intact. So the first retry happens
 * automatically and silently: on the happy path they see a flash, not an error.
 */

// Module scope on purpose: survives the boundary remounting, resets on a real
// page load. One silent retry, then we stop and let the visitor choose.
let autoRetried = false

export default function AuditError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const posthog = usePostHog()

  useEffect(() => {
    const session = getAuditSessionSnapshot()

    posthog?.capture('audit_render_failed', {
      error_name: error.name,
      error_message: error.message,
      digest: error.digest ?? null,
      session_id: session?.sessionId ?? null,
      session_status: session?.status ?? null,
      answers_count: session ? Object.keys(session.answers).length : 0,
      // The property that confirms or refutes the translation diagnosis in
      // production, which is the whole reason this event is worth capturing.
      page_translated: isPageTranslated(),
      auto_retried: autoRetried,
    })

    if (!autoRetried) {
      autoRetried = true
      reset()
    }
  }, [error, posthog, reset])

  return (
    <main className='flex-1 pt-grid-4 pb-32'>
      <div className='mx-auto w-full max-w-content px-6 lg:px-12'>
        <div className='relative max-w-2xl border border-border bg-bg-panel p-6 sm:p-8'>
          <BlueprintCorners size={16} />
          <span className='bp-label font-mono'>Audit</span>
          <h1 className='mt-4 font-headline text-2xl font-semibold tracking-tight text-text uppercase sm:text-3xl'>
            We hit a snag
          </h1>
          <p className='mt-4 text-sm text-text-muted'>
            Your answers are saved. Nothing you filled in was lost.
          </p>
          <p className='mt-2 text-sm text-text-muted'>
            Try again and we will take you straight to your results.
          </p>

          <div className='mt-6 flex flex-wrap items-center gap-4'>
            <Button type='button' onClick={reset}>
              <RotateCcw className='mr-2 h-4 w-4' />
              Show my results
            </Button>
            {/* The one conversion path that does not depend on the crashed
                tree re-rendering successfully. */}
            <TrackedLink
              href='/contact'
              location='audit-error-fallback'
              className='text-sm text-accent underline-offset-4 hover:underline'
            >
              Book a call instead
            </TrackedLink>
          </div>
        </div>
      </div>
    </main>
  )
}

/**
 * Best-effort signal that a translator has rewritten the DOM under React. Three
 * independent checks because it is not certain which of them Chrome's built-in
 * translation sets on Android.
 */
function isPageTranslated(): boolean {
  if (typeof document === 'undefined') return false

  const html = document.documentElement
  return (
    html.classList.contains('translated-ltr') ||
    html.classList.contains('translated-rtl') ||
    (html.lang !== '' && !html.lang.toLowerCase().startsWith('en')) ||
    document.getElementsByTagName('font').length > 0
  )
}
