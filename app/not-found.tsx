import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/src/components/ui/button'

export const metadata: Metadata = {
  title: 'Page Not Found',
}

export default function NotFound() {
  return (
    <main className='flex-1 pt-page-start pb-section'>
      <div className='mx-auto w-full max-w-content px-6 lg:px-12'>
        <div className='relative max-w-2xl bg-bg-panel p-card'>
          <span className='bp-label font-mono'>404</span>
          <h1 className='mt-grid-half type-section-title'>
            Nothing stands here
          </h1>
          <p className='mt-intro text-base text-text-muted'>
            The page you were looking for has moved or never existed.
          </p>

          <div className='mt-6 flex flex-wrap items-center gap-4'>
            <Button asChild>
              <Link href='/'>Back to home</Link>
            </Button>
            <Link
              href='/contact'
              className='text-sm text-accent underline-offset-4 hover:underline'
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
