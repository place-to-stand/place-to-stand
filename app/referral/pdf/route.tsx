import { renderToBuffer } from '@react-pdf/renderer'
import { ReferralDocument } from '@/src/components/pdf/referral-document'

// The filename carries the request date, so this must never be cached.
export const dynamic = 'force-dynamic'

/** Today's date in America/Chicago as YYYY-MM-DD (en-CA formats ISO order). */
function chicagoDate(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
}

export async function GET() {
  const date = chicagoDate()
  const buffer = await renderToBuffer(<ReferralDocument date={date} />)

  return new Response(new Uint8Array(buffer), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="pts-referral-program-${date}.pdf"`,
      'Cache-Control': 'no-store',
    },
  })
}
