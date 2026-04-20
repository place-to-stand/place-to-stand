'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function MissionStatement() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const text =
    'We are a digital agency that builds modern systems to help ambitious brands save time, move faster, and grow.'

  const words = text.split(' ')

  return (
    <section
      ref={sectionRef}
      className='relative flex min-h-[100svh] items-center justify-center bg-[#94e0e4] px-6 py-24 md:py-32'
    >
      <h2 className='max-w-4xl text-center font-headline text-2xl font-semibold !leading-tight text-ink/15 md:text-4xl lg:text-5xl'>
        {words.map((word, i) => (
          <Word
            key={i}
            progress={scrollYProgress}
            index={i}
            total={words.length}
          >
            {word}
          </Word>
        ))}
      </h2>
    </section>
  )
}

function Word({
  children,
  progress,
  index,
  total,
}: {
  children: string
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  index: number
  total: number
}) {
  // Compress reveal into the first 40% of scroll progress so all words
  // are fully visible well before the section scrolls out of view
  const revealEnd = 0.6
  const start = (index / total) * revealEnd
  const end = start + revealEnd / total

  const opacity = useTransform(progress, [start, end], [0.2, 1])
  const color = useTransform(
    progress,
    [start, (start + end) / 2, end],
    ['#111827', '#444aaa', '#111827']
  )

  return (
    <motion.span style={{ opacity, color }} className='mr-[0.3em] inline-block'>
      {children}
    </motion.span>
  )
}
