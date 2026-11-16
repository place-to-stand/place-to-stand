import type { ReactNode } from 'react'
import { UiPiece } from '@/src/components/patterns/ui-piece'
import type { PortalModuleId } from '@/src/lib/portal'
import { cn } from '@/src/lib/utils'

/**
 * Pieces of the portal's own screens, lifted out for UiPiece (the Portal
 * page): one per module, and five full screens for the carousel, built from
 * the same parts. Sample data only: invented companies and people, hours,
 * counts, dates and statuses, never prices or amounts.
 */

/* Shared parts ------------------------------------------------------------ */

/** A short tag in the app: a stage, a status, a source. `on` is the lime one. */
function Tag({ children, on = false }: { children: ReactNode; on?: boolean }) {
  return (
    <span
      className={cn(
        'inline-block shrink-0 border px-1.5 font-mono text-xs whitespace-nowrap uppercase',
        on ? 'border-text bg-accent text-text' : 'border-border text-text-muted'
      )}
    >
      {children}
    </span>
  )
}

/** A person's initials in a small square. */
function Initials({ name }: { name: string }) {
  const letters = name
    .split(' ')
    .map(part => part[0])
    .join('')
  return (
    <span className='flex size-6 shrink-0 items-center justify-center border border-border bg-bg-card font-mono text-xs'>
      {letters}
    </span>
  )
}

/** A thin meter: `left` of `of` still to use. */
function Meter({
  left,
  of,
  on = false,
}: {
  left: number
  of: number
  on?: boolean
}) {
  return (
    <span className='block h-2 w-full border border-text'>
      <span
        className={cn('block h-full', on ? 'bg-accent' : 'bg-text')}
        style={{ width: `${(left / of) * 100}%` }}
      />
    </span>
  )
}

/** A mono line of small meta: dates, counts, ids. */
function Meta({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span className={cn('font-mono text-xs text-text-muted', className)}>
      {children}
    </span>
  )
}

/** The bar across the top of a piece: what screen it is, and a count. */
function PaneBar({ title, meta }: { title: string; meta?: ReactNode }) {
  return (
    <div className='flex items-center justify-between gap-grid-half border-b border-border bg-bg-card px-grid-half py-2'>
      <span className='truncate text-sm font-semibold'>{title}</span>
      {meta && <Meta className='shrink-0'>{meta}</Meta>}
    </div>
  )
}

/** Every module piece is the same height, so a row of them lines up. */
function Pane({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex h-64 flex-col overflow-hidden', className)}>
      {children}
    </div>
  )
}

/* Sample data ------------------------------------------------------------- */

const LEADS = [
  {
    company: 'Oakline Dental',
    person: 'Ruth Abara',
    stage: 'New',
    tag: 'Website',
    last: 'Nov 12',
  },
  {
    company: 'Tidewater Freight',
    person: 'Owen Cole',
    stage: 'Talking',
    tag: 'Referral',
    last: 'Nov 9',
  },
  {
    company: 'Copperleaf Farms',
    person: 'Ines Duarte',
    stage: 'Scoping',
    tag: 'Event',
    last: 'Nov 8',
  },
  {
    company: 'Lumen Fitness',
    person: 'Theo Grant',
    stage: 'Won',
    tag: 'Website',
    last: 'Oct 30',
  },
  {
    company: 'Northwind Studio',
    person: 'Avery Chen',
    stage: 'Scoping',
    tag: 'Referral',
    last: 'Nov 12',
  },
  {
    company: 'Juniper Labs',
    person: 'Priya Nair',
    stage: 'Talking',
    tag: 'Website',
    last: 'Nov 11',
  },
  {
    company: 'Bellwether Supply',
    person: 'Marcus Hale',
    stage: 'New',
    tag: 'Event',
    last: 'Nov 10',
  },
  {
    company: 'Kestrel Outdoor',
    person: 'Dana Ruiz',
    stage: 'Won',
    tag: 'Referral',
    last: 'Nov 6',
  },
  {
    company: 'Fernway Clinics',
    person: 'Leo Park',
    stage: 'Won',
    tag: 'Website',
    last: 'Nov 4',
  },
  {
    company: 'Harbor Pine Co.',
    person: 'Nina Shah',
    stage: 'New',
    tag: 'Website',
    last: 'Nov 3',
  },
]

