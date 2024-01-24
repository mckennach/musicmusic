import { SpotifyApi } from '@spotify/web-api-ts-sdk'
import SpotifyWebApi from 'spotify-web-api-node'

const scopes = [
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

const scopesStr = scopes.join(',')

const params = {
  scope: scopesStr
}

const queryParamString = new URLSearchParams(params)
export const authURL = new URL('https://accounts.spotify.com/authorize')

authURL.searchParams.append('scope', scopes.join(' '))
const LOGIN_URL = `https://accounts.spotify.com:443/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID_BACKUP}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&${queryParamString}`

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID_BACKUP!,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET_BACKUP!
})

const sdk = SpotifyApi.withClientCredentials(
  process.env.SPOTIFY_CLIENT_ID_BACKUP!,
  process.env.SPOTIFY_CLIENT_SECRET_BACKUP!,
  scopes
)

export default spotifyApi

export { LOGIN_URL, sdk }
