// import {
//   PlaylistControls,
//   PlaylistHero,
//   PlaylistTrackList
// } from '@/components/templates/playlist'
// import { getPlaylistById } from '@/services/server'

import spotify from '@/lib/spotify-sdk'

import Playlist from '@/components/templates/playlist'
import { BackgroundFade } from '@/components/ui/background-fade'

export default async function Playlists({
  params
}: {
  params: { id: string }
}) {
  // const playlist = await getPlaylistById(params.id)

  return <Playlist id={params?.id}  />
  // return (
  //   <section role='presentation' className='under-header'>
  //     <PlaylistHero id={params.id} />
  //     <section className='relative h-full content-spacing'>
  //       <BackgroundFade className='faade m-0 top-0 isolate' />
  //       <PlaylistControls id={params?.id} />
  //       <PlaylistTrackList id={params.id} />
  //     </section>
  //   </section>
  // )
}
