import {
  FollowedArtists,
  Page,
  RecentlyPlayedTracksPage,
  SavedAlbum,
  SavedEpisode,
  SavedShow,
  SavedTrack,
  SimplifiedPlaylist
} from '@spotify/web-api-ts-sdk'
// import { Result } from '../../../types/database.ds';
import { authOptions } from '@/lib/auth/auth-options'
import { AuthSession } from '@/types/database.ds'
import { getServerSession } from 'next-auth'
interface Map {
  albums: Page<SavedAlbum>
  'recently-played': RecentlyPlayedTracksPage
  episodes: Page<SavedEpisode>
  tracks: Page<SavedTrack>
  shows: Page<SavedShow>
  playlists: Page<SimplifiedPlaylist>
  following: FollowedArtists
}

export type Keys =
  | 'following'
  | 'recently-played'
  | 'albums'
  | 'episodes'
  | 'tracks'
  | 'playlists'
  | 'shows'

type PartialResp = {
  [K in keyof Map]?: K extends keyof Map ? Map[K] : never
}

// type Result<T extends readonly Keys[]> = Pick<Map, Keys[T[number]]> & PartialResp
type Result<T extends readonly Keys[]> = {
  [K in T[number]]: Map[K]
}

const fetchSomething = async <T extends readonly Keys[]>(
  session: AuthSession | null,
  type: T,
  queries?: string
): Promise<Result<T>> => {
  const result: PartialResp = {}
  const response = await fetch(
    `${process.env.SPOTIFY_ENDPOINT!}/me/${type[0]}${queries ?? ''}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`
      }
    }
  )

  const data = await response.json()
  result[type[0]] = data
  return result as Result<T>
}

export default async function TestPage() {
  const session: AuthSession | null = await getServerSession(authOptions)
  const haha =
    session &&
    (await fetchSomething(session, ['following'], '?type=artist&limit=50'))
  return (
    <div>
      <h1>Test Page</h1>
      <div>
        {JSON.stringify(haha?.following.artists.items[0].name, null, 2)}
      </div>
    </div>
  )
}
