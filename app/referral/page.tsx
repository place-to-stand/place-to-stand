'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { Textarea } from '@/src/components/ui/textarea'
import { toast } from '@/src/components/ui/use-toast'
import {
  sendReferral,
  type ReferralActionResult,
} from '../actions/send-referral'
import {
  referralSchema,
  type ReferralFormValues,
} from '@/src/lib/validations/referral'

export default function ReferralPage() {
  const [isPending, startTransition] = useTransition()
  const [isSuccess, setIsSuccess] = useState(false)
  const form = useForm<ReferralFormValues>({
    resolver: zodResolver(referralSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  })

  const onSubmit = form.handleSubmit(values => {
    startTransition(() => {
      void sendReferral(values).then((result: ReferralActionResult) => {
        if (!result.success) {
          if (result.errors) {
            Object.entries(result.errors).forEach(([key, messages]) => {
              const typedMessages = messages as string[] | undefined
              const firstMessage = typedMessages?.[0]
              if (firstMessage) {
                form.setError(key as keyof ReferralFormValues, {
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
      })
    })
  })

  return (
    <main className='flex-1 pb-16 pt-32 sm:pt-40'>
      <div className='container mx-auto w-full max-w-2xl px-6'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
            Partner With Us
          </span>
          <h1 className='max-w-5xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl'>
            Referral Partners
          </h1>
          <p className='max-w-xl text-balance text-lg !leading-snug text-ink/80'>
            Interested in partnering with us? We&apos;d love to hear from you.
            Fill out the form below and we&apos;ll be in touch.
          </p>
        </div>

        <div className='relative mt-10 rounded-xl border border-ink/10 bg-white/50 p-6'>
          <form
            noValidate
            onSubmit={onSubmit}
            className={`flex flex-col gap-4 transition-opacity ${
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
                <p className='text-sm text-red-600'>
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
                <p className='text-sm text-red-600'>
                  {form.formState.errors.email.message}
                </p>
              ) : null}
            </div>

            <div className='flex flex-col gap-2'>
              <Label htmlFor='phone'>Phone (optional)</Label>
              <Input
                id='phone'
                type='tel'
                {...form.register('phone')}
                aria-invalid={!!form.formState.errors.phone}
              />
              {form.formState.errors.phone ? (
                <p className='text-sm text-red-600'>
                  {form.formState.errors.phone.message}
                </p>
              ) : null}
            </div>

            <div className='flex flex-col gap-2'>
              <Label htmlFor='message'>Message</Label>
              <Textarea
                id='message'
                rows={5}
                placeholder="Tell us about yourself and how you'd like to partner with us..."
                {...form.register('message')}
                aria-invalid={!!form.formState.errors.message}
              />
              {form.formState.errors.message ? (
                <p className='text-sm text-red-600'>
                  {form.formState.errors.message.message}
                </p>
              ) : null}
            </div>

            <div className='pt-3'>
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
            <div className='pointer-events-auto absolute inset-0 flex flex-col items-center justify-center gap-6 rounded-xl bg-white/95 text-center shadow-inner'>
              <h2 className='text-2xl font-semibold uppercase text-ink'>
                Thank you!
              </h2>
              <p className='max-w-md text-balance text-base text-ink/70'>
                We&apos;ve received your message and will be in touch soon to
                discuss partnering opportunities.
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
      </div>
    </main>
  )
}
