/**
 * Branded HTML email templates for the Opportunity Audit flow.
 *
 * Clean, light, well-formatted layout: the Place To Stand wordmark up top, plain
 * typographic content, and the lime accent used sparingly (the header rule and
 * the CTA button only). Table layout + inline styles for email-client
 * compatibility. Every send keeps a plain-text fallback (see send-audit.ts), so
 * this is purely the `html` payload.
 */
import type { AuditAnswers, AuditResult } from '@/src/lib/audit/types'
import { summarizeAnswers } from '@/src/lib/audit/summarize-answers'

const SITE_URL = 'https://placetostandagency.com'

const C = {
  page: '#ffffff',
  heading: '#0e0f11',
  text: '#2a2b30',
  muted: '#6b6b70',
  hair: '#e6e6e3',
  accent: '#b5f542',
}

const FONT_HEAD = "'Space Grotesk','Helvetica Neue',Arial,sans-serif"
const FONT_BODY = "'Source Sans 3','Helvetica Neue',Arial,sans-serif"
const FONT_MONO = "'SFMono-Regular',Consolas,Menlo,monospace"

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function divider(): string {
  return `<div style="height:1px;background-color:${C.hair};margin:28px 0;font-size:0;line-height:0;">&nbsp;</div>`
}

function label(text: string): string {
  return `<p style="margin:0 0 10px 0;font-family:${FONT_MONO};font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:${C.muted};">${escapeHtml(text)}</p>`
}

/** Shared shell: wordmark + accent rule header, plain content, simple footer. */
function renderShell(opts: {
  preheader: string
  headerLabel: string
  title: string
  body: string
}): string {
  const { preheader, headerLabel, title, body } = opts
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background-color:${C.page};">
<span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;mso-hide:all;">${escapeHtml(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${C.page};padding:40px 16px;border-collapse:collapse;">
  <tr>
    <td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:560px;max-width:560px;border-collapse:collapse;">
        <tr>
          <td style="padding:0 0 4px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr>
                <td style="font-family:${FONT_HEAD};font-size:17px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:${C.heading};">Place To Stand</td>
                <td align="right" style="font-family:${FONT_MONO};font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${C.muted};">${escapeHtml(headerLabel)}</td>
              </tr>
            </table>
            <div style="height:2px;background-color:${C.accent};margin-top:14px;font-size:0;line-height:0;">&nbsp;</div>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 0 0 0;">
            <h1 style="margin:0 0 22px 0;font-family:${FONT_HEAD};font-size:26px;line-height:1.15;font-weight:700;text-transform:uppercase;color:${C.heading};">${escapeHtml(title)}</h1>
            ${body}
          </td>
        </tr>
        <tr>
          <td style="padding:36px 0 0 0;">
            <div style="height:1px;background-color:${C.hair};font-size:0;line-height:0;">&nbsp;</div>
            <p style="margin:18px 0 6px 0;font-family:${FONT_BODY};font-size:12px;line-height:1.5;color:${C.muted};">Place To Stand. Custom software for mid-market businesses without in-house engineers.</p>
            <a href="${SITE_URL}" style="font-family:${FONT_MONO};font-size:12px;letter-spacing:0.05em;color:${C.muted};text-decoration:underline;">placetostandagency.com</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`
}

/** Phase name, tagline, and summary. */
function renderPhaseBlock(result: AuditResult): string {
  return `${label('Business phase')}
<p style="margin:0 0 6px 0;font-family:${FONT_HEAD};font-size:22px;font-weight:700;text-transform:uppercase;color:${C.heading};">${escapeHtml(result.phase.name)}</p>
<p style="margin:0 0 16px 0;font-family:${FONT_BODY};font-size:14px;color:${C.muted};">${escapeHtml(result.phase.tagline)}</p>
<p style="margin:0;font-family:${FONT_BODY};font-size:15px;line-height:1.6;color:${C.text};">${escapeHtml(result.summary)}</p>`
}

/** Numbered recommendation list, hairline-separated. `includeReasons` adds signals. */
function renderRecommendations(
  result: AuditResult,
  includeReasons: boolean
): string {
  if (result.recommendations.length === 0) return ''

  const items = result.recommendations
    .map((rec, index) => {
      const isLast = index === result.recommendations.length - 1
      const reasons =
        includeReasons && rec.reasons.length > 0
          ? `<p style="margin:8px 0 0 0;font-family:${FONT_MONO};font-size:11px;line-height:1.5;color:${C.muted};">Signals: ${escapeHtml(rec.reasons.join(', '))}</p>`
          : ''
      const border = isLast ? '' : `border-bottom:1px solid ${C.hair};`
      return `<tr>
        <td style="padding:16px 0;${border}">
          <p style="margin:0;font-family:${FONT_HEAD};font-size:15px;font-weight:600;text-transform:uppercase;letter-spacing:0.02em;color:${C.heading};">${index + 1}. ${escapeHtml(rec.service.name)}</p>
          <p style="margin:5px 0 0 0;font-family:${FONT_BODY};font-size:13px;line-height:1.5;color:${C.muted};">${escapeHtml(rec.service.tagline)}</p>
          ${reasons}
        </td>
      </tr>`
    })
    .join('')

  return `${label('Where to start')}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${items}</table>`
}

/** Full question/answer dump for the internal email, grouped by section. */
function renderResponses(answers: AuditAnswers): string {
  const groups = summarizeAnswers(answers)
  if (groups.length === 0) return ''

  const sections = groups
    .map(group => {
      const rows = group.items
        .map(
          item => `<tr>
            <td style="padding:10px 0 0 0;font-family:${FONT_BODY};font-size:13px;line-height:1.5;color:${C.muted};">${escapeHtml(item.prompt)}</td>
          </tr>
          <tr>
            <td style="padding:2px 0 0 0;font-family:${FONT_BODY};font-size:14px;line-height:1.5;font-weight:600;color:${C.heading};">${escapeHtml(item.answer)}</td>
          </tr>`
        )
        .join('')
      return `<p style="margin:20px 0 0 0;font-family:${FONT_MONO};font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${C.muted};">${escapeHtml(group.section)}</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rows}</table>`
    })
    .join('')

  return `${label('All responses')}${sections}`
}

/** Client-facing results email: clean, with a contact CTA. */
export function renderAuditClientEmail(opts: {
  greetingName: string
  result: AuditResult
}): string {
  const { greetingName, result } = opts
  const body = `<p style="margin:0 0 24px 0;font-family:${FONT_BODY};font-size:15px;line-height:1.6;color:${C.text};">Hi ${escapeHtml(greetingName)}, thanks for taking the Opportunity Audit. Here is what your answers pointed to.</p>
