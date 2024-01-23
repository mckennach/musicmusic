export default async function Artist({ params }: { params: { id: string } }) {
  return (
    <div>
      <header
        role='presentation'
        className='mt-[-64px] relative page-header content-spacing bg-red-200'
      >
        <h1 className='text-4xl font-bold'>Artist</h1>
        <p className='text-base'>Artist page</p>
        <p className='text-subdued'>{params?.id}</p>
      </header>
    </div>
  )
}
