import type { Metadata, Route } from 'next'
import Link from 'next/link'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { markdownPages } from '@/src/lib/markdown/pages'
import { CONTACT_EMAIL } from '@/src/lib/site'

export const metadata: Metadata = {
  title: 'Page not found',
  description:
    'That page does not exist. Every page on the site is listed here, along with the sitemap and the agent index.',
  robots: { index: false },
}

const MACHINE_LINKS = [
  { href: '/llms.txt', label: 'llms.txt', note: 'site index for agents' },
  { href: '/llms-full.txt', label: 'llms-full.txt', note: 'full site text' },
  { href: '/sitemap.xml', label: 'sitemap.xml', note: 'XML sitemap' },
] as const

/**
 * Rendered with a real HTTP 404 by Next for any unmatched path. The body is a
 * site map rather than a dead end, so a person or an agent that lands here can
 * recover without guessing. Clients asking for markdown get the same map as
 * text from proxy.ts.
 */
export default function NotFound() {
  return (
    <main className='flex-1 pt-grid-4 pb-32'>
      <div className='mx-auto flex w-full max-w-content flex-col gap-grid-2 px-6 lg:px-12'>
        <div className='flex flex-col gap-4'>
          <span className='bp-label font-mono'>Error 404</span>
          <h1 className='max-w-4xl font-headline text-4xl leading-[.9]! font-semibold text-balance text-text uppercase md:text-6xl'>
            Page not found
          </h1>
          <p className='max-w-2xl text-base text-balance text-text-muted md:text-lg'>
            There is no page at this address. Everything on the site is listed
            below, so pick where to go next.
          </p>
        </div>

        <div className='relative border border-border bg-bg-card p-6 md:p-8'>
          <BlueprintCorners size={16} />
          <div className='grid gap-grid-2 md:grid-cols-2'>
            <nav aria-label='Site map' className='flex flex-col gap-3'>
              <span className='bp-label font-mono'>Pages</span>
              <ul className='flex flex-col gap-2'>
                {markdownPages.map(page => (
                  <li key={page.path} className='flex flex-col'>
                    <Link
                      href={page.path as Route}
                      className='font-mono text-[11px] tracking-[0.1em] text-text uppercase transition-colors hover:text-accent'
                    >
                      {page.label}
                    </Link>
                    <span className='text-sm text-text-muted'>
                      {page.description}
                    </span>
                  </li>
                ))}
              </ul>
            </nav>
            <div className='flex flex-col gap-3'>
              <span className='bp-label font-mono'>
                For agents and crawlers
              </span>
              <ul className='flex flex-col gap-2'>
                {MACHINE_LINKS.map(link => (
                  <li key={link.href} className='flex flex-col'>
                    <a
                      href={link.href}
                      className='font-mono text-[11px] tracking-[0.1em] text-text uppercase transition-colors hover:text-accent'
                    >
                      {link.label}
                    </a>
                    <span className='text-sm text-text-muted'>{link.note}</span>
                  </li>
                ))}
              </ul>
              <p className='mt-grid-half text-sm leading-relaxed text-text-muted'>
                Any page returns markdown when requested with{' '}
                <code className='font-mono text-xs'>Accept: text/markdown</code>
                . If you followed a link from somewhere else, email{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className='text-accent underline-offset-4 hover:underline'
                >
                  {CONTACT_EMAIL}
                </a>{' '}
                and we will fix it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
