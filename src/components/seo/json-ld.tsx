import { jsonLdString } from '@/src/lib/structured-data'

/** Renders one JSON-LD block. */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: jsonLdString(data) }}
    />
  )
}
