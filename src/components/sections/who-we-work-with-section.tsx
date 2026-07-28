import { AnimatedSection } from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { TrackedLink } from '@/src/components/tracked-link'
import {
  LeanMarketGraphic,
  FounderGraphic,
  DesignLedGraphic,
} from '@/src/components/graphics/home-graphics'

const profiles = [
  {
    number: '01',
    title: 'The Lean Mid-Market',
    Graphic: LeanMarketGraphic,
    description:
      "You're established with real processes in place, but not big enough to justify a full-time dev team. You need senior engineering to optimize and extend your systems without the cost of hiring one.",
  },
  {
    number: '02',
    title: 'The Technical Founder',
    Graphic: FounderGraphic,
    description:
      "You're technical enough to prototype in AI tools and ship a scrappy v1. But you've hit the ceiling where vibe-coded solutions break, and you need real engineering to make it production-grade.",
  },
  {
    number: '03',
    title: 'The Design-Led Team',
    Graphic: DesignLedGraphic,
    description:
      'You have the vision, the designers, maybe some technical staff, but no engineering team to execute. You know exactly what you want built. You just need the builders to make it real.',
  },
]

export function WhoWeWorkWithSection() {
  return (
    <AnimatedSection className='py-20'>
      <div className='flex flex-col gap-12'>
        {/* Header */}
        <div className='flex flex-col gap-4'>
          <span className='bp-label font-mono'>Who We Work With</span>
          <h2 className='font-headline text-3xl leading-[0.95] font-bold tracking-tight text-text md:text-4xl'>
            We build for mid-market businesses
            <br />
            without in-house engineers.
          </h2>
          <p className='max-w-xl text-sm leading-relaxed text-text-muted'>
            Established companies with real processes and a technical mindset,
            but no engineering team to build what&apos;s next. That&apos;s where
            we come in.
          </p>
        </div>

        {/* Profile cards */}
        <div className='grid gap-6 md:grid-cols-3'>
          {profiles.map(profile => (
            <div
              key={profile.number}
              className='relative flex flex-col gap-4 border border-border bg-bg-card p-5 md:p-8'
            >
              <BlueprintCorners size={12} />
              <profile.Graphic className='absolute top-4 right-4 h-grid-2 w-grid-2 md:top-6 md:right-6' />
              <span className='inline-flex h-6 w-6 items-center justify-center border border-accent/40 font-mono text-[10px] text-accent'>
                {profile.number}
              </span>
              <h3 className='font-headline text-xl font-semibold tracking-tight text-text'>
                {profile.title}
              </h3>
              <p className='text-sm leading-relaxed text-text-muted'>
                {profile.description}
              </p>
            </div>
          ))}
        </div>

        {/* Each clause is an inline-block so a narrow viewport breaks the line
            between them instead of orphaning a word or two. */}
        <p className='text-base leading-relaxed text-balance text-text-muted'>
          <span className='inline-block'>
            Recognize yourself in one of these?
          </span>{' '}
          <span className='inline-block'>
            <TrackedLink
              href='/audit'
              location='home-who-we-work-with'
              className='font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent/80'
            >
              The free audit shows where to start
            </TrackedLink>
            .
          </span>
        </p>
      </div>
    </AnimatedSection>
  )
}
