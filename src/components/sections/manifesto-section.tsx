import { AnimatedSection } from '@/src/components/layout/animated-section'

export function ManifestoSection() {
  return (
    <AnimatedSection className='flex flex-col items-center gap-8 py-32 text-center'>
      <div className='h-px w-16 bg-accent' aria-hidden />
      <blockquote className='max-w-3xl'>
        <p className='font-headline text-3xl uppercase !leading-tight text-text md:text-5xl'>
          The traditional agency model is{' '}
          <span className='text-text-muted line-through decoration-accent/50'>bloated</span>.
          {' '}We believe one senior builder with the right AI tools delivers more than a team of ten.
        </p>
      </blockquote>
      <div className='h-px w-16 bg-accent' aria-hidden />
      <p className='max-w-xl text-balance text-base text-text-muted'>
        No project managers. No junior handoffs. No surprise invoices. Just experienced engineers building exactly what you need — at AI speed.
      </p>
    </AnimatedSection>
  )
}
