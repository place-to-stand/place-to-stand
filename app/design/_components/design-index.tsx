'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/src/lib/utils'
import { DESIGN_SECTION_GROUPS } from './sections'

/** Sticky left index with scroll-spy: the section in view is underlined. */
export function DesignIndex() {
  const [active, setActive] = useState<string>('colour')

  useEffect(() => {
    const sections = [
      ...document.querySelectorAll<HTMLElement>('[data-design-section]'),
    ]
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label='Design system'
      className='flex flex-col gap-stack lg:sticky lg:top-page-start lg:self-start'
    >
      {DESIGN_SECTION_GROUPS.map(group => (
        <div key={group.title} className='flex flex-col gap-grid-half'>
          <span className='bp-label font-mono'>{group.title}</span>
          <ul className='flex flex-col gap-grid-half'>
            {group.sections.map(section => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={active === section.id ? 'true' : undefined}
                  className={cn(
                    'link-nav',
                    active === section.id && 'text-text'
                  )}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}
