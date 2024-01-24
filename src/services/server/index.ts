'use server'

// import spotify from '@/lib/spotify-sdk'
import { Playlist } from '@spotify/web-api-ts-sdk'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth/auth-options'

import { AuthSession } from '@/types/database.ds'

const apiUrl = process.env.SPOTIFY_ENDPOINT!

export const getPlaylistById = async (id: string): Promise<Playlist | null> => {
  const session: AuthSession | null = await getServerSession(authOptions)
  if (!session) return null
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

export const getSession = async () => {
  'use server'
  const session: AuthSession | null = await getServerSession(authOptions)
  return session
}
