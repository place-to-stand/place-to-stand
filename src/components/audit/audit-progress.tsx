import { SECTIONS } from '@/src/lib/audit/questions'
import { cn } from '@/src/lib/utils'

interface AuditProgressProps {
  /** Left-hand label, e.g. "Question 3 of 8". */
  label: string
  /** Right-hand label, usually the current section's title. */
  title: string
  /**
   * Segment currently in progress: a section index, or `SECTIONS.length` for
   * the closing "Your blueprint" segment.
   */
  segmentIndex: number
  /** How far through the current segment, 0 to 1. */
  segmentFill: number
}

/**
 * One segment per section plus a final one for the emailed blueprint, so the
 * email step reads as part of the audit from the first screen rather than a
 * surprise at the end.
 */
export function AuditProgress({
  label,
  title,
  segmentIndex,
  segmentFill,
}: AuditProgressProps) {
  const segments = SECTIONS.length + 1

  return (
    <div className='mb-8'>
      <div className='flex items-center justify-between gap-4 font-mono text-xs tracking-[0.15em] text-text-muted uppercase'>
        <span>{label}</span>
        <span className='text-right text-accent'>{title}</span>
      </div>
      <div className='mt-2 flex gap-1.5'>
        {Array.from({ length: segments }, (_, i) => {
          const fill =
            i < segmentIndex
              ? 1
              : i === segmentIndex
                ? Math.min(Math.max(segmentFill, 0), 1)
                : 0
          return (
            <div
              key={i}
              className={cn(
                'h-1.5 flex-1 overflow-hidden bg-border',
                // The blueprint segment is visibly different: it is the payoff.
                i === segments - 1 && 'outline outline-1 outline-accent/40'
              )}
            >
              <div
                className='h-full bg-accent transition-[width] duration-300 ease-out'
                style={{ width: `${fill * 100}%` }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
