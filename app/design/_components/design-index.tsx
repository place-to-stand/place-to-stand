'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/src/lib/utils'
import { DESIGN_SECTION_GROUPS } from './sections'

/**
 * Sticky left index with scroll-spy: the section in view is underlined. On
 * laptops it is capped to the window under the header and scrolls on its own
 * (overscroll stays inside it), and the active item is kept in view as the
 * page scrolls.
 */
export function DesignIndex() {
  const [active, setActive] = useState<string>('color')
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const nav = navRef.current
    const link = nav?.querySelector<HTMLElement>(`a[href="#${active}"]`)
    if (!nav || !link || nav.scrollHeight <= nav.clientHeight) return
    const navBox = nav.getBoundingClientRect()
    const linkBox = link.getBoundingClientRect()
    const margin = 48
    if (linkBox.top < navBox.top + margin) {
      nav.scrollTop -= navBox.top + margin - linkBox.top
    } else if (linkBox.bottom > navBox.bottom - margin) {
      nav.scrollTop += linkBox.bottom - (navBox.bottom - margin)
    }
  }, [active])

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
      ref={navRef}
      aria-label='Design system'
      className='flex flex-col gap-stack lg:sticky lg:top-page-start lg:max-h-[calc(100svh-var(--spacing-page-start)-var(--spacing-grid-2))] lg:self-start lg:overflow-y-auto lg:overscroll-contain'
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
