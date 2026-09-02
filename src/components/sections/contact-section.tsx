'use client'

import {
  Suspense,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePostHog } from 'posthog-js/react'

import { AnimatedSection } from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { Button } from '@/src/components/ui/button'
import { Checkbox } from '@/src/components/ui/checkbox'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { Textarea } from '@/src/components/ui/textarea'
import { toast } from '@/src/components/ui/use-toast'
import {
  sendContact,
  type ContactActionResult,
} from '../../../app/actions/send-contact'
import {
  contactSchema,
  type ContactFormValues,
} from '@/src/lib/validations/contact'
import {
  collectSubmissionContext,
  createSubmissionId,
  readSubmissionAnalytics,
} from '@/src/lib/forms/context'
import { pushLeadConversion } from '@/src/lib/forms/conversion-tracking'
import type { ContactSubmissionContext } from '@/src/lib/forms/contact-payload'
import {
  CONTACT_SUBJECT_OTHER,
  CONTACT_SUBJECTS,
  subjectFromQuery,
} from '@/src/lib/forms/contact-subjects'

/**
 * Applies `?subject=` from the URL to the form. Lives in its own component so
 * `useSearchParams` sits behind a `<Suspense>` boundary and the contact page
 * stays statically rendered (same pattern as `AttributionCapture`).
 */
function SubjectPrefill({
  onSubject,
}: {
  onSubject: (subject: string) => void
}) {
  const searchParams = useSearchParams()
  const subject = searchParams.get('subject')

  useEffect(() => {
    if (subject) onSubject(subject)
  }, [subject, onSubject])

  return null
}

