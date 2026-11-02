'use client'

import { useEffect, useRef } from 'react'
import { AuditLandingContent } from '@/src/components/audit/audit-landing'
import { AuditWizard } from '@/src/components/audit/audit-wizard'
import { CaptureGate } from '@/src/components/audit/capture-gate'
import { ResultsView } from '@/src/components/audit/results-view'
import { useAudit } from '@/src/hooks/use-audit'

/**
 * Top-level state machine for the audit: intro, wizard, the email capture,
 * then results.
 */
export function AuditApp() {
  const {
    stage,
    answers,
    result,
    isScoring,
    initialStepIndex,
    feedback,
    capturedLead,
    setAnswer,
    start,
    completeStep,
    submit,
    buildCapturedPayload,
    markCaptured,
    skipCapture,
    submitFeedback,
    reset,
  } = useAudit()

  // Each stage is a new screen, so it starts at the top. Without this the
  // results open wherever the email form had been scrolled to. Skips the
  // first render so a resumed session keeps the browser's own restoration.
  const previousStage = useRef(stage)
  useEffect(() => {
    if (previousStage.current === stage) return
    previousStage.current = stage
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [stage])

  // Only reachable straight from scoring, so the result is always in memory.
  // A refresh here lands on results instead, which carry their own capture.
  if (stage === 'capture' && result) {
    return (
      <CaptureGate
        result={result}
        buildCapturedPayload={buildCapturedPayload}
        onCaptured={markCaptured}
        onSkip={skipCapture}
      />
    )
  }

  if (stage === 'results') {
    // The result is rebuilt from stored answers on mount, so it can be briefly
    // absent. This must not fall through to the landing page: doing so is what
    // made a recoverable session look like lost work.
    if (!result) {
      return (
        <div className='w-full sm:py-grid-2'>
          <div className='relative bg-bg-panel p-card'>
            <span className='bp-label font-mono'>Audit Results</span>
            <p className='mt-intro text-base text-text-muted'>
              Rebuilding your results...
            </p>
          </div>
        </div>
      )
    }

    return (
      <ResultsView
        result={result}
        buildCapturedPayload={buildCapturedPayload}
        capturedLead={capturedLead}
        feedback={feedback}
        onCaptured={markCaptured}
        onFeedback={submitFeedback}
        onRestart={reset}
      />
    )
  }

  if (stage === 'wizard') {
    return (
      <AuditWizard
        answers={answers}
        isScoring={isScoring}
        initialStepIndex={initialStepIndex}
        onAnswer={setAnswer}
        onStepComplete={completeStep}
        onSubmit={submit}
        onExit={reset}
      />
    )
  }

  return <AuditLandingContent onStart={start} />
}
