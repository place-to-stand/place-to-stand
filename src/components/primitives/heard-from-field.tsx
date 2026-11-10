'use client'

import type { UseFormRegisterReturn } from 'react-hook-form'
import { Select } from '@/src/components/primitives/select'

import { Input } from '@/src/components/primitives/input'
import { Label } from '@/src/components/primitives/label'
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
      <Select id={id} {...select}>
        <option value=''>Choose one</option>
        {HEARD_FROM_CHOICES.map(choice => (
          <option key={choice} value={choice}>
            {choice}
          </option>
        ))}
      </Select>
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
