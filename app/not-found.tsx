import { PageHeader, Section } from '@/src/components/layout/section'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/src/components/ui/button'

export const metadata: Metadata = {
  title: 'Page Not Found',
}

export default function NotFound() {
  return (
    <main className='flex-1 pt-page-start pb-section'>
      <Section priority className='flex flex-col gap-header'>
        <PageHeader
          label='404'
          title='Nothing stands here'
          intro='The page you were looking for has moved or never existed.'
        />
        <div className='flex flex-wrap items-center gap-grid-1'>
          <Button asChild size='lg'>
            <Link href='/'>Back to home</Link>
          </Button>
          <Link href='/contact' className='link-action'>
            Get in touch <span aria-hidden>→</span>
          </Link>
        </div>
      </Section>
    </main>
  )
}
