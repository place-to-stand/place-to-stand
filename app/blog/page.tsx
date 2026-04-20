import Link from 'next/link'
import { Button } from '@/src/components/ui/button'

export default function BlogPage() {
  return (
    <main className='flex-1'>
      <section className='mx-auto w-full max-w-6xl px-6 pb-8 pt-32 text-center md:pt-40'>
        <span className='text-sm font-semibold uppercase tracking-[0.1em] text-ink/60'>
          Blog
        </span>
        <h1 className='mt-3 font-headline text-4xl font-semibold uppercase !leading-[.9] text-ink md:text-6xl'>
          Writing & notes
        </h1>
        <p className='mx-auto mt-4 max-w-xl text-balance text-base !leading-snug text-ink/80 md:text-lg'>
          Blog coming soon.
        </p>
      </section>

      <section className='mx-auto w-full max-w-6xl px-6 py-20 text-center md:py-28'>
        <Button asChild size='lg'>
          <Link href='/#contact'>Start a Project</Link>
        </Button>
      </section>
    </main>
  )
}
