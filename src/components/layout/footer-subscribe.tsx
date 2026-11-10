'use client'

import Link from 'next/link'
import { useSubscribe } from '@/src/lib/forms/use-subscribe'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'

/** The compact mailing-list signup in the footer, on every page. */
export function FooterSubscribe() {
  const { state, onSubmit, isPending } = useSubscribe('footer')

  return (
    <div className='flex w-full flex-col gap-grid-1'>
      <span className='bp-label font-mono'>Newsletter</span>
      {state.status === 'success' ? (
        <p className='text-sm text-text' role='status'>
          You&apos;re subscribed. Thanks for reading.
        </p>
      ) : (
        <form onSubmit={onSubmit} className='flex flex-col gap-grid-half'>
          <label htmlFor='footer-subscribe-email' className='sr-only'>
            Email address
          </label>
          {/* Button beside the input when the column is a full row (tablet
              to 1279px); stacked on phones and in the narrow 1280px+ column. */}
          <div className='flex max-w-xl flex-col gap-grid-half sm:flex-row xl:flex-col'>
            <Input
              id='footer-subscribe-email'
              name='email'
              type='email'
              required
              autoComplete='email'
              placeholder='you@company.com'
              aria-invalid={state.status === 'error'}
              aria-describedby='footer-subscribe-consent'
              className='bg-bg'
            />
            <Button
              type='submit'
              size='lg'
              disabled={isPending}
              className='w-full sm:w-auto sm:shrink-0 xl:w-full'
            >
              {isPending ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </div>
          {state.status === 'error' && (
            <p className='text-sm text-danger' role='alert'>
              {state.message}
            </p>
          )}
          <p id='footer-subscribe-consent' className='text-sm text-text-muted'>
            New posts and occasional marketing email. Unsubscribe any time.{' '}
            <Link href='/privacy' className='link-inline'>
              Privacy
            </Link>
          </p>
        </form>
      )}
    </div>
  )
}
