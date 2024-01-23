import { JWT } from 'next-auth/jwt'
import SpotifyProvider from 'next-auth/providers/spotify'

import { LOGIN_URL } from '@/lib/spotify'

if (!process.env.NEXT_PUBLIC_CLIENT_ID) {
  throw new Error('Missing NEXT_PUBLIC_CLIENT_ID')
}

if (!process.env.NEXT_PUBLIC_CLIENT_SECRET) {
  throw new Error('Missing NEXT_PUBLIC_CLIENT_SECRET!')
}

const spotifyProfile = SpotifyProvider({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET!
})

// export const authURL = new URL("https://accounts.spotify.com/authorize");

// authURL.searchParams.append("scope", scopes.join(" "));

spotifyProfile.authorization = LOGIN_URL

export default spotifyProfile

export async function refreshAccessToken(token: JWT) {
  try {
    // spotify.getAccessToken();
    // spotify.authenticate();

    const response = await fetch(LOGIN_URL, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.NEXT_PUBLIC_CLIENT_SECRET}`
        ).toString('base64')}`
      },
      method: 'POST'
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      access_token: refreshedTokens.access_token,
      token_type: refreshedTokens.token_type,
      expires_at: refreshedTokens.expires_at,
      expires_in: (refreshedTokens.expires_at ?? 0) - Date.now() / 1000,
      refresh_token: refreshedTokens.refresh_token ?? token.refresh_token,
      scope: refreshedTokens.scope,
      id: refreshedTokens.id
    }
  } catch (error) {
    console.error('ERROR', error)
    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}