const TASKS = [
  {
    title: 'Reminder texts before visits',
    owner: 'Maya Brooks',
    due: 'Nov 28',
    status: 'To do',
  },
  {
    title: 'Staff roles and access',
    owner: 'Jordan Lee',
    due: 'Nov 19',
    status: 'In review',
  },
  {
    title: 'Move patient list from spreadsheets',
    owner: 'Sam Ortiz',
    due: 'Nov 6',
    status: 'Done',
  },
  {
    title: 'Intake form for new patients',
    owner: 'Sam Ortiz',
    due: 'Nov 14',
    status: 'In progress',
  },
  {
    title: 'Sync orders to the warehouse',
    owner: 'Jordan Lee',
    due: 'Nov 18',
    status: 'In progress',
  },
  {
    title: 'Weekly hours email',
    owner: 'Sam Ortiz',
    due: 'Nov 20',
    status: 'In progress',
  },
  {
    title: 'Lead stages for wholesale',
    owner: 'Maya Brooks',
    due: 'Nov 15',
    status: 'In review',
  },
  {
    title: 'Client sign-in page',
    owner: 'Jordan Lee',
    due: 'Nov 13',
    status: 'In review',
  },
  {
    title: 'Import old contacts',
    owner: 'Maya Brooks',
    due: 'Nov 21',
    status: 'To do',
  },
  {
    title: 'Invoice reminders',
    owner: 'Sam Ortiz',
    due: 'Nov 25',
    status: 'To do',
  },
  {
    title: 'Monthly report layout',
    owner: 'Jordan Lee',
    due: 'Nov 8',
    status: 'Done',
  },
]

const TIME = [
  {
    date: 'Nov 12',
    who: 'Sam Ortiz',
    task: 'Intake form for new patients',
    hours: '2.5',
  },
  {
    date: 'Nov 12',
    who: 'Jordan Lee',
    task: 'Client sign-in page',
    hours: '1.0',
  },
  {
    date: 'Nov 11',
    who: 'Maya Brooks',
    task: 'Lead stages for wholesale',
    hours: '3.0',
  },
  {
    date: 'Nov 10',
    who: 'Sam Ortiz',
    task: 'Weekly hours email',
    hours: '1.5',
  },
  {
    date: 'Nov 7',
    who: 'Jordan Lee',
    task: 'Sync orders to the warehouse',
    hours: '4.0',
  },
  {
    date: 'Nov 6',
    who: 'Maya Brooks',
    task: 'Move patient list from spreadsheets',
    hours: '3.0',
  },
  {
    date: 'Nov 5',
    who: 'Jordan Lee',
    task: 'Monthly report layout',
    hours: '2.0',
  },
  {
    date: 'Nov 4',
    who: 'Sam Ortiz',
    task: 'Import old contacts',
    hours: '1.5',
  },
  {
    date: 'Nov 3',
    who: 'Jordan Lee',
    task: 'Staff roles and access',
    hours: '2.5',
  },
]

const INVOICE_LINES = [
  { task: 'Intake form for new patients', hours: '6.5' },
  { task: 'Client sign-in page', hours: '4.0' },
  { task: 'Lead stages for wholesale', hours: '3.0' },
  { task: 'Weekly hours email', hours: '1.5' },
]

const CLOSE = [
  { label: 'Hours logged', value: '312.5' },
  { label: 'Invoices sent', value: '14' },
  { label: 'Paid', value: '12' },
  { label: 'Open', value: '2' },
]

const CLOSE_STEPS = [
  { step: 'Time approved', done: true },
  { step: 'Invoices sent', done: true },
  { step: 'Payments matched', done: true },
  { step: 'Hours blocks updated', done: true },
  { step: 'Month locked', done: false },
]

/** Adds up a list's hours, to one decimal. */
function sumHours(rows: { hours: string }[]) {
  return rows.reduce((total, row) => total + Number(row.hours), 0).toFixed(1)
}

/* Module parts: the inside of each piece, reused by the full screens ------ */

function LeadThread() {
  return (
    <div className='flex min-h-0 flex-1 flex-col gap-2 p-grid-half'>
      <div className='flex items-center gap-2'>
        <Initials name='Avery Chen' />
        <span className='min-w-0 flex-1 truncate text-sm'>
          Re: Intake forms
        </span>
        <Meta>Nov 12</Meta>
      </div>
      <p className='border-l-2 border-line pl-2 text-sm text-text-muted'>
        Thanks for the call. Could you look at our booking flow next week?
      </p>
      <div className='flex items-center gap-2'>
        <Initials name='Sam Ortiz' />
        <span className='min-w-0 flex-1 truncate text-sm'>
          Re: Intake forms
        </span>
        <Meta>Nov 11</Meta>
      </div>
    </div>
  )
}

