'use client'

import Link from 'next/link'
import { useSubscribe } from '@/src/lib/forms/use-subscribe'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'

/** Email signup for new posts, at the foot of the blog and of every post. */
export function SubscribeForm() {
  const { state, onSubmit, isPending } = useSubscribe('blog')

  return (
    <div className='relative grid gap-grid-2 border border-border p-grid-1 md:p-grid-3 lg:grid-cols-12 lg:gap-x-grid-1'>
      <BlueprintCorners size={16} />
      <div className='flex flex-col items-start gap-eyebrow lg:col-span-5'>
        <span className='bp-label font-mono'>Subscribe</span>
        <h2 className='type-section-title text-balance'>
          New posts in your inbox
        </h2>
      </div>

      <div className='flex flex-col gap-grid-half lg:col-span-6 lg:col-start-7 lg:justify-center'>
        {state.status === 'success' ? (
          <p className='type-lead' role='status'>
            You&apos;re subscribed. We&apos;ll email you when the next post is
            up.
          </p>
        ) : (
          <form onSubmit={onSubmit} className='flex flex-col gap-grid-half'>
            <label htmlFor='subscribe-email' className='sr-only'>
              Email address
            </label>
            <div className='flex flex-col gap-grid-half sm:flex-row'>
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
              <p className='text-sm text-danger' role='alert'>
                {state.message}
              </p>
            )}
            <p id='subscribe-consent' className='text-sm text-text-muted'>
              By subscribing, you agree to receive new posts and occasional
              marketing emails from Place To Stand. Unsubscribe any time. See
              our{' '}
              <Link href='/privacy' className='link-inline'>
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
