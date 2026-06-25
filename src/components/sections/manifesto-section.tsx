import { AnimatedSection } from '@/src/components/layout/animated-section'

export function ManifestoSection() {
  return (
    <AnimatedSection className='max-w-7xl border-y border-border lg:px-10'>
      <div className='flex flex-col gap-10 py-8 md:flex-row md:items-center md:gap-16'>
        {/* Left: large quote */}
        <blockquote className='flex-1'>
          <p className='font-headline text-2xl font-bold leading-[1.15] tracking-tight text-text md:text-4xl'>
            The traditional agency model is{' '}
            <span className='text-text-muted line-through decoration-accent/60 decoration-2'>
              bloated
            </span>
            . One senior builder with the right AI tools delivers more than a
            team of ten.
          </p>
        </blockquote>

        {/* Right: supporting text */}
        <div className='flex flex-col gap-4 md:max-w-sm'>
          <div className='h-px w-12 bg-accent' aria-hidden />
          <p className='text-sm leading-relaxed text-text-muted'>
            No project managers. No junior handoffs. No surprise invoices. Just
            experienced engineers building exactly what you need — at AI speed.
          </p>
        </div>
      </div>
    </AnimatedSection>
  )
}
