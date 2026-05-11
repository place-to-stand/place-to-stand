import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { AnimatedSection } from '@/src/components/layout/animated-section'
import { UseCasesSection } from '@/src/components/sections/use-cases-section'
import { ClientsSection } from '@/src/components/sections/clients-section'

export default function CaseStudiesPage() {
  return (
    <main className='flex-1'>
      {/* Hero — Our Process pattern, sized so case studies peek above fold */}
      <AnimatedSection className='relative isolate flex min-h-[80svh] max-w-none flex-col items-center justify-center gap-6 overflow-hidden bg-white px-6 pb-16 pt-28 text-center text-ink md:px-8'>
        <div className='relative z-10 flex w-full max-w-4xl flex-col items-center gap-6 text-center'>
          <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
            Our work
          </span>
          <h1 className='font-headline text-4xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl lg:text-6xl'>
            <span className='block'>Real builds.</span>
            <span className='block'>Real outcomes.</span>
          </h1>
          <p className='max-w-xl text-balance text-base text-ink/60 md:text-lg'>
            Products and projects we&apos;ve shipped for ambitious brands and
            businesses.
          </p>
        </div>
      </AnimatedSection>

      <UseCasesSection />
      <ClientsSection />

      <section className='mx-auto w-full max-w-6xl px-6 py-20 text-center md:py-28'>
        <h2 className='font-headline text-3xl font-semibold uppercase !leading-[.9] text-ink md:text-5xl'>
          Ready to build something great?
        </h2>
        <p className='mx-auto mt-4 max-w-xl text-balance text-base !leading-snug text-ink/80 md:text-lg'>
          Let&apos;s talk about how we can help your business save time and
          money.
        </p>
        <div className='mt-8'>
          <Button asChild size='lg'>
            <Link href='/#contact'>Start a Project</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
