import { Cog, DraftingCompass, PencilRuler } from 'lucide-react'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'

export function ManifestoSection() {
  return (
    <AnimatedSection>
      <div className='relative border border-border bg-bg-card p-10 md:p-16'>
        <BlueprintCorners size={20} all />
        <div className='flex flex-col gap-10 md:flex-row md:items-center md:gap-grid-3'>
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
            <div className='flex gap-3'>
              <span className='inline-flex h-12 w-12 items-center justify-center border border-accent/30'>
                <PencilRuler className='icon-glow h-6 w-6 text-accent' aria-hidden />
              </span>
              <span className='inline-flex h-12 w-12 items-center justify-center border border-accent/30'>
                <DraftingCompass
                  className='icon-glow h-6 w-6 text-accent'
                  style={{ animationDelay: '-1.2s' }}
                  aria-hidden
                />
              </span>
              <span className='inline-flex h-12 w-12 items-center justify-center border border-accent/30'>
                <Cog className='icon-spin-slow h-6 w-6 text-accent' aria-hidden />
              </span>
            </div>
            <p className='text-md leading-relaxed text-text-muted'>
              Experienced engineers equipped with fine-tuned AI systems, building exactly what you need. No middle-management. No execution handoff. No bloat.  
            </p>
            <p className='text-md leading-relaxed text-text-muted'>
            You collaborate directly with the builder.
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
