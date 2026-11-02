/**
 * Mailing-list signups from the blog and footer forms, forwarded to the
 * portal, which records them (kind `subscribe`) and adds the address to the
 * marketing audience.
 *
 * A route rather than a server action because the footer form is on every
 * page: an action POSTs to whichever page invoked it, and BotID only protects
 * the paths listed in `instrumentation-client.ts`. One fixed URL keeps the
 * check in force wherever the form is rendered.
 */
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { checkBotId } from 'botid/server'
import {
  PORTAL_PATHS,
  resolvePortalTarget,
  submitToPortal,
} from '@/src/lib/forms/portal'
import {
  buildSubscribeSubmissionPayload,
  SUBSCRIBE_FAILED_MESSAGE,
  subscribeSourceDetail,
  type SubscribeResponse,
} from '@/src/lib/forms/subscribe-payload'
import { subscribeRequestSchema } from '@/src/lib/validations/subscribe'

function fail(message: string, status: number) {
  return NextResponse.json<SubscribeResponse>(
    { ok: false, message },
    { status }
  )
}

export async function POST(request: Request) {
  let json: unknown
  try {
    json = await request.json()
  } catch {
    return fail('Please check your email.', 400)
  }

  const parsed = subscribeRequestSchema.safeParse(json)
  if (!parsed.success) {
    const emailIssue = parsed.error.issues.find(
      issue => issue.path[0] === 'email'
    )
    return fail(emailIssue?.message ?? 'Please check your email.', 400)
  }

  try {
    const verification = await checkBotId({
      advancedOptions: { checkLevel: 'basic' },
    })
    if (verification.isBot) {
      console.warn('BotID blocked a subscribe attempt')
      return fail(
        "We couldn't verify your request. Please refresh and try again.",
        403
      )
    }
  } catch (error) {
    console.error('BotID verification failed', error)
    return fail(
      'Unable to verify your request right now. Please try again later.',
      503
    )
  }

  const { email, placement, path, context } = parsed.data
  const userAgent = (await headers()).get('user-agent')?.slice(0, 1024) ?? null

  const payload = buildSubscribeSubmissionPayload({
    context,
    email,
    sourceDetail: subscribeSourceDetail(path, placement),
    userAgent,
  })

  const target = resolvePortalTarget(
    PORTAL_PATHS.subscribeSubmissions,
    // The portal takes signups on the contact token: both come from this
    // site's server, so a separate secret would add setup, not isolation.
    process.env.CONTACT_INTAKE_TOKEN
  )

  if (!target) {
    // Dev affordance, as for the contact form: with no portal configured, log
    // and report success. In production nothing else would record the
    // signup, so the visitor is told.
    if (process.env.NODE_ENV !== 'production') {
      console.info(
        'PORTAL_API_BASE_URL/CONTACT_INTAKE_TOKEN not set; subscribe not forwarded',
        JSON.stringify(payload, null, 2)
      )
      return NextResponse.json<SubscribeResponse>({ ok: true })
    }

    console.error('Subscribe form is not configured to reach the portal')
    return fail(SUBSCRIBE_FAILED_MESSAGE, 503)
  }

  const result = await submitToPortal(target, payload, {
    submissionId: payload.submissionId,
  })

  if (!result.ok) return fail(SUBSCRIBE_FAILED_MESSAGE, 502)

  return NextResponse.json<SubscribeResponse>({ ok: true })
}
