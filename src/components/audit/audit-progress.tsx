import { QUESTIONS } from '@/src/lib/audit/questions'
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

/**
 * One evenly spaced segment per question, so the bar matches the "Question N
 * of M" label exactly: done, current, or still to come. The section is named
 * in the label, so the bar does not group by it.
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
      <div className='mt-2 flex gap-1.5'>
        {QUESTIONS.map((question, i) => (
          <div
            key={question.id}
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
    </div>
  )
}
