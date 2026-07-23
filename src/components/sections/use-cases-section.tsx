'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { cn } from '@/src/lib/utils'
import { Play } from 'lucide-react'

export const useCases = [
  {
    title: 'Portal',
    metric: '1hr → 10min',
    description:
      'Turn weekly meetings into check-ins. Business activity tracked by AI and summarized for instant insights.',
    imageSrc: '/use-case-portal.png',
  },
  {
    title: 'Fullfillment Manager',
    metric: '5hr → 1hr',
    description:
      'Streamlined order fulfillment and inventory management for custom made home products.',
    imageSrc: '/use-case-up-the-wall-portal.png',
  },
  {
    title: 'Agentic Research Tool',
    metric: '10hrs → 1hr',
    description:
      'Artist research agency cut research time from 10 hours to 1 hour.',
    imageSrc: '/use-case-kendall-big.webp',
  },
  {
    title: 'Booking Platform',
    metric: '20 hrs → 2 hrs',
    description:
      'Agentic booking platform for hospitality agency. Fully automated flows from email to booking hotels.',
    imageSrc: '/valise-dashboard-light.png',
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
        <span className='text-sm font-semibold tracking-[0.1em] text-ink/60 uppercase'>
          Use-cases
        </span>
        <h2 className='max-w-4xl font-headline text-3xl leading-[.9]! font-semibold text-balance text-ink uppercase md:text-5xl'>
          Real products helping businesses
        </h2>
        <p className='max-w-xl text-base leading-snug! text-balance text-ink/80 md:text-lg'>
          Custom solutions we&apos;ve built for real-world business needs.
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
                  'relative flex-1 border-2 px-1.5 py-3 text-center transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/30 md:px-3 md:py-2 md:text-left',
                  isActive
                    ? 'border-ink bg-ink text-white shadow-lg ring-1 ring-ink/20 md:scale-105'
                    : 'border-transparent bg-white/50 hover:bg-white hover:shadow-xs'
                )}
              >
                <div className='flex flex-col items-center justify-center gap-0.5 md:items-start md:justify-start'>
                  <span
                    className={cn(
                      'hidden text-xs font-bold tracking-wider uppercase md:block',
                      isActive ? 'text-white/70' : 'text-ink/60'
                    )}
                  >
                    0{index + 1}
                  </span>
                  <h3 className='font-headline text-[13px] leading-none font-bold text-balance md:text-base md:leading-tight'>
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
                    className='absolute right-0 -bottom-3 left-0 flex justify-center md:-bottom-4'
                    initial={false}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  >
                    <svg
                      width='16'
                      height='8'
                      viewBox='0 0 24 12'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className='text-ink md:h-[12px] md:w-[24px]'
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
                    'flex flex-col overflow-hidden border border-border bg-bg-card md:flex-row',
                    !isActive && 'pointer-events-none absolute inset-0'
                  )}
                >
                  {/* Image Side */}
                  <div
                    className='relative cursor-default md:flex-1 md:cursor-zoom-in'
                    onClick={() => {
                      if (window.innerWidth >= 768) {
                        onOpenLightbox()
                      }
                    }}
                    role='button'
                    tabIndex={0}
                    aria-label={`View ${useCase.title} in lightbox`}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && window.innerWidth >= 768) {
                        onOpenLightbox()
                      }
                    }}
                  >
                    {useCase.imageSrc ? (
                      <Image
                        src={useCase.imageSrc}
                        alt={useCase.title}
                        width={0}
                        height={0}
                        sizes='100vw'
                        quality={100}
                        className='h-auto w-full'
                      />
                    ) : (
                      <div className='flex aspect-video items-center justify-center bg-ink'>
                        <div className='text-center opacity-40'>
                          <Play className='mx-auto mb-4 h-20 w-20 fill-white' />
                          <p className='text-sm font-bold tracking-widest text-white/50 uppercase'>
                            Demo Preview
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content Side (Overlay or Sidebar) */}
                  <div className='flex flex-col justify-center gap-1 bg-white px-4 py-3 md:w-[35%] md:gap-4 md:p-8 lg:w-[25%]'>
                    <div className='space-y-1 md:space-y-2'>
                      <div className='inline-flex items-center border border-border px-2 py-0.5 text-xs font-bold tracking-wider text-text-muted uppercase md:px-3 md:py-1 md:text-sm'>
                        {useCase.metric}
                      </div>
                      <h3 className='font-headline text-xl font-bold text-ink uppercase md:text-2xl lg:text-4xl'>
                        {useCase.title}
                      </h3>
                    </div>
                    <p className='text-sm leading-snug text-ink/70 md:text-lg'>
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
