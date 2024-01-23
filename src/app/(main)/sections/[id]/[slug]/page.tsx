export default async function Playlists({
  params
}: {
  params: { slug: string; id: string }
}) {
  const { id, slug } = params
  return (
    <>
      {slug}: {id}
    </>
  )
}
