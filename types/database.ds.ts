import {
  Artist,
  Devices,
  Page,
  PlaybackState,
  SavedAlbum,
  SavedEpisode,
  SavedTrack,
  Shows,
  SimplifiedPlaylist,
  User
} from '@spotify/web-api-ts-sdk'
import dynamicIconImports from 'lucide-react/dynamicIconImports'

import { DefaultSession, DefaultUser } from 'next-auth';

import {
  PanelProps as Panel,
  PanelOnCollapse,
  PanelOnExpand,
  PanelOnResize
} from 'react-resizable-panels'
import { MaxInt } from '@spotify/web-api-ts-sdk'

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
  artists: Page<Artist>
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
  artists: Page<Artist>
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


