import { Artist, TrackProps } from '.'
import { ImageProps } from './image.types'
import { PlaylistProps } from './playlists.types'

export interface UserProps {
  country: string
  display_name: string
  email: string
  explicit_content: {
    filter_enabled: boolean
    filter_locked: boolean
  }
  external_urls: {
    spotify: string
  }
  followers: {
    href: null
    total: number
  }
  href: string
  id: string
  images: ImageProps[]
}

export interface CurrentUserPlaylists {
  href: string
  items: PlaylistProps[]
  limit: number
  next: string
  offset: number
  previous: null
  total: number
}

export interface UserTopArtistsProps {
  href: string
  items: Artist[]
  limit: number
  next: string
  offset: number
  previous: null
  total: number
}

export interface UserTopTracksProps {
  href: string
  items: TrackProps[]
  limit: number
  next: string
  offset: number
  previous: null
  total: number
}

export interface RecentlyPlayedItemsProps {
  track: TrackProps
  played_at: string
  context: {
    external_urls: {
      spotify: string
    }
    href: string
    type: string
    uri: string
  }
}

export interface RecentlyPlayedProps {
  href: string
  items: RecentlyPlayedItemsProps[]
  limit: number
  next: string
  offset: number
  previous: null
  total: number
}
