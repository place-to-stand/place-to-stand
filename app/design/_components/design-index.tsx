'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/src/lib/utils'
import { DESIGN_SECTION_GROUPS } from './sections'

/**
 * Sticky left index with scroll-spy. On laptops it fills the window from the
 * bottom of the header to the bottom of the screen and scrolls on its own.
 *
 * The section in view is the one crossing a thin reading line 20% down the
 * window (an IntersectionObserver whose root is shrunk to that line), so the
 * marker matches what sits at the top of the reading area. The active item
 * gets a 2px accent-line bar on its left and full text color; the rest stay
 * muted. As the page scrolls, the index scrolls to keep the active item in
 * its middle.
 */
export function DesignIndex() {
  const [active, setActive] = useState<string>('color')
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const sections = [
      ...document.querySelectorAll<HTMLElement>('[data-design-section]'),
    ]
    const observer = new IntersectionObserver(
      entries => {
        const crossing = entries.find(entry => entry.isIntersecting)
        if (crossing) setActive(crossing.target.id)
      },
      // A 1% band at 20% of the window: whichever section crosses it is active.
      { rootMargin: '-20% 0px -79% 0px' }
    )
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const nav = navRef.current
    const link = nav?.querySelector<HTMLElement>(`a[href="#${active}"]`)
    if (!nav || !link || nav.scrollHeight <= nav.clientHeight) return
    const offset =
      link.getBoundingClientRect().top - nav.getBoundingClientRect().top
    nav.scrollTo({
      top: nav.scrollTop + offset - nav.clientHeight / 2,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    })
  }, [active])

  return (
    <nav
      ref={navRef}
      aria-label='Design system'
      className='flex flex-col gap-stack lg:sticky lg:top-(--nav-height) lg:h-[calc(100svh-var(--nav-height))] lg:self-start lg:overflow-y-auto lg:overscroll-contain lg:py-grid-2'
    >
      {DESIGN_SECTION_GROUPS.map(group => (
        <div key={group.title} className='flex flex-col gap-grid-half'>
          <span className='bp-label self-start font-mono'>{group.title}</span>
          <ul className='flex flex-col gap-grid-half'>
            {group.sections.map(section => {
              const current = active === section.id
              return (
                <li
                  key={section.id}
                  className={cn(
                    'relative pl-grid-half',
                    // The active marker: a 2px bar that grows in on the left.
                    "before:absolute before:inset-y-0 before:left-0 before:w-(--stroke-emphasis) before:origin-center before:bg-accent-line before:transition-transform before:duration-(--motion-base) before:ease-(--ease-standard) before:content-['']",
                    current ? 'before:scale-y-100' : 'before:scale-y-0'
                  )}
                >
                  <a
                    href={`#${section.id}`}
                    aria-current={current ? 'location' : undefined}
                    className={cn(
                      'link-nav transition-colors duration-(--motion-base)',
                      current && 'text-text'
                    )}
                  >
                    {section.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
