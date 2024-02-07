'use server'
import { AuthSession, TimeRange } from '@/types/database.ds'
import { Artist, MaxInt, Page, Track } from '@spotify/web-api-ts-sdk'
// spotifySdk.currentUser.topItems(

// )

export async function fetchUsersTopItems<T extends 'artists' | 'tracks'>(
  session: AuthSession,
  type: T,
  timeRange?: TimeRange,
  limit?: MaxInt<50>,
  offset?: number
): Promise<Page<T extends 'artists' ? Artist : Track> | null> {
  if (session) {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL!}/api/spotify/me/top/${type}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: session.user?.access_token,
          time_range: timeRange,
          limit,
          offset
        }),
        method: 'POST',
        cache: 'no-store'
      }
    )
    return response.json()
  }
  return null
}

export async function fetchUsersTracks(
  session: AuthSession,
  limit = 50 as MaxInt<50>,
  offset = 0
) {
  if (session) {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL!}/api/spotify/me/tracks?limit=${limit}&offset=${offset}`,
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
}
