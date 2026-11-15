'use client'

import type { Route } from 'next'
import { useEffect, useRef, useState } from 'react'
import { Reveal } from '@/src/components/primitives/animated-section'
import { Section, SectionHeading } from '@/src/components/patterns/section'
import { ArrowLink } from '@/src/components/patterns/arrow-link'
import { TeamChat } from '@/src/components/patterns/team-chat'
import { SideNote } from '@/src/components/boxes'
import { SOUND_FAMILIAR } from '@/src/lib/home'
import { cn } from '@/src/lib/utils'

/**
 * Home's warning signs: "If your team is saying these", so the team says
 * them. Each place (back office, store, tech team) is a short chat whose
 * messages are the signals, and under it a side note with what we build
 * for it and one link (Nov 15).
 *
 * Laptops: three columns. The tech-team chat starts at the top right,
 * beside the heading, so that corner isn't empty; the back-office and store
 * chats sit side by side under the heading, and the three end together.
 *
 * Phones and tablets: one chat at a time in a sideways scroll-snap row,
 * the next one peeking in, with dot buttons under it (no carousel library;
 * focusing a link in a hidden chat scrolls it into view).
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
    <Section className='flex flex-col gap-stack lg:grid lg:grid-cols-3 lg:gap-x-grid-1 lg:gap-y-grid-2'>
      <Reveal index={0} className='lg:col-span-2 lg:row-start-1'>
        <SectionHeading
          label={SOUND_FAMILIAR.label}
          title={SOUND_FAMILIAR.title}
          intro={SOUND_FAMILIAR.intro}
        />
      </Reveal>
      <ul
        ref={listRef}
        aria-label='Where you hear it'
        className='-mx-grid-1 flex snap-x snap-mandatory scroll-px-grid-1 [scrollbar-width:none] gap-grid-1 overflow-x-auto px-grid-1 lg:contents'
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
              if (!window.matchMedia('(min-width: 64rem)').matches) show(i)
            }}
            className={cn(
              'flex w-[85%] max-w-md shrink-0 snap-start flex-col gap-grid-1 lg:w-auto lg:max-w-none',
              // Tech team runs the full height on the right; the other
              // two sit side by side under the heading.
              i === 0 && 'lg:col-start-1 lg:row-start-2',
              i === 1 && 'lg:col-start-2 lg:row-start-2',
              i === 2 && 'lg:col-start-3 lg:row-span-2 lg:row-start-1'
            )}
          >
            <span className='type-fine'>{group.name}</span>
            <TeamChat
              label={group.name}
              room={group.chat.room}
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
            <SideNote className='flex flex-col gap-grid-half'>
              <span className='type-fine'>What we build</span>
              <p className='text-base text-text'>{group.build}</p>
              <ArrowLink href={group.link.href as Route}>
                {group.link.label}
              </ArrowLink>
            </SideNote>
          </li>
        ))}
      </ul>
      {/* Phones and tablets: which chat is showing, and a way to switch. */}
      <div className='flex items-center justify-center gap-grid-half lg:hidden'>
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