function CrmPart() {
  return (
    <Pane>
      <PaneBar title='Northwind Studio' meta='Lead' />
      <div className='flex flex-col gap-2 border-b border-border p-grid-half'>
        <div className='flex items-center gap-2'>
          <span className='min-w-0 flex-1 truncate text-sm font-semibold'>
            Avery Chen
          </span>
          <Tag on>Scoping</Tag>
        </div>
        <div className='flex flex-wrap gap-1'>
          <Tag>Referral</Tag>
          <Tag>Clinics</Tag>
        </div>
      </div>
      <Meta className='px-grid-half pt-2'>Email · 3 messages</Meta>
      <LeadThread />
    </Pane>
  )
}

function TaskCard({
  title,
  owner,
  due,
  on = false,
}: {
  title: string
  owner: string
  due: string
  on?: boolean
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 border bg-bg-card p-2',
        on ? 'border-text' : 'border-border'
      )}
    >
      <span className='text-sm leading-snug'>{title}</span>
      <span className='flex items-center justify-between gap-2'>
        <Initials name={owner} />
        {on ? <Tag on>Due {due}</Tag> : <Meta>Due {due}</Meta>}
      </span>
    </div>
  )
}

function TasksPart() {
  const column = TASKS.filter(t => t.status === 'In progress')
  return (
    <Pane>
      <PaneBar title='In progress' meta={`${column.length} tasks`} />
      <div className='flex flex-col gap-2 p-grid-half'>
        {column.slice(0, 2).map((task, index) => (
          <TaskCard key={task.title} {...task} on={index === 0} />
        ))}
        <Meta>+ {column.length - 2} more</Meta>
      </div>
    </Pane>
  )
}

function HoursLeft({ left, of }: { left: number; of: number }) {
  return (
    <div className='flex flex-col gap-2 p-grid-half'>
      <span className='flex items-baseline justify-between gap-2'>
        <span className='text-sm font-semibold'>Prepaid hours</span>
        <Meta>
          {left} of {of} left
        </Meta>
      </span>
      <Meter left={left} of={of} on />
    </div>
  )
}

function TimeRows({ rows }: { rows: typeof TIME }) {
  return (
    <ul className='flex flex-col'>
      {rows.map(row => (
        <li
          key={row.date + row.task}
          className='flex items-center gap-2 border-b border-border px-grid-half py-2'
        >
          <Meta className='w-12 shrink-0'>{row.date}</Meta>
          <span className='min-w-0 flex-1 truncate text-sm'>{row.task}</span>
          <span className='shrink-0 font-mono text-xs'>{row.hours} h</span>
        </li>
      ))}
    </ul>
  )
}

function TimePart() {
  return (
    <Pane>
      <PaneBar title='Northwind Studio' meta='Time' />
      <HoursLeft left={14.5} of={40} />
      <div className='border-t border-border' />
      <TimeRows rows={TIME.slice(0, 4)} />
    </Pane>
  )
}

function InvoiceDoc({ rows = INVOICE_LINES }: { rows?: typeof INVOICE_LINES }) {
  return (
    <div className='flex flex-col'>
      <div className='flex items-start justify-between gap-grid-half p-grid-half'>
        <span className='flex min-w-0 flex-col gap-1'>
          <span className='text-sm font-semibold'>Invoice 1042</span>
          <Meta className='truncate'>Northwind Studio · Due Nov 30</Meta>
        </span>
        <Tag>Sent</Tag>
      </div>
      <ul className='flex flex-col border-t border-border'>
        {rows.map(line => (
          <li
            key={line.task}
            className='flex items-center gap-2 border-b border-border px-grid-half py-2'
          >
            <span className='min-w-0 flex-1 truncate text-sm'>{line.task}</span>
            <span className='shrink-0 font-mono text-xs'>{line.hours} h</span>
          </li>
        ))}
      </ul>
      <div className='flex items-center justify-between gap-2 px-grid-half py-2'>
        <Meta>Total</Meta>
        <span className='font-mono text-xs font-semibold'>
          {sumHours(rows)} h
        </span>
      </div>
    </div>
  )
}

function PayButton() {
  return (
    <span className='block border border-text bg-accent py-2 text-center font-mono text-xs tracking-[0.1em] text-text uppercase'>
      Pay invoice
    </span>
  )
}

