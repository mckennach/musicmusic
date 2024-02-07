'use server'

import { AuthSession } from '@/types/database.ds'
import { MaxInt } from '@spotify/web-api-ts-sdk'

export async function fetchArtist(id: string, session: AuthSession | null) {
  if (session) {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL!}/api/spotify/artist/${id}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: session.user.access_token
        }),
        method: 'POST',
        cache: 'no-store'
      }
    )
    return response.json()
  }
  return null
}

export async function fetchArtistTopTracks(
  id: string,
  session: AuthSession | null
) {
  if (session) {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL!}/api/spotify/artist/${id}/top-tracks`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: session.user.access_token
        }),
        method: 'POST',
        cache: 'no-store'
      }
    )
    return response.json()
  }
  return null
}

export async function fetchArtistsDiscography(
  id: string,
  session: AuthSession | null,
  includeGroups?: string,
  limit?: MaxInt<50>,
  offset?: number,
  market?: string
) {
  if (session) {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL!}/api/spotify/artist/${id}/albums`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: session.user.access_token,
          limit,
          offset,
          includeGroups,
          market
        }),
        method: 'POST',
        cache: 'no-store'
      }
    )
    return response.json()
  }
  return null
}
