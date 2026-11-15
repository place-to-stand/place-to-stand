/* eslint-disable design/no-raw-border -- a throwaway mock page (Nov 15): rules and tab underlines drawn inline to compare five layouts. Not linked; the chosen one gets rebuilt on the boxes. */
'use client'

import type { Route } from 'next'
import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { Section } from '@/src/components/patterns/section'
import { ArrowLink } from '@/src/components/patterns/arrow-link'
import { Card, RuledRow } from '@/src/components/boxes'
import { Checkbox } from '@/src/components/primitives/checkbox'
import { BookCallGroup } from '@/src/components/primitives/cta'
import { SOUND_FAMILIAR } from '@/src/lib/home'
import { Heading, Marker } from './shared'

const { groups } = SOUND_FAMILIAR
const TOTAL = groups.reduce((n, g) => n + g.quotes.length, 0)

/** C: the nine signals as a real checklist, grouped by bucket, with a
 *  panel that counts what you ticked and shows the fix for those buckets.
 *  The panel sticks beside the list on laptops and sits under it on
 *  phones. */
export function SelfCheck() {
  const [ticked, setTicked] = useState<Set<string>>(new Set())
  const toggle = (quote: string) =>
    setTicked(prev => {
      const next = new Set(prev)
      if (next.has(quote)) next.delete(quote)
      else next.add(quote)
      return next
    })
  const hit = groups.filter(g => g.quotes.some(q => ticked.has(q)))
  const id = useId()

  return (
    <Section className='flex flex-col gap-stack'>
      <Heading />
      <div className='grid gap-grid-2 lg:grid-cols-12 lg:gap-x-grid-1'>
        <div className='flex flex-col gap-grid-2 lg:col-span-7'>
          {groups.map(group => (
            <fieldset key={group.name} className='flex flex-col'>
              <legend className='pb-grid-half type-fine'>{group.name}</legend>
              {group.quotes.map((quote, i) => {
                const inputId = `${id}-${group.name}-${i}`
                return (
                  <RuledRow key={quote} as='div' className='py-grid-half'>
                    <label
                      htmlFor={inputId}
                      className='flex cursor-pointer gap-grid-1 type-item-title font-sans font-normal'
                    >
                      <span
                        className='flex shrink-0 items-center'
                        style={{ height: '1lh' }}
                      >
                        <Checkbox
                          id={inputId}
                          checked={ticked.has(quote)}
                          onChange={() => toggle(quote)}
                          className='mt-0'
                        />
                      </span>
                      <span className='text-balance'>
                        &ldquo;{quote}&rdquo;
                      </span>
                    </label>
                  </RuledRow>
                )
              })}
            </fieldset>
          ))}
        </div>
        <div className='lg:col-span-5'>
          <Card className='flex flex-col gap-grid-1 lg:sticky lg:top-[calc(var(--nav-height)+var(--spacing-grid-1))]'>
            <p aria-live='polite' className='type-item-title'>
              {ticked.size} of {TOTAL} sound familiar
            </p>
            {hit.length === 0 ? (
              <p className='text-base text-text-muted'>
                Tick the ones you’ve heard at work. Your fix shows up here.
              </p>
            ) : (
              <ul className='flex flex-col'>
                {hit.map(g => (
                  <RuledRow
                    key={g.name}
                    className='flex flex-col gap-grid-half py-grid-1'
                  >
                    <span className='type-fine'>{g.name} · The fix</span>
                    <p className='text-base text-text'>{g.build}</p>
                    <ArrowLink href={g.link.href as Route}>
                      {g.link.label}
                    </ArrowLink>
                  </RuledRow>
                ))}
              </ul>
            )}
            <BookCallGroup
              location='mock-signals'
              secondary='none'
              className='items-start'
            />
          </Card>
        </div>
      </div>
    </Section>
  )
}

/** D: one bucket at a time. Large tabs on laptops (arrow keys, Home and End
 *  switch; no auto-advance), its signals big on the left and its answer on
 *  the right. Phones get a stacked accordion. */
