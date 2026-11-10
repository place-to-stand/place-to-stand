import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/src/lib/utils'
import { AnimatedSection } from './animated-section'

/**
 * A page section with no outer padding. The page decides the space between
 * sections (gap-section, py-edge, …), so two sections never stack their own
 * padding and every gap comes from one spacing role.
 */
export function Section({
  className,
  ...props
}: ComponentProps<typeof AnimatedSection>) {
  return <AnimatedSection className={cn('py-0', className)} {...props} />
}

/**
 * The label + title + intro block at the top of an inner page, with the
 * blueprint dots behind it. Spacing: label to title is the eyebrow role, title to intro
 * is the intro role; the space below it is the page's job (gap-header).
 */
export function PageHeader({
  label,
  title,
  intro,
  meta,
  align = 'left',
  className,
  titleClassName,
}: {
  label: ReactNode
  title: ReactNode
  intro?: ReactNode
  /** A small line under the intro, e.g. "Last updated: …". */
  meta?: ReactNode
  align?: 'left' | 'center'
  className?: string
  titleClassName?: string
}) {
  const centered = align === 'center'
  return (
    <div
      className={cn(
        'dots-hero flex flex-col gap-intro',
        centered && 'items-center text-center',
        className
      )}
    >
      <div
        className={cn('flex flex-col gap-eyebrow', centered && 'items-center')}
      >
        <span className='bp-label font-mono'>{label}</span>
        <h1
          className={cn(
            'max-w-4xl type-page-title text-balance',
            titleClassName
          )}
        >
          {title}
        </h1>
      </div>
      {intro && <p className='max-w-2xl type-intro text-balance'>{intro}</p>}
      {meta && <p className='font-mono text-sm text-text-muted'>{meta}</p>}
    </div>
  )
}

/**
 * A full-width band of sections in one tone. Light bands hold the reading
 * sections; dark bands hold proof and set pieces. A band pads itself by half
 * the section role (band-pad) at top and bottom, so two bands meeting put
 * exactly one section gap between their content, the same as two sections
 * inside one band, with the tone change halfway.
 */
export function Band({
  tone,
  className,
  children,
}: {
  tone: 'light' | 'dark'
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-section py-band-pad',
        tone === 'light' && 'theme-light',
        className
      )}
    >
      {children}
    </div>
  )
}

/**
 * A section's heading group: label, h2 and an optional intro, with the
 * eyebrow and intro roles between them. The space below is the section's
 * job (usually gap-stack).
 */
export function SectionHeading({
  label,
  title,
  intro,
  className,
}: {
  label: ReactNode
  title: ReactNode
  intro?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-intro', className)}>
      <div className='flex flex-col items-start gap-eyebrow'>
        <span className='bp-label font-mono'>{label}</span>
        <h2 className='max-w-3xl type-section-title text-balance'>{title}</h2>
      </div>
      {intro && <p className='max-w-2xl type-intro text-balance'>{intro}</p>}
    </div>
  )
}
