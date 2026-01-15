'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'

import { AnimatedSection } from '@/src/components/layout/animated-section'
import { Button } from '@/src/components/ui/button'
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

const team = [
  {
    name: 'Jason Desiderio',
    title: 'Principal Engineer',
    image: '/1652631488914.jpeg',
    socials: {
      linkedin: 'https://www.linkedin.com/in/jmdesiderio/',
      x: 'https://x.com/JasonDesiderio',
      instagram: 'https://www.instagram.com/jmdesiderio/',
      github: 'https://github.com/jmdesiderio',
    },
  },
  {
    name: 'Damon Bodine',
    title: 'Project Manager & AI Strategist',
    image: '/1587649018078.jpeg',
    socials: {
      linkedin: 'https://www.linkedin.com/in/damonbodine/',
      x: 'https://x.com/damonbodine',
      instagram: 'https://www.instagram.com/damonbodine/',
      github: 'https://github.com/damonbodine',
    },
  },
  {
    name: 'Kris Crawford',
    title: 'Software Engineer & AI Technologist',
    image: '/259858081_219018533698595_237774923102850579_n.jpg',
    socials: {
      linkedin: 'https://www.linkedin.com/in/kristopher-crawford-1177439a/',
      x: 'https://x.com/kris_craw',
      instagram: 'https://www.instagram.com/kristopher.____/',
      github: 'https://github.com/krismakesstuff',
    },
  },
  {
    name: 'Chris Donahue',
    title: 'Creative Director',
    image: '/403081575_325440200226266_2592020462209657049_n.jpg',
    // socials: {
    //   linkedin: '',
    //   x: '',
    //   instagram: '',
    //   github: '',
    // },
  },
]

export function ContactSection() {
  const [isPending, startTransition] = useTransition()
  const [isSuccess, setIsSuccess] = useState(false)
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      website: '',
      message: '',
    },
  })

  const onSubmit = form.handleSubmit(values => {
    startTransition(() => {
      void sendContact(values).then((result: ContactActionResult) => {
        if (!result.success) {
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
      })
    })
  })

  return (
    <AnimatedSection id='contact' className='flex flex-col gap-10 py-24'>
      <div className='flex flex-col items-center gap-4 text-center'>
        <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
          Contact
        </span>
        <h2 className='max-w-5xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl'>
          Let’s talk
        </h2>
        <p className='max-w-xl text-balance text-lg !leading-snug text-ink/80'>
          Send a message, or book a call directly to our calendars.
        </p>
      </div>
      <div className='flex flex-col gap-5 md:flex-row md:gap-6 lg:gap-8'>
        <div className='relative basis-full gap-10 rounded-xl border border-ink/10 bg-white/50 p-6 md:basis-1/2'>
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
              <Label htmlFor='company'>Company Name (optional)</Label>
              <Input
                id='company'
                {...form.register('company')}
                aria-invalid={!!form.formState.errors.company}
              />
              {form.formState.errors.company ? (
                <p className='text-sm text-red-600'>
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
                <p className='text-sm text-red-600'>
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
                <p className='text-sm text-red-600'>
                  {form.formState.errors.message.message}
                </p>
              ) : null}
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
            <div className='pointer-events-auto absolute inset-0 flex flex-col items-center justify-center gap-6 rounded-xl bg-white/95 text-center shadow-inner'>
              <h3 className='text-2xl font-semibold uppercase text-ink'>
                Thank you!
              </h3>
              <p className='max-w-md text-balance text-base text-ink/70'>
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
        <div className='flex basis-full flex-col justify-between gap-6 rounded-xl border border-ink/10 bg-white/50 p-6 md:basis-1/2'>
          <div className='grid h-full grid-cols-2 gap-3 sm:gap-6 md:gap-6 lg:gap-6'>
            {team.map(member => (
              <article
                key={member.name}
                className='group relative flex flex-col justify-start gap-2 rounded-xl border border-ink bg-white/25 px-2 pb-10 pt-3 text-center text-ink shadow-sm backdrop-blur transition-all duration-300 ease-out hover:bg-white/15'
              >
                <div className='relative mx-auto aspect-square w-2/3 overflow-hidden rounded-full border border-ink/20'>
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.title}`}
                    fill
                    className='object-cover transition duration-700 group-hover:scale-105'
                  />
                </div>
                <div className='space-y-0.5'>
                  <h3 className='font-headline text-sm uppercase leading-none'>
                    {member.name}
                  </h3>
                  <p className='text-xs text-ink/70'>{member.title}</p>
                </div>
                <div className='absolute inset-x-0 bottom-3 flex justify-center gap-2 md:bottom-4'>
                  {member.socials?.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-ink/50 transition-colors hover:text-ink'
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <svg
                        className='size-4 md:size-4 lg:size-5'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                      </svg>
                    </a>
                  )}
                  {member.socials?.x && (
                    <a
                      href={member.socials.x}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-ink/50 transition-colors hover:text-ink'
                      aria-label={`${member.name} on X`}
                    >
                      <svg
                        className='size-4 md:size-4 lg:size-5'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                      </svg>
                    </a>
                  )}
                  {member.socials?.instagram && (
                    <a
                      href={member.socials.instagram}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-ink/50 transition-colors hover:text-ink'
                      aria-label={`${member.name} on Instagram`}
                    >
                      <svg
                        className='size-4 md:size-4 lg:size-5'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
                      </svg>
                    </a>
                  )}
                  {member.socials?.github && (
                    <a
                      href={member.socials.github}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-ink/50 transition-colors hover:text-ink'
                      aria-label={`${member.name} on GitHub`}
                    >
                      <svg
                        className='size-4 md:size-4 lg:size-5'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                      </svg>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          <Button
            asChild
            size='lg'
            className='flex w-full items-center justify-center px-8 py-4'
          >
            <a
              href='https://calendar.app.google/sKeXakpFVXRJkRjH7'
              target='_blank'
              rel='noopener noreferrer'
              className='w-full text-center'
            >
              Book a video call
            </a>
          </Button>
        </div>
      </div>
    </AnimatedSection>
  )
}
