'use server'

import { AuthSession } from '@/types/database.ds'
export async function fetchPlaylist(session: AuthSession, id: string) {
  try {
    if (session) {
      const response = await fetch(
        `${process.env.NEXTAUTH_URL!}/api/spotify/playlist/${id}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: session.user?.access_token
          }),
          method: 'POST',
          cache: 'no-store'
        }
      )
      return response.json()
    }
    return null
  } catch (error) {
    console.log('ERROR')
    return null
  }
}

export async function fetchPlaylistOwner(session: AuthSession, id: string) {
  try {
    if (session) {
      const response = await fetch(
        `${process.env.NEXTAUTH_URL!}/api/spotify/users/${id}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: session.user?.access_token
          }),
          method: 'POST'
        }
      )
      return response.json()
    }
    return null
  } catch (error) {
    console.log(error)
    return null
  }
}
