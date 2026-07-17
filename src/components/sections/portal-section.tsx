import Image from 'next/image'
import { AnimatedSection, Reveal } from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import {
  CommsTaskIcon,
  HandoffIcon,
  VerifyTasteIterateIcon,
  BuildDeployIcon,
} from '@/src/components/graphics/portal-graphics'

/**
 * The pipeline, top to bottom. Each stage is a node on the left rail paired with
 * the screenshot of that stage in the real portal on the right. The two internal
 * steps (deployed agent, cloud sandbox) are folded into the frontier-model stage.
 */
const stages = [
  {
    Icon: CommsTaskIcon,
    title: 'Comms → Task',
    body: 'We populate the board from meeting transcripts, emails, and any other communication, turning them into executable chunks. It is a refined, traditional kanban board, and once a task lands on it, that task becomes the prompt for an agent.',
    src: '/portal-board.png',
    alt: 'The Place To Stand portal task board with On Deck, In Progress, Blocked, and Done columns.',
  },
  {
    Icon: HandoffIcon,
    title: 'Human + Agent Handoff',
    body: 'Each task can talk to a frontier model to draft a technical plan against that project\'s repository. A task can hold many versions of a plan, and once one is approved, it is dispatched for execution.',
    src: '/portal-planning.png',
    alt: 'The portal task planning view, with a frontier model generating an implementation plan for a task.',
  },
  {
    Icon: VerifyTasteIterateIcon,
    title: 'Human Verification, Taste & Iterate',
    body: 'Once a dispatched task finishes building in its cloud sandbox, it opens a pull request with every change and commit it made. We pull those changes to our local machines, confirm they run, and apply our taste and judgment before anything ships.',
    src: '/portal-pr.png',
    alt: 'A pull request marked ready to merge, with a summary of the changes made.',
  },
  {
    Icon: BuildDeployIcon,
    title: 'Build, Validate & Deploy',
    body: 'This stage is built into the flow. Vercel and Supabase connect to our repository and spin up a preview deployment on every pull request, so we see changes live without a local environment. Each PR has to pass our pipeline and infra checks before it can go live. Once we are happy, we merge to main.',
    src: '/portal-build.png',
    alt: 'A pull request with all checks passed, no merge conflicts, and live Vercel preview deployments, ready to merge.',
  },
]

type Stage = (typeof stages)[number]

/** One pipeline stage: a node + label + body header sitting above the full-width
 *  screenshot of that stage, with a solid line running down into it. */
function PipelineStage({ stage }: { stage: Stage }) {
  const { Icon } = stage
  return (
    <div className='relative flex flex-col'>
      {/* Header: node + a solid line running down to the screenshot below, beside the copy. */}
      <div className='flex gap-4'>
        <div className='flex shrink-0 flex-col items-center'>
          <div className='flex h-12 w-12 items-center justify-center border border-border-light bg-bg'>
            <Icon className='h-7 w-7' />
          </div>
          <div className='mt-2 w-px flex-1 bg-border-light' aria-hidden />
        </div>
        <div className='flex flex-col gap-1.5 pb-12 pt-1 md:pb-16'>
          <span className='font-headline text-lg font-bold uppercase tracking-tight text-accent'>
            {stage.title}
          </span>
          <span className='max-w-2xl text-sm leading-relaxed text-text-muted md:text-base'>{stage.body}</span>
        </div>
      </div>

      {/* Full-width screenshot of the stage in the real portal */}
      <div className='relative border border-border bg-bg-card'>
        <BlueprintCorners size={16} />
        <Image
          src={stage.src}
          alt={stage.alt}
          width={0}
          height={0}
          sizes='100vw'
          quality={100}
          className='h-auto w-full'
        />
      </div>
    </div>
  )
}

export function PortalSection() {
  return (
    <AnimatedSection className='flex flex-col gap-12'>
      {/* Heading — architecture first */}
      <Reveal index={0} className='flex flex-col gap-4'>
        <span className='bp-label font-mono'>Our Portal</span>
        <h2 className='max-w-3xl text-balance font-headline text-3xl font-bold uppercase !leading-[.95] tracking-tight text-text md:text-4xl'>
          Our secret weapon
        </h2>
        <p className='max-w-2xl text-base leading-relaxed text-text-muted md:text-lg'>
          Delivery runs on a portal we built ourselves. Frontier models plan and write the code,
          a deployed agent executes each task in its own isolated cloud sandbox, and nothing
          ships until a human has verified it.
        </p>
      </Reveal>

      {/* Pipeline — each stage paired with its screenshot in the real portal */}
      <Reveal index={1} className='flex flex-col gap-8'>
        <span className='font-mono text-xs uppercase tracking-[0.1em] text-text-muted'>
          From task to production
        </span>
        <div className='flex flex-col gap-14 md:gap-20'>
          {stages.map(stage => (
            <PipelineStage key={stage.title} stage={stage} />
          ))}
        </div>
        <div className='border-l-2 border-accent pl-5 md:pl-6'>
          <p className='max-w-2xl text-base leading-relaxed text-text-muted md:text-lg'>
            For simple changes, this is an almost fully automated process. For more involved
            work that calls for taste and nuance, we usually run a few rounds back and forth.
            The core process stays the same.
          </p>
        </div>
      </Reveal>
    </AnimatedSection>
  )
}
