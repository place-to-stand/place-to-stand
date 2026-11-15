/* eslint-disable design/no-raw-border -- a chat window rebuilt in HTML (Home's warning signs): its header rule, avatars, reaction chips and "New" divider are the UI being shown, like the client widgets. */
'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/src/lib/utils'

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
 * messages, each with an initials avatar, name, role and time. Optional: a
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
      <figcaption className='border-b border-border px-grid-1 py-grid-half font-mono text-xs tracking-[0.05em] uppercase'>
        <span className='text-text'>{label}</span>
      </figcaption>
      {/* Anchored to the bottom, like any chat: if the window is taller
          than its messages, the space sits above them. */}
      <ol className='mt-auto flex flex-col gap-grid-half px-grid-1 py-grid-1'>
        {messages.map((m, i) => {
          const person = people[m.by]
          const divider = i === newBefore ? reveal() : null
          const row = (
            <li key={i} {...reveal()}>
              <div className='flex gap-grid-half'>
                <Avatar name={person.name} tone={m.by} />
                <div className='flex min-w-0 flex-col gap-1'>
                  <p className='flex flex-wrap items-baseline gap-x-2 text-sm'>
                    <span className='font-semibold text-text'>
                      {person.name}
                    </span>
                    <span className='text-text-muted'>{person.role}</span>
                    <span className='font-mono text-xs text-text-muted'>
                      {m.time}
                    </span>
                  </p>
                  <p className='text-base text-text'>{m.text}</p>
                  {(m.reactions || m.replies) && (
                    <div className='flex flex-wrap items-center gap-2 pt-1'>
                      {m.reactions?.map(([emoji, n]) => (
                        <span
                          key={emoji}
                          className='border border-border px-1.5 font-mono text-xs leading-5 text-text-muted'
                        >
                          <span aria-hidden>{emoji}</span>
                          <span className='sr-only'>Reaction:</span> {n}
                        </span>
                      ))}
                      {m.replies && (
                        <span className='font-mono text-xs text-accent'>
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
  // Three quiet fills from the tokens tell people apart without new colors.
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
