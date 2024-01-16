export default async function Artist({ params }: { params: { id: string } }) {
  return <div className='h-screen w-full '>Album: {params.id}</div>
}
