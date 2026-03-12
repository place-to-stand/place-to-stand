'use client'

import { usePathname, useRouter } from 'next/navigation'

const variants = [
  { id: '1', path: '' },
  { id: '2', path: '/v2' },
  { id: '3', path: '/v3' },
  { id: '4', path: '/v4' },
  { id: '5', path: '/v5' },
  { id: '6', path: '/v6' },
  { id: '7', path: '/v7' },
  { id: '8', path: '/v8' },
  { id: '9', path: '/v9' },
  { id: '10', path: '/v10' },
  { id: '11', path: '/v11' },
]

export function CaseStudyNav() {
  const pathname = usePathname()
  const router = useRouter()
  const slugMatch = pathname.match(/^\/case-studies\/([^/]+)/)
  if (!slugMatch) return null
  const base = `/case-studies/${slugMatch[1]}`

  const currentIndex = variants.findIndex(v => pathname === base + v.path)
  const prev = currentIndex > 0 ? variants[currentIndex - 1] : null
  const next = currentIndex < variants.length - 1 ? variants[currentIndex + 1] : null

  function go(v: (typeof variants)[number]) {
    router.push((base + v.path) as never)
  }

  return (
    <nav className='fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-ink/10 bg-white/90 px-2 py-1.5 shadow-lg backdrop-blur'>
      <button
        onClick={() => prev && go(prev)}
        disabled={!prev}
        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
          prev
            ? 'text-ink/60 hover:bg-ink/5 hover:text-ink'
            : 'cursor-default text-ink/15'
        }`}
      >
        <svg className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
          <path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7' />
        </svg>
      </button>

      {variants.map(v => (
        <button
          key={v.id}
          onClick={() => go(v)}
          className={`flex h-8 min-w-[2rem] items-center justify-center rounded-full px-1 text-xs font-semibold transition-colors ${
            currentIndex === variants.indexOf(v)
              ? 'bg-ink text-white'
              : 'text-ink/50 hover:bg-ink/5 hover:text-ink'
          }`}
        >
          {v.id}
        </button>
      ))}

      <button
        onClick={() => next && go(next)}
        disabled={!next}
        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
          next
            ? 'text-ink/60 hover:bg-ink/5 hover:text-ink'
            : 'cursor-default text-ink/15'
        }`}
      >
        <svg className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
          <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
        </svg>
      </button>
    </nav>
  )
}
