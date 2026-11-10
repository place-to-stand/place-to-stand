'use client'

import { useRef, useSyncExternalStore, type RefObject } from 'react'

/**
 * Reads CSS custom properties live from the element itself, so the values
 * shown are whatever app/globals.css sets right now: per breakpoint, and per
 * band (a swatch inside a light band shows the light value). Never copies.
 */
const subscribe = (onChange: () => void) => {
  const frame = requestAnimationFrame(onChange)
  window.addEventListener('resize', onChange)
  return () => {
    cancelAnimationFrame(frame)
    window.removeEventListener('resize', onChange)
  }
}

function useCssVar(name: string, ref: RefObject<HTMLElement | null>) {
  return useSyncExternalStore(
    subscribe,
    () =>
      ref.current
        ? getComputedStyle(ref.current).getPropertyValue(name).trim()
        : '',
    () => ''
  )
}

export function Swatch({ name }: { name: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const value = useCssVar(name, ref)
  return (
    <div ref={ref} className='flex items-center gap-grid-half'>
      <span
        aria-hidden
        className='h-grid-2 w-grid-2 shrink-0 border border-border'
        style={{ background: `var(${name})` }}
      />
      <div className='flex flex-col gap-1'>
        <span className='font-mono text-xs text-text'>{name}</span>
        <span className='font-mono text-xs text-text-muted'>{value}</span>
      </div>
    </div>
  )
}

/** A bar as long as a spacing role, at the current breakpoint. */
export function SpaceBar({ name }: { name: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const value = useCssVar(name, ref)
  return (
    <div ref={ref} className='flex items-center gap-grid-1'>
      <span className='w-40 shrink-0 font-mono text-xs text-text'>{name}</span>
      <span
        aria-hidden
        className='h-grid-half shrink-0 bg-accent-line'
        style={{ width: `var(${name})` }}
      />
      <span className='font-mono text-xs text-text-muted'>{value}</span>
    </div>
  )
}

/** The computed font size of a type role, at the current breakpoint. */
export function TypeSample({ cls, sample }: { cls: string; sample: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const size = useSyncExternalStore(
    subscribe,
    () => {
      const el = ref.current?.firstElementChild
      if (!el) return ''
      const cs = getComputedStyle(el)
      return `${cs.fontSize} / ${cs.lineHeight}`
    },
    () => ''
  )
  return (
    <div className='flex flex-col gap-grid-half border-t border-border pt-grid-1'>
      <div ref={ref}>
        <p className={cls}>{sample}</p>
      </div>
      <span className='font-mono text-xs text-text-muted'>
        {cls} · {size}
      </span>
    </div>
  )
}

/** Any custom property's live value, e.g. a motion timing. */
export function LiveVar({ name }: { name: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const value = useCssVar(name, ref)
  return (
    <div
      ref={ref}
      className='flex items-baseline justify-between gap-grid-1 border-t border-border py-grid-half'
    >
      <span className='font-mono text-xs text-text'>{name}</span>
      <span className='font-mono text-xs text-text-muted'>{value}</span>
    </div>
  )
}
