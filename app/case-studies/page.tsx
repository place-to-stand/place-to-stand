import type { Metadata } from 'next'
import Image from 'next/image'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { Badge } from '@/src/components/ui/badge'
import { caseStudies } from '@/src/lib/case-studies'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Real-world results from custom AI automation, software, and workflow systems built by Place To Stand.',
}

export default function CaseStudiesPage() {
  return (
    <main className='flex-1 pt-28'>
      <AnimatedSection className='flex flex-col gap-12'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <span className='font-mono text-xs uppercase tracking-[0.2em] text-accent'>
            Case Studies
          </span>
          <h1 className='max-w-4xl text-balance font-headline text-4xl font-semibold uppercase !leading-[.9] text-text md:text-6xl'>
            Real results
          </h1>
          <p className='max-w-2xl text-balance text-base text-text-muted md:text-lg'>
            Custom solutions delivering measurable impact for real businesses.
          </p>
        </div>
        <div className='grid gap-8 md:grid-cols-2'>
          {caseStudies.map(cs => (
            <div
              key={cs.slug}
              className='group flex flex-col overflow-hidden border border-border bg-bg-card transition-colors duration-300 hover:border-accent/30'
            >
              <div className='relative aspect-video overflow-hidden'>
                <Image
                  src={cs.image}
                  alt={cs.title}
                  fill
                  className='object-cover transition-transform duration-500 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-bg-card to-transparent' />
                <div className='absolute bottom-4 left-4'>
                  <span className='border border-accent/30 bg-bg/80 px-3 py-1 font-mono text-sm font-bold text-accent'>
                    {cs.metric}
                  </span>
                </div>
              </div>
              <div className='flex flex-1 flex-col gap-3 p-8'>
                <p className='font-mono text-xs uppercase tracking-wider text-text-muted'>{cs.client}</p>
                <h2 className='font-headline text-2xl uppercase text-text'>{cs.title}</h2>
                <p className='text-base leading-relaxed text-text-muted'>{cs.summary}</p>
                <div className='mt-auto flex flex-wrap gap-2 pt-4'>
                  {cs.tags.map(tag => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </main>
  )
}
