'use client'

import { AuditLandingContent } from '@/src/components/audit/audit-landing'
import { AuditWizard } from '@/src/components/audit/audit-wizard'
import { ResultsView } from '@/src/components/audit/results-view'
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

  if (stage === 'results' && result) {
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