${renderPhaseBlock(result)}
${divider()}
${renderRecommendations(result, false)}
${divider()}
<p style="margin:0;font-family:${FONT_BODY};font-size:15px;line-height:1.6;color:${C.text};">Ready to start? Just <span style="font-weight:700;color:${C.heading};">reply to this email</span> and we will take it from there.</p>`

  return renderShell({
    preheader: `Your audit points to the ${result.phase.name} phase.`,
    headerLabel: 'Opportunity Audit',
    title: 'Your Opportunity Audit',
    body,
  })
}

/** Internal team notification: same clean shell, lead details, includes signals. */
export function renderAuditTeamEmail(opts: {
  name: string
  email: string
  company: string | null
  message: string | null
  result: AuditResult
  answers: AuditAnswers
}): string {
  const { name, email, company, message, result, answers } = opts
  const detailRow = (k: string, v: string) =>
    `<tr>
      <td style="padding:3px 0;font-family:${FONT_MONO};font-size:12px;letter-spacing:0.05em;text-transform:uppercase;color:${C.muted};width:90px;vertical-align:top;">${escapeHtml(k)}</td>
      <td style="padding:3px 0;font-family:${FONT_BODY};font-size:14px;color:${C.text};">${v}</td>
    </tr>`

  const details = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
    ${detailRow('Name', escapeHtml(name))}
    ${detailRow('Email', `<a href="mailto:${escapeHtml(email)}" style="color:${C.heading};text-decoration:underline;">${escapeHtml(email)}</a>`)}
    ${company ? detailRow('Company', escapeHtml(company)) : ''}
    ${message ? detailRow('Context', escapeHtml(message).replace(/\r?\n/g, '<br>')) : ''}
  </table>`

  const body = `${details}
${divider()}
${renderPhaseBlock(result)}
${divider()}
${renderRecommendations(result, true)}
${divider()}
${renderResponses(answers)}`

  return renderShell({
    preheader: `${name} is in the ${result.phase.name} phase.`,
    headerLabel: 'New Lead',
    title: `New Opportunity Audit from ${name}`,
    body,
  })
}
