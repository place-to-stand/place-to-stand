/* eslint-disable design/no-raw-border -- a chat window rebuilt in HTML (Home's warning signs): its header rule, avatars, reaction chips and "New" divider are the UI being shown, like the client widgets. */
'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/src/lib/utils'
import { BlockAvatar, hasBlockAvatar } from './block-avatars'

export type ChatPerson = { name: string; role: string }
export type ChatMessage = {
  /** Index into `people`. */
  by: number
  time: string
  text: string
  reactions?: readonly (readonly [emoji: string, count: number])[]
  replies?: number
}

/**
 * A short team chat, in our own plain chat UI (not any real product's look
 * or name): a header with where it happens, then the
 * messages, each with a block portrait (or initials), name, role and time. Optional: a
 * "New" divider above one message and a typing line at the end.
 *
 * The messages sit at the bottom of the window, newest last, as in any
 * chat, so a window taller than its messages leaves the space above them.
 * They appear one by one the first time the window scrolls into
 * view (or is swiped into view); with reduced motion they're simply there.
 */
export function TeamChat({
  label,
  people,
  messages,
  newBefore,
  typing,
  className,
}: {
  /** Where the chat happens ("In the back office"): the header, and the
   *  name screen readers hear. */
  label: string
  people: readonly ChatPerson[]
  messages: readonly ChatMessage[]
  /** Index of the message the "New" divider sits above. */
  newBefore?: number
  /** Index into `people`: who is typing after the last message. */
  typing?: number
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.35 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Each row (message, divider, typing line) fades in after the one before.
  let step = 0
  const reveal = () => {
    const delay = step++ * 380
    return {
      className: cn(
        'transition-[opacity,translate] duration-(--motion-enter) ease-(--ease-standard)',
        shown ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0',
        'motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none'
      ),
      style: { transitionDelay: shown ? `${delay}ms` : '0ms' },
    }
  }

  return (
    <figure
      ref={ref}
      aria-label={`${label}: a team chat`}
      className={cn('flex flex-col border border-border bg-bg-card', className)}
    >
      <figcaption className='border-b border-border bg-bg-elevated px-grid-1 py-grid-half type-card-title leading-6'>
        {label}
      </figcaption>
      {/* Anchored to the bottom, like any chat: if the window is taller
          than its messages, the space sits above them. */}
      <ol className='mt-auto flex flex-col gap-grid-1 px-grid-1 py-grid-1'>
        {messages.map((m, i) => {
          const person = people[m.by]
          const divider = i === newBefore ? reveal() : null
          const row = (
            <li key={i} {...reveal()}>
              <div className='flex gap-grid-half'>
                <Avatar name={person.name} tone={m.by} />
                <div className='flex min-w-0 flex-col gap-1.5'>
                  <p className='flex flex-wrap items-baseline gap-x-2 leading-snug'>
                    <span className='text-base font-semibold text-text'>
                      {person.name}
                    </span>
                    <span className='text-sm text-text-muted'>
                      {person.role} · {m.time}
                    </span>
                  </p>
                  {/* Plain wrapping, not the site's "pretty" wrap, so a
                      message uses the window's full width. */}
                  <p className='text-base leading-[1.3] text-wrap text-text'>
                    {m.text}
                  </p>
                  {(m.reactions || m.replies) && (
                    <div className='flex flex-wrap items-center gap-2 pt-2'>
                      {m.reactions?.map(([emoji, n]) => (
                        <Reaction key={emoji} emoji={emoji} count={n} />
                      ))}
                      {m.replies && (
                        <span className='text-sm font-semibold text-accent'>
                          {m.replies} replies
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </li>
          )
          if (!divider) return row
          return [
            <li
              key={`new-${i}`}
              aria-label='New messages'
              style={divider.style}
              className={cn(
                divider.className,
                'flex items-center gap-2 font-mono text-xs text-accent'
              )}
            >
              <span aria-hidden className='h-px flex-1 bg-accent-line' />
              <span aria-hidden>New</span>
            </li>,
            row,
          ]
        })}
        {typing !== undefined && (
          <TypingRow {...reveal()} name={people[typing].name} />
        )}
      </ol>
    </figure>
  )
}

/** A reaction chip you can add to, as in a real chat: a click adds yours
 *  (+1, lime edge and tint), a second click takes it back. Local state
 *  only; nothing is stored. */
function Reaction({ emoji, count }: { emoji: string; count: number }) {
  const [mine, setMine] = useState(false)
  const [bumps, setBumps] = useState(0)
  const total = count + (mine ? 1 : 0)
  return (
    <button
      type='button'
      aria-pressed={mine}
      aria-label={`React with ${emoji}, ${total} ${total === 1 ? 'reaction' : 'reactions'}`}
      onClick={() => {
        setMine(v => !v)
        setBumps(b => b + 1)
      }}
      className={cn(
        'cursor-pointer touch-manipulation border px-2 text-sm leading-6 text-text tabular-nums transition-colors duration-(--motion-fast) ease-(--ease-standard)',
        mine
          ? 'border-accent bg-accent-muted'
          : 'border-border-light bg-bg-elevated hover:border-text-muted'
      )}
    >
      <span aria-hidden>{emoji}</span>{' '}
      {/* Remounts on each click so the count bumps; not on first view. */}
      <span
        key={bumps}
        aria-hidden
        className={cn('inline-block min-w-[1ch]', bumps > 0 && 'chip-bump')}
      >
        {total}
      </span>
    </button>
  )
}

function TypingRow({
  name,
  className,
  style,
}: {
  name: string
  className: string
  style: React.CSSProperties
}) {
  return (
    <li
      style={style}
      className={cn(
        className,
        'flex items-center gap-2 pl-grid-2 font-mono text-xs text-text-muted'
      )}
    >
      <span aria-hidden className='flex gap-1'>
        {[0, 1, 2].map(d => (
          <span
            key={d}
            className='size-1 animate-pulse bg-text-muted motion-reduce:animate-none'
            style={{ animationDelay: `${d * 200}ms` }}
          />
        ))}
      </span>
      {name} is typing…
    </li>
  )
}

function Avatar({ name, tone }: { name: string; tone: number }) {
  // A block portrait when the person has one; otherwise initials on one of
  // three quiet token fills.
  if (hasBlockAvatar(name))
    return <BlockAvatar name={name} className='mt-0.5 size-8 shrink-0' />
  const fills = ['bg-bg-elevated', 'bg-accent-muted', 'bg-border']
  return (
    <span
      aria-hidden
      className={cn(
        'mt-0.5 flex size-8 shrink-0 items-center justify-center font-mono text-xs font-semibold text-text',
        fills[tone % fills.length]
      )}
    >
      {name.slice(0, 1)}
    </span>
  )
}
