'use client'

import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { Card, CardContent } from '@/src/components/ui/card'
import { cn } from '@/src/lib/utils'
import { Play, ChevronLeft, ChevronRight } from 'lucide-react'

const useCases = [
  {
    title: 'Research Tool',
    metric: '18h → 45m',
    description:
      'Research tool that saves scouting companies hours of daily research. They book faster and more often.',
    videoSrc: '/videos/demo-research.mp4',
  },
  {
    title: 'Email Digester',
    metric: '200 emails → 5 bullets',
    description: 'Auto-digests Gmail, Slack, support tickets, and DMs',
    videoSrc: '/videos/demo-email.mp4',
  },
  {
    title: 'Task Tracker',
    metric: 'One screen overview',
    description:
      'Get instant snapshots of task statuses. Instantly know what’s working and what’s blocked.',
    videoSrc: '/videos/demo-tracker.mp4',
  },
  {
    title: 'Marketplace',
    metric: 'Launched in 12 days',
    description: 'Automated Marketplace, or custom Shopify Portal integration',
    videoSrc: '/videos/demo-marketplace.mp4',
  },
] as const

export function UseCasesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right
  const activeFeature = useCases[activeIndex]

  const handleSetActiveIndex = (newIndex: number) => {
    setDirection(newIndex > activeIndex ? 1 : -1)
    setActiveIndex(newIndex)
  }

  const nextUseCase = () => {
    setActiveIndex(prev => (prev + 1) % useCases.length)
  }

  const prevUseCase = () => {
    setActiveIndex(prev => (prev - 1 + useCases.length) % useCases.length)
  }



  return (
    <AnimatedSection id='use-cases' className='flex flex-col gap-8 md:gap-12'>
      <div className='flex flex-col items-center gap-4 text-center'>
        <h2 className='max-w-4xl text-balance font-headline text-3xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl'>
          Real products helping businesses
        </h2>
      </div>

      <div className='flex flex-col items-center gap-6'>
        {/* Thumbnails Navigation */}
        <div className='flex w-full max-w-4xl gap-2 overflow-x-auto px-4 pb-2 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:pb-0'>
          {useCases.map((useCase, index) => {
            const isActive = activeIndex === index
            return (
              <button
                key={useCase.title}
                onClick={() => handleSetActiveIndex(index)}
                className={cn(
                  'relative min-w-[140px] flex-1 rounded-xl border-2 p-3 text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink',
                  isActive
                    ? 'scale-105 border-ink bg-ink text-white shadow-lg ring-1 ring-ink/20'
                    : 'border-transparent bg-white/50 hover:bg-white hover:shadow-sm'
                )}
              >
                <div className='flex flex-col gap-0.5'>
                  <span className={cn('text-xs font-bold uppercase tracking-wider', isActive ? 'text-white/70' : 'text-ink/60')}>
                    0{index + 1}
                  </span>
                  <h3 className='font-headline text-sm font-bold leading-tight md:text-base'>
                    {useCase.title}
                  </h3>
                   <p className={cn('text-[10px] font-medium opacity-80', isActive ? 'text-white/90' : 'text-ink/70')}>
                     {useCase.metric}
                   </p>
                </div>

                {isActive && (
                    <motion.div
                        layoutId="active-connector"
                        className="absolute -bottom-4 left-1/2 flex -ml-2.5 -translate-x-1/2 justify-center"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    >
                        <svg
                          width="24"
                          height="12"
                          viewBox="0 0 24 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-ink"
                        >
                          <path
                            d="M0 0H24L12 12L0 0Z"
                            fill="currentColor"
                          />
                        </svg>
                    </motion.div>
                )}
              </button>
            )
          })}
        </div>

        {/* Carousel / Player Area */}
        <div className='relative w-full md:aspect-[16/9]' style={{ perspective: '1200px' }}>
          <div className="relative h-[400px] w-full md:h-full" style={{ transformStyle: 'preserve-3d' }}>
            {useCases.map((useCase, index) => {
              const activeOffset = index - activeIndex
              const isVisible = Math.abs(activeOffset) <= 1

              return (
                <motion.div
                  key={useCase.title}
                  initial={false}
                  animate={{
                    x: `${activeOffset * 95}%`,
                    z: Math.abs(activeOffset) * -50,
                    rotateY: activeOffset * -15,
                    scale: 1 - Math.abs(activeOffset) * 0.05,
                    opacity: activeOffset === 0 ? 1 : 0,
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
                    'absolute inset-0 flex flex-col md:flex-row rounded-3xl border border-ink/10 bg-white shadow-2xl overflow-hidden',
                    !isVisible && 'pointer-events-none'
                  )}
                >
                  {/* Video Side */}
                  <div className='relative flex-1 bg-ink'>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center opacity-40">
                        <Play className="mx-auto h-20 w-20 mb-4 fill-white" />
                        <p className="text-sm font-bold uppercase tracking-widest text-white/50">Demo Preview</p>
                      </div>
                    </div>
                  </div>

                  {/* Content Side (Overlay or Sidebar) */}
                  <div className='flex flex-col justify-center bg-white gap-4 p-8 md:w-[35%] md:p-10'>
                    <div className='space-y-2'>
                        <div className="inline-flex items-center rounded-full border border-ink px-3 py-1 text-sm font-bold uppercase tracking-wider text-ink/70">
                            {useCase.metric}
                        </div>
                        <h3 className='font-headline text-3xl font-bold uppercase text-ink md:text-4xl'>
                            {useCase.title}
                        </h3>
                    </div>
                    <p className='text-lg leading-relaxed text-ink/70'>
                        {useCase.description}
                    </p>
                    {index === activeIndex && (
                      <div className="mt-4 h-1 w-full rounded-full bg-ink/10">
                        <motion.div
                            className="h-full rounded-full bg-ink"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 5, ease: "linear" }}
                        />
                      </div>
                    )}
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
