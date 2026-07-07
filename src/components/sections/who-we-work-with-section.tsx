import { AnimatedSection } from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'

const profiles = [
  {
    number: '01',
    title: 'The Lean Mid-Market',
    description:
      "You're established with real processes in place, but not big enough to justify a full-time dev team. You need senior engineering to optimize and extend your systems without the cost of hiring one.",
  },
  {
    number: '02',
    title: 'The Technical Founder',
    description:
      "You're technical enough to prototype in AI tools and ship a scrappy v1. But you've hit the ceiling where vibe-coded solutions break, and you need real engineering to make it production-grade.",
  },
  {
    number: '03',
    title: 'The Design-Led Team',
    description:
      'You have the vision, the designers, maybe some technical staff, but no engineering team to execute. You know exactly what you want built. You just need the builders to make it real.',
  },
]

export function WhoWeWorkWithSection() {
  return (
    <AnimatedSection className='py-16 md:py-32'>
      <div className='flex flex-col gap-12'>
        {/* Header */}
        <div className='flex flex-col gap-4'>
          <span className='bp-label font-mono'>Who We Work With</span>
          <h2 className='font-headline text-3xl font-bold leading-[0.95] tracking-tight text-text md:text-4xl'>
            We build for mid-market businesses
            <br />
            without in-house engineers.
          </h2>
          <p className='max-w-xl text-sm leading-relaxed text-text-muted'>
            Established companies with real processes and a technical mindset, but
            no engineering team to build what&apos;s next. That&apos;s where we come in.
          </p>
        </div>

        {/* Profile cards */}
        <div className='grid gap-6 md:grid-cols-3'>
          {profiles.map(profile => (
            <div
              key={profile.number}
              className='relative flex flex-col gap-4 border border-border bg-bg-card p-8'
            >
              <BlueprintCorners size={12} />
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
      </div>
    </AnimatedSection>
  )
}
