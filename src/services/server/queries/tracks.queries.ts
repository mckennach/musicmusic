'use server'

import { AuthSession } from '@/types/database.ds'
export async function fetchTrack(id: string, session: AuthSession) {
  try {
    if (session) {
      const response = await fetch(
        `${process.env.NEXTAUTH_URL!}/api/spotify/tracks/${id}`,
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

export async function fetchTracks(ids: string[], session: AuthSession) {
  try {
    if (session) {
      const response = await fetch(
        `${process.env.NEXTAUTH_URL!}/api/spotify/tracks`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: session.user?.access_token,
            ids
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
