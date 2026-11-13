import type { Route } from 'next'
import { Reveal } from '@/src/components/primitives/animated-section'
import { ArrowLink } from '@/src/components/patterns/arrow-link'
import { RuledList, RuledRow } from '@/src/components/boxes'
import {
  CLIENT_GROUPS,
  getClientHostname,
  type ClientRow,
} from '@/src/lib/clients'

/** The client rows on /clients, in three titled groups (Sell online, Run
 * your business, Websites and products). On large screens each group's
 * title sits in the left third and its rows run down the rest; below that
 * the title sits on top. Each row is one ruled line: the name, who they
 * are, what we built, and their site. `limit` shows only the first groups
 * (/design). Tone: light. */
export function ClientsSection({ limit }: { limit?: number } = {}) {
  return (
    <div className='flex flex-col gap-section'>
      {CLIENT_GROUPS.slice(0, limit).map(group => (
        <section
          key={group.title}
          aria-labelledby={groupId(group.title)}
          className='grid gap-stack lg:grid-cols-12 lg:gap-x-grid-1'
        >
          <Reveal index={0} className='lg:col-span-4'>
            <h2
              id={groupId(group.title)}
              className='type-section-title text-balance'
            >
              {group.title}
            </h2>
          </Reveal>
          <Reveal index={1} className='lg:col-span-8'>
            <RuledList>
              {group.rows.map(row => (
                <Row key={row.name} row={row} />
              ))}
            </RuledList>
          </Reveal>
        </section>
      ))}
    </div>
  )
}

function Row({ row }: { row: ClientRow }) {
  return (
    <RuledRow className='grid gap-grid-half py-grid-1 md:grid-cols-8 md:gap-x-grid-1'>
      <h3 className='type-card-title text-balance md:col-span-3'>{row.name}</h3>
      <div className='flex flex-col gap-grid-1 md:col-span-5'>
        <div className='flex flex-col gap-grid-half'>
          <p className='text-base text-text-muted'>{row.who}</p>
          <p className='text-base'>{row.built}</p>
        </div>
        <div className='flex flex-wrap gap-x-grid-1 gap-y-grid-half'>
          {row.page && (
            <ArrowLink href={row.page.href as Route}>
              {row.page.label}
            </ArrowLink>
          )}
          {row.sites?.map(href => (
            <a
              key={href}
              href={href}
              target='_blank'
              rel='noreferrer noopener'
              className='link-action'
            >
              {getClientHostname(href)} <span aria-hidden>↗</span>
              <span className='sr-only'> (opens in a new tab)</span>
            </a>
          ))}
        </div>
      </div>
    </RuledRow>
  )
}

function groupId(title: string): string {
  return `clients-${title.toLowerCase().replace(/[^a-z]+/g, '-')}`
}
