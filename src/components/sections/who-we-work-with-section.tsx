import { AnimatedSection } from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { TrackedLink } from '@/src/components/tracked-link'
import {
  LeanMarketGraphic,
  FounderGraphic,
  DesignLedGraphic,
} from '@/src/components/graphics/home-graphics'
import { audiences } from '@/src/lib/site-copy'

// One graphic per audience, in the order of `audiences`.
const audienceGraphics = [LeanMarketGraphic, FounderGraphic, DesignLedGraphic]
const profiles = audiences.map((audience, i) => ({
  ...audience,
  number: String(i + 1).padStart(2, '0'),
  Graphic: audienceGraphics[i],
}))

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
