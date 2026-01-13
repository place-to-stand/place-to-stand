'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { cn } from '@/src/lib/utils'
import { HeroSection } from '@/src/components/sections/hero-section'
import {
  UseCasesSection,
  useCases,
} from '@/src/components/sections/use-cases-section'
import { HowWeWorkSection } from '@/src/components/sections/how-we-work-section'
import { ClientsSection } from '@/src/components/sections/clients-section'
import { ContactSection } from '@/src/components/sections/contact-section'
import { FaqSection } from '@/src/components/sections/faq-section'

export default function HomePage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + useCases.length) % useCases.length)
  }

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % useCases.length)
  }

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxOpen(false)
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen])

  // Block scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
    } else {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }

    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [lightboxOpen])

  return (
    <main className='flex-1'>
      <HeroSection />
      <UseCasesSection
        activeIndex={activeIndex}
        onActiveIndexChange={setActiveIndex}
        onOpenLightbox={() => setLightboxOpen(true)}
      />
      <ClientsSection />
      <HowWeWorkSection />
      <ContactSection />
      <FaqSection />

      {/* Lightbox Modal */}
      <div
        className={cn(
          'fixed inset-0 z-[100] flex items-center justify-center bg-black/90 transition-opacity duration-200',
          lightboxOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setLightboxOpen(false)}
      >
        {/* Close button */}
        <button
          type='button'
          className='absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white'
          onClick={() => setLightboxOpen(false)}
          aria-label='Close lightbox'
        >
          <X className='h-6 w-6' />
        </button>

        {/* Previous button */}
        <button
          type='button'
          className='absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black p-3 text-white transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white'
          onClick={e => {
            e.stopPropagation()
            handlePrev()
          }}
          aria-label='Previous image'
        >
          <ChevronLeft className='h-8 w-8' />
        </button>

        {/* Next button */}
        <button
          type='button'
          className='absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black p-3 text-white transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white'
          onClick={e => {
            e.stopPropagation()
            handleNext()
          }}
          aria-label='Next image'
        >
          <ChevronRight className='h-8 w-8' />
        </button>

        {/* Image container */}
        <div
          key={activeIndex}
          className='relative max-h-[80vh] max-w-[90vw] overflow-hidden rounded-2xl animate-[fadeIn_0.2s_ease-out]'
          onClick={e => e.stopPropagation()}
        >
          {useCases[activeIndex].imageSrc ? (
            <Image
              src={useCases[activeIndex].imageSrc}
              alt={useCases[activeIndex].title}
              width={0}
              height={0}
              sizes='90vw'
              quality={100}
              className='h-auto max-h-[80vh] w-[90vw] rounded-2xl'
            />
          ) : (
            <div className='flex aspect-video h-[70vh] max-w-[90vw] items-center justify-center rounded-2xl bg-ink'>
              <div className='text-center opacity-40'>
                <Play className='mx-auto mb-4 h-32 w-32 fill-white' />
                <p className='text-lg font-bold uppercase tracking-widest text-white/50'>
                  Demo Preview
                </p>
              </div>
            </div>
          )}

          {/* Title overlay */}
          <div className='absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6'>
            <p className='text-sm font-bold uppercase tracking-wider text-white/70'>
              {useCases[activeIndex].metric}
            </p>
            <h3 className='font-headline text-2xl font-bold uppercase text-white md:text-3xl'>
              {useCases[activeIndex].title}
            </h3>
            <p className='mt-2 max-w-xl text-sm text-white/80 md:text-base'>
              {useCases[activeIndex].description}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
