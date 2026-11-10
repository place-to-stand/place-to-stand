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
import { Select } from '@/src/components/primitives/select'
import { usePostHog } from 'posthog-js/react'

import { SectionHeading, Section } from '@/src/components/patterns/section'
import { CONTACT_EMAIL } from '@/src/lib/site'
import { Panel } from '@/src/components/boxes'
import { FieldError } from '@/src/components/primitives/field-error'
import { Button } from '@/src/components/primitives/button'
import { HeardFromField } from '@/src/components/primitives/heard-from-field'
import { Checkbox } from '@/src/components/primitives/checkbox'
import { Input } from '@/src/components/primitives/input'
import { Label } from '@/src/components/primitives/label'
import { Textarea } from '@/src/components/primitives/textarea'
import { toast } from '@/src/components/primitives/use-toast'
import {
  sendContact,
  type ContactActionResult,
} from '@/app/actions/send-contact'
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
import { HEARD_FROM_OTHER } from '@/src/lib/forms/heard-from'
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
      heardFrom: '',
      heardFromOther: '',
    },
  })
  const selectedSubject = useWatch({ control: form.control, name: 'subject' })
  const heardFromChoice = useWatch({ control: form.control, name: 'heardFrom' })

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
          posthog?.capture('contact_form_submitted', {
            heard_from: values.heardFrom || null,
          })
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
    <Section id='message' className='flex scroll-mt-24 flex-col gap-stack'>
      <SectionHeading
        label='Send a Message'
        title='Prefer to write?'
        intro={
          <>
            Send a message and we&apos;ll get back to you within one business
            day. Or email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className='link-inline'>
              {CONTACT_EMAIL}
            </a>
            .
          </>
        }
      />
      <Suspense fallback={null}>
        <SubjectPrefill onSubject={applySubjectFromQuery} />
      </Suspense>
      <Panel className='w-full max-w-3xl gap-grid-2 md:p-grid-2'>
        <form
          noValidate
          onSubmit={onSubmit}
          className={`flex h-full flex-col gap-grid-half transition-opacity ${
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
              <FieldError>{form.formState.errors.name.message}</FieldError>
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
              <FieldError>{form.formState.errors.email.message}</FieldError>
            ) : null}
          </div>
          <div className='grid gap-grid-half md:grid-cols-2'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='company'>Company Name (optional)</Label>
              <Input
                id='company'
                {...form.register('company')}
                aria-invalid={!!form.formState.errors.company}
              />
              {form.formState.errors.company ? (
                <FieldError>{form.formState.errors.company.message}</FieldError>
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
                <FieldError>{form.formState.errors.website.message}</FieldError>
              ) : null}
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='subject'>Subject</Label>
            <Select
              id='subject'
              {...form.register('subject')}
              aria-invalid={!!form.formState.errors.subject}
            >
              <option value='' disabled>
                Choose a subject
              </option>
              {CONTACT_SUBJECTS.map(subject => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </Select>
            {form.formState.errors.subject ? (
              <FieldError>{form.formState.errors.subject.message}</FieldError>
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
                <FieldError>
                  {form.formState.errors.subjectOther.message}
                </FieldError>
              ) : null}
            </div>
          ) : null}
          <div className='flex flex-col gap-2'>
            <Label htmlFor='contact-message'>Message</Label>
            <Textarea
              id='contact-message'
              rows={5}
              {...form.register('message')}
              aria-invalid={!!form.formState.errors.message}
            />
            {form.formState.errors.message ? (
              <FieldError>{form.formState.errors.message.message}</FieldError>
            ) : null}
          </div>
          <HeardFromField
            id='heardFrom'
            select={form.register('heardFrom')}
            other={form.register('heardFromOther')}
            showOther={heardFromChoice === HEARD_FROM_OTHER}
          />
          <div className='flex items-start gap-grid-half pt-1'>
            <Checkbox
              id='marketingConsent'
              {...form.register('marketingConsent')}
            />
            <Label
              htmlFor='marketingConsent'
              className='text-base leading-snug font-normal tracking-normal text-text-muted normal-case'
            >
              Send me occasional updates about Place To Stand&apos;s work. We
              will reply to your message either way, and you can unsubscribe at
              any time.
            </Label>
          </div>
          <div className='mt-auto pt-grid-half'>
            <Button
              type='submit'
              loading={isPending}
              loadingLabel='Sending…'
              className='w-full px-grid-1'
              size='lg'
            >
              Send Message
            </Button>
          </div>
        </form>

        {isSuccess ? (
          <div className='pointer-events-auto absolute inset-0 flex flex-col items-center justify-center gap-grid-1 bg-bg-card/95 text-center'>
            <h3 className='type-card-title uppercase'>Thank you!</h3>
            <p className='max-w-md text-base text-balance text-text-muted'>
              Your message has been sent. We&apos;ll reach out within one
              business day.
            </p>
            <Button
              type='button'
              size='lg'
              className='px-grid-1'
              onClick={() => {
                form.reset()
                setIsSuccess(false)
              }}
            >
              Send another message
            </Button>
          </div>
        ) : null}
      </Panel>
    </Section>
  )
}
