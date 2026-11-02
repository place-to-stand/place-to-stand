'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { subscribe, type SubscribeState } from '@/app/actions/subscribe'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'

const INITIAL: SubscribeState = { status: 'idle' }

/** Email signup for new posts, at the foot of the blog and of every post. */
export function SubscribeForm() {
  const [state, formAction, isPending] = useActionState(subscribe, INITIAL)

  return (
    <div className='relative grid gap-grid-2 border border-border p-6 md:p-grid-3 lg:grid-cols-12 lg:gap-x-grid-1'>
      <BlueprintCorners size={16} />
      <div className='flex flex-col gap-3 lg:col-span-5'>
        <span className='bp-label font-mono'>Subscribe</span>
        <h2 className='font-headline text-3xl leading-[0.95] font-bold tracking-tight text-balance text-text uppercase md:text-4xl'>
          New posts in your inbox
        </h2>
      </div>

      <div className='flex flex-col gap-4 lg:col-span-6 lg:col-start-7 lg:justify-center'>
        {state.status === 'success' ? (
          <p className='text-lg text-text md:text-xl' role='status'>
            You&apos;re subscribed. We&apos;ll email you when the next post is
            up.
          </p>
        ) : (
          <form action={formAction} className='flex flex-col gap-3'>
            <label htmlFor='subscribe-email' className='sr-only'>
              Email address
            </label>
            <div className='flex flex-col gap-3 sm:flex-row'>
              <Input
                id='subscribe-email'
                name='email'
                type='email'
                required
                autoComplete='email'
                placeholder='you@company.com'
                aria-invalid={state.status === 'error'}
                aria-describedby='subscribe-consent'
              />
              <Button
                type='submit'
                size='lg'
                disabled={isPending}
                className='shrink-0'
              >
                {isPending ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
            {state.status === 'error' && (
              <p className='text-sm text-red-400' role='alert'>
                {state.message}
              </p>
            )}
            <p id='subscribe-consent' className='text-sm text-text-muted'>
              By subscribing, you agree to receive new posts and occasional
              marketing emails from Place To Stand. Unsubscribe any time. See
              our{' '}
              <Link
                href='/privacy'
                className='text-text underline underline-offset-4 hover:text-accent'
              >
                privacy policy
              </Link>
              .
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
