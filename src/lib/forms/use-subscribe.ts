'use client'

import { useState, type FormEvent } from 'react'
import { usePathname } from 'next/navigation'
import { usePostHog } from 'posthog-js/react'
import {
  collectSubmissionContext,
  createSubmissionId,
  readSubmissionAnalytics,
} from '@/src/lib/forms/context'
import {
  SUBSCRIBE_FAILED_MESSAGE,
  type SubscribePlacement,
  type SubscribeResponse,
} from '@/src/lib/forms/subscribe-payload'

export type SubscribeStatus =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'success' }
  | { status: 'error'; message: string }

/**
 * Shared by the blog and footer subscribe forms: posts the address with the
 * same attribution envelope the contact form sends, and tracks the result.
 * The form needs an input named `email`.
 */
export function useSubscribe(placement: SubscribePlacement) {
  const path = usePathname()
  const posthog = usePostHog()
  const [state, setState] = useState<SubscribeStatus>({ status: 'idle' })
  // Minted on first submit and kept, so a retry upserts the same portal row.
  const [submissionId, setSubmissionId] = useState<string | null>(null)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const email = String(new FormData(event.currentTarget).get('email') ?? '')

    const id = submissionId ?? createSubmissionId()
    if (!submissionId) setSubmissionId(id)
    const { attribution, client } = collectSubmissionContext()

    setState({ status: 'pending' })
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          placement,
          path,
          context: {
            submissionId: id,
            analytics: readSubmissionAnalytics(),
            attribution,
            client,
          },
        }),
      })
      const result = (await response.json()) as SubscribeResponse
      if (result.ok) {
        posthog?.capture('subscribe_form_submitted', { placement })
        setState({ status: 'success' })
      } else {
        posthog?.capture('subscribe_form_failed', { placement })
        setState({ status: 'error', message: result.message })
      }
    } catch {
      posthog?.capture('subscribe_form_failed', {
        placement,
        reason: 'request_failed',
      })
      setState({ status: 'error', message: SUBSCRIBE_FAILED_MESSAGE })
    }
  }

  return { state, onSubmit, isPending: state.status === 'pending' }
}