function InvoicePart() {
  return (
    <Pane>
      <InvoiceDoc rows={INVOICE_LINES.slice(0, 3)} />
      <div className='mt-auto p-grid-half'>
        <PayButton />
      </div>
    </Pane>
  )
}

function CloseSteps({ steps = CLOSE_STEPS }: { steps?: typeof CLOSE_STEPS }) {
  return (
    <ul className='flex flex-col'>
      {steps.map(step => (
        <li
          key={step.step}
          className='flex items-center gap-2 border-b border-border px-grid-half py-2 last:border-b-0'
        >
          <span
            className={cn(
              'size-3 shrink-0 border border-text',
              step.done ? 'bg-text' : 'bg-transparent'
            )}
          />
          <span className='min-w-0 flex-1 truncate text-sm'>{step.step}</span>
          <Meta>{step.done ? 'Done' : 'Next'}</Meta>
        </li>
      ))}
    </ul>
  )
}

function ReportsPart() {
  return (
    <Pane>
      <PaneBar title='October close' meta='Nov 3' />
      <div className='grid grid-cols-2 border-b border-border'>
        {CLOSE.slice(0, 2).map((item, index) => (
          <span
            key={item.label}
            className={cn(
              'flex flex-col gap-1 p-grid-half',
              index === 0 && 'border-r border-border'
            )}
          >
            <span className='text-base font-semibold'>{item.value}</span>
            <Meta>{item.label}</Meta>
          </span>
        ))}
      </div>
      <CloseSteps steps={CLOSE_STEPS.slice(1)} />
    </Pane>
  )
}

function ClientPart() {
  return (
    <Pane>
      <PaneBar title='Welcome back, Avery' meta='Northwind' />
      <div className='flex flex-col gap-1 p-grid-half'>
        <Meta>Hours left</Meta>
        <span className='flex items-baseline gap-2'>
          <span className='bg-accent px-1 text-base font-semibold'>14.5</span>
          <span className='text-sm text-text-muted'>of 40 prepaid</span>
        </span>
      </div>
      <ul className='flex flex-col border-t border-border'>
        {[
          { label: 'Patient intake', meta: '3 tasks open' },
          { label: 'Invoice 1042', meta: 'Sent' },
          { label: 'Invoice 1031', meta: 'Paid' },
        ].map(row => (
          <li
            key={row.label}
            className='flex items-center justify-between gap-2 border-b border-border px-grid-half py-2'
          >
            <span className='truncate text-sm'>{row.label}</span>
            <Meta className='shrink-0'>{row.meta}</Meta>
          </li>
        ))}
      </ul>
    </Pane>
  )
}

function FormsPart() {
  return (
    <Pane>
      <PaneBar title='New form submission' meta='Contact' />
      <div className='flex flex-col gap-2 p-grid-half'>
        <span className='flex items-center gap-2'>
          <Initials name='Priya Nair' />
          <span className='flex min-w-0 flex-col'>
            <span className='truncate text-sm font-semibold'>Priya Nair</span>
            <Meta className='truncate'>Juniper Labs</Meta>
          </span>
        </span>
        <p className='text-sm text-text-muted'>
          We track samples in three spreadsheets. Can you help?
        </p>
      </div>
      <dl className='mt-auto grid grid-cols-[auto_1fr] gap-x-grid-half gap-y-1 border-t border-border p-grid-half'>
        <dt>
          <Meta>Source</Meta>
        </dt>
        <dd>
          <Tag on>Google search</Tag>
        </dd>
        <dt>
          <Meta>Page</Meta>
        </dt>
        <dd>
          <Meta className='text-text'>/contact</Meta>
        </dd>
        <dt>
          <Meta>Saved as</Meta>
        </dt>
        <dd>
          <Meta className='text-text'>New lead</Meta>
        </dd>
      </dl>
    </Pane>
  )
}

function AiPart() {
  return (
    <Pane>
      <PaneBar title='Ask the portal' meta='Sales role' />
      <div className='flex flex-col gap-grid-half p-grid-half'>
        <p className='self-end border border-border bg-bg-card px-2 py-1 text-sm'>
          Which leads went quiet this month?
        </p>
        <div className='flex flex-col gap-1 text-sm'>
          <span>Two leads have had no reply in 14 days:</span>
          <span className='text-text-muted'>
            Bellwether Supply · Marcus Hale
          </span>
          <span className='text-text-muted'>Harbor Pine Co. · Nina Shah</span>
        </div>
      </div>
      <div className='mt-auto flex items-center gap-2 border-t border-border p-grid-half'>
        <Tag on>Leads, contacts</Tag>
        <Meta className='truncate'>Invoices hidden</Meta>
      </div>
    </Pane>
  )
}

