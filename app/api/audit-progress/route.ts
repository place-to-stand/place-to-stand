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
 */
import { NextResponse } from 'next/server'
import { z } from 'zod'
import {
  PORTAL_PATHS,
  postToPortal,
  resolvePortalTarget,
} from '@/src/lib/forms/portal'

/** Generous next to a real payload (~4KB), tight enough to stop abuse. */
const MAX_BODY_BYTES = 32 * 1024

const isoDate = z.string().datetime()

const responseItemSchema = z.object({
  questionId: z.string().max(128),
  sectionId: z.string().max(128),
  prompt: z.string().max(1024),
  type: z.enum(['single', 'multi', 'text']),
  value: z
    .union([z.string().max(5000), z.array(z.string().max(256)).max(64)])
    .nullable(),
  labels: z.array(z.string().max(5000)).max(64),
})

const payloadSchema = z.object({
  sessionId: z.string().uuid(),
  status: z.enum(['in_progress', 'completed', 'captured', 'abandoned']),
  trigger: z.enum([
    'started',
    'step_completed',
    'scored',
    'captured',
    'abandoned',
    'pagehide',
  ]),
  sourceDetail: z.string().max(255),
  startedAt: isoDate,
  updatedAt: isoDate,
  completedAt: isoDate.nullable(),
  progress: z.object({
    furthestStepIndex: z.number().int().min(0).max(64),
    stepsTotal: z.number().int().min(0).max(64),
    answeredCount: z.number().int().min(0).max(512),
    questionsTotal: z.number().int().min(0).max(512),
    percentComplete: z.number().int().min(0).max(100),
    durationMs: z.number().int().min(0),
  }),
  responses: z.array(responseItemSchema).max(128),
  result: z
    .object({
      phaseId: z.string().max(64),
      phaseName: z.string().max(128),
      summary: z.string().max(5000),
      generatedBy: z.enum(['rules', 'ai']),
      phaseScores: z.record(z.string(), z.number()),
      recommendations: z
        .array(
          z.object({
            serviceId: z.string().max(64),
            serviceName: z.string().max(128),
            score: z.number(),
            reasons: z.array(z.string().max(512)).max(16),
          })
        )
        .max(16),
    })
    .nullable(),
  lead: z
    .object({
      name: z.string().max(160),
      email: z.string().email().max(320),
      company: z.string().max(160).nullable(),
      message: z.string().max(2000).nullable(),
      marketingConsent: z.boolean(),
    })
    .nullable(),
  analytics: z.object({
    posthogDistinctId: z.string().max(256).nullable(),
    posthogSessionId: z.string().max(256).nullable(),
    posthogReplayUrl: z.string().max(2048).nullable(),
  }),
  attribution: z.object({
    utmSource: z.string().max(256).nullable(),
    utmMedium: z.string().max(256).nullable(),
    utmCampaign: z.string().max(256).nullable(),
    utmTerm: z.string().max(256).nullable(),
    utmContent: z.string().max(256).nullable(),
    gclid: z.string().max(512).nullable(),
    referrer: z.string().max(2048).nullable(),
    landingPath: z.string().max(512).nullable(),
  }),
  client: z.object({
    viewport: z.enum(['mobile', 'tablet', 'desktop']).nullable(),
    screenWidth: z.number().int().min(0).max(20000).nullable(),
    timezone: z.string().max(128).nullable(),
    language: z.string().max(64).nullable(),
    userAgent: z.string().max(1024).nullable(),
  }),
})

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

  const parsed = payloadSchema.safeParse(parsedJson)
  if (!parsed.success) {
    console.warn('Invalid audit progress payload', parsed.error.flatten())
    return new NextResponse(null, { status: 204 })
  }

  // Trust the request header over anything the client claims about itself.
  // Shape mirrors `AuditProgressPayload` in src/lib/audit/progress-payload.ts;
  // the schema above is the enforcement point, so keep the two in step.
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
