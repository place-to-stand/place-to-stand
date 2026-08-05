'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
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
import type { ContactSubmissionContext } from '@/src/lib/forms/contact-payload'

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
      message: '',
      marketingConsent: false,
    },
  })

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
              className='text-sm leading-snug font-normal text-text-muted'
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
