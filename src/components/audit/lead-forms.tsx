'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePostHog } from 'posthog-js/react'
import type { PostHog } from 'posthog-js'
import { ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { Checkbox } from '@/src/components/ui/checkbox'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { Textarea } from '@/src/components/ui/textarea'
import { toast } from '@/src/components/ui/use-toast'
import { cn } from '@/src/lib/utils'
import { pushLeadConversion } from '@/src/lib/forms/conversion-tracking'
import {
  auditDetailsSchema,
  auditEmailSchema,
  type AuditDetailsValues,
  type AuditEmailValues,
  type AuditLeadValues,
} from '@/src/lib/validations/audit'
import { sendAudit } from '@/app/actions/send-audit'
import type {
  AuditLeadPayload,
  AuditProgressPayload,
} from '@/src/lib/audit/progress-payload'
import type { AuditResult } from '@/src/lib/audit/types'

/** Where a capture form is rendered, reported with every capture event. */
export type CapturePlacement = 'gate' | 'results'

type BuildCapturedPayload = (
  lead: AuditLeadPayload
) => AuditProgressPayload | null

/**
 * Sends a lead through `sendAudit` and reports any failure. Resolves true only
 * when the portal took it. Shared by the email capture and the follow-up
 * details form, which differ only in which lead fields they fill.
 */
async function deliverLead({
  lead,
  buildCapturedPayload,
  result,
  posthog,
  event,
  onFieldError,
}: {
  lead: AuditLeadPayload
  buildCapturedPayload: BuildCapturedPayload
  result: AuditResult
  posthog: PostHog | undefined
  /** Event name for failures, so the two forms stay separable in PostHog. */
  event: 'audit_capture_failed' | 'audit_details_failed'
  onFieldError: (field: keyof AuditLeadValues, message: string) => void
}): Promise<boolean> {
  const values: AuditLeadValues = {
    name: lead.name,
    email: lead.email,
    company: lead.company ?? '',
    message: lead.message ?? '',
    marketingConsent: lead.marketingConsent,
  }

  try {
    // The portal records the lead and sends both emails, so the captured
    // payload rides along with the form values instead of going out as a
    // separate beacon afterwards.
    const res = await sendAudit(values, buildCapturedPayload(lead))
    if (res.success) return true

    posthog?.capture(event, { reason: res.reason, phase: result.phase.id })
    Object.entries(res.errors ?? {}).forEach(([key, messages]) => {
      const first = (messages as string[] | undefined)?.[0]
      if (first) onFieldError(key as keyof AuditLeadValues, first)
    })
    toast({
      variant: 'destructive',
      title: 'Something went wrong',
      description: res.message ?? 'Please try again.',
    })
    return false
  } catch (error: unknown) {
    // The action itself rejected (deploy skew, cold-start failure). Without
    // this the button stays stuck on "Sending..." with no explanation.
    posthog?.capture(event, { reason: 'action_threw', phase: result.phase.id })
    posthog?.captureException(error)
    toast({
      variant: 'destructive',
      title: 'Something went wrong',
      description: 'Please try again.',
    })
    return false
  }
}

interface EmailCaptureFormProps {
  result: AuditResult
  placement: CapturePlacement
  buildCapturedPayload: BuildCapturedPayload
  onCaptured: (lead: AuditLeadPayload) => void
  submitLabel: string
  className?: string
}

/**
 * The capture: one email field and the marketing opt-in. Everything else we
 * would like to know is asked afterwards by `LeadDetailsForm`, because every
 * extra field here costs captures.
 */
export function EmailCaptureForm({
  result,
  placement,
  buildCapturedPayload,
  onCaptured,
  submitLabel,
  className,
}: EmailCaptureFormProps) {
  const posthog = usePostHog()
  const [isPending, setIsPending] = useState(false)
  const form = useForm<AuditEmailValues>({
    resolver: zodResolver(auditEmailSchema),
    defaultValues: { email: '', marketingConsent: false },
  })
  const emailId = `audit-email-${placement}`
  const consentId = `audit-consent-${placement}`

  const onSubmit = form.handleSubmit(async values => {
    const lead: AuditLeadPayload = {
      name: '',
      email: values.email.trim(),
      company: null,
      message: null,
      marketingConsent: values.marketingConsent ?? false,
    }

    setIsPending(true)
    const ok = await deliverLead({
      lead,
      buildCapturedPayload,
      result,
      posthog,
      event: 'audit_capture_failed',
      onFieldError: (field, message) => {
        if (field === 'email') form.setError('email', { message })
      },
    })
    setIsPending(false)
    if (!ok) return

    posthog?.capture('audit_capture_submitted', {
      phase: result.phase.id,
      placement,
    })
    pushLeadConversion('audit_lead_submitted', lead.email)
    onCaptured(lead)
  })

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className={cn('flex flex-col gap-3', className)}
    >
      <div className='flex flex-col gap-2'>
        <Label htmlFor={emailId}>Work email</Label>
        <Input
          id={emailId}
          type='email'
          autoComplete='email'
          inputMode='email'
          placeholder='you@company.com'
          {...form.register('email')}
          aria-invalid={!!form.formState.errors.email}
        />
        {form.formState.errors.email ? (
          <p className='text-sm text-red-400'>
            {form.formState.errors.email.message}
          </p>
        ) : null}
      </div>
      <div className='flex items-start gap-3 pt-1'>
        <Checkbox id={consentId} {...form.register('marketingConsent')} />
        <Label
          htmlFor={consentId}
          className='text-sm leading-snug font-normal tracking-normal text-text-muted normal-case'
        >
          Also send me occasional updates about Place To Stand&apos;s work.
          Unsubscribe any time.
        </Label>
      </div>
      <Button
        type='submit'
        size='lg'
        disabled={isPending}
        className='mt-1 w-full px-8'
      >
        {isPending ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Sending...
          </>
        ) : (
          <>
            {submitLabel}
            <ArrowRight className='ml-2 h-4 w-4' />
          </>
        )}
      </Button>
    </form>
  )
}

