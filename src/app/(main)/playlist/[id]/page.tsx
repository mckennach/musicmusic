// import {
//   PlaylistControls,
//   PlaylistHero,
//   PlaylistTrackList
// } from '@/components/templates/playlist'
// import { getPlaylistById } from '@/services/server'
import { AuthSession } from '@/types/database.ds'
import Playlist from '@/components/templates/playlist'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth-options'
import { Playlist as PlaylistProps } from '@spotify/web-api-ts-sdk'
const fetchPlaylist = async (session: AuthSession,  id: string) => {
  if(session) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT!}/api/spotify/playlist/${id}`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: session.user?.access_token
      }),
      method: 'POST'
    })
    return response.json();
  }
  return null;
}


export default async function Playlists({
  params
}: {
  params: { id: string }
}) {
  const session: AuthSession | null = await getServerSession(authOptions)

  const playlist: PlaylistProps | null = await fetchPlaylist(session as AuthSession, params.id);
  // const playlist = await getPlaylistById(params.id)

  return <Playlist id={params?.id} playlist={playlist} />
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
