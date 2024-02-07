'use server'
import type { AuthSession } from '@/types/database.ds'
import { MaxInt } from '@spotify/web-api-ts-sdk'

export async function fetchSearchResults(
  query: string,
  session: AuthSession | null,
  type: string = 'artist%2Calbum%2Ctrack%2cplaylist%2Cshow%2Cepisode%2Caudiobook',
  limit: MaxInt<50> = 20
) {
  if (session) {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL!}/api/spotify/search/${query}`,
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
}
