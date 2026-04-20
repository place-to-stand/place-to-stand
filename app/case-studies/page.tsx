import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { UseCasesSection } from '@/src/components/sections/use-cases-section'
import { ClientsSection } from '@/src/components/sections/clients-section'

export default function CaseStudiesPage() {
  return (
    <main className='flex-1'>
      <section className='mx-auto w-full max-w-6xl px-6 pb-8 pt-32 text-center md:pt-40'>
        <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
          Our Work
        </span>
        <h1 className='mt-3 font-headline text-4xl font-semibold uppercase !leading-[.9] text-ink md:text-6xl'>
          Case Studies
        </h1>
        <p className='mx-auto mt-4 max-w-xl text-balance text-base !leading-snug text-ink/80 md:text-lg'>
          Real products and projects we&apos;ve built for ambitious brands and
          businesses.
        </p>
      </section>

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
