/* eslint-disable design/no-raw-border -- a throwaway mock page (Nov 15): the chat windows draw their own header rule and avatar edges. Not linked; the chosen one gets rebuilt on the boxes. */
'use client'

import type { Route } from 'next'
import { useEffect, useRef, useState } from 'react'
import { ArrowLink } from '@/src/components/patterns/arrow-link'
import { Section } from '@/src/components/patterns/section'
import { SOUND_FAMILIAR } from '@/src/lib/home'
import { cn } from '@/src/lib/utils'
import { Heading } from './shared'

/**
 * G: "If your team is saying these" — so show the team saying them. Each
 * place is a short chat thread in our own plain chat UI (no real product's
 * look or name): made-up first names with initials, roles that fit, times,
 * a reaction or two. The messages are the approved signals, verbatim. Under
 * each thread, the fix and its link.
 */

type Person = { name: string; role: string }
type Message = {
  by: number
  time: string
  reactions?: [string, number][]
  replies?: number
}
type Thread = { room: string; people: Person[]; messages: Message[] }

/** Who says what, per group, in the same order as the quotes. */
const THREADS: Thread[] = [
  {
    room: 'ops',
    people: [
      { name: 'Dana', role: 'Ops lead' },
      { name: 'Marcus', role: 'Finance' },
      { name: 'Rachel', role: 'Owner' },
    ],
    messages: [
      { by: 0, time: '9:12 AM', reactions: [['😩', 2]] },
      { by: 1, time: '9:14 AM', reactions: [['💯', 3]] },
      { by: 2, time: '9:31 AM', replies: 3 },
    ],
  },
  {
    room: 'store',
    people: [
      { name: 'Priya', role: 'Marketing' },
      { name: 'Leo', role: 'Support' },
    ],
    messages: [
      { by: 0, time: '2:03 PM', reactions: [['👀', 2]] },
      { by: 1, time: '2:05 PM', reactions: [['😩', 1]] },
      { by: 0, time: '2:09 PM', replies: 2 },
    ],
  },
  {
    room: 'product',
    people: [
      { name: 'Sam', role: 'Founder' },
      { name: 'Jordan', role: 'Head of ops' },
    ],
    messages: [
      { by: 0, time: '4:40 PM', reactions: [['🙏', 1]] },
      { by: 1, time: '4:42 PM', reactions: [['😬', 2]] },
      { by: 0, time: '4:47 PM', replies: 4 },
    ],
  },
]

function Avatar({ name, tone }: { name: string; tone: number }) {
  // Three quiet fills from the tokens, so people are told apart without
  // new colors.
  const fills = ['bg-bg-elevated', 'bg-accent-muted', 'bg-border']
  return (
    <span
      aria-hidden
      className={cn(
        'flex size-9 shrink-0 items-center justify-center font-mono text-xs font-semibold text-text',
        fills[tone % fills.length]
      )}
    >
      {name.slice(0, 1)}
    </span>
  )
}

/** One thread. Messages appear one by one the first time it scrolls into
 *  view; with reduced motion (CSS) they're simply there. */
function ChatThread({
  thread,
  quotes,
  label,
}: {
  thread: Thread
  quotes: readonly string[]
  label: string
}) {
  const ref = useRef<HTMLDivElement>(null)
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

  return (
    <figure
      ref={ref}
      aria-label={`${label}: a team chat`}
      className='flex flex-col border border-border bg-bg-card'
    >
      <figcaption className='flex items-center justify-between border-b border-border px-grid-1 py-grid-half'>
        <span className='font-mono text-xs text-text'>
          <span className='text-accent'>/</span> {thread.room}
        </span>
        <span className='font-mono text-xs text-text-muted'>
          {thread.people.length} people
        </span>
      </figcaption>
      <ol className='flex flex-col gap-grid-1 p-grid-1'>
        {thread.messages.map((m, i) => {
          const person = thread.people[m.by]
          return (
            <li
              key={i}
              className={cn(
                'flex gap-grid-half transition-[opacity,translate] duration-(--motion-slow) ease-(--ease-standard)',
                shown ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
                // Reduced motion: the messages are simply there.
                'motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none'
              )}
              style={{ transitionDelay: shown ? `${i * 450}ms` : '0ms' }}
            >
              <Avatar name={person.name} tone={m.by} />
              <div className='flex min-w-0 flex-col gap-1'>
                <p className='flex flex-wrap items-baseline gap-x-grid-half text-sm'>
                  <span className='font-semibold text-text'>{person.name}</span>
                  <span className='text-text-muted'>{person.role}</span>
                  <span className='font-mono text-xs text-text-muted'>
                    {m.time}
                  </span>
                </p>
                <p className='text-base text-text'>{quotes[i]}</p>
                {(m.reactions || m.replies) && (
                  <div className='flex flex-wrap items-center gap-grid-half pt-1'>
                    {m.reactions?.map(([emoji, n]) => (
                      <span
                        key={emoji}
                        className='border border-border px-2 py-0.5 font-mono text-xs text-text-muted'
                      >
                        <span aria-hidden>{emoji}</span>
                        <span className='sr-only'>reaction</span> {n}
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
            </li>
          )
        })}
      </ol>
    </figure>
  )
}

export function TeamChats() {
  const { groups } = SOUND_FAMILIAR
  return (
    <Section className='flex flex-col gap-stack'>
      <Heading />
      {/* Three threads; on laptops the middle and right ones step down a
          row each, so the three read as a staggered set, not a table. */}
      <div className='grid gap-grid-2 lg:grid-cols-3 lg:gap-x-grid-1'>
        {groups.map((group, gi) => (
          <div
            key={group.name}
            className={cn(
              'flex flex-col gap-grid-1',
              gi === 1 && 'lg:pt-grid-2',
              gi === 2 && 'lg:pt-grid-4'
            )}
          >
            <span className='type-fine'>{group.name}</span>
            <ChatThread
              thread={THREADS[gi]}
              quotes={group.quotes}
              label={group.name}
            />
            <div className='flex flex-col gap-grid-half pt-grid-half'>
              <p className='text-base text-text-muted'>{group.build}</p>
              <ArrowLink href={group.link.href as Route}>
                {group.link.label}
              </ArrowLink>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
