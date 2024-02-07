export function ControlBar({
  id,
  contextUri,
  children
}: {
  id: string
  contextUri?: string
  children?: React.ReactNode
}) {
  return (
    <section className='host relative'>
      <div className='py-6 content-spacing flex flex-col items-start'>
        <div className='flex items-center w-full gap-1'>{children}</div>
      </div>
    </section>
  )
}
