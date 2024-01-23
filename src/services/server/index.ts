'use server'

// import spotify from '@/lib/spotify-sdk'
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options'
import { AuthSession } from '@/types'
import { Playlist } from '@spotify/web-api-ts-sdk'
import { getServerSession } from 'next-auth'

const apiUrl = process.env.NEXT_PUBLIC_SPOTIFY_API_URL!

export const getPlaylistById = async (id: string): Promise<Playlist | null> => {
  const session: AuthSession | null = await getServerSession(authOptions)
  if (!session) return null
  console.log(session.user?.access_token)
  const response = await fetch(`${apiUrl}/playlists/${id}`, {
    headers: {
      Authorization: `Bearer ${session.user?.access_token}`
    }
  })
  const data = await response.json()
  return data
  // spotify.playlists.getPlaylist(id)
  // const playlist = await spotify.makeRequest<Playlist>
}
