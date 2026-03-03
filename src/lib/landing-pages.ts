export type LandingVariant = {
  slug: string
  audience: string
  eyebrow: string
  headline: string
  subheadline: string
  outcomeBullets: string[]
  painPoints: string[]
  differentiators: string[]
  ctaLabel: string
}

export const bookingLink = 'https://calendar.app.google/sKeXakpFVXRJkRjH7'

export const landingVariants: LandingVariant[] = [
  {
    slug: 'fast-start',
    audience: 'For busy local business owners who need momentum this month',
    eyebrow: 'Variant A · Speed-first message',
    headline: 'Launch a working growth system in 14 to 30 days.',
    subheadline:
      'If leads are coming in but follow-up is slow, we build a focused lead-to-booking workflow quickly so you stop losing opportunities while waiting on a long project timeline.',
    outcomeBullets: [
      'Map your current lead flow and identify where inquiries are being lost',
      'Ship one high-impact workflow first (inquiry, follow-up, and booking)',
      'Leave with a simple 30-day implementation plan and clear ownership',
    ],
    painPoints: [
      'New leads sit too long before someone responds',
      'Important follow-ups depend on memory and sticky notes',
      'You need results now, not another 3-month strategy deck',
    ],
    differentiators: [
      'You work directly with builders, not layers of account managers',
      'We implement practical systems first, then optimize from real data',
      'No bloated scope, just the fastest path to booked calls',
    ],
    ctaLabel: 'Book a call and get your 30-day fast-start plan',
  },
  {
    slug: 'profit-focus',
    audience: 'For owners focused on margin, not vanity metrics',
    eyebrow: 'Variant B · ROI-first message',
    headline: 'Use automation where it directly improves profit.',
    subheadline:
      'We identify the exact workflow bottlenecks that drain owner time and revenue, then fix them first so your tech spend creates measurable business return.',
    outcomeBullets: [
      'Quantify top time drains and their real cost to the business',
      'Prioritize 2 to 3 automation wins tied to revenue or margin',
      'Set straightforward KPIs you can review weekly',
    ],
    painPoints: [
      'You pay for tools but cannot prove business impact',
      'Admin overhead keeps rising as the team grows',
      'Work stays busy, but profit does not improve enough',
    ],
    differentiators: [
      'Every recommendation is tied to time saved, revenue captured, or margin',
      'No extra software unless it solves a specific bottleneck',
      'We build with your existing stack whenever possible',
    ],
    ctaLabel: 'Book a call and map your highest-ROI workflow fixes',
  },
  {
    slug: 'done-for-you',
    audience: 'For owners who need execution without babysitting a project',
    eyebrow: 'Variant C · Done-for-you message',
    headline: 'You run the business. We build the workflow engine.',
    subheadline:
      'If your team is stretched and tasks keep slipping, we handle the build end-to-end so your lead handling, follow-up, and delivery workflows run reliably without constant owner intervention.',
    outcomeBullets: [
      'Define the exact process to automate, step by step',
      'Implement and test the workflow in your live tools',
      'Hand off clear SOPs so your team can run it confidently',
    ],
    painPoints: [
      'Execution stalls because no one has time to own implementation',
      'Previous vendors left brittle workflows nobody trusts',
      'Owner oversight is required for too many routine tasks',
    ],
    differentiators: [
      'Senior implementation support from discovery through launch',
      'Weekly visibility into progress, blockers, and next actions',
      'Clean builds your team can maintain after handoff',
    ],
    ctaLabel: 'Book a call and get done-for-you workflow implementation',
  },
  {
    slug: 'stress-free-growth',
    audience: 'For owners who want growth without daily fire drills',
    eyebrow: 'Variant D · Simplicity-first message',
    headline: 'Reduce chaos with workflows your team can actually follow.',
    subheadline:
      'When every day feels reactive, we simplify your operating flow so client communication, internal handoffs, and follow-up happen in a repeatable rhythm.',
    outcomeBullets: [
      'Replace ad-hoc handoffs with a clear workflow path',
      'Create predictable follow-up rules so leads stop going cold',
      'Cut context-switching with simple, documented process steps',
    ],
    painPoints: [
      'Team members are constantly asking who owns the next step',
      'Client and lead communication is inconsistent across channels',
      'Growth creates more stress because operations are not standardized',
    ],
    differentiators: [
      'Small-business-first systems built for real team capacity',
      'Simple operating cadence instead of overengineered complexity',
      'Clarity first: who does what, when, and in which tool',
    ],
    ctaLabel: 'Book a call to simplify operations and scale calmly',
  },
  {
    slug: 'ai-coworker',
    audience: 'For owners who need output now but cannot add headcount yet',
    eyebrow: 'Variant E · AI co-worker message',
    headline: 'Deploy an AI co-worker for repetitive ops and follow-up.',
    subheadline:
      'We design an AI-assisted workflow that handles repetitive first-pass tasks so your team can focus on high-value conversations and decisions.',
    outcomeBullets: [
      'Choose the top repetitive tasks your AI co-worker should own first',
      'Set clear review and escalation rules for human approval',
      'Launch a practical AI workflow your team can trust daily',
    ],
    painPoints: [
      'High-value staff spend too much time on low-value repetitive work',
      'Response speed drops when owners are in meetings or on-site',
      'Important tasks get delayed because there is no reliable operator layer',
    ],
    differentiators: [
      'Human-in-the-loop controls baked into every workflow',
      'AI positioned as an operator assist, not a risky black box',
      'Fast deployment focused on immediate team capacity gains',
    ],
    ctaLabel: 'Book a call to design your AI co-worker workflow',
  },
  {
    slug: 'automation-pipeline',
    audience: 'For service businesses losing deals between inquiry and booking',
    eyebrow: 'Variant F · Workflow automation message',
    headline: 'Automate lead-to-booking so good leads stop slipping away.',
    subheadline:
      'We connect forms, CRM, messaging, and calendar actions into one workflow so inquiries are routed, followed up, and pushed toward booked calls automatically.',
    outcomeBullets: [
      'Map the full inquiry-to-booking path and find exact drop-off points',
      'Set trigger-based follow-up across your core channels',
      'Create clear routing rules so every lead gets timely next steps',
    ],
    painPoints: [
      'Inquiries come in, but follow-up timing is inconsistent',
      'Leads get lost between inboxes, DMs, and CRM notes',
      'Sales momentum dies during manual handoffs',
    ],
    differentiators: [
      'Built specifically around conversion to booked calls',
      'End-to-end workflow ownership from first response to calendar',
      'Simple visibility so your team can see where every lead stands',
    ],
    ctaLabel: 'Book a call to automate your lead-to-booking pipeline',
  },
  {
    slug: 'ops-systemization',
    audience: 'For owners whose operations still live in people, not process',
    eyebrow: 'Variant G · Systemization message',
    headline: 'Turn tribal knowledge into workflows your team can run.',
    subheadline:
      'We document and automate your core operating tasks so quality stays consistent, onboarding is faster, and progress does not depend on one person remembering every step.',
    outcomeBullets: [
      'Extract key process knowledge from your current team',
      'Convert it into SOP-backed workflows with automation support',
      'Assign ownership and checkpoints so execution is consistent',
    ],
    painPoints: [
      'Critical processes are trapped in DMs, memory, and scattered docs',
      'Output quality changes based on who is available that day',
      'Onboarding new team members takes too long and feels chaotic',
    ],
    differentiators: [
      'Practical system design built for owner-led teams',
      'Every workflow includes clear ownership and accountability',
      'Implementation-first approach, not just process theory',
    ],
    ctaLabel: 'Book a call to systemize your core operations',
  },
  {
    slug: 'automation-roi',
    audience: 'For owners who need measurable return from AI and automation',
    eyebrow: 'Variant H · Automation ROI message',
    headline: 'Cut admin drag and convert more leads with targeted automation.',
    subheadline:
      'We focus on the automation opportunities with the clearest business impact first so you can improve capacity, speed-to-lead, and close rate without adding complexity.',
    outcomeBullets: [
      'Estimate weekly hours and revenue impact for top automation opportunities',
      'Sequence quick wins before larger system changes',
      'Track simple before-and-after metrics after launch',
    ],
    painPoints: [
      'Automation projects have felt expensive and hard to measure',
      'Admin work keeps expanding faster than team capacity',
      'You need better conversion without adding more operational burden',
    ],
    differentiators: [
      'ROI-led prioritization from day one',
      'No enterprise bloat, only what moves business outcomes',
      'Execution with measurable checkpoints, not vague promises',
    ],
    ctaLabel: 'Book a call and identify your highest-ROI automations',
  },
  {
    slug: 'never-miss-a-lead',
    audience: 'For owners tired of watching good leads go cold',
    eyebrow: 'Variant I · Never-miss-a-lead message',
    headline: 'Respond faster and stop losing leads between touchpoints.',
    subheadline:
      'We build a follow-up system that routes every inquiry, triggers timed responses, and escalates exceptions so your team can book more calls without manually chasing every lead.',
    outcomeBullets: [
      'Set response-time standards and automated follow-up sequences',
      'Route inbound leads by service, urgency, and location',
      'Create escalation rules for leads that stall or go silent',
    ],
    painPoints: [
      'Leads wait too long before getting a first response',
      'Follow-up depends on memory and whoever is available',
      'Deals slip because there is no ownership of next steps',
    ],
    differentiators: [
      'Built around lead-to-call conversion, not generic automation',
      'Clear owner assignment at every stage of follow-up',
      'Simple dashboard-style visibility into lead status',
    ],
    ctaLabel: 'Book a call and close your follow-up gaps',
  },
  {
    slug: 'ai-coo',
    audience: 'For small teams drowning in Slack, email, and scattered docs',
    eyebrow: 'Variant J · AI COO message',
    headline: 'Give your business an AI operations lead that never drops context.',
    subheadline:
      'We implement an AI COO layer that tracks priorities, summarizes blockers, and keeps your team aligned so projects move forward without constant owner intervention.',
    outcomeBullets: [
      'Unify updates from communication and project systems',
      'Automatically surface blockers and overdue dependencies',
      'Create daily and weekly leadership summaries with clear action items',
    ],
    painPoints: [
      'Important updates are spread across too many tools',
      'The owner becomes the default project coordinator',
      'Execution slows because no one sees full context',
    ],
    differentiators: [
      'Ops-first implementation tailored for owner-led companies',
      'Human escalation rules to keep decisions in the right hands',
      'Practical rollout without forcing a full tool migration',
    ],
    ctaLabel: 'Book a call to set up your AI COO workflow',
  },
  {
    slug: 'overnight-execution',
    audience: 'For owners who need more done without extending work hours',
    eyebrow: 'Variant K · Overnight execution message',
    headline: 'Wake up to completed work, not another unfinished task list.',
    subheadline:
      'We set up queued workflows and scheduled automations that run after hours so reporting, follow-up prep, and repetitive ops work are handled before your day starts.',
    outcomeBullets: [
      'Schedule recurring workflows for end-of-day and overnight runs',
      'Auto-generate morning briefs and priority action queues',
      'Reduce manual prep time before sales and operations start',
    ],
    painPoints: [
      'Critical admin tasks eat the first hours of every morning',
      'Teams start the day without clear priorities or context',
      'Too much routine work is still waiting in owner inboxes',
    ],
    differentiators: [
      'Workflow scheduling built around your actual business rhythm',
      'Clear logs and summaries so every run is auditable',
      'Focused automation that adds output without adding chaos',
    ],
    ctaLabel: 'Book a call to launch overnight workflows',
  },
  {
    slug: 'approval-first-automation',
    audience: 'For owners who want automation but need control and guardrails',
    eyebrow: 'Variant L · Approval-first automation message',
    headline: 'Automate routine work while keeping sensitive actions under approval.',
    subheadline:
      'We design approval-first workflows so repetitive tasks run automatically, while high-risk actions require a quick human yes before execution.',
    outcomeBullets: [
      'Classify tasks by risk and automate low-risk actions first',
      'Require approvals for high-impact communications and changes',
      'Create audit trails for every automated and approved action',
    ],
    painPoints: [
      'You want automation but do not trust black-box execution',
      'Teams hesitate to adopt AI because of compliance concerns',
      'Manual reviews are inconsistent and difficult to track',
    ],
    differentiators: [
      'Control-first architecture designed for real-world operations',
      'Transparent approvals with full action history',
      'Balanced approach: faster execution without losing oversight',
    ],
    ctaLabel: 'Book a call to build approval-first automation',
  },
]

export const landingVariantMap = Object.fromEntries(
  landingVariants.map(variant => [variant.slug, variant])
)
