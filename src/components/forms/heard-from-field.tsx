'use client'

import type { UseFormRegisterReturn } from 'react-hook-form'
import { ChevronDown } from 'lucide-react'

import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { HEARD_FROM_CHOICES } from '@/src/lib/forms/heard-from'

interface HeardFromFieldProps {
  id: string
  select: UseFormRegisterReturn
  other: UseFormRegisterReturn
  /** True when "Other" is chosen, to show the free-text box. */
  showOther: boolean
}

/** Optional "How did you hear about us?" select, shared by both lead forms. */
export function HeardFromField({
  id,
  select,
  other,
  showOther,
}: HeardFromFieldProps) {
  return (
    <div className='flex flex-col gap-2'>
      <Label htmlFor={id}>How did you hear about us? (optional)</Label>
      <div className='relative'>
        <select
          id={id}
          {...select}
          className='flex h-12 w-full appearance-none border border-border bg-bg-card pr-10 pl-3 text-base text-text transition focus-visible:ring-1 focus-visible:ring-accent/40 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50'
        >
          <option value=''>Choose one</option>
          {HEARD_FROM_CHOICES.map(choice => (
            <option key={choice} value={choice}>
              {choice}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden='true'
          className='pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-text-muted'
        />
      </div>
      {showOther ? (
        <Input
          id={`${id}-other`}
          aria-label='Where did you hear about us?'
          placeholder='Where?'
          {...other}
        />
      ) : null}
    </div>
  )
}
