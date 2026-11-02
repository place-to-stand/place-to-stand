'use client'

import Link from 'next/link'
import { useSubscribe } from '@/src/lib/forms/use-subscribe'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'

/** The compact mailing-list signup in the footer, on every page. */
export function FooterSubscribe() {
  const { state, onSubmit, isPending } = useSubscribe('footer')

  return (
    <div className='flex w-full max-w-sm flex-col gap-grid-half'>
      <span className='bp-label font-mono'>Subscribe</span>
      {state.status === 'success' ? (
        <p className='text-sm text-text' role='status'>
          You&apos;re subscribed. Thanks for reading.
        </p>
      ) : (
        <form onSubmit={onSubmit} className='flex flex-col gap-2'>
          <label htmlFor='footer-subscribe-email' className='sr-only'>
            Email address
          </label>
          <div className='flex flex-col gap-2'>
            <Input
              id='footer-subscribe-email'
              name='email'
              type='email'
              required
              autoComplete='email'
              placeholder='you@company.com'
              aria-invalid={state.status === 'error'}
              aria-describedby='footer-subscribe-consent'
              className='h-9 bg-bg text-sm'
            />
            <Button
              type='submit'
              size='sm'
              disabled={isPending}
              className='w-full'
            >
              {isPending ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </div>
          {state.status === 'error' && (
            <p className='text-sm text-red-400' role='alert'>
              {state.message}
            </p>
          )}
          <p id='footer-subscribe-consent' className='text-sm text-text-muted'>
            New posts and occasional marketing email. Unsubscribe any time.{' '}
            <Link
              href='/privacy'
              className='underline underline-offset-4 hover:text-accent'
            >
              Privacy
            </Link>
          </p>
        </form>
      )}
    </div>
  )
}
