import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { TeamGrid } from '@/src/components/sections/team-grid'

export default function TeamPage() {
  return (
    <main className='flex-1'>
      <section className='mx-auto w-full max-w-6xl px-6 pb-12 pt-32 text-center md:pt-40'>
        <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
          The Team
        </span>
        <h1 className='mt-3 font-headline text-2xl font-semibold uppercase !leading-[.9] text-ink md:text-4xl'>
          Meet the people behind the work
        </h1>
        <p className='mx-auto mt-4 max-w-xl text-balance text-base !leading-snug text-ink/80 md:text-lg'>
          A small, senior team of engineers and creatives.
        </p>
      </section>

      <section className='mx-auto w-full max-w-6xl px-6 pb-20'>
        <TeamGrid />
      </section>

      <section className='mx-auto w-full max-w-6xl px-6 py-20 text-center md:py-28'>
        <Button asChild size='lg'>
          <Link href='/#contact'>Book a Call</Link>
        </Button>
      </section>
    </main>
  )
}
