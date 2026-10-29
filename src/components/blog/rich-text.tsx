import type { ReactNode } from 'react'
import type { BlogBlock } from '@/src/lib/blog'
import { cn } from '@/src/lib/utils'

/** Inline markdown: [text](url), **bold** and *italic*, nested freely. */
const INLINE_PATTERNS = [
  { kind: 'link', re: /\[([^\]]+)\]\(([^)\s]+)\)/ },
  { kind: 'bold', re: /\*\*(.+?)\*\*/ },
  { kind: 'italic', re: /\*([^*]+)\*/ },
] as const

const LINK =
  'text-accent underline decoration-accent/40 underline-offset-4 transition-colors [overflow-wrap:anywhere] hover:decoration-accent'

export function RichText({ text }: { text: string }): ReactNode {
  const nodes: ReactNode[] = []
  let rest = text
  let key = 0

  while (rest) {
    // The earliest match wins; on a tie, the order above (bold before italic).
    let best: { kind: string; match: RegExpExecArray } | undefined
    for (const { kind, re } of INLINE_PATTERNS) {
      const match = re.exec(rest)
      if (match && (!best || match.index < best.match.index)) {
        best = { kind, match }
      }
    }
    if (!best) {
      nodes.push(rest)
      break
    }

    const { kind, match } = best
    if (match.index > 0) nodes.push(rest.slice(0, match.index))
    const inner = <RichText text={match[1]} />
    if (kind === 'link') {
      const href = match[2]
      const external = /^https?:\/\//.test(href)
      nodes.push(
        <a
          key={key++}
          href={href}
          className={LINK}
          {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
        >
          {inner}
        </a>
      )
    } else if (kind === 'bold') {
      nodes.push(
        <strong key={key++} className='font-semibold text-text'>
          {inner}
        </strong>
      )
    } else {
      nodes.push(<em key={key++}>{inner}</em>)
    }
    rest = rest.slice(match.index + match[0].length)
  }

  return nodes
}

/** A post body. Everything after a "Sources" heading is set smaller, as
 *  reference notes rather than reading text. */
export function BlogBody({ blocks }: { blocks: BlogBlock[] }) {
  const sourcesAt = blocks.findIndex(
    block =>
      (block.type === 'heading' || block.type === 'subheading') &&
      /^sources$/i.test(block.text.trim())
  )

  return (
    <div className='flex flex-col gap-6'>
      {blocks.map((block, index) => {
        const inSources = sourcesAt !== -1 && index >= sourcesAt
        if (block.type === 'heading' || block.type === 'subheading') {
          return block.type === 'heading' ? (
            <h2
              key={index}
              className={cn(
                'font-headline text-2xl leading-tight font-bold tracking-tight text-balance text-text uppercase md:text-3xl',
                inSources
                  ? 'mt-grid-2 border-t border-border pt-grid-1'
                  : 'mt-grid-1'
              )}
            >
              <RichText text={block.text} />
            </h2>
          ) : (
            <h3
              key={index}
              className={cn(
                'font-headline text-xl leading-tight font-bold tracking-tight text-balance text-text uppercase md:text-2xl',
                inSources
                  ? 'mt-grid-2 border-t border-border pt-grid-1'
                  : 'mt-grid-1'
              )}
            >
              <RichText text={block.text} />
            </h3>
          )
        }

        const text = inSources
          ? 'text-sm text-text-muted'
          : 'text-base leading-relaxed text-text md:text-lg'

        if (block.type === 'list') {
          const List = block.ordered ? 'ol' : 'ul'
          return (
            <List
              key={index}
              className={cn(
                'flex flex-col gap-3 pl-6 marker:text-text-muted',
                block.ordered ? 'list-decimal' : 'list-disc',
                text
              )}
            >
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className='pl-2'>
                  <RichText text={item} />
                </li>
              ))}
            </List>
          )
        }

        return (
          <p key={index} className={text}>
            <RichText text={block.text} />
          </p>
        )
      })}
    </div>
  )
}
