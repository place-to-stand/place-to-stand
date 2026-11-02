'use client'

import { useEffect } from 'react'
import { usePostHog } from 'posthog-js/react'
import { CheckCircle2 } from 'lucide-react'
import { AuditProgress } from '@/src/components/audit/audit-progress'
import { EmailCaptureForm } from '@/src/components/audit/lead-forms'
import { QUESTIONS } from '@/src/lib/audit/questions'
import type {
  AuditLeadPayload,
  AuditProgressPayload,
} from '@/src/lib/audit/progress-payload'
import type { AuditResult } from '@/src/lib/audit/types'

interface CaptureGateProps {
  result: AuditResult
  buildCapturedPayload: (lead: AuditLeadPayload) => AuditProgressPayload | null
  onCaptured: (lead: AuditLeadPayload) => void
  onSkip: () => void
}

/**
 * The email ask, placed after the last answer and before the reveal: the
 * moment the visitor is most invested and most curious. Skipping is one
 * click and costs nothing, so the audit stays free.
 */
export function CaptureGate({
  result,
  buildCapturedPayload,
  onCaptured,
  onSkip,
}: CaptureGateProps) {
  const posthog = usePostHog()
  const count = result.recommendations.length

  useEffect(() => {
    posthog?.capture('audit_capture_viewed', {
      placement: 'gate',
      phase: result.phase.id,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='mx-auto max-w-5xl sm:py-grid-2'>
      <AuditProgress
        label='All questions answered'
        title='Your blueprint'
        currentIndex={QUESTIONS.length}
      />

      <div className='relative max-w-2xl pt-grid-1 sm:pt-grid-2'>
        <span className='inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-accent uppercase'>
          <CheckCircle2 aria-hidden className='h-4 w-4' />
          Analysis complete
        </span>
        <h2 className='mt-grid-half type-section-title uppercase'>
          Your blueprint is ready
        </h2>
        <p className='mt-3 text-base text-balance text-text-muted'>
          {count > 1
            ? `We found ${count} places custom software could give you leverage, ranked by where we'd start. `
            : 'We found where custom software could give you the most leverage. '}
          Where should we send your blueprint?
        </p>

        <EmailCaptureForm
          result={result}
          placement='gate'
          buildCapturedPayload={buildCapturedPayload}
          onCaptured={onCaptured}
          submitLabel='Send it and show me'
          className='mt-grid-1'
        />

        {/* Directly under the button, never below the fold: a hidden way out
            would make the free audit feel like a trap. */}
        <div className='mt-grid-half text-center'>
          <button
            type='button'
            onClick={onSkip}
            className='text-base text-text-muted underline underline-offset-4 transition-colors hover:text-text'
          >
            Skip, just show me my results
          </button>
        </div>

        <p className='mt-grid-1 border-t border-border pt-grid-half text-sm text-text-muted'>
          Reply to the email any time to talk to the engineers who&apos;d build
          it.
        </p>
      </div>
    </div>
  )
}
