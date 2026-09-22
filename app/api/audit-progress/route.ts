/**
 * Receives audit progress from the browser and forwards it to the portal.
 *
 * A route rather than a server action for two reasons: `navigator.sendBeacon`
 * can only target a URL, and the portal token has to stay server-side.
 *
 * Deliberately no `checkBotId` here. Beacon requests carry no BotID challenge
 * token and would fail the check, and the worst an abusive caller achieves is a
 * junk anonymous row: no email is sent, no PII is required, and the portal
 * upserts on `sessionId` so repeats collapse into one record.
 *
 * "No email is sent" is now load-bearing. The portal mails the visitor when a
 * `captured` lead arrives with `deliver: true`, so this route must never be
 * able to forward either. `auditBeaconSchema` refuses `captured`, nulls any
 * lead, and (being a plain Zod object) strips `deliver` as an unknown key. The
 * captured push goes through the BotID-gated `sendAudit` action instead.
 */
import { NextResponse } from 'next/server'
import { auditBeaconSchema } from '@/src/lib/audit/progress-schema'
import {
  PORTAL_PATHS,
  postToPortal,
  resolvePortalTarget,
} from '@/src/lib/forms/portal'

/** Generous next to a real payload (~4KB), tight enough to stop abuse. */
const MAX_BODY_BYTES = 32 * 1024

export async function POST(request: Request): Promise<NextResponse> {
  let raw: string
  try {
    raw = await request.text()
  } catch {
    return new NextResponse(null, { status: 204 })
  }

  if (raw.length > MAX_BODY_BYTES) {
    console.warn('Audit progress payload too large; dropping', {
      bytes: raw.length,
    })
    return new NextResponse(null, { status: 204 })
  }

  let parsedJson: unknown
  try {
    parsedJson = JSON.parse(raw)
  } catch {
    return new NextResponse(null, { status: 204 })
  }

  const parsed = auditBeaconSchema.safeParse(parsedJson)
  if (!parsed.success) {
    console.warn('Invalid audit progress payload', parsed.error.flatten())
    return new NextResponse(null, { status: 204 })
  }

  // Trust the request header over anything the client claims about itself.
  const payload = {
    ...parsed.data,
    client: {
      ...parsed.data.client,
      userAgent: request.headers.get('user-agent')?.slice(0, 1024) ?? null,
    },
  }

  const target = resolvePortalTarget(
    PORTAL_PATHS.auditResponses,
    process.env.AUDIT_INTAKE_TOKEN
  )

  if (!target) {
    // Dev affordance: log rather than silently drop, so the whole flow is
    // verifiable locally with no portal running.
    console.info(
      'PORTAL_API_BASE_URL/AUDIT_INTAKE_TOKEN not set; audit progress not forwarded',
      JSON.stringify(payload, null, 2)
    )
    return new NextResponse(null, { status: 204 })
  }

  await postToPortal(target, payload, {
    sessionId: payload.sessionId,
    auditStatus: payload.status,
    trigger: payload.trigger,
  })

  // The visitor's experience never depends on the portal being reachable.
  return new NextResponse(null, { status: 204 })
}
