'use client'

import { AuthUser } from '@/types'
import {
  AccessToken,
  IAuthStrategy,
  SdkConfiguration,
  SdkOptions,
  SpotifyApi
} from '@spotify/web-api-ts-sdk'
import { getSession, signIn } from 'next-auth/react'

/**
 * A class that implements the IAuthStrategy interface and wraps the NextAuth functionality.
 * It retrieves the access token and other information from the JWT session handled by NextAuth.
 */
class NextAuthStrategy implements IAuthStrategy {
  public getOrCreateAccessToken(): Promise<AccessToken> {
    return this.getAccessToken()
  }

  public async getAccessToken(): Promise<AccessToken> {
    const session: any = await getSession()
    if (!session) {
      return {} as AccessToken
    }

    if (session?.error === 'RefreshAccessTokenError') {
      await signIn()
      return this.getAccessToken()
    }

    const { user }: { user: AuthUser } = session

    return {
      access_token: user.access_token,
      token_type: 'Bearer',
      expires_in: user.expires_in,
      expires: user.expires_at,
      refresh_token: user.refresh_token
    } as AccessToken
  }

  public removeAccessToken(): void {
    console.warn('[Spotify-SDK][WARN]\nremoveAccessToken not implemented')
  }

  public setConfiguration(configuration: SdkConfiguration): void {
    console.warn('[Spotify-SDK][WARN]\nsetConfiguration not implemented')
  }
}

function withNextAuthStrategy(config?: SdkOptions) {
  const strategy = new NextAuthStrategy()
  return new SpotifyApi(strategy, config)
}

export const scopes = [
  // Images
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

export default withNextAuthStrategy()
