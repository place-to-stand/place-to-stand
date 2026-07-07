import { AnimatedSection, Reveal } from '@/src/components/layout/animated-section'
import { BlueprintCorners } from '@/src/components/layout/dot-grid-background'
import { vendors } from '@/src/lib/vendors'
import { vendorIcons } from '@/src/components/icons/vendor-icons'

export function TechStackSection({
  heading = 'Built with best-in-class tools.',
  subtitle = 'We integrate frontier AI models and modern infrastructure so every project ships on a proven, production-grade stack.',
  className,
}: {
  heading?: string
  subtitle?: string
  className?: string
}) {
  return (
    <AnimatedSection className={className ?? 'py-16 md:py-32'}>
      <div className='flex flex-col gap-12'>
        {/* Header */}
        <div className='flex flex-col gap-4'>
          <Reveal index={0} className='flex flex-col gap-2'>
            <span className='bp-label font-mono'>Our Tech Stack</span>
            <h2 className='font-headline text-3xl font-bold leading-[0.95] tracking-tight text-balance text-text md:text-4xl'>
              {heading}
            </h2>
          </Reveal>
          <Reveal index={1} className='max-w-xl text-sm text-text-muted'>
            <p>{subtitle}</p>
          </Reveal>
        </div>

        {/* Vendor logo grid */}
        <Reveal index={2} className='relative'>
          <BlueprintCorners size={16} />
          <div className='grid grid-cols-3 gap-px border border-border bg-border sm:grid-cols-4 md:grid-cols-7'>
            {vendors.map(vendor => {
              const Icon = vendorIcons[vendor.name]
              return (
                <a
                  key={vendor.name}
                  href={vendor.url}
                  target='_blank'
                  rel='noreferrer noopener'
                  aria-label={`${vendor.name} — ${vendor.description}`}
                  className='group flex flex-col items-center justify-center gap-3 bg-bg-card p-6 transition-colors'
                >
                  {Icon && (
                    <Icon
                      className='h-8 w-8 text-text-muted transition-colors group-hover:text-accent'
                      aria-hidden
                    />
                  )}
                  <span className='font-mono text-[10px] uppercase tracking-wider text-text-muted transition-colors group-hover:text-accent'>
                    {vendor.name}
                  </span>
                </a>
              )
            })}
          </div>
        </Reveal>
      </div>
    </AnimatedSection>
  )
}
