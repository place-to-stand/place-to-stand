import * as React from 'react'

/**
 * Blueprint corner marks — renders accent-colored corner brackets
 * on cards, panels, and content blocks to anchor them to the schematic.
 */
export function BlueprintCorners({
  size = 12,
  all = false,
}: {
  size?: number
  all?: boolean
}) {
  const style = { width: size, height: size }
  return (
    <>
      <span
        className='pointer-events-none absolute -left-px -top-px z-10 border-l border-t border-accent'
        style={style}
        aria-hidden
      />
      <span
        className='pointer-events-none absolute -bottom-px -right-px z-10 border-b border-r border-accent'
        style={style}
        aria-hidden
      />
      {all && (
        <>
          <span
            className='pointer-events-none absolute -right-px -top-px z-10 border-r border-t border-accent'
            style={style}
            aria-hidden
          />
          <span
            className='pointer-events-none absolute -bottom-px -left-px z-10 border-b border-l border-accent'
            style={style}
            aria-hidden
          />
        </>
      )}
    </>
  )
}

/**
 * Blueprint section label — an architectural callout with leader line + terminal mark.
 */
export function BlueprintLabel({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span className={`bp-label font-mono ${className}`}>{children}</span>
  )
}

/**
 * Crosshair mark used at intersection points on the grid.
 */
export function BlueprintCrosshair({ className = '' }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none relative inline-block h-3 w-3 ${className}`}
      aria-hidden
    >
      <span className='absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-accent/40' />
      <span className='absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-accent/40' />
    </span>
  )
}