export function SignalTabs() {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const id = useId()

  const onKey = (e: KeyboardEvent) => {
    const last = groups.length - 1
    const next =
      e.key === 'ArrowRight'
        ? active === last
          ? 0
          : active + 1
        : e.key === 'ArrowLeft'
          ? active === 0
            ? last
            : active - 1
          : e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? last
              : null
    if (next === null) return
    e.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <Section className='flex flex-col gap-stack'>
      <Heading />

      {/* Laptops: tabs. */}
      <div className='hidden flex-col gap-grid-2 lg:flex'>
        <div
          role='tablist'
          aria-label='Where you hear it'
          className='flex gap-grid-2 border-b border-border'
          onKeyDown={onKey}
        >
          {groups.map((g, i) => (
            <button
              key={g.name}
              ref={el => {
                tabs.current[i] = el
              }}
              role='tab'
              id={`${id}-tab-${i}`}
              aria-selected={active === i}
              aria-controls={`${id}-panel-${i}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              className={`-mb-px border-b-(length:--stroke-emphasis) pb-grid-half type-item-title transition-colors ${
                active === i
                  ? 'border-accent-line text-text'
                  : 'border-transparent text-text-muted hover:text-text'
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>
        {groups.map((g, i) => (
          <div
            key={g.name}
            role='tabpanel'
            id={`${id}-panel-${i}`}
            aria-labelledby={`${id}-tab-${i}`}
            hidden={active !== i}
            tabIndex={0}
            className='grid grid-cols-12 gap-x-grid-1'
          >
            <ul className='col-span-7 flex flex-col'>
              {g.quotes.map(q => (
                <RuledRow
                  key={q}
                  className='flex gap-grid-1 py-grid-1 type-item-title font-sans font-normal first:border-t-0'
                >
                  <Marker />
                  <blockquote className='text-balance'>
                    &ldquo;{q}&rdquo;
                  </blockquote>
                </RuledRow>
              ))}
            </ul>
            <div className='col-span-4 col-start-9 flex flex-col gap-grid-half pt-grid-1'>
              <span className='type-fine'>What we build</span>
              <p className='type-lead'>{g.build}</p>
              <div className='pt-grid-half'>
                <ArrowLink href={g.link.href as Route}>
                  {g.link.label}
                </ArrowLink>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Phones and tablets: an accordion. */}
      <div className='flex flex-col border-b border-border lg:hidden'>
        {groups.map((g, i) => {
          const expanded = open === i
          return (
            <div key={g.name} className='border-t border-border'>
              <h3>
                <button
                  id={`${id}-acc-${i}`}
                  aria-expanded={expanded}
                  aria-controls={`${id}-acc-panel-${i}`}
                  onClick={() => setOpen(expanded ? -1 : i)}
                  className='flex w-full items-center justify-between py-grid-1 text-left type-item-title'
                >
                  {g.name}
                  <span aria-hidden className='font-mono text-accent'>
                    {expanded ? '−' : '+'}
                  </span>
                </button>
              </h3>
              <div
                id={`${id}-acc-panel-${i}`}
                role='region'
                aria-labelledby={`${id}-acc-${i}`}
                hidden={!expanded}
                className='flex flex-col gap-grid-1 pb-grid-1'
              >
                <ul className='flex flex-col'>
                  {g.quotes.map(q => (
                    <RuledRow
                      key={q}
                      className='flex gap-grid-half py-grid-half type-lead'
                    >
                      <Marker />
                      <blockquote className='text-balance'>
                        &ldquo;{q}&rdquo;
                      </blockquote>
                    </RuledRow>
                  ))}
                </ul>
                <div className='flex flex-col gap-grid-half'>
                  <span className='type-fine'>What we build</span>
                  <p className='text-base text-text'>{g.build}</p>
                  <ArrowLink href={g.link.href as Route}>
                    {g.link.label}
                  </ArrowLink>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
