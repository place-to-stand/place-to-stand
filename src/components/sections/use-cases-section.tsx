'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { cn } from '@/src/lib/utils'
import { Play } from 'lucide-react'

export const useCases = [
  {
    title: 'Portal',
    metric: 'Business overview',
    description:
      "Get instant snapshots of task statuses. Instantly know what's working and what's blocked. Open integration environment.",
    imageSrc: '/use-case-portal.png',
  },
  {
    title: 'Fullfillment Manager',
    metric: '5hr → 1hr',
    description:
      'Portal integration with a custom Shopify app. Streamlines order fulfillment and inventory management for custom made home products.',
    imageSrc: '/use-case-up-the-wall-portal.png',
  },
  {
    title: 'Artist Research Tool',
    metric: '10hrs → 1hr',
    description: 'Booking agency cut research time from 10 hours to 1 hour.',
    imageSrc: '/use-case-up-the-wall-shopify.png',
  },
  {
    title: 'Marketplace',
    metric: 'Manually emailing → Automated purchasing',
    description:
      'Transformed a manual purchasing and emailing process into an automated purchasing marketplace.',
    imageSrc: undefined,
  },
] as const

interface UseCasesSectionProps {
  activeIndex: number
  onActiveIndexChange: (index: number) => void
  onOpenLightbox: () => void
}

export function UseCasesSection({
  activeIndex,
  onActiveIndexChange,
  onOpenLightbox,
}: UseCasesSectionProps) {
  return (
    <AnimatedSection id='use-cases' className='flex flex-col gap-8 md:gap-8'>
      <div className='flex flex-col items-center gap-4 text-center'>
        <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
          Use-cases
        </span>
        <h2 className='max-w-4xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl'>
          Real products helping businesses
        </h2>
        <p className='max-w-xl text-balance text-base !leading-snug text-ink/80 md:text-lg'>
          Custom solutions we've built for real-world business needs.
        </p>
      </div>

      <div className='flex flex-col items-center gap-6'>
        {/* Thumbnails Navigation */}
        <div className='grid w-full max-w-4xl grid-cols-4 gap-2 md:gap-4 md:px-0'>
          {useCases.map((useCase, index) => {
            const isActive = activeIndex === index
            return (
              <button
                key={useCase.title}
                onClick={() => onActiveIndexChange(index)}
                className={cn(
                  'relative flex-1 rounded-lg border-2 p-1.5 text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:rounded-xl md:p-3',
                  isActive
                    ? 'border-ink bg-ink text-white shadow-lg ring-1 ring-ink/20 md:scale-105'
                    : 'border-transparent bg-white/50 hover:bg-white hover:shadow-sm'
                )}
              >
                <div className='flex flex-col gap-0.5'>
                  <span
                    className={cn(
                      'hidden text-xs font-bold uppercase tracking-wider md:block',
                      isActive ? 'text-white/70' : 'text-ink/60'
                    )}
                  >
                    0{index + 1}
                  </span>
                  <h3 className='text-balance font-headline text-[13px] font-bold leading-tight md:text-base'>
                    {useCase.title}
                  </h3>
                  <p
                    className={cn(
                      'hidden font-medium opacity-90 md:block md:text-[13px]',
                      isActive ? 'text-white/90' : 'text-ink/70'
                    )}
                  >
                    {useCase.metric}
                  </p>
                </div>

                {isActive && (
                  <motion.div
                    layoutId='active-connector'
                    className='absolute -bottom-4 left-1/2 hidden -translate-x-1/2 justify-center md:flex'
                    initial={false}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  >
                    <svg
                      width='24'
                      height='12'
                      viewBox='0 0 24 12'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className='text-ink'
                    >
                      <path d='M0 0H24L12 12L0 0Z' fill='currentColor' />
                    </svg>
                  </motion.div>
                )}
              </button>
            )
          })}
        </div>

        {/* Carousel / Player Area */}
        <div className='relative w-full' style={{ perspective: '1200px' }}>
          <div
            className='relative w-full'
            style={{ transformStyle: 'preserve-3d' }}
          >
            {useCases.map((useCase, index) => {
              const activeOffset = index - activeIndex
              const isActive = activeOffset === 0

              return (
                <motion.div
                  key={useCase.title}
                  initial={false}
                  animate={{
                    x: `${activeOffset * 95}%`,
                    z: Math.abs(activeOffset) * -50,
                    rotateY: activeOffset * -15,
                    scale: 1 - Math.abs(activeOffset) * 0.05,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.76,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                    zIndex: useCases.length - Math.abs(activeOffset),
                  }}
                  className={cn(
                    'flex flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:flex-row',
                    !isActive && 'pointer-events-none absolute inset-0'
                  )}
                >
                  {/* Image Side */}
                  <button
                    type='button'
                    className='relative cursor-zoom-in md:flex-1'
                    onClick={onOpenLightbox}
                    aria-label={`View ${useCase.title} in lightbox`}
                  >
                    {useCase.imageSrc ? (
                      <Image
                        src={useCase.imageSrc}
                        alt={useCase.title}
                        width={0}
                        height={0}
                        sizes='100vw'
                        className='h-auto w-full'
                      />
                    ) : (
                      <div className='flex aspect-video items-center justify-center bg-ink'>
                        <div className='text-center opacity-40'>
                          <Play className='mx-auto mb-4 h-20 w-20 fill-white' />
                          <p className='text-sm font-bold uppercase tracking-widest text-white/50'>
                            Demo Preview
                          </p>
                        </div>
                      </div>
                    )}
                  </button>

                  {/* Content Side (Overlay or Sidebar) */}
                  <div className='flex flex-col justify-center gap-2 bg-white p-4 md:w-[25%] md:gap-4 md:p-8'>
                    <div className='space-y-1 md:space-y-2'>
                      <div className='inline-flex items-center rounded-full border border-ink px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-ink/70 md:px-3 md:py-1 md:text-sm'>
                        {useCase.metric}
                      </div>
                      <h3 className='font-headline text-xl font-bold uppercase text-ink md:text-4xl'>
                        {useCase.title}
                      </h3>
                    </div>
                    <p className='text-sm leading-relaxed text-ink/70 md:text-lg'>
                      {useCase.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
