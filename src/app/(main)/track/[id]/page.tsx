export default async function Track({ params }: { params: { id: string } }) {
  const { id } = params
  return <>Track!: {id}</>
}
