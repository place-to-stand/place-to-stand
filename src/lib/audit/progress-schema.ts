/**
 * Validation for the audit progress payload, shared by the two server-side
 * paths that forward it to the portal.
 *
 * There are deliberately two schemas, and the difference is a security
 * boundary rather than a convenience:
 *
 * - `auditProgressSchema` is the full contract. Only the `sendAudit` server
 *   action uses it, and that action runs BotID first.
 * - `auditBeaconSchema` is what the unauthenticated `/api/audit-progress`
 *   beacon route accepts. It cannot say `captured` and cannot carry a lead,
 *   because the portal emails the visitor when a captured lead arrives with
 *   `deliver: true`. If the beacon route could forward that, anyone could POST
 *   a stranger's address and have us send them branded mail. Beacons skip
 *   BotID (they carry no challenge token), so the only safe rule is that they
 *   can never produce an email.
 *
 * Shape mirrors `AuditProgressPayload` in `progress-payload.ts`; this file is
 * the enforcement point, so keep the two in step.
 */
import { z } from 'zod'

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

export const auditProgressSchema = z.object({
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
      // Optional so a cached client bundle from before the field still lands.
      phaseTagline: z.string().max(256).optional(),
      summary: z.string().max(5000),
      generatedBy: z.enum(['rules', 'ai']),
      phaseScores: z.record(z.string(), z.number()),
      recommendations: z
        .array(
          z.object({
            serviceId: z.string().max(64),
            serviceName: z.string().max(128),
            tagline: z.string().max(256).optional(),
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

export type ValidatedAuditProgress = z.infer<typeof auditProgressSchema>

export const auditBeaconSchema = auditProgressSchema.extend({
  status: z.enum(['in_progress', 'completed', 'abandoned']),
  trigger: z.enum([
    'started',
    'step_completed',
    'scored',
    'abandoned',
    'pagehide',
  ]),
  // Dropped rather than rejected: a beacon that somehow carries lead details
  // still records its progress, it just never delivers a contact.
  lead: z.unknown().transform(() => null),
})
