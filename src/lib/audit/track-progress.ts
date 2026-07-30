/**
 * One-way transport for audit progress. Never throws, never blocks the UI.
 *
 * Losing a progress push is always preferable to interrupting someone taking the
 * audit, so every failure path here is a silent no-op.
 */
import type { AuditProgressPayload } from '@/src/lib/audit/progress-payload'

export const AUDIT_PROGRESS_ENDPOINT = '/api/audit-progress'

interface SendOptions {
  /**
   * Use `navigator.sendBeacon`, which survives the page unloading. Only correct
   * for `pagehide`, since beacons cannot report failure and are not ordered
   * against normal requests.
   */
  beacon?: boolean
}

export function sendAuditProgress(
  payload: AuditProgressPayload,
  { beacon = false }: SendOptions = {}
): void {
  if (typeof window === 'undefined') return

  let body: string
  try {
    body = JSON.stringify(payload)
  } catch {
    return
  }

  if (beacon && typeof navigator.sendBeacon === 'function') {
    try {
      const blob = new Blob([body], { type: 'application/json' })
      const queued = navigator.sendBeacon(AUDIT_PROGRESS_ENDPOINT, blob)
      if (queued) return
      // Beacon queue full or blocked. Fall through to the fetch below, which
      // still has a chance thanks to `keepalive`.
    } catch {
      // Same fall-through.
    }
  }

  try {
    void fetch(AUDIT_PROGRESS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {
      // Offline, blocked by an extension, or the route is down. Not our problem.
    })
  } catch {
    // Ditto.
  }
}
