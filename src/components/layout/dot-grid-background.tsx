export function DotGridBackground() {
  return (
    <>
      {/* Dot grid pattern */}
      <div
        className='pointer-events-none fixed inset-0 z-0'
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(circle, #2a2b30 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Subtle grid lines every 96px for blueprint feel */}
      <div
        className='pointer-events-none fixed inset-0 z-0 opacity-30'
        aria-hidden
        style={{
          backgroundImage:
            'linear-gradient(to right, #1a1b1f 1px, transparent 1px), linear-gradient(to bottom, #1a1b1f 1px, transparent 1px)',
          backgroundSize: '96px 96px',
        }}
      />
    </>
  )
}
