'use client'

import type { Route } from 'next'
import { useEffect, useRef, useState } from 'react'
import { Reveal } from '@/src/components/primitives/animated-section'
import { Section, SectionHeading } from '@/src/components/patterns/section'
import { ArrowLink } from '@/src/components/patterns/arrow-link'
import { TeamChat } from '@/src/components/patterns/team-chat'
import { SOUND_FAMILIAR } from '@/src/lib/home'
import { cn } from '@/src/lib/utils'

/**
 * Home's warning signs: "These sound familiar? It’s time to call." The team says
 * them. Each place (back office, store, tech side) is a short chat whose
 * messages are the signals, and under it what we build for it and one
 * lime link (Nov 15).
 *
 * Laptops (from 1280px): the heading across the top, then the three
 * chats side by side, equal height (subgrid), with the three "What we
 * build" notes in one row beneath.
 *
 * Phones, tablets and small laptops: one chat at a time in a sideways
 * scroll-snap row, the next one peeking in, with dot buttons under it (no
 * carousel library; focusing a link in a hidden chat scrolls it into view).
 * Below 1280 three columns are too narrow for the messages.
 *
 * Tone: dark.
 */
export function SoundFamiliarSection() {
  const { groups } = SOUND_FAMILIAR
  const listRef = useRef<HTMLUListElement>(null)
  const items = useRef<(HTMLLIElement | null)[]>([])
  const [current, setCurrent] = useState(0)

  // Which chat is in the row's view (phones and tablets).
  useEffect(() => {
    const root = listRef.current
    if (!root) return
    // The most visible chat is current; on a tie the leftmost wins.
    const ratios = items.current.map(() => 0)
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries)
          ratios[items.current.indexOf(e.target as HTMLLIElement)] =
            e.intersectionRatio
        setCurrent(ratios.indexOf(Math.max(...ratios)))
      },
      { root, threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    items.current.forEach(el => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const show = (i: number) =>
    items.current[i]?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
      block: 'nearest',
      inline: 'start',
    })

  return (
    <Section className='flex flex-col gap-stack'>
      <Reveal index={0}>
        <SectionHeading
          label={SOUND_FAMILIAR.label}
          // Always two lines, one heading: the question, then the answer.
          title={SOUND_FAMILIAR.title.split(/(?<=\?) /).map(line => (
            <span key={line} className='block'>
              {line}
            </span>
          ))}
          intro={SOUND_FAMILIAR.intro}
        />
      </Reveal>
      <ul
        ref={listRef}
        aria-label='Where you hear it'
        className='-mx-grid-1 flex snap-x snap-mandatory scroll-px-grid-1 [scrollbar-width:none] gap-grid-1 overflow-x-auto px-grid-1 xl:mx-0 xl:grid xl:grid-cols-3 xl:gap-x-grid-1 xl:gap-y-grid-1 xl:overflow-visible xl:px-0'
      >
        {groups.map((group, i) => (
          <li
            key={group.name}
            ref={el => {
              items.current[i] = el
            }}
            // Tabbing into a chat that only peeks in brings it fully into
            // view (phones and tablets; on laptops all three are showing).
            onFocus={() => {
              if (!window.matchMedia('(min-width: 80rem)').matches) show(i)
            }}
            className={cn(
              // Laptops: each place spans the list's two rows (chat, note)
              // as a subgrid, so the three chats share one height and the
              // three notes one row.
              'flex w-[85%] max-w-md shrink-0 snap-start flex-col gap-grid-1 xl:row-span-2 xl:grid xl:w-auto xl:max-w-none xl:grid-rows-subgrid'
            )}
          >
            <TeamChat
              // In the swipe row the windows fill each item, so the notes
              // line up; on laptops the subgrid does this.
              className='flex-1'
              label={group.name}
              people={group.chat.people}
              messages={group.chat.messages.map((m, k) => ({
                ...m,
                text: group.quotes[k],
              }))}
              newBefore={
                'newBefore' in group.chat ? group.chat.newBefore : undefined
              }
              typing={'typing' in group.chat ? group.chat.typing : undefined}
            />
            {/* A plain block inset like the chat's own content, so it
                lines up with the avatars on the left and the messages on
                the right. */}
            <div className='flex h-full flex-col gap-grid-1 px-grid-1'>
              <p className='text-base text-text'>{group.build}</p>
              {/* Lime on the dark band, so it reads as the action. */}
              {/* Pinned to the note's bottom: the notes share a row (or
                  stretch in the swipe row), so the three links line up. */}
              <ArrowLink
                href={group.link.href as Route}
                className='mt-auto text-accent'
              >
                {group.link.label}
              </ArrowLink>
            </div>
          </li>
        ))}
      </ul>
      {/* Phones and tablets: which chat is showing, and a way to switch. */}
      <div className='flex items-center justify-center gap-grid-half xl:hidden'>
        {groups.map((group, i) => (
          <button
            key={group.name}
            type='button'
            onClick={() => show(i)}
            aria-label={`Show chat ${i + 1} of ${groups.length}: ${group.name}`}
            aria-current={current === i ? 'true' : undefined}
            className='flex size-grid-1 items-center justify-center'
          >
            <span
              className={cn(
                'size-2 transition-colors duration-(--motion-base)',
                current === i ? 'bg-accent' : 'bg-border'
              )}
            />
          </button>
        ))}
      </div>
    </Section>
  )
}
SoundFamiliarSection.tone = 'dark' as const