const ROLES = ['Sales', 'Team', 'Admin']
const ACCESS: [string, boolean[]][] = [
  ['Leads', [true, false, true]],
  ['Contacts', [true, true, true]],
  ['Tasks', [false, true, true]],
  ['Time', [false, true, true]],
  ['Invoices', [false, false, true]],
  ['Reports', [false, false, true]],
]

function RolesPart() {
  return (
    <Pane>
      <PaneBar title='Roles and access' />
      <div className='grid grid-cols-[1fr_repeat(3,3.5rem)] items-center'>
        <span />
        {ROLES.map(role => (
          <Meta key={role} className='py-2 text-center'>
            {role}
          </Meta>
        ))}
        {ACCESS.map(([area, cells]) => (
          <div key={area} className='contents'>
            <span className='border-t border-border px-grid-half py-1.5 text-sm'>
              {area}
            </span>
            {cells.map((can, index) => (
              <span
                key={ROLES[index]}
                className='flex justify-center border-t border-border py-1.5'
              >
                <span
                  className={cn(
                    'size-3 border border-text',
                    can && (index === 0 ? 'bg-accent' : 'bg-text')
                  )}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </Pane>
  )
}

const ACTIVITY = [
  {
    who: 'Jordan Lee',
    what: 'moved Client sign-in page to In review',
    when: '2:14 PM',
  },
  { who: 'Sam Ortiz', what: 'logged 2.5 h on Intake form', when: '1:02 PM' },
  { who: 'Maya Brooks', what: 'sent Invoice 1042', when: '11:40 AM' },
  { who: 'Avery Chen', what: 'opened Invoice 1042', when: '11:58 AM' },
]

function ActivityPart() {
  return (
    <Pane>
      <PaneBar title='Activity' meta='Today' />
      <ol className='flex flex-col'>
        {ACTIVITY.map((item, index) => (
          <li
            key={item.what}
            className='flex gap-2 border-b border-border px-grid-half py-2 last:border-b-0'
          >
            <span
              className={cn(
                'mt-1.5 size-2 shrink-0',
                index === 0 ? 'border border-text bg-accent' : 'bg-line'
              )}
            />
            <span className='flex min-w-0 flex-1 flex-col'>
              <span className='truncate text-sm'>
                <span className='font-semibold'>{item.who}</span> {item.what}
              </span>
              <Meta>{item.when}</Meta>
            </span>
          </li>
        ))}
      </ol>
    </Pane>
  )
}

/** The search box: `query` typed in (with a caret), or the placeholder. */
function SearchBox({ query }: { query?: string }) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 border bg-bg-card px-2 py-1.5',
        query ? 'border-text' : 'border-border'
      )}
    >
      <span className='min-w-0 flex-1 truncate text-sm'>
        {query ?? <span className='text-text-muted'>Search</span>}
        {query && (
          <span className='ml-px inline-block h-4 w-px translate-y-0.5 bg-text' />
        )}
      </span>
      <Meta className='border border-border px-1'>⌘K</Meta>
    </div>
  )
}

function SearchPart() {
  const results = [
    { kind: 'Lead', label: 'Northwind Studio', meta: 'Scoping' },
    { kind: 'Task', label: 'Northwind intake form', meta: 'In progress' },
    { kind: 'Invoice', label: 'Invoice 1042 · Northwind', meta: 'Sent' },
    { kind: 'Contact', label: 'Avery Chen · Northwind', meta: 'Client' },
  ]
  return (
    <Pane>
      <div className='p-grid-half'>
        <SearchBox query='north' />
      </div>
      <ul className='flex flex-col border-t border-border'>
        {results.map((result, index) => (
          <li
            key={result.label}
            className={cn(
              'flex items-center gap-2 border-b border-border px-grid-half py-2',
              index === 0 && 'bg-accent-muted'
            )}
          >
            <Meta className='w-14 shrink-0 uppercase'>{result.kind}</Meta>
            <span className='min-w-0 flex-1 truncate text-sm'>
              {result.label}
            </span>
          </li>
        ))}
      </ul>
    </Pane>
  )
}

function UndoPart() {
  return (
    <Pane>
      <PaneBar title='Leads' meta='Archived (3)' />
      <ul className='flex flex-col'>
        {LEADS.slice(4, 7).map((lead, index) => (
          <li
            key={lead.company}
            className={cn(
              'flex items-center gap-2 border-b border-border px-grid-half py-2',
              index === 1 && 'text-text-muted line-through decoration-line'
            )}
          >
            <span className='min-w-0 flex-1 truncate text-sm'>
              {lead.company}
            </span>
            <Tag>{index === 1 ? 'Archived' : lead.stage}</Tag>
          </li>
        ))}
      </ul>
      <div className='mt-auto p-grid-half'>
        <div className='flex items-center gap-grid-half bg-text px-grid-half py-2 text-bg'>
          <span className='min-w-0 flex-1 truncate text-sm'>
            Juniper Labs archived
          </span>
          <span className='bg-accent px-2 py-0.5 font-mono text-xs tracking-[0.1em] text-ink uppercase'>
            Undo
          </span>
        </div>
      </div>
    </Pane>
  )
}

/* Module pieces ------------------------------------------------------------ */

const MODULE_PIECES: Record<
  PortalModuleId,
  { alt: string; part: () => ReactNode }
> = {
  crm: {
    alt: 'A lead in the portal CRM: Northwind Studio, contact Avery Chen, at the Scoping stage with Referral and Clinics tags, and the email thread with the lead underneath.',
    part: CrmPart,
  },
  tasks: {
    alt: 'The In progress column of a project board: three task cards, each with an owner and a due date.',
    part: TasksPart,
  },
  time: {
    alt: 'Time logged for Northwind Studio: a meter showing 14.5 of 40 prepaid hours left, above the latest time entries in hours.',
    part: TimePart,
  },
  invoices: {
    alt: 'Invoice 1042 for Northwind Studio, marked Sent: three tasks with their hours, a total of 13.5 hours and a Pay invoice button.',
    part: InvoicePart,
  },
  reports: {
    alt: 'The October monthly close: 312.5 hours logged, 14 invoices sent, and a checklist with invoices, payments and hours done and the month still to lock.',
    part: ReportsPart,
  },
  client: {
    alt: 'The client’s own view: 14.5 of 40 prepaid hours left, an open project and two invoices, one sent and one paid.',
    part: ClientPart,
  },
  forms: {
    alt: 'A contact form submission from Priya Nair of Juniper Labs, saved as a new lead, with its source, Google search, and the page it came from.',
    part: FormsPart,
  },
  ai: {
    alt: 'A question asked of the portal from the Sales role, which leads went quiet this month, answered with two leads; the answer notes it can see leads and contacts but not invoices.',
    part: AiPart,
  },
  roles: {
    alt: 'A roles matrix: Sales can see leads and contacts, Team can see contacts, tasks and time, and Admin can see everything.',
    part: RolesPart,
  },
  activity: {
    alt: 'Today’s activity log: who moved a task, logged time, sent an invoice and opened it, each with the time.',
    part: ActivityPart,
  },
  search: {
    alt: 'The search box with “north” typed in, finding a lead, a task, an invoice and a contact for Northwind Studio.',
    part: SearchPart,
  },
  undo: {
    alt: 'A list of leads with one just archived, crossed out rather than deleted, and a notice at the bottom with an Undo button.',
    part: UndoPart,
  },
}

/** The lifted-out piece for one module on the Portal page. */
export function PortalModulePiece({
  id,
  className,
}: {
  id: PortalModuleId
  className?: string
}) {
  const { alt, part: Part } = MODULE_PIECES[id]
  return (
    <UiPiece alt={alt} width='md' className={className}>
      <Part />
    </UiPiece>
  )
}

/* Full screens --------------------------------------------------------------
   The app as a whole: a sidebar, a top bar with search, and the page. Below
   the tablet size the sidebar folds into the top bar. */

const NAV = ['Leads', 'Projects', 'Time', 'Invoices', 'Reports', 'Clients']

function AppFrame({
  active,
  title,
  meta,
  children,
}: {
  active: string
  title: string
  meta?: ReactNode
  children: ReactNode
}) {
  return (
    <div className='flex h-120 overflow-hidden md:h-132'>
      <nav className='hidden w-40 shrink-0 flex-col border-r border-border bg-bg-card md:flex'>
        <span className='flex items-center gap-2 border-b border-border px-grid-half py-grid-half'>
          <span className='size-3 border-2 border-text' />
          <span className='text-sm font-semibold'>Portal</span>
        </span>
        <ul className='flex flex-col gap-1 p-2'>
          {NAV.map(item => (
            <li
              key={item}
              className={cn(
                'px-2 py-1 text-sm',
                item === active
                  ? 'bg-text font-semibold text-bg'
                  : 'text-text-muted'
              )}
            >
              {item}
            </li>
          ))}
        </ul>
        <span className='mt-auto flex items-center gap-2 border-t border-border p-grid-half'>
          <Initials name='Sam Ortiz' />
          <Meta>Admin</Meta>
        </span>
      </nav>
      <div className='flex min-w-0 flex-1 flex-col'>
        <div className='flex items-center gap-grid-half border-b border-border px-grid-half py-2'>
          <span className='flex min-w-0 flex-1 flex-col'>
            <Meta className='md:hidden'>Portal · {active}</Meta>
            <span className='truncate text-sm font-semibold'>{title}</span>
          </span>
          {meta && <Meta className='hidden shrink-0 sm:inline'>{meta}</Meta>}
          <span className='hidden w-48 lg:block'>
            <SearchBox />
          </span>
        </div>
        <div className='min-h-0 flex-1 overflow-hidden'>{children}</div>
      </div>
    </div>
  )
}

/** A board of columns that scrolls sideways on narrow screens (clipped). */
function Board({
  columns,
}: {
  columns: { name: string; cards: ReactNode[] }[]
}) {
  return (
    <div className='grid h-full auto-cols-[minmax(11rem,1fr)] grid-flow-col gap-grid-half p-grid-half'>
      {columns.map(column => (
        <div key={column.name} className='flex min-w-0 flex-col gap-2'>
          <span className='flex items-center justify-between'>
            <Meta className='uppercase'>{column.name}</Meta>
            <Meta>{column.cards.length}</Meta>
          </span>
          {column.cards}
        </div>
      ))}
    </div>
  )
}

function LeadsBoardScreen() {
  const stages = ['New', 'Talking', 'Scoping', 'Won']
  return (
    <AppFrame
      active='Leads'
      title='Leads board'
      meta={`${LEADS.length} open leads`}
    >
      <Board
        columns={stages.map(stage => ({
          name: stage,
          cards: LEADS.filter(lead => lead.stage === stage).map(lead => (
            <div
              key={lead.company}
              className={cn(
                'flex flex-col gap-2 border bg-bg-card p-2',
                lead.stage === 'Scoping' ? 'border-text' : 'border-border'
              )}
            >
              <span className='truncate text-sm font-semibold'>
                {lead.company}
              </span>
              <span className='flex items-center gap-2'>
                <Initials name={lead.person} />
                <span className='truncate text-sm text-text-muted'>
                  {lead.person}
                </span>
              </span>
              <span className='flex items-center justify-between gap-2'>
                <Tag on={lead.stage === 'Scoping'}>{lead.tag}</Tag>
                <Meta>{lead.last}</Meta>
              </span>
            </div>
          )),
        }))}
      />
    </AppFrame>
  )
}

function ProjectTasksScreen() {
  const statuses = ['To do', 'In progress', 'In review', 'Done']
  return (
    <AppFrame
      active='Projects'
      title='Patient intake · Fernway Clinics'
      meta={`${TASKS.length} tasks`}
    >
      <Board
        columns={statuses.map(status => ({
          name: status,
          cards: TASKS.filter(task => task.status === status).map(task => (
            <TaskCard
              key={task.title}
              {...task}
              on={task.title === 'Client sign-in page'}
            />
          )),
        }))}
      />
    </AppFrame>
  )
}

function TimeLogScreen() {
  return (
    <AppFrame
      active='Time'
      title='Time log'
      meta={`November · ${sumHours(TIME)} h`}
    >
      <div className='grid h-full md:grid-cols-[1fr_15rem]'>
        <div className='flex min-w-0 flex-col'>
          <div className='flex gap-2 border-b border-border px-grid-half py-2'>
            <Meta className='w-12 shrink-0'>Date</Meta>
            <Meta className='flex-1'>Task</Meta>
            <Meta className='hidden w-24 sm:block'>Who</Meta>
            <Meta>Hours</Meta>
          </div>
          <ul className='flex flex-col'>
            {TIME.map(row => (
              <li
                key={row.date + row.task}
                className='flex items-center gap-2 border-b border-border px-grid-half py-2'
              >
                <Meta className='w-12 shrink-0'>{row.date}</Meta>
                <span className='min-w-0 flex-1 truncate text-sm'>
                  {row.task}
                </span>
                <span className='hidden w-24 truncate text-sm text-text-muted sm:block'>
                  {row.who}
                </span>
                <span className='w-10 shrink-0 text-right font-mono text-xs'>
                  {row.hours}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className='hidden flex-col gap-grid-half border-l border-border bg-bg-card md:flex'>
          <HoursLeft left={14.5} of={40} />
          <div className='flex flex-col gap-2 border-t border-border p-grid-half'>
            <span className='text-sm font-semibold'>Juniper Labs</span>
            <Meter left={31} of={40} />
            <Meta>31 of 40 left</Meta>
          </div>
          <div className='flex flex-col gap-2 border-t border-border p-grid-half'>
            <span className='text-sm font-semibold'>Kestrel Outdoor</span>
            <Meter left={6} of={20} />
            <Meta>6 of 20 left</Meta>
          </div>
        </div>
      </div>
    </AppFrame>
  )
}

function InvoiceScreen() {
  return (
    <AppFrame active='Invoices' title='Invoice 1042' meta='Shared link'>
      <div className='flex h-full justify-center bg-bg p-grid-half md:p-grid-1'>
        <div className='flex w-full max-w-md flex-col border border-border bg-bg-card'>
          <InvoiceDoc />
          <div className='mt-auto flex flex-col gap-2 p-grid-half'>
            <PayButton />
            <Meta className='text-center'>Opened by Avery Chen · Nov 12</Meta>
          </div>
        </div>
      </div>
    </AppFrame>
  )
}

function MonthlyCloseScreen() {
  return (
    <AppFrame active='Reports' title='Monthly close · October' meta='Nov 3'>
      <div className='flex h-full flex-col gap-grid-half p-grid-half'>
        <div className='grid grid-cols-2 gap-2 sm:grid-cols-4'>
          {CLOSE.map((item, index) => (
            <span
              key={item.label}
              className={cn(
                'flex flex-col gap-1 border bg-bg-card p-grid-half',
                index === 0 ? 'border-text' : 'border-border'
              )}
            >
              <span className='text-base font-semibold'>{item.value}</span>
              <Meta>{item.label}</Meta>
            </span>
          ))}
        </div>
        <div className='grid min-h-0 flex-1 gap-grid-half md:grid-cols-2'>
          <div className='flex flex-col border border-border bg-bg-card'>
            <PaneBar title='Close checklist' meta='4 of 5' />
            <CloseSteps />
          </div>
          <div className='hidden flex-col border border-border bg-bg-card md:flex'>
            <PaneBar title='Hours by client' />
            <ul className='flex flex-col gap-grid-half p-grid-half'>
              {[
                { name: 'Northwind Studio', hours: 96 },
                { name: 'Fernway Clinics', hours: 84 },
                { name: 'Juniper Labs', hours: 72 },
                { name: 'Kestrel Outdoor', hours: 60.5 },
              ].map(row => (
                <li key={row.name} className='flex flex-col gap-1'>
                  <span className='flex justify-between gap-2'>
                    <span className='truncate text-sm'>{row.name}</span>
                    <Meta>{row.hours} h</Meta>
                  </span>
                  <Meter left={row.hours} of={120} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AppFrame>
  )
}

const SCREENS = [
  {
    alt: 'The leads board: six leads in columns New, Talking, Scoping and Won, each card with the company, contact, source tag and date of the last email.',
    screen: LeadsBoardScreen,
  },
  {
    alt: 'A project board for Fernway Clinics: eight tasks in To do, In progress, In review and Done, each with an owner and a due date.',
    screen: ProjectTasksScreen,
  },
  {
    alt: 'The time log: this week’s entries by date, task, person and hours, with each client’s prepaid hours left beside it.',
    screen: TimeLogScreen,
  },
  {
    alt: 'Invoice 1042 as the client sees it from a shared link: tasks and hours, a 15 hour total and a Pay invoice button.',
    screen: InvoiceScreen,
  },
  {
    alt: 'October’s monthly close: hours logged, invoices sent, paid and open, a close checklist and hours by client.',
    screen: MonthlyCloseScreen,
  },
]

/** One full portal screen for the carousel, by position (0 to 4). */
export function PortalScreenPiece({
  index,
  className,
}: {
  index: number
  className?: string
}) {
  const { alt, screen: Screen } = SCREENS[index]
  return (
    <UiPiece alt={alt} width='full' className={className}>
      <Screen />
    </UiPiece>
  )
}
