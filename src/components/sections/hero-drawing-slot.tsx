'use client'

import { useLayoutEffect, useRef, type ReactNode } from 'react'

/** The hero's edge inset (the text's lg:pl-7). */
const EDGE_INSET = 28

/** The drawings' window tops (between the stack's tilted corner and the
 *  clean app's frame), as a share of the drawing's height. */
const WINDOW_TOP = 0.155

/**
 * The hero drawing's column. Side by side, it slides the drawing left so it
 * sits centered in all the space between the end of the text and the hero
 * frame's right edge, then one edge inset further right, instead of in its
 * own half of the row. CSS can't do this alone: the balanced description
 * leaves its lines shorter than its box, so the free space only shows once
 * the text is laid out.
 *
 * It never moves the drawing right of where the layout put it (that keeps
 * its inset from the corner mark), and never closer to the text than the
 * row's gap. Stacked, it leaves the drawing alone.
 *
 * Side by side it also sets --draw-top on the row: how far down the
 * drawings' windows start, so the text column can start its first line
 * level with them (Jason, Nov 14).
 */
export function HeroDrawingSlot({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const slot = ref.current
    const row = slot?.parentElement
    const text = slot?.previousElementSibling
    const frame = slot?.closest('[data-pts-hero]')?.querySelector('.hero-frame')
    if (!slot || !row || !text || !frame) return

    const place = () => {
      slot.style.transform = ''
      const rowStyle = getComputedStyle(row)
      const drawing = slot.firstElementChild?.getBoundingClientRect()
      if (rowStyle.flexDirection !== 'row' || !drawing) {
        row.style.removeProperty('--draw-top')
        return
      }
      // Where the drawings' windows start (under their titles), for the
      // text column to line its first line up with (--draw-top).
      row.style.setProperty(
        '--draw-top',
        `${drawing.top - row.getBoundingClientRect().top + drawing.height * WINDOW_TOP}px`
      )
      const textEnd = inkRight(text)
      const center = (textEnd + frame.getBoundingClientRect().right) / 2
      const want = center + EDGE_INSET - (drawing.left + drawing.right) / 2
      const furthestLeft =
        textEnd + parseFloat(rowStyle.columnGap) - drawing.left
      const shift = Math.min(0, Math.max(want, furthestLeft))
      if (shift < -0.5) slot.style.transform = `translateX(${shift}px)`
    }

    place()
    const observer = new ResizeObserver(place)
    observer.observe(row)
    document.fonts?.ready.then(place)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

/** Right edge of the text's ink: the end of its longest line or the button. */
function inkRight(el: Element): number {
  let right = 0
  el.querySelectorAll('p, a').forEach(node => {
    if (node.tagName === 'A') {
      right = Math.max(right, node.getBoundingClientRect().right)
      return
    }
    const range = document.createRange()
    range.selectNodeContents(node)
    for (const line of range.getClientRects())
      right = Math.max(right, line.right)
  })
  return right
}
