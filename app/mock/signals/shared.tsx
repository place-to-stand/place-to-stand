import { SectionHeading } from '@/src/components/patterns/section'
import { SOUND_FAMILIAR } from '@/src/lib/home'

/** Short bucket names for tags: BACK OFFICE / STORE / TECH TEAM. */
export const SHORT = ['Back office', 'Store', 'Tech team'] as const

/** The lime checklist square, centered on the first line of its text. */
export function Marker() {
  return (
    <span
      aria-hidden
      className='flex shrink-0 items-center'
      style={{ height: '1lh' }}
    >
      <span className='size-2 bg-accent' />
    </span>
  )
}

export function Heading() {
  return (
    <SectionHeading
      label={SOUND_FAMILIAR.label}
      title={SOUND_FAMILIAR.title}
      intro={SOUND_FAMILIAR.intro}
    />
  )
}
