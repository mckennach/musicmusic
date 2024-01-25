import { AuthSession } from '@/types/database.ds'
import { MaxInt } from '@spotify/web-api-ts-sdk'

export async function getArtist(id: string, session: AuthSession | null) {
  if (session) {
    ;('use server')
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

export async function getArtistTopTracks(
  id: string,
  session: AuthSession | null
) {
  if (session) {
    ;('use server')
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

export async function getArtistsDiscography(
  id: string,
  session: AuthSession | null,
  includeGroups?: string,
  limit?: MaxInt<50>,
  offset?: number,
  market?: string
) {
  if (session) {
    ;('use server')
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
