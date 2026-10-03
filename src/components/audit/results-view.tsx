'use client'

import { useEffect, useState } from 'react'
import { usePostHog } from 'posthog-js/react'
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Contact,
  LayoutDashboard,
  Lock,
  type LucideIcon,
  Mail,
  Network,
  RefreshCw,
  RotateCcw,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Users,
  Workflow,
} from 'lucide-react'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import {
  FeedbackCard,
  type FeedbackCardProps,
} from '@/src/components/audit/feedback-card'
import {
  EmailCaptureForm,
  LeadDetailsForm,
} from '@/src/components/audit/lead-forms'
import { TrackedLink } from '@/src/components/tracked-link'
import { Button } from '@/src/components/ui/button'
import { cn } from '@/src/lib/utils'
import { PHASE_ORDER, PHASES } from '@/src/lib/audit/phases'
import type {
  AuditLeadPayload,
  AuditProgressPayload,
} from '@/src/lib/audit/progress-payload'
import type { AuditResult, PhaseId } from '@/src/lib/audit/types'

interface ResultsViewProps {
  result: AuditResult
  /** Builds the `captured` payload the server action forwards to the portal. */
  buildCapturedPayload: (lead: AuditLeadPayload) => AuditProgressPayload | null
  /** Set once this visitor has given an email; unlocks the full blueprint. */
  capturedLead: AuditLeadPayload | null
  feedback: FeedbackCardProps['initial']
  onCaptured: (lead: AuditLeadPayload) => void
  onFeedback: FeedbackCardProps['onSubmit']
  onRestart: () => void
}

/** Maps service icon names to their lucide components. */
const SERVICE_ICONS: Record<string, LucideIcon> = {
  Workflow,
  LayoutDashboard,
  Users,
  Network,
  Contact,
  ShoppingCart,
  Smartphone,
  Sparkles,
  BarChart3,
  RefreshCw,
}

/** Anchor for the "get the full blueprint" links that point at the form. */
const CAPTURE_ANCHOR = 'audit-blueprint'

/** First word of a phase name, for compact stepper / chart labels. */
function shortPhaseName(id: PhaseId): string {
  return PHASES[id].name.split(' & ')[0]
}

