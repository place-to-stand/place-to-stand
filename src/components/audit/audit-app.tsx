'use client'

import { AuditWizard } from '@/src/components/audit/audit-wizard'
import { IntroScreen } from '@/src/components/audit/intro-screen'
import { ResultsView } from '@/src/components/audit/results-view'
import { useAudit } from '@/src/hooks/use-audit'

/** Top-level state machine for the audit: intro to wizard to results. */
export function AuditApp() {
  const { stage, answers, result, isScoring, setAnswer, start, submit, reset } =
    useAudit()

  if (stage === 'results' && result) {
    return <ResultsView result={result} onRestart={reset} />
  }

  if (stage === 'wizard') {
    return (
      <AuditWizard
        answers={answers}
        isScoring={isScoring}
        onAnswer={setAnswer}
        onSubmit={submit}
        onExit={reset}
      />
    )
  }

  return <IntroScreen onStart={start} />
}
