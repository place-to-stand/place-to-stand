import { Chip } from '@/src/components/boxes'

/** "Instead of HubSpot · Salesforce" or "Built for Hot Ones · …" as a row of tags. */
export function TagRow({ label, tags }: { label: string; tags: string[] }) {
  return (
    <div className='flex flex-wrap items-center gap-x-grid-half gap-y-2'>
      <span className='type-fine'>{label}</span>
      {tags.map(tag => (
        <Chip key={tag}>{tag}</Chip>
      ))}
    </div>
  )
}
