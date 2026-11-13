import { UiPiece } from '@/src/components/patterns/ui-piece'
import { cn } from '@/src/lib/utils'

/**
 * Three pieces for Platform, lifted out for UiPiece: a CRM lead list (Run
 * your business), an order form feeding one queue (Sell online) and the
 * checks on a pull request (Senior help). Sample data only: made-up names,
 * no prices.
 */

/** A small square marker: lime on the one row that matters, line otherwise. */
function Marker({ on = false }: { on?: boolean }) {
  return (
    <span
      className={cn(
        'size-2 shrink-0',
        on ? 'border border-text bg-accent' : 'bg-line'
      )}
    />
  )
}

const LEADS = [
  {
    name: 'Northside Dental',
    source: 'Website form',
    stage: 'New',
    when: 'Just now',
  },
  {
    name: 'Harbor & Pine',
    source: 'Referral',
    stage: 'Proposal',
    when: '2 days ago',
  },
  {
    name: 'Kettle Street Bakery',
    source: 'Intro call',
    stage: 'Won',
    when: 'Last week',
  },
]

export function CrmPiece({ className }: { className?: string }) {
  return (
    <UiPiece
      alt='A lead list in the CRM: three companies with where each came from, its stage and the last time anyone spoke to them. The newest lead arrived from the website form a moment ago.'
      caption='CRM · leads'
      width='lg'
      className={className}
    >
      <div className='flex flex-col'>
        <div className='flex items-center justify-between border-b border-border px-grid-1 py-grid-half'>
          <span className='type-fine'>Leads</span>
          <span className='type-fine'>3 open</span>
        </div>
        <ul className='flex flex-col'>
          {LEADS.map((lead, index) => (
            <li
              key={lead.name}
              className='flex items-center gap-grid-half border-b border-border px-grid-1 py-grid-half last:border-b-0'
            >
              <Marker on={index === 0} />
              <span className='flex min-w-0 flex-1 flex-col'>
                <span className='truncate text-sm font-semibold'>
                  {lead.name}
                </span>
                <span className='truncate text-sm text-text-muted'>
                  {lead.source} · {lead.when}
                </span>
              </span>
              <span className='shrink-0 border border-border px-2 font-mono text-xs uppercase'>
                {lead.stage}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </UiPiece>
  )
}

const QUEUE = [
  { id: '#1042', name: 'Mural print, 36 × 48', status: 'New' },
  { id: '#1041', name: 'Framed set of three', status: 'Printing' },
  { id: '#1040', name: 'Canvas, 24 × 36', status: 'Shipped' },
]

export function OrderIntakePiece({ className }: { className?: string }) {
  return (
    <UiPiece
      alt='An order form with the customer, the item and an attached artwork file, and under it the one order queue where that order lands as New, above orders already printing and shipped.'
      caption='Order intake · one form, one queue'
      width='lg'
      className={className}
    >
      <div className='flex flex-col'>
        <div className='flex flex-col gap-grid-half border-b border-border p-grid-1'>
          <span className='type-fine'>New order</span>
          <span className='flex flex-col gap-1'>
            <span className='font-mono text-xs text-text-muted'>Customer</span>
            <span className='border border-border px-grid-half py-1 text-sm'>
              Dana Ruiz
            </span>
          </span>
          <span className='flex flex-col gap-1'>
            <span className='font-mono text-xs text-text-muted'>Files</span>
            <span className='flex items-center justify-between gap-grid-half border border-dashed border-line px-grid-half py-1 text-sm'>
              <span className='truncate'>mural-artwork.pdf</span>
              <span className='shrink-0 font-mono text-xs text-text-muted'>
                Attached
              </span>
            </span>
          </span>
        </div>
        <div className='flex items-center justify-between bg-bg-card px-grid-1 py-grid-half'>
          <span className='type-fine'>Queue</span>
          <span className='type-fine'>All orders</span>
        </div>
        <ul className='flex flex-col border-t border-border'>
          {QUEUE.map((order, index) => (
            <li
              key={order.id}
              className={cn(
                'flex items-center gap-grid-half border-b border-border px-grid-1 py-grid-half last:border-b-0',
                index === 0 && 'bg-accent-muted'
              )}
            >
              <Marker on={index === 0} />
              <span className='w-12 shrink-0 font-mono text-xs text-text-muted'>
                {order.id}
              </span>
              <span className='min-w-0 flex-1 truncate text-sm'>
                {order.name}
              </span>
              <span className='shrink-0 font-mono text-xs uppercase'>
                {order.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </UiPiece>
  )
}

const CHECKS = [
  { name: 'Tests', result: '214 passed' },
  { name: 'Type check', result: 'No errors' },
  { name: 'Security scan', result: '0 issues' },
  { name: 'Load test', result: '500 users, steady' },
]

export function CodeReviewPiece({ className }: { className?: string }) {
  return (
    <UiPiece
      alt='The checks on a pull request that hardens an app before launch: tests, type check, security scan and load test all passing, and the change approved by a senior reviewer.'
      caption='Pull request · checks before launch'
      width='lg'
      className={className}
    >
      <div className='flex flex-col'>
        <div className='flex flex-col gap-1 border-b border-border px-grid-1 py-grid-half'>
          <span className='text-sm font-semibold'>
            Add tests and rate limits before launch
          </span>
          <span className='font-mono text-xs text-text-muted'>
            12 files changed
          </span>
        </div>
        <ul className='flex flex-col'>
          {CHECKS.map(check => (
            <li
              key={check.name}
              className='flex items-center gap-grid-half border-b border-border px-grid-1 py-grid-half'
            >
              <Marker />
              <span className='min-w-0 flex-1 truncate text-sm'>
                {check.name}
              </span>
              <span className='shrink-0 font-mono text-xs text-text-muted'>
                {check.result}
              </span>
            </li>
          ))}
        </ul>
        <div className='flex items-center gap-grid-half px-grid-1 py-grid-half'>
          <Marker on />
          <span className='text-sm font-semibold'>
            Approved by a senior engineer
          </span>
        </div>
      </div>
    </UiPiece>
  )
}
