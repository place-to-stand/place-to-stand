/* oxlint-disable design/no-raw-border -- a chat window rebuilt in HTML (Home's warning signs): its header rule, avatars, reaction chips and "New" divider are the UI being shown, like the client widgets. */
'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
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
 * The first time the window scrolls (or is swiped) into view the chat plays
 * like Slack: each message arrives at the bottom and pushes the ones above
 * it up, its reactions landing a beat later. Transform only, so the window
 * never changes size; with reduced motion every message is simply there.
 */
/** Time between arrivals, Slack-quick but slow enough to read along. */
const STEP = 650

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
  const listRef = useRef<HTMLOListElement>(null)
  // How many rows (the New divider, messages, the typing line) have
  // arrived; -1 until the window first comes into view.
  const total =
    messages.length +
    (newBefore !== undefined ? 1 : 0) +
    (typing !== undefined ? 1 : 0)
  const [count, setCount] = useState(-1)
  const [offset, setOffset] = useState(0)

  // Start playing the first time the window is at least a third on screen
  // (this fires at once if it already is on load). Reduced motion: every
  // row is simply there.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const id = requestAnimationFrame(() => setCount(total))
      return () => cancelAnimationFrame(id)
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCount(0)
          io.disconnect()
        }
      },
      { threshold: 0.35 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [total])

  // Then one row arrives every STEP ms, Slack style.
  useEffect(() => {
    if (count < 0 || count >= total) return
    const t = setTimeout(() => setCount(c => c + 1), count === 0 ? 150 : STEP)
    return () => clearTimeout(t)
  }, [count, total])

  // The list sits at the window's bottom; rows that haven't arrived are
  // pushed below it (clipped), so each arrival slides the list up by one
  // row: the new one rises in at the bottom and the rest move up. Measured
  // from layout (offsetTop ignores transforms), redone on resize.
  useLayoutEffect(() => {
    const measure = () => {
      const r = Array.from(
        listRef.current?.querySelectorAll<HTMLElement>(':scope > [data-row]') ??
          []
      )
      const last = r[total - 1]
      if (!last || count >= total) return setOffset(0)
      const end = last.offsetTop + last.offsetHeight
      if (count <= 0) {
        const first = r[0]
        const list = listRef.current
        return setOffset(
          end - (first ? first.offsetTop : 0) + (list ? list.offsetHeight : 0)
        )
      }
      const shownLast = r[count - 1]
      setOffset(
        shownLast ? end - (shownLast.offsetTop + shownLast.offsetHeight) : 0
      )
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [count, total])

  // Each row fades in as it arrives; its reactions land a beat later.
  let step = 0
  const reveal = () => {
    const i = step++
    const here = count > i
    return {
      'data-row': '',
      // Not arrived yet: invisible, so out of the tab order and the
      // accessibility tree too (its reaction buttons included).
      inert: !here,
      here,
      className: cn(
        'transition-opacity duration-(--motion-base) ease-(--ease-enter) motion-reduce:transition-none',
        here ? 'opacity-100' : 'opacity-0'
      ),
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
      {/* The clip: rows that haven't arrived wait below the list, out of
          sight. Around the list only, so the window keeps its size. */}
      <div className='mt-auto overflow-hidden'>
        <ol
          ref={listRef}
          style={{ transform: `translateY(${offset}px)` }}
          className='flex flex-col gap-grid-1 px-grid-1 py-grid-1 transition-transform duration-(--motion-base) ease-(--ease-enter) motion-reduce:transition-none'
        >
          {messages.map((m, i) => {
            const person = people[m.by]
            const divider = i === newBefore ? reveal() : null
            const { here, ...rowProps } = reveal()
            const row = (
              <li key={i} {...rowProps}>
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
                      {/* The last two words travel together, so no line ends
                        on one word. */}
                      {m.text.replace(/ (\S+)$/, '\u00a0$1')}
                    </p>
                    {(m.reactions || m.replies) && (
                      <div
                        className={cn(
                          'flex flex-wrap items-center gap-2 pt-2 transition-opacity delay-(--motion-base) duration-(--motion-base) ease-(--ease-enter) motion-reduce:transition-none',
                          here ? 'opacity-100' : 'opacity-0'
                        )}
                      >
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
                data-row=''
                inert={divider.inert}
                aria-label='New messages'
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
          {typing !== undefined &&
            (() => {
              const { className } = reveal()
              return (
                <TypingRow className={className} name={people[typing].name} />
              )
            })()}
        </ol>
      </div>
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
        'inline-flex h-grid-1 cursor-pointer touch-manipulation items-center gap-1.5 border px-2 text-sm leading-none text-text transition-colors duration-(--motion-fast) ease-(--ease-standard)',
        mine
          ? 'border-accent bg-accent-muted'
          : 'border-border-light bg-bg-elevated hover:border-text-muted'
      )}
    >
      <span aria-hidden>{emoji}</span>
      {/* 12px mono figures (the smallest size the type rules allow), centered
          on the emoji. Remounts on each click so the count bumps; not on
          first view. */}
      <span
        key={bumps}
        aria-hidden
        className={cn(
          'inline-block min-w-[1ch] font-mono text-xs leading-none tabular-nums',
          bumps > 0 && 'chip-bump'
        )}
      >
        {total}
      </span>
    </button>
  )
}

function TypingRow({ name, className }: { name: string; className: string }) {
  return (
    <li
      data-row=''
      className={cn(
        className,
        'flex items-center gap-2 pl-grid-2 text-sm text-text-muted'
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
