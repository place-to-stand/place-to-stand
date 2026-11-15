'use client'

import { useLayoutEffect, useRef, type ReactNode } from 'react'

/** The clean app window's outer edge, as a share of the drawing's width
 *  (x 176 + w 92 of the 274-unit viewBox, plus half its stroke). */
const APP_RIGHT = 268.4 / 274

/** The drawings' window tops (between the stack's tilted corner and the
 *  clean app's frame), as a share of the drawing's height. */
const WINDOW_TOP = 0.155

/**
 * The hero drawing's column. Side by side, it slides the drawing so the
 * clean app's outer edge sits on the hero frame's right line (the right
 * corner mark, level with the nav's Book a call), mirroring the headline on
 * the left (Jason, Nov 14). CSS can't do this alone: the drawing's viewBox
 * has room to the right of the app, and the slot centers it.
 *
 * It never moves the drawing closer to the text than the row's gap.
 * Stacked, it leaves the drawing alone.
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
      // The clean app's outer edge goes on the frame's right line (the
      // right corner mark and the nav's Book a call), mirroring the
      // headline's corner mark on the left. Never closer to the text than
      // the row's gap.
      const textEnd = inkRight(text)
      const appRight = drawing.left + drawing.width * APP_RIGHT
      const want = frame.getBoundingClientRect().right - appRight
      const furthestLeft =
        textEnd + parseFloat(rowStyle.columnGap) - drawing.left
      const shift = Math.max(want, furthestLeft)
      if (Math.abs(shift) > 0.5) slot.style.transform = `translateX(${shift}px)`
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
