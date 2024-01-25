'use server'

import { RecommendationsRequest } from '@spotify/web-api-ts-sdk'

import type { AuthSession } from '@/types/database.ds'

export async function getRecommendations(
  session: AuthSession,
  params: RecommendationsRequest
) {
  if (session) {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL!}/api/spotify/recommendations`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: session.user?.access_token,
          params: params
        }),
        method: 'POST',
        next: {
          revalidate: 3600
        }
      }
    )
    return response.json()
  }
  return null
}