export function ContactSection() {
  const posthog = usePostHog()
  const [isPending, startTransition] = useTransition()
  const [isSuccess, setIsSuccess] = useState(false)
  // Minted on first submit and kept, so retrying a failed submit upserts the
  // same portal row instead of creating a duplicate.
  const [submissionId, setSubmissionId] = useState<string | null>(null)
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      website: '',
      // Empty until the visitor picks one; the placeholder option carries it.
      subject: '' as ContactFormValues['subject'],
      subjectOther: '',
      message: '',
      marketingConsent: false,
    },
  })
  const selectedSubject = useWatch({ control: form.control, name: 'subject' })

  const applySubjectFromQuery = useCallback(
    (raw: string) => {
      const prefill = subjectFromQuery(raw)
      if (!prefill) return
      form.setValue('subject', prefill.subject)
      form.setValue('subjectOther', prefill.subjectOther)
    },
    [form]
  )

  const onSubmit = form.handleSubmit(values => {
    const id = submissionId ?? createSubmissionId()
    if (!submissionId) setSubmissionId(id)

    const { attribution, client } = collectSubmissionContext()
    const submissionContext: ContactSubmissionContext = {
      submissionId: id,
      analytics: readSubmissionAnalytics(),
      attribution,
      client,
    }

    startTransition(() => {
      void sendContact(values, submissionContext)
        .then((result: ContactActionResult) => {
          if (!result.success) {
            posthog?.capture('contact_form_failed')

            if (result.errors) {
              Object.entries(result.errors).forEach(([key, messages]) => {
                const typedMessages = messages as string[] | undefined
                const firstMessage = typedMessages?.[0]
                if (firstMessage) {
                  form.setError(key as keyof ContactFormValues, {
                    message: firstMessage,
                  })
                }
              })
            }

            toast({
              variant: 'destructive',
              title: 'Something went wrong',
              description: result.message ?? 'Please try again.',
            })
            return
          }

          form.reset()
          setIsSuccess(true)
          posthog?.capture('contact_form_submitted')
          pushLeadConversion('contact_form_submitted', values.email)
        })
        .catch((error: unknown) => {
          // The action itself rejected. Without this the button stays stuck on
          // its pending state with no explanation.
          posthog?.capture('contact_form_failed', { reason: 'action_threw' })
          posthog?.captureException(error)
          toast({
            variant: 'destructive',
            title: 'Something went wrong',
            description: 'Please try again.',
          })
        })
    })
  })

  return (
    <AnimatedSection
      id='contact'
      className='flex flex-col gap-10 py-24 pb-grid-8'
    >
      <div className='flex flex-col items-center gap-4 text-center'>
        <span className='bp-label font-mono'>Contact</span>
        <h2 className='max-w-5xl font-headline text-3xl leading-[.9]! font-semibold text-balance text-text uppercase md:text-5xl'>
          Let&apos;s talk
        </h2>
        <p className='max-w-xl text-lg leading-snug! text-balance text-text-muted'>
          Send a message and we&apos;ll get back to you within one business day.
        </p>
      </div>
      <Suspense fallback={null}>
        <SubjectPrefill onSubject={applySubjectFromQuery} />
      </Suspense>
      <div className='relative mx-auto w-full max-w-2xl gap-10 border border-border p-6'>
        <BlueprintCorners size={16} />
        <form
          noValidate
          onSubmit={onSubmit}
          className={`flex h-full flex-col gap-3 transition-opacity ${
            isSuccess ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
          aria-hidden={isSuccess}
        >
          <div className='flex flex-col gap-2'>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
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
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
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
          <div className='grid gap-3 md:grid-cols-2'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='company'>Company Name (optional)</Label>
              <Input
                id='company'
                {...form.register('company')}
                aria-invalid={!!form.formState.errors.company}
              />
              {form.formState.errors.company ? (
                <p className='text-sm text-red-400'>
                  {form.formState.errors.company.message}
                </p>
              ) : null}
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='website'>Website (optional)</Label>
              <Input
                id='website'
                type='url'
                placeholder='https://example.com'
                {...form.register('website')}
                aria-invalid={!!form.formState.errors.website}
              />
              {form.formState.errors.website ? (
                <p className='text-sm text-red-400'>
                  {form.formState.errors.website.message}
                </p>
              ) : null}
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='subject'>Subject</Label>
            <select
              id='subject'
              {...form.register('subject')}
              aria-invalid={!!form.formState.errors.subject}
              className='flex h-12 w-full border border-border bg-bg-card px-3 text-base text-text transition focus-visible:ring-1 focus-visible:ring-accent/40 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50'
            >
              <option value='' disabled>
                Choose a subject
              </option>
              {CONTACT_SUBJECTS.map(subject => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            {form.formState.errors.subject ? (
              <p className='text-sm text-red-400'>
                {form.formState.errors.subject.message}
              </p>
            ) : null}
          </div>
          {selectedSubject === CONTACT_SUBJECT_OTHER ? (
            <div className='flex flex-col gap-2'>
              <Input
                id='subjectOther'
                aria-label='Subject'
                placeholder="Tell us what it's about"
                {...form.register('subjectOther')}
                aria-invalid={!!form.formState.errors.subjectOther}
              />
              {form.formState.errors.subjectOther ? (
                <p className='text-sm text-red-400'>
                  {form.formState.errors.subjectOther.message}
                </p>
              ) : null}
            </div>
          ) : null}
          <div className='flex flex-col gap-2'>
            <Label htmlFor='message'>Message</Label>
            <Textarea
              id='message'
              rows={5}
              {...form.register('message')}
              aria-invalid={!!form.formState.errors.message}
            />
            {form.formState.errors.message ? (
              <p className='text-sm text-red-400'>
                {form.formState.errors.message.message}
              </p>
            ) : null}
          </div>
          <div className='flex items-start gap-3 pt-1'>
            <Checkbox
              id='marketingConsent'
              {...form.register('marketingConsent')}
            />
            <Label
              htmlFor='marketingConsent'
              className='text-sm leading-snug font-normal tracking-normal text-text-muted normal-case'
            >
              Send me occasional updates about Place To Stand&apos;s work. We
              will reply to your message either way, and you can unsubscribe at
              any time.
            </Label>
          </div>
          <div className='mt-auto pt-3'>
            <Button
              type='submit'
              disabled={isPending}
              className='block w-full px-8'
              size='lg'
            >
              {isPending ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>

        {isSuccess ? (
          <div className='pointer-events-auto absolute inset-0 flex flex-col items-center justify-center gap-6 bg-bg-card/95 text-center shadow-inner'>
            <h3 className='text-2xl font-semibold text-text uppercase'>
              Thank you!
            </h3>
            <p className='max-w-md text-base text-balance text-text-muted'>
              Your message has been sent. We&apos;ll reach out within one
              business day.
            </p>
            <Button
              type='button'
              size='lg'
              className='px-8'
              onClick={() => {
                form.reset()
                setIsSuccess(false)
              }}
            >
              Send another message
            </Button>
          </div>
        ) : null}
      </div>
    </AnimatedSection>
  )
}
