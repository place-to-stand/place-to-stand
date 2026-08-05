'use client'

import { AuditLandingContent } from '@/src/components/audit/audit-landing'
import { AuditWizard } from '@/src/components/audit/audit-wizard'
import { ResultsView } from '@/src/components/audit/results-view'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { useAudit } from '@/src/hooks/use-audit'

/** Top-level state machine for the audit: intro to wizard to results. */
export function AuditApp() {
  const {
    stage,
    answers,
    result,
    isScoring,
    initialStepIndex,
    sessionId,
    setAnswer,
    start,
    completeStep,
    submit,
    markCaptured,
    reset,
  } = useAudit()

  if (stage === 'results') {
    // The result is rebuilt from stored answers on mount, so it can be briefly
    // absent. This must not fall through to the landing page: doing so is what
    // made a recoverable session look like lost work.
    if (!result) {
      return (
        <div className='w-full py-grid-2'>
          <div className='relative border border-border bg-bg-panel p-6 sm:p-8'>
            <BlueprintCorners size={12} colorClassName='border-border-light' />
            <span className='bp-label font-mono'>Audit Results</span>
            <p className='mt-4 text-sm text-text-muted'>
              Rebuilding your results...
            </p>
          </div>
        </div>
      )
    }

    return (
      <ResultsView
        result={result}
        answers={answers}
        auditSessionId={sessionId}
        onCaptured={markCaptured}
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
