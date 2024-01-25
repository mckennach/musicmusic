import SpotifyProvider from 'next-auth/providers/spotify'

import { AuthUser } from './auth-options'

if (!process.env.SPOTIFY_CLIENT_ID) {
  throw new Error('Missing SPOTIFY_CLIENT_ID')
}

if (!process.env.SPOTIFY_CLIENT_SECRET) {
  throw new Error('Missing SPOTIFY_CLIENT_SECRET')
}

const spotifyProfile = SpotifyProvider({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET
})

const authURL = new URL('https://accounts.spotify.com/authorize')

const scopes = [
  'ugc-image-upload',
  // Spotify Connect
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  // Playback
  'app-remote-control',
  'streaming',
  // Playlist
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',

  // Follow

  'user-follow-modify',
  'user-follow-read',

  // Listening History

  'user-read-playback-position',
  'user-top-read',
  'user-read-recently-played',

  // Library

  'user-library-modify',
  'user-library-read',

  // Users

  'user-read-email',
  'user-read-private'
]

authURL.searchParams.append('scope', scopes.join(' '))

export const LOGIN_URL = authURL.toString()

spotifyProfile.authorization = LOGIN_URL

export default spotifyProfile

export async function refreshAccessToken(token: AuthUser) {
  try {
    const response = await fetch(process.env.SPOTIFY_TOKEN_URL!, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: token?.refresh_token,
        client_id: process.env.SPOTIFY_CLIENT_ID!
      }),
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
      scope: refreshedTokens.scope
    }
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}
