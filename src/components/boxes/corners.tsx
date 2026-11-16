import * as React from 'react'

/**
 * Blueprint corner marks: corner brackets that anchor a block to the
 * schematic. One rule everywhere: the 2px emphasis stroke, solid, in
 * accent-line (lime on dark bands, ink on light ones),
 * hanging 1px outside the box.
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
        className={`pointer-events-none absolute -top-px -left-px z-(--z-raised) border-t-(length:--stroke-emphasis) border-l-(length:--stroke-emphasis) border-accent-line`}
        style={style}
        aria-hidden
      />
      <span
        className={`pointer-events-none absolute -right-px -bottom-px z-(--z-raised) border-r-(length:--stroke-emphasis) border-b-(length:--stroke-emphasis) border-accent-line`}
        style={style}
        aria-hidden
      />
      {all && (
        <>
          <span
            className={`pointer-events-none absolute -top-px -right-px z-(--z-raised) border-t-(length:--stroke-emphasis) border-r-(length:--stroke-emphasis) border-accent-line`}
            style={style}
            aria-hidden
          />
          <span
            className={`pointer-events-none absolute -bottom-px -left-px z-(--z-raised) border-b-(length:--stroke-emphasis) border-l-(length:--stroke-emphasis) border-accent-line`}
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
