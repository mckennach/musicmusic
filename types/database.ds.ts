import {
  Artist,
  Artists,
  Devices,
  Episode,
  FollowedArtists,
  MaxInt,
  Page,
  PlaybackState,
  RecentlyPlayedTracksPage,
  SavedAlbum,
  SavedEpisode,
  SavedShow,
  SavedTrack,
  Shows,
  SimplifiedAlbum,
  SimplifiedAudiobook,
  SimplifiedPlaylist,
  Track,
  User
} from '@spotify/web-api-ts-sdk'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { DefaultSession, DefaultUser } from 'next-auth'
import {
  PanelProps as Panel,
  PanelOnCollapse,
  PanelOnExpand,
  PanelOnResize
} from 'react-resizable-panels'

export interface PanelProps extends Panel {
  children: React.ReactNode
  className?: string | undefined
  collapsedSize?: number | undefined
  collapsible?: boolean | undefined
  defaultSize?: number | undefined
  defaultPosition?: number | undefined
  id?: string | undefined
  maxSize?: number | undefined
  minSize?: number | undefined
  onCollapse?: PanelOnCollapse | undefined
  onExpand?: PanelOnExpand | undefined
  onResize?: PanelOnResize | undefined
  order?: number | undefined
  style?: object | undefined
  tagName?: keyof HTMLElementTagNameMap | undefined
  isCollapsed?: boolean | undefined
}

export interface AuthUser extends DefaultUser {
  name: string
  email: string
  image: string
  access_token: string
  token_type: string
  expires_at: number
  expires_in: number
  refresh_token: string
  scope: string
  id: string
}

export interface AuthSession extends DefaultSession {
  user: AuthUser
  error: string
}

// exp

export type ErrorMessage = {
  error: string
}

export type ErrorType =
  | ''
  | 'unauthorized'
  | 'limit'
  | 'no-device'
  | 'no-playlist'
  | 'no-track'
  | 'no-artist'
  | 'no-album'
  | 'no-search'
  | 'no-results'
  | 'no-lyrics'
  | 'no-lyrics-found'
  | 'no-lyrics-api'
  | 'no-lyrics-api-key'
  | 'no-lyrics-api-key-found'
  | 'no-lyrics-api-key-valid'
  | 'no-lyrics-api-key-valid-found'

export interface InitialData {
  artists: FollowedArtists
  albums: Page<SavedAlbum>
  playlists: Page<SimplifiedPlaylist>
  tracks: Page<SavedTrack>
  episodes: Page<SavedEpisode>
  shows: Page<Shows>
  currentUser: User
  playback: PlaybackState
  devices: Devices
}

export interface LibraryProps {
  artists: FollowedArtists
  albums: Page<SavedAlbum>
  playlists: Page<SimplifiedPlaylist>
  tracks: Page<SavedTrack>
  episodes: Page<SavedEpisode>
}

export type LibraryFilterTypes =
  | '*'
  | 'artists'
  | 'albums'
  | 'tracks'
  | 'playlists'
  | 'episodes'
  | 'shows'

export interface LibraryItem {
  name: string
  id: string
  type: 'artist' | 'album' | 'playlist' | 'tracks' | 'episodes' | 'shows'
  href: string
  imageSrc?: string
  label: string
  icon: keyof typeof dynamicIconImports
  iconFilled?: boolean
  pinned: boolean
}

export type TimeRange = 'short_term' | 'medium_term' | 'long_term'
export type ItemType = 'artists' | 'tracks'
export type Limit = MaxInt<50>
export type Offset = number

export type MySlugs =
  | 'albums'
  | 'following'
  | 'tracks'
  | 'episodes'
  | 'playlists'
  | 'shows'
  | 'player'

export type MyExtraSlugs = 'recently-played' | 'top-artists' | 'top-tracks'

export interface MyItemsMap {
  albums: Page<SavedAlbum>
  'recently-played': RecentlyPlayedTracksPage
  episodes: Page<SavedEpisode>
  tracks: Page<SavedTrack>
  shows: Page<SavedShow>
  playlists: Page<SimplifiedPlaylist>
  following: FollowedArtists
  audiobooks: Page<SimplifiedAudiobook>
  discography: Page<SimplifiedAlbum>
  'related-artists': Artists
  'top-artists': Page<Artist>
}

export type MyItemsKeys =
  | 'following'
  | 'recently-played'
  | 'albums'
  | 'episodes'
  | 'tracks'
  | 'playlists'
  | 'shows'
  | 'audiobooks'
  | 'discography'
  | 'related-artists'
  | 'top-artists'

export type MyItemsPartialResp = {
  [K in keyof MyItemsMap]?: K extends keyof MyItemsMap ? MyItemsMap[K] : never
}

// type Result<T extends readonly Keys[]> = Pick<Map, Keys[T[number]]> & PartialResp
export type MyItemsResult<T extends readonly MyItemsKeys[]> = {
  [K in T[number]]: MyItemsMap[K]
}

export interface TrackListHeaderItems {
  title: string
  value: string
  className?: string
  icon?: React.ReactNode
}

export type TrackKeys =
  | 'playlist'
  | 'album'
  | 'show'
  | 'episode'
  | 'recommendations'
  | 'artist'
  | 'search'
  | 'top-tracks'
  | 'related-artists'
  | 'top-artists'
  | 'saved-tracks'

export interface TrackListProps {
  id: string
  contextUri: string
  tracks: Track[]
  columnCount: number
  type: TrackKeys
  headerItems?: TrackListHeaderItems[]
}

export interface TrackItemProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  track: Track
  index: number
  type: TrackKeys
  contextUri: string
  colCount: number
  isSelected: boolean
  isSaved: boolean
  handleSaveItem: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isSaved: boolean
  ) => void
}


export type NowPlayingItemKeys = 'track' | 'episode';
export interface NowPlayingItemMap {
  track: Track
  episode: Episode
}
export type NowPlayingItem<T> =  T extends Track ? NowPlayingItemMap['track'] : NowPlayingItemMap['episode']