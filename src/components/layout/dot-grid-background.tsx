import * as React from 'react'

/**
 * Blueprint corner marks — renders accent-colored corner brackets
 * on cards, panels, and content blocks to anchor them to the schematic.
 */
export function BlueprintCorners({
  size = 12,
  all = false,
  colorClassName = 'border-accent',
}: {
  size?: number
  all?: boolean
  colorClassName?: string
}) {
  const style = { width: size, height: size }
  return (
    <>
      <span
        className={`pointer-events-none absolute -top-px -left-px z-10 border-t border-l ${colorClassName}`}
        style={style}
        aria-hidden
      />
      <span
        className={`pointer-events-none absolute -right-px -bottom-px z-10 border-r border-b ${colorClassName}`}
        style={style}
        aria-hidden
      />
      {all && (
        <>
          <span
            className={`pointer-events-none absolute -top-px -right-px z-10 border-t border-r ${colorClassName}`}
            style={style}
            aria-hidden
          />
          <span
            className={`pointer-events-none absolute -bottom-px -left-px z-10 border-b border-l ${colorClassName}`}
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
  return <span className={`bp-label font-mono ${className}`}>{children}</span>
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
      <span className='absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-accent/40' />
      <span className='absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-accent/40' />
    </span>
  )
}
