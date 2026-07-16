import { Fragment } from 'react'
import Image from 'next/image'
import { AnimatedSection, Reveal } from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import {
  TaskIcon,
  ModelIcon,
  AgentIcon,
  SandboxIcon,
  VerifyIcon,
  ShipIcon,
  ThroughputIcon,
} from '@/src/components/graphics/portal-graphics'

/** The task flow, left to right: what happens to a unit of work inside the portal. */
const pipeline = [
  { title: 'Task', Icon: TaskIcon, body: 'A scoped unit of work enters the portal.' },
  { title: 'Frontier model', Icon: ModelIcon, body: 'Frontier models plan the change and draft the code.' },
  { title: 'Deployed agent', Icon: AgentIcon, body: 'A deployed agent picks up the task and runs it.' },
  { title: 'Cloud sandbox', Icon: SandboxIcon, body: 'Each task executes in its own isolated sandbox. Code runs, tests run.' },
  { title: 'Human verification', Icon: VerifyIcon, body: 'A human verifies the diff with pre-AI programming knowledge.' },
  { title: 'Shipped', Icon: ShipIcon, body: 'Verified code ships to production.' },
]

/** The claims the architecture earns. Architecture first, payoff last. */
const claims = [
  {
    title: 'Integrated frontier models',
    Icon: ModelIcon,
    body: 'Reasoning and code generation wired into our own tooling, not a bolted-on chatbot.',
  },
  {
    title: 'Isolated execution',
    Icon: SandboxIcon,
    body: 'Every task runs in a fresh cloud sandbox, so execution stays contained and reproducible.',
  },
  {
    title: 'Human verification gate',
    Icon: VerifyIcon,
    body: 'No automated change ships unverified. Pre-AI programming judgment on every diff.',
  },
  {
    title: 'Throughput, not headcount',
    Icon: ThroughputIcon,
    body: 'The automation is what lets a small team deliver like a large one. Days, not months.',
  },
]

export function PortalSection() {
  return (
    <AnimatedSection className='flex flex-col gap-12'>
      {/* Heading — architecture first */}
      <Reveal index={0} className='flex flex-col gap-4'>
        <span className='bp-label font-mono'>The Portal</span>
        <h2 className='max-w-3xl text-balance font-headline text-3xl font-bold uppercase !leading-[.95] tracking-tight text-text md:text-4xl'>
          Frontier models, wired to a live execution engine.
        </h2>
        <p className='max-w-2xl text-base leading-relaxed text-text-muted md:text-lg'>
          Our delivery runs on a portal we built ourselves. Frontier models are wired directly
          into it for planning and code generation, paired with a deployed agent that executes
          every task inside its own isolated cloud sandbox. You watch it happen, approve each
          build, and nothing reaches production until a human with pre-AI programming knowledge
          has verified it.
        </p>
      </Reveal>

      {/* Execution pipeline */}
      <Reveal index={1} className='relative border border-border p-6 md:p-10'>
        <BlueprintCorners size={16} />
        <div className='flex flex-col gap-8'>
          <span className='font-mono text-xs uppercase tracking-[0.1em] text-text-muted'>
            Execution pipeline
          </span>
          <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-2'>
            {pipeline.map((step, i) => (
              <Fragment key={step.title}>
                <div className='flex items-start gap-4 lg:flex-1 lg:flex-col lg:items-center lg:gap-4 lg:text-center'>
                  <div className='flex h-14 w-14 shrink-0 items-center justify-center border border-border-light lg:h-16 lg:w-16'>
                    <step.Icon className='h-8 w-8 lg:h-9 lg:w-9' />
                  </div>
                  <div className='flex flex-col gap-1 lg:items-center'>
                    <span className='font-headline text-sm font-bold uppercase tracking-tight text-accent'>
                      {step.title}
                    </span>
                    <span className='text-xs leading-relaxed text-text-muted lg:max-w-[18ch]'>
                      {step.body}
                    </span>
                  </div>
                </div>
                {i < pipeline.length - 1 && (
                  <span
                    className='ml-7 h-6 w-px shrink-0 bg-border-light lg:ml-0 lg:mt-8 lg:h-px lg:w-6'
                    aria-hidden
                  />
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Inside the portal — the real task board clients work from */}
      <Reveal index={2} className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <span className='font-mono text-xs uppercase tracking-[0.1em] text-text-muted'>
            Inside the portal
          </span>
          <p className='max-w-2xl text-sm leading-relaxed text-text-muted'>
            The same board our team works from. Clients watch every task move from planning to
            shipped, and approve builds in one place.
          </p>
        </div>
        <div className='relative border border-border bg-bg-card p-2 md:p-3'>
          <BlueprintCorners size={16} />
          <Image
            src='/portal-board.png'
            alt='The Place To Stand portal task board, showing tasks across On Deck, In Progress, Blocked, and Done columns.'
            width={0}
            height={0}
            sizes='100vw'
            quality={100}
            className='h-auto w-full'
          />
        </div>
      </Reveal>

      {/* Claims row */}
      <Reveal index={3} className='relative'>
        <BlueprintCorners size={16} />
        <div className='grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4'>
          {claims.map(claim => (
            <div key={claim.title} className='relative flex flex-col gap-4 bg-bg-card p-5 md:p-8'>
              <claim.Icon className='h-10 w-10' />
              <h3 className='font-headline text-base font-bold uppercase tracking-tight text-text'>
                {claim.title}
              </h3>
              <p className='text-sm leading-relaxed text-text-muted'>{claim.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </AnimatedSection>
  )
}
