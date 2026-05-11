'use client'

import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'

import { AnimatedSection } from '@/src/components/layout/animated-section'
import { cn } from '@/src/lib/utils'
import { homepageFaqs, type FAQ } from '@/src/lib/faqs'

type FAQItemProps = FAQ & {
  isOpen: boolean
  onToggle: () => void
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  const id = useId()
  const contentId = `${id}-content`

  return (
    <div
      className={cn(
        'mx-auto max-w-4xl overflow-hidden rounded-xl border border-ink bg-white/50 text-ink shadow-sm backdrop-blur transition-all duration-300 ease-out hover:bg-white',
        isOpen ? 'shadow-md' : ''
      )}
    >
      <button
        type='button'
        id={id}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className='flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-lg font-semibold uppercase tracking-[0.05em] text-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-light/30'
      >
        <span className='text-balance'>{question}</span>
        <ChevronDown
          aria-hidden
          className={cn(
            'h-5 w-5 shrink-0 text-ink transition-transform duration-300 ease-out',
            isOpen && 'rotate-180 text-ink'
          )}
        />
      </button>
      <div
        id={contentId}
        role='region'
        aria-labelledby={id}
        aria-hidden={!isOpen}
        className={cn(
          'grid overflow-hidden border-t border-transparent transition-all duration-500 ease-in-out',
          isOpen ? 'grid-rows-[1fr] border-ink' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className='overflow-hidden'>
          <div
            className={cn(
              'px-6 py-6 text-base text-ink transition-opacity duration-300 ease-out',
              isOpen ? 'opacity-100' : 'opacity-0'
            )}
          >
            {answer}
          </div>
        </div>
      </div>
    </div>
  )
}

export function FaqSection() {
  return (
    <AnimatedSection id='faq' className='flex min-h-[100svh] max-w-none flex-col justify-center gap-10 bg-cyan px-6'>
      <div className='flex flex-col items-center gap-4 text-center'>
        <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
          FAQ
        </span>
        <h2 className='max-w-4xl text-balance font-headline text-2xl font-semibold uppercase !leading-[.9] text-ink md:text-4xl'>
          The answers you’re looking for
        </h2>
        <p className='max-w-2xl text-balance text-lg !leading-snug text-ink/80'>
          The essentials that most clients ask us before we kick off a new
          engagement. Please reach out if you have other questions. We’re happy
          to answer them!
        </p>
      </div>
      <FaqAccordion />
    </AnimatedSection>
  )
}

type FaqAccordionProps = {
  className?: string
  /** Override the question set. Defaults to the homepage 5. */
  items?: FAQ[]
  /** Which item index starts expanded. Pass `null` to start fully collapsed. */
  defaultOpenIndex?: number | null
}

export function FaqAccordion({
  className,
  items = homepageFaqs,
  defaultOpenIndex = 0,
}: FaqAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(defaultOpenIndex)

  return (
    <div className={cn('flex flex-col gap-4 pb-12', className)}>
      {items.map((faq, index) => (
        <FAQItem
          key={faq.question}
          {...faq}
          isOpen={activeIndex === index}
          onToggle={() =>
            setActiveIndex(prev => (prev === index ? null : index))
          }
        />
      ))}
    </div>
  )
}
