'use server'

import { AuthSession } from '@/types/database.ds'
import { Categories } from '@spotify/web-api-ts-sdk'

export async function fetchBrowseCategories(
  session: AuthSession
): Promise<Categories | null> {
  if (session) {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL!}/api/spotify/browse`,
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
