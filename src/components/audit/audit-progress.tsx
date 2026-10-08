import { questionsForSection, SECTIONS } from '@/src/lib/audit/questions'
import { cn } from '@/src/lib/utils'

interface AuditProgressProps {
  /** Left-hand label, e.g. "Question 3 of 8". */
  label: string
  /** Right-hand label, usually the current section's title. */
  title: string
  /**
   * Zero-based index of the question on screen, in worksheet order. Every
   * earlier question shows as done. Past the last question (the email step)
   * every segment is done.
   */
  currentIndex: number
}

/** Each section's worksheet-order question indices, for grouping segments. */
const SECTION_GROUPS = SECTIONS.reduce<{ id: string; indices: number[] }[]>(
  (groups, section) => {
    const start = groups.reduce((n, g) => n + g.indices.length, 0)
    const size = questionsForSection(section.id).length
    return [
      ...groups,
      {
        id: section.id,
        indices: Array.from({ length: size }, (_, i) => start + i),
      },
    ]
  },
  []
)

/**
 * One segment per question, so the bar matches the "Question N of M" label
 * exactly: done, current, or still to come. Sections show as groups separated
 * by a wider gap, never as partially filled segments of their own.
 */
export function AuditProgress({
  label,
  title,
  currentIndex,
}: AuditProgressProps) {
  return (
    <div className='mb-grid-1'>
      <div className='flex items-center justify-between gap-4 font-mono text-xs tracking-[0.15em] text-text-muted uppercase'>
        <span>{label}</span>
        <span className='text-right text-accent'>{title}</span>
      </div>
      <div className='mt-2 flex gap-2.5'>
        {SECTION_GROUPS.map(group => (
          <div key={group.id} className='flex flex-1 gap-1'>
            {group.indices.map(i => (
              <div
                key={i}
                className={cn(
                  'h-1.5 flex-1 transition-colors duration-300',
                  i < currentIndex
                    ? 'bg-accent'
                    : i === currentIndex
                      ? 'bg-accent/40'
                      : 'bg-border'
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
