/**
 * Client-side identity and persistence for an audit attempt.
 *
 * The audit used to be entirely ephemeral: a refresh wiped every answer and
 * nobody who abandoned mid-wizard left a trace. This module gives each attempt a
 * stable `sessionId` and mirrors progress into localStorage, so (a) a refresh
 * resumes where the visitor left off and (b) every progress push to the portal
 * updates the same row instead of creating duplicates.
 *
 * Every storage call is defensive. Safari private mode throws on `setItem`, and
 * a storage failure must never break the audit itself.
 */
import {
  collectSubmissionContext,
  createSubmissionId,
  type SubmissionContext,
} from '@/src/lib/forms/context'
import type { AuditAnswers } from './types'

export const AUDIT_SESSION_KEY = 'pts_audit_session_v1'

/** Stored sessions older than this are discarded rather than resumed. */
export const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000

/**
 * How far the attempt got. Also the resume gate, in two parts: `in_progress`
 * reopens the wizard (`isResumable`), `completed` rebuilds the results
 * (`isResultRecoverable`). A `captured` attempt is finished and starts fresh.
 * The portal only ever advances a row along this order, never backwards.
 */
export type AuditStatus = 'in_progress' | 'completed' | 'captured' | 'abandoned'

export interface AuditSession {
  sessionId: string
  status: AuditStatus
  answers: AuditAnswers
  /** Furthest wizard step reached, 0-based. Doubles as the resume point. */
  stepIndex: number
  startedAt: string
  updatedAt: string
  /** Captured once when the session is created, then frozen for its lifetime. */
  context: SubmissionContext
}

function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

/** Mint a fresh session anchored to right now. */
export function createAuditSession(): AuditSession {
  const now = new Date().toISOString()
  return {
    sessionId: createSubmissionId(),
    status: 'in_progress',
    answers: {},
    stepIndex: 0,
    startedAt: now,
    updatedAt: now,
    context: collectSubmissionContext(),
  }
}

function isUsableSession(value: unknown): value is AuditSession {
  if (!value || typeof value !== 'object') return false
  const session = value as Partial<AuditSession>
  return (
    typeof session.sessionId === 'string' &&
    typeof session.startedAt === 'string' &&
    typeof session.updatedAt === 'string' &&
    typeof session.answers === 'object' &&
    session.answers !== null &&
    typeof session.context === 'object' &&
    session.context !== null
  )
}

/** The stored session, or null when absent, unreadable, or past the TTL. */
function readStoredSession(): AuditSession | null {
  if (!isBrowser()) return null

  try {
    const raw = window.localStorage.getItem(AUDIT_SESSION_KEY)
    if (!raw) return null

    const parsed: unknown = JSON.parse(raw)
    if (!isUsableSession(parsed)) return null

    const age = Date.now() - new Date(parsed.updatedAt).getTime()
    if (!Number.isFinite(age) || age > SESSION_TTL_MS) {
      removeStoredSession()
      return null
    }

    return {
      ...parsed,
      status: parsed.status ?? 'in_progress',
      stepIndex:
        typeof parsed.stepIndex === 'number' && parsed.stepIndex >= 0
          ? parsed.stepIndex
          : 0,
    }
  } catch {
    return null
  }
}

function writeStoredSession(session: AuditSession): void {
  if (!isBrowser()) return

  try {
    window.localStorage.setItem(AUDIT_SESSION_KEY, JSON.stringify(session))
  } catch {
    // Private mode, quota exceeded, or storage disabled. The in-memory copy
    // below still drives the UI, so the audit works. It just will not resume.
  }
}

function removeStoredSession(): void {
  if (!isBrowser()) return

  try {
    window.localStorage.removeItem(AUDIT_SESSION_KEY)
  } catch {
    // Nothing useful to do here.
  }
}

/*
 * The session is exposed as an external store so React can read it with
 * `useSyncExternalStore`. That is what lets a client-only value participate in
 * a server-rendered tree: the server snapshot is always null, so the first
 * client render matches the server HTML, and React re-renders with the restored
 * session immediately after hydration.
 *
 * `memorySession` is the authority, mirrored out to localStorage. Keeping it in
 * memory means a browser that refuses storage still gets a working audit.
 */
let memorySession: AuditSession | null | undefined
const listeners = new Set<() => void>()

export function subscribeToAuditSession(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** Referentially stable between writes, as `useSyncExternalStore` requires. */
export function getAuditSessionSnapshot(): AuditSession | null {
  if (memorySession === undefined) {
    memorySession = readStoredSession()
  }
  return memorySession
}

export function getAuditSessionServerSnapshot(): AuditSession | null {
  return null
}

/** Replace the session, mirror it to storage, and notify subscribers. */
export function setAuditSession(session: AuditSession | null): void {
  memorySession = session

  if (session) {
    writeStoredSession(session)
  } else {
    removeStoredSession()
  }

  listeners.forEach(listener => listener())
}

/** Whether a stored session is worth dropping someone back into. */
export function isResumable(session: AuditSession | null): boolean {
  return (
    session !== null &&
    session.status === 'in_progress' &&
    Object.keys(session.answers).length > 0
  )
}

/**
 * Whether a stored session carries enough to rebuild the result the visitor
 * already earned. `runAudit` is pure over `answers`, so a scored result is
 * always re-derivable and never needs storing: persisting it would freeze the
 * phase and service copy into localStorage for the session's whole lifetime.
 *
 * This is what makes a crash at the wizard-to-results swap survivable. Without
 * it, a `completed` session fails `isResumable` and the visitor lands back on
 * the intro with their answers stranded.
 *
 * `completed` only, never `captured`: that visitor already has the result in
 * their inbox, and reopening them onto a blank capture form invites a duplicate
 * submission and a second pair of emails.
 */
export function isResultRecoverable(session: AuditSession | null): boolean {
  return (
    session !== null &&
    session.status === 'completed' &&
    Object.keys(session.answers).length > 0
  )
}
