/**
 * The Portal page copy (approved Nov 13, "Portal page copy"). Module claims
 * are checked against the portal code. Section 6 (Try it) waits for the demo.
 */

export const PORTAL_REPO_URL =
  'https://github.com/place-to-stand/place-to-stand-portal'

export const PORTAL_HEADER = {
  label: 'Portal',
  title: 'The system we run our company on.',
  intro:
    'Leads, projects, time, invoices and client updates in one place. We built it, we use it every day, and the code is public. Yours starts as a copy of ours, trimmed to what you need.',
  codeLabel: 'See the code',
}

export type PortalModuleId =
  | 'crm'
  | 'tasks'
  | 'time'
  | 'invoices'
  | 'reports'
  | 'client'
  | 'forms'
  | 'ai'
  | 'roles'
  | 'activity'
  | 'search'
  | 'undo'

export type PortalModule = {
  id: PortalModuleId
  title: string
  body: string
  insteadOf?: string
}

export const PORTAL_MODULES: PortalModule[] = [
  {
    id: 'crm',
    title: 'CRM',
    body: 'Every lead, company and contact, with tags, stages and the email thread beside each lead.',
    insteadOf: 'HubSpot, Pipedrive',
  },
  {
    id: 'tasks',
    title: 'Projects and tasks',
    body: 'Boards for every project, with owners, due dates and the full history of each task.',
    insteadOf: 'Asana, Monday',
  },
  {
    id: 'time',
    title: 'Time and hours',
    body: 'Log time against tasks and watch each client’s prepaid hours count down.',
    insteadOf: 'Harvest, spreadsheets',
  },
  {
    id: 'invoices',
    title: 'Invoices',
    body: 'Built from logged hours and sent as a link the client can open and pay.',
    insteadOf: 'QuickBooks invoices, emailed PDFs',
  },
  {
    id: 'reports',
    title: 'Reports',
    body: 'The month’s numbers closed in one place, from your own data.',
    insteadOf: 'exported spreadsheets',
  },
  {
    id: 'client',
    title: 'Client view',
    body: 'Your clients sign in to see their projects, their hours left and their invoices, without a status call.',
  },
  {
    id: 'forms',
    title: 'Website forms',
    body: 'Every form on your site lands in the CRM, with where the visitor came from.',
  },
  {
    id: 'ai',
    title: 'AI access',
    body: 'Ask your own AI tools about your business. They see only what your role allows.',
  },
  {
    id: 'roles',
    title: 'Roles and access',
    body: 'Each person sees only what their job needs. A salesperson gets leads and contacts; an admin gets everything. Your AI tools follow the same rules.',
  },
  {
    id: 'activity',
    title: 'Activity log',
    body: 'Every change is recorded: who did what, and when.',
  },
  {
    id: 'search',
    title: 'Search everything',
    body: 'Any lead, task or invoice in two keystrokes.',
  },
  {
    id: 'undo',
    title: 'Nothing gets lost',
    body: 'Undo on edits, and archive instead of delete.',
  },
]

export const PORTAL_SCREENS = {
  label: 'See It Whole',
  title: 'Every screen, as it is.',
  body: 'A short carousel of full screens, so you can see how the pieces above fit together.',
  captions: [
    'Leads board',
    'Project tasks',
    'Time log',
    'Invoice',
    'Monthly close',
  ],
} as const

export const PORTAL_BUILD = {
  label: 'How We Build With It',
  title: 'Humans decide. Agents build. We check.',
  body: 'Every change starts as a task in the portal. AI agents write the code in a sealed-off cloud workspace, and nothing ships until one of us has checked it. It’s how we work up to 5x faster than a traditional team, and your system gets the same setup.',
}

export const PORTAL_OWNERSHIP = {
  label: 'Yours, Not a Subscription',
  title: 'You own your copy.',
  lines: [
    'It starts as a copy of ours, with the parts you don’t need taken out before your team signs in.',
    'It runs on your own infrastructure, in accounts in your name.',
    'Features that already exist cost nothing. You pay only for the hours to install and change it.',
    'No seat fees. Add people without paying more.',
    'The code is public, so you can see what you’re getting before you start.',
  ],
}

export const PORTAL_CTA_TITLE = 'Want one built around how you work?'
