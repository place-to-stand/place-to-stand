import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/src/components/primitives/button'
import { Hero } from '@/src/components/sections/hero'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description:
    "This page doesn't exist. Head back to Place To Stand's home page.",
}

export default function NotFound() {
  return (
    <main id='main' className='flex-1 pt-page-start pb-section'>
      <Hero
        variant='page'
        sectionClassName='flex flex-col gap-header'
        label='404'
        title='Nothing stands here'
        intro='The page you were looking for has moved or never existed.'
      >
        <div className='flex flex-wrap items-center gap-grid-1'>
          <Button asChild size='lg'>
            <Link href='/'>Back to home</Link>
          </Button>
          <Link href='/contact' className='link-action'>
            <span className='link-label'>Get in touch</span>{' '}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </Hero>
    </main>
  )
}
