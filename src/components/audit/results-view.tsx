'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePostHog } from 'posthog-js/react'
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Contact,
  LayoutDashboard,
  type LucideIcon,
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
import { TrackedLink } from '@/src/components/tracked-link'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { toast } from '@/src/components/ui/use-toast'
import { cn } from '@/src/lib/utils'
import { PHASE_ORDER, PHASES } from '@/src/lib/audit/phases'
import {
  auditLeadSchema,
  type AuditLeadValues,
} from '@/src/lib/validations/audit'
import { sendAudit, type AuditActionResult } from '@/app/actions/send-audit'
import type { AuditAnswers, AuditResult, PhaseId } from '@/src/lib/audit/types'

interface ResultsViewProps {
  result: AuditResult
  answers: AuditAnswers
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

/** First word of a phase name, for compact stepper / chart labels. */
function shortPhaseName(id: PhaseId): string {
  return PHASES[id].name.split(' & ')[0]
}

export function ResultsView({ result, answers, onRestart }: ResultsViewProps) {
  const { phase, phaseScores, recommendations } = result
  const maxScore = Math.max(1, ...Object.values(phaseScores))
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
            {recommendations.map((rec, index) => {
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
          </div>
        </section>
      )}

      {/* Capture / CTA */}
      <CaptureForm result={result} answers={answers} />
    </div>
  )
}

interface CaptureFormProps {
  result: AuditResult
  answers: AuditAnswers
}

/** Emails the respondent their result and hands us the lead. */
function CaptureForm({ result, answers }: CaptureFormProps) {
  const posthog = usePostHog()
  const [isPending, startTransition] = useTransition()
  const [isSuccess, setIsSuccess] = useState(false)
  const form = useForm<AuditLeadValues>({
    resolver: zodResolver(auditLeadSchema),
    defaultValues: { name: '', email: '', company: '' },
  })

  const onSubmit = form.handleSubmit(values => {
    startTransition(() => {
      void sendAudit(values, result, answers).then((res: AuditActionResult) => {
        if (!res.success) {
          if (res.errors) {
            Object.entries(res.errors).forEach(([key, messages]) => {
              const typedMessages = messages as string[] | undefined
              const firstMessage = typedMessages?.[0]
              if (firstMessage) {
                form.setError(key as keyof AuditLeadValues, {
                  message: firstMessage,
                })
              }
            })
          }

          toast({
            variant: 'destructive',
            title: 'Something went wrong',
            description: res.message ?? 'Please try again.',
          })
          return
        }

        form.reset()
        setIsSuccess(true)
        posthog?.capture('audit_capture_submitted', { phase: result.phase.id })
      })
    })
  })

  return (
    <section className='relative mt-grid-1 border border-border bg-bg-panel p-6 sm:p-8'>
      {isSuccess ? (
        <div className='flex flex-col items-center gap-4 text-center'>
          <h2 className='font-headline text-xl font-semibold tracking-tight text-text uppercase'>
            Check your inbox
          </h2>
          <p className='max-w-md text-sm text-balance text-text-muted'>
            We&apos;ve sent your audit result.
          </p>
          <Button asChild variant='outline' size='lg' className='mt-2 px-8'>
            <TrackedLink href='/contact' location='audit-capture-success'>
              Book a call now
            </TrackedLink>
          </Button>
        </div>
      ) : (
        <>
          <div className='text-center'>
            <p className='font-mono text-xs tracking-[0.15em] text-accent uppercase'>
              Next step
            </p>
            <h2 className='mt-2 font-headline text-xl font-semibold tracking-tight text-text uppercase'>
              Get Your Results
            </h2>
            <p className='mx-auto mt-2 max-w-md text-sm text-balance text-text-muted'>
              Drop your details and we&apos;ll send your result. Reply anytime
              to start a project.
            </p>
          </div>

          <form
            noValidate
            onSubmit={onSubmit}
            className='mx-auto mt-6 flex max-w-md flex-col gap-3'
          >
            <div className='flex flex-col gap-2'>
              <Label htmlFor='audit-name'>Name</Label>
              <Input
                id='audit-name'
                {...form.register('name')}
                aria-invalid={!!form.formState.errors.name}
              />
              {form.formState.errors.name ? (
                <p className='text-sm text-red-400'>
                  {form.formState.errors.name.message}
                </p>
              ) : null}
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='audit-email'>Email</Label>
              <Input
                id='audit-email'
                type='email'
                {...form.register('email')}
                aria-invalid={!!form.formState.errors.email}
              />
              {form.formState.errors.email ? (
                <p className='text-sm text-red-400'>
                  {form.formState.errors.email.message}
                </p>
              ) : null}
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='audit-company'>Company Name (optional)</Label>
              <Input
                id='audit-company'
                {...form.register('company')}
                aria-invalid={!!form.formState.errors.company}
              />
              {form.formState.errors.company ? (
                <p className='text-sm text-red-400'>
                  {form.formState.errors.company.message}
                </p>
              ) : null}
            </div>
            <Button
              type='submit'
              size='lg'
              disabled={isPending}
              className='mt-1 w-full px-8'
            >
              {isPending ? 'Sending...' : 'Send me my result'}
            </Button>
            <p className='mt-3 text-center text-sm text-text-muted'>
              Prefer to talk first?{' '}
              <TrackedLink
                href='/contact'
                location='audit-capture-form'
                className='text-accent underline-offset-4 hover:underline'
              >
                Book a call
              </TrackedLink>
              .
            </p>
          </form>
        </>
      )}
    </section>
  )
}
