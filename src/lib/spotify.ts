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
const LOGIN_URL = `https://accounts.spotify.com:443/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&${queryParamString}`
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET!
})

const sdk = SpotifyApi.withClientCredentials(
  process.env.NEXT_PUBLIC_CLIENT_ID!,
  process.env.NEXT_PUBLIC_CLIENT_SECRET!,
  scopes
)

export default spotifyApi

export { LOGIN_URL, sdk }