interface LeadDetailsFormProps {
  result: AuditResult
  /** The lead already captured; its email and opt-in are carried over. */
  lead: AuditLeadPayload
  buildCapturedPayload: BuildCapturedPayload
  onSaved: (lead: AuditLeadPayload) => void
}

/**
 * Optional follow-up after the capture. Sends the same `captured` push again,
 * now with name, company and a note. The portal fills in its row and does not
 * re-send the emails (see `sendAudit`).
 */
export function LeadDetailsForm({
  result,
  lead,
  buildCapturedPayload,
  onSaved,
}: LeadDetailsFormProps) {
  const posthog = usePostHog()
  const [isPending, setIsPending] = useState(false)
  const form = useForm<AuditDetailsValues>({
    resolver: zodResolver(auditDetailsSchema),
    defaultValues: { name: '', company: '', message: '' },
  })
  const { errors } = form.formState

  const onSubmit = form.handleSubmit(async values => {
    const enriched: AuditLeadPayload = {
      ...lead,
      name: values.name?.trim() ?? '',
      company: values.company?.trim() || null,
      message: values.message?.trim() || null,
    }

    setIsPending(true)
    const ok = await deliverLead({
      lead: enriched,
      buildCapturedPayload,
      result,
      posthog,
      event: 'audit_details_failed',
      onFieldError: (field, message) => {
        if (field === 'name' || field === 'company' || field === 'message') {
          form.setError(field, { message })
        }
      },
    })
    setIsPending(false)
    if (!ok) return

    posthog?.capture('audit_details_submitted', {
      phase: result.phase.id,
      has_name: Boolean(enriched.name),
      has_company: Boolean(enriched.company),
      has_message: Boolean(enriched.message),
    })
    onSaved(enriched)
  })

  return (
    <form noValidate onSubmit={onSubmit} className='flex flex-col gap-3'>
      <div className='grid gap-3 sm:grid-cols-2'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='audit-details-name'>Name</Label>
          <Input
            id='audit-details-name'
            autoComplete='name'
            {...form.register('name')}
            aria-invalid={!!errors.name}
          />
          {errors.name ? (
            <p className='text-sm text-red-400'>{errors.name.message}</p>
          ) : null}
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='audit-details-company'>Company</Label>
          <Input
            id='audit-details-company'
            autoComplete='organization'
            {...form.register('company')}
            aria-invalid={!!errors.company}
          />
          {errors.company ? (
            <p className='text-sm text-red-400'>{errors.company.message}</p>
          ) : null}
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <Label htmlFor='audit-details-message'>
          What would you want fixed first?
        </Label>
        <Textarea
          id='audit-details-message'
          rows={3}
          className='min-h-24 p-3'
          placeholder="What you're looking for, or what's not working today."
          {...form.register('message')}
          aria-invalid={!!errors.message}
        />
        {errors.message ? (
          <p className='text-sm text-red-400'>{errors.message.message}</p>
        ) : null}
      </div>
      <Button
        type='submit'
        variant='outline'
        size='lg'
        disabled={isPending}
        className='mt-1 w-full px-8 sm:w-auto sm:self-start'
      >
        {isPending ? 'Sending...' : 'Send to the team'}
      </Button>
    </form>
  )
}