export function ResultsView({
  result,
  buildCapturedPayload,
  capturedLead,
  feedback,
  onCaptured,
  onFeedback,
  onRestart,
}: ResultsViewProps) {
  const posthog = usePostHog()
  const { phase, phaseScores, recommendations } = result
  const maxScore = Math.max(1, ...Object.values(phaseScores))
  const isCaptured = capturedLead !== null
  // The top pick is always shown; the rest come with the emailed blueprint.
  const visibleRecommendations = isCaptured
    ? recommendations
    : recommendations.slice(0, 1)
  const lockedCount = recommendations.length - visibleRecommendations.length

  useEffect(() => {
    posthog?.capture('audit_results_viewed', {
      phase: phase.id,
      recommendations_count: recommendations.length,
      top_service: recommendations[0]?.service.id,
      captured: isCaptured,
    })
    if (!isCaptured) {
      posthog?.capture('audit_capture_viewed', {
        placement: 'results',
        phase: phase.id,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const activeIndex = PHASE_ORDER.indexOf(phase.id)
  const progressPct =
    PHASE_ORDER.length > 1 ? (activeIndex / (PHASE_ORDER.length - 1)) * 100 : 0

  return (
    <div className='w-full py-grid-2'>
      {/* Dashboard header */}
      <div className='mb-4 flex items-center justify-between'>
        <span className='bp-label font-mono'>Audit Results</span>
        <Button type='button' variant='ghost' size='sm' onClick={onRestart}>
          <RotateCcw className='mr-2 h-4 w-4' />
          Start over
        </Button>
      </div>

      {!isCaptured && (
        <a
          href={`#${CAPTURE_ANCHOR}`}
          onClick={() =>
            posthog?.capture('audit_capture_anchor_click', {
              location: 'results-strip',
            })
          }
          className='mb-grid-half flex items-center justify-between gap-4 border border-accent/40 bg-accent-muted px-4 py-3 text-sm text-text transition-colors hover:border-accent'
        >
          <span className='inline-flex items-center gap-2'>
            <Mail aria-hidden className='h-4 w-4 shrink-0 text-accent' />
            {lockedCount > 0
              ? `Showing your top opportunity. Get all ${recommendations.length} in your inbox.`
              : 'Get a copy of your blueprint in your inbox.'}
          </span>
          <ArrowRight aria-hidden className='h-4 w-4 shrink-0 text-accent' />
        </a>
      )}

      {/* Phase progression timeline */}
      <section className='relative border border-border bg-bg-panel p-6 sm:px-8'>
        <BlueprintCorners size={12} colorClassName='border-border-light' />
        <div className='flex items-baseline justify-between'>
          <h2 className='font-mono text-xs font-semibold tracking-[0.15em] text-text-muted uppercase'>
            Business phase
          </h2>
          <span className='font-mono text-xs tracking-[0.15em] text-text-muted uppercase'>
            {activeIndex + 1} / {PHASE_ORDER.length}
          </span>
        </div>

        <ol className='relative mt-6 flex items-start justify-between'>
          {/* connector track + progress fill */}
          <div
            className='absolute top-[11px] right-0 left-0 h-px bg-border'
            aria-hidden
          />
          <div
            className='absolute top-[11px] left-0 h-px bg-border-light'
            style={{ width: `${progressPct}%` }}
            aria-hidden
          />
          {PHASE_ORDER.map((id: PhaseId, i) => {
            const isActive = id === phase.id
            const reached = i <= activeIndex
            return (
              <li
                key={id}
                className='relative flex min-w-0 flex-1 flex-col items-center gap-2 text-center'
              >
                <span
                  className={cn(
                    'grid h-6 w-6 place-items-center rounded-full border bg-bg font-mono text-[11px]',
                    isActive
                      ? 'border-border-light bg-bg-elevated font-bold text-text'
                      : reached
                        ? 'border-border-light text-text-muted'
                        : 'border-border text-text-muted'
                  )}
                >
                  {i + 1}
                </span>
                <span
                  className={cn(
                    'block w-full px-0.5 text-[10px] leading-tight tracking-wide break-words hyphens-auto uppercase sm:text-xs',
                    isActive ? 'font-semibold text-text' : 'text-text-muted'
                  )}
                >
                  {shortPhaseName(id)}
                </span>
              </li>
            )
          })}
        </ol>
      </section>

      {/* Main grid: phase detail + score chart */}
      <div className='mt-grid-1 grid gap-grid-1 lg:grid-cols-3'>
        {/* Phase detail */}
        <section className='relative border border-border bg-bg-panel p-6 sm:p-8 lg:col-span-2'>
          <BlueprintCorners size={12} colorClassName='border-border-light' />
          <span className='inline-flex bg-bg-elevated px-3 py-1 font-mono text-xs font-semibold tracking-[0.15em] text-text-muted uppercase'>
            Your phase
          </span>
          <h1 className='mt-4 font-headline text-3xl leading-[.9]! font-semibold text-text uppercase'>
            {phase.name}
          </h1>
          <p className='mt-2 font-mono text-xs tracking-[0.15em] text-text-muted uppercase'>
            {phase.tagline}
          </p>
          <p className='mt-4 text-sm text-text-muted'>{phase.description}</p>

          <div className='mt-6 grid gap-6 sm:grid-cols-2'>
            <div>
              <h3 className='font-mono text-xs font-semibold tracking-[0.15em] text-text-muted uppercase'>
                Signals
              </h3>
              <ul className='mt-3 space-y-1.5'>
                {phase.signals.map(signal => (
                  <li key={signal} className='flex gap-2 text-sm text-text'>
                    <CheckCircle2 className='mt-0.5 h-4 w-4 shrink-0 text-text-muted' />
                    {signal}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className='font-mono text-xs font-semibold tracking-[0.15em] text-text-muted uppercase'>
                Next steps
              </h3>
              <ul className='mt-3 space-y-1.5'>
                {phase.nextSteps.map(step => (
                  <li key={step} className='flex gap-2 text-sm text-text'>
                    <ArrowRight className='mt-0.5 h-4 w-4 shrink-0 text-text-muted' />
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Phase score chart */}
        <section className='relative border border-border bg-bg-panel p-5'>
          <BlueprintCorners size={12} colorClassName='border-border-light' />
          <h2 className='font-mono text-xs font-semibold tracking-[0.15em] text-text-muted uppercase'>
            Audit score
          </h2>
          <div className='mt-4 space-y-2.5'>
            {PHASE_ORDER.map((id: PhaseId) => {
              const score = phaseScores[id]
              const pct = Math.round((score / maxScore) * 100)
              const isWinner = id === phase.id
              return (
                <div key={id}>
                  <div className='flex items-center justify-between gap-2'>
                    <span
                      className={cn(
                        'text-xs',
                        isWinner ? 'font-semibold text-text' : 'text-text-muted'
                      )}
                    >
                      {shortPhaseName(id)}
                    </span>
                    <span className='font-mono text-[11px] text-text-muted tabular-nums'>
                      {score}
                    </span>
                  </div>
                  <div className='mt-1 h-2 overflow-hidden bg-bg-elevated'>
                    <div
                      className={cn(
                        'h-full',
                        isWinner ? 'bg-text-muted' : 'bg-border-light'
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <section className='relative mt-grid-2 border-t border-t-accent pt-grid-2'>
          <div className='mb-grid-1 flex items-end justify-between'>
            <div className='flex flex-col gap-2'>
              <span className='bp-label font-mono'>The Blueprint</span>
              <h2 className='font-headline text-2xl font-semibold tracking-tight text-text uppercase sm:text-3xl'>
                Where we&apos;d start
              </h2>
            </div>
            <span className='hidden font-mono text-xs tracking-[0.15em] text-text-muted uppercase sm:inline'>
              {recommendations.length} opportunities
            </span>
          </div>
          <div className='grid gap-grid-1 sm:grid-cols-2'>
            {visibleRecommendations.map((rec, index) => {
              const Icon = SERVICE_ICONS[rec.service.icon] ?? Sparkles
              return (
                <article
                  key={rec.service.id}
                  className='relative flex flex-col border border-border bg-bg-panel p-5 transition-colors hover:border-border-light'
                >
                  <BlueprintCorners size={12} />
                  <div className='flex items-center gap-3'>
                    <div className='flex h-10 w-10 shrink-0 items-center justify-center bg-accent-muted text-accent'>
                      <Icon className='h-5 w-5' />
                    </div>
                    <span className='ml-auto border border-border px-2 py-0.5 font-mono text-xs font-semibold text-text-muted'>
                      #{index + 1}
                    </span>
                  </div>
                  <h3 className='mt-3 font-headline text-base font-semibold tracking-tight text-text uppercase'>
                    {rec.service.name}
                  </h3>
                  <p className='mt-1 text-sm font-medium text-text-muted'>
                    {rec.service.tagline}
                  </p>
                </article>
              )
            })}
            {Array.from({ length: lockedCount }, (_, i) => (
              <LockedRecommendation
                key={`locked-${i}`}
                rank={visibleRecommendations.length + i + 1}
              />
            ))}
          </div>
        </section>
      )}

      {capturedLead ? (
        <CapturedPanel
          result={result}
          lead={capturedLead}
          buildCapturedPayload={buildCapturedPayload}
          onSaved={onCaptured}
        />
      ) : (
        <section
          id={CAPTURE_ANCHOR}
          className='relative mt-grid-1 scroll-mt-grid-4 border border-accent/40 bg-bg-panel p-6 sm:p-8'
        >
          <BlueprintCorners size={12} />
          {/* min-w-0 on both columns: a grid item's min width is its
              content's, so an unwrappable button would push the card past
              the viewport on a phone. */}
          <div className='grid gap-grid-2 md:grid-cols-2 md:items-center'>
            <div className='min-w-0'>
              <p className='font-mono text-xs tracking-[0.15em] text-accent uppercase'>
                Your full blueprint
              </p>
              <h2 className='mt-2 font-headline text-2xl font-semibold tracking-tight text-text uppercase'>
                {lockedCount > 0
                  ? `Unlock all ${recommendations.length} opportunities`
                  : 'Keep a copy of your blueprint'}
              </h2>
              <p className='mt-2 text-sm text-text-muted'>
                {lockedCount > 0
                  ? "Get every opportunity, ranked by where we'd start, sent to your inbox. They unlock here too."
                  : "Get your result sent to your inbox so it's there when you need it."}{' '}
                Reply to the email any time to talk to the engineers who&apos;d
                build it.
              </p>
            </div>
            <EmailCaptureForm
              result={result}
              placement='results'
              buildCapturedPayload={buildCapturedPayload}
              onCaptured={onCaptured}
              submitLabel={
                lockedCount > 0 ? 'Email it to me' : 'Send me a copy'
              }
              className='min-w-0'
            />
          </div>
        </section>
      )}

      {/* Optional feedback on the result itself. */}
      <FeedbackCard initial={feedback} onSubmit={onFeedback} />
    </div>
  )
}

/**
 * A ranked slot whose recommendation arrives with the emailed blueprint. A
 * single compact row, so a stack of them on a phone does not push the unlock
 * form screens away.
 */
function LockedRecommendation({ rank }: { rank: number }) {
  const posthog = usePostHog()

  return (
    <a
      href={`#${CAPTURE_ANCHOR}`}
      onClick={() =>
        posthog?.capture('audit_capture_anchor_click', {
          location: 'locked-card',
          rank,
        })
      }
      className='group relative flex items-center gap-4 border border-dashed border-border bg-bg-panel p-4 transition-colors hover:border-accent/60'
    >
      <span className='sr-only'>
        Opportunity {rank} is included in your emailed blueprint.
      </span>
      <div
        aria-hidden
        className='flex h-10 w-10 shrink-0 items-center justify-center bg-bg-elevated text-text-muted transition-colors group-hover:text-accent'
      >
        <Lock className='h-5 w-5' />
      </div>
      <div aria-hidden className='min-w-0 flex-1'>
        <div className='h-3 w-2/3 bg-bg-elevated' />
        <p className='mt-2 font-mono text-[11px] tracking-[0.15em] text-text-muted uppercase transition-colors group-hover:text-accent'>
          Unlocks by email
        </p>
      </div>
      <span
        aria-hidden
        className='shrink-0 border border-border px-2 py-0.5 font-mono text-xs font-semibold text-text-muted'
      >
        #{rank}
      </span>
    </a>
  )
}

interface CapturedPanelProps {
  result: AuditResult
  lead: AuditLeadPayload
  buildCapturedPayload: (lead: AuditLeadPayload) => AuditProgressPayload | null
  onSaved: (lead: AuditLeadPayload) => void
}

/**
 * After the capture: confirms where the blueprint went, offers the call, and
 * asks (optionally) for the context the capture form no longer collects.
 */
function CapturedPanel({
  result,
  lead,
  buildCapturedPayload,
  onSaved,
}: CapturedPanelProps) {
  const [detailsSent, setDetailsSent] = useState(false)

  return (
    <section className='relative mt-grid-1 border border-border bg-bg-panel p-6 sm:p-8'>
      <BlueprintCorners size={12} />
      <div className='grid gap-grid-2 md:grid-cols-2'>
        <div className='flex min-w-0 flex-col items-start gap-3'>
          <p className='inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-accent uppercase'>
            <CheckCircle2 aria-hidden className='h-4 w-4' />
            Blueprint sent
          </p>
          <h2 className='font-headline text-2xl font-semibold tracking-tight text-text uppercase'>
            Check your inbox
          </h2>
          <p className='text-sm text-text-muted'>
            Your blueprint is on its way to{' '}
            <span className='font-medium break-all text-text'>
              {lead.email}
            </span>
            . Reply to it any time to start a conversation.
          </p>
          <Button asChild variant='outline' size='lg' className='mt-2 px-8'>
            <TrackedLink href='/contact' location='audit-capture-success'>
              Book a call now
            </TrackedLink>
          </Button>
        </div>

        <div className='min-w-0 border-t border-border pt-grid-1 md:border-t-0 md:border-l md:pt-0 md:pl-grid-2'>
          {detailsSent ? (
            <div className='flex h-full flex-col justify-center gap-2'>
              <h3 className='font-headline text-lg font-semibold tracking-tight text-text uppercase'>
                Saved with your audit
              </h3>
              <p className='text-sm text-text-muted'>
                Want a faster answer? Reply to your blueprint email and it lands
                straight in our inbox.
              </p>
            </div>
          ) : (
            <>
              <h3 className='font-headline text-lg font-semibold tracking-tight text-text uppercase'>
                Add some context?
              </h3>
              {/* Deliberately no promise that the team is notified: the portal
                  emails once per capture, so this only enriches the stored
                  submission. */}
              <p className='mt-1 mb-4 text-sm text-text-muted'>
                Optional. It&apos;s saved with your audit, so we can come to the
                first conversation with ideas, not questions.
              </p>
              <LeadDetailsForm
                result={result}
                lead={lead}
                buildCapturedPayload={buildCapturedPayload}
                onSaved={saved => {
                  setDetailsSent(true)
                  onSaved(saved)
                }}
              />
            </>
          )}
        </div>
      </div>
    </section>
  )
}
