import { AnimatedSection } from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'

export function ManifestoSection() {
  return (
    <AnimatedSection className='max-w-7xl lg:px-10'>
      <div className='relative border border-border bg-bg-card p-10 md:p-16'>
        <BlueprintCorners size={20} all />
        <div className='flex flex-col gap-10 md:flex-row md:items-center md:gap-16'>
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
            <div className='bp-dimension-line w-12' aria-hidden />
            <p className='text-md leading-relaxed text-text-muted'>
              No project managers. No junior handoffs. No surprise invoices. Just
              experienced engineers building exactly what you need — at AI speed.
            </p>
          </div>
        </div>
        {/* Blueprint note annotation */}
        <span className='absolute bottom-3 right-4 font-mono text-[9px] tracking-widest text-border-light' aria-hidden>
          NOTE-003
        </span>
      </div>
    </AnimatedSection>
  )
}
