export default async function Playlists({
  params
}: {
  params: { id: string }
}) {
  const { id } = params
  return <>Playlist: {id}</>
}
