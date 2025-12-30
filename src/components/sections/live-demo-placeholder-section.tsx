import { AnimatedSection } from '@/src/components/layout/animated-section'

export function LiveDemoPlaceholderSection() {
  return (
    <AnimatedSection id='live-demo' className='flex flex-col gap-12'>
      <div className='flex flex-col items-center gap-4 text-center'>
        <h2 className='max-w-4xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl'>
          Pick your business type and play with a real Portal
        </h2>
      </div>

      <div
        className='h-[460px] w-full rounded-[36px] border border-ink-light/10 bg-ink backdrop-blur'
        aria-hidden
      />
    </AnimatedSection>
  )
}
