import { AlbumProps } from './albums.types'
import { ArtistProps } from './artists.types'

export interface TracksProps {
  href: string
  items: TrackItemsProps[]
  limit: number
  next?: null
  offset: number
  previous?: null
  total?: number
}

export interface ExternalUrlsProps {
  spotify: string
}

export interface AddedByProps {
  external_urls: ExternalUrlsProps
  href: string
  id: string
  type: string
  uri: string
}

export interface TrackItemsProps {
  added_at: string
  track: TrackProps
}

export interface TrackProps {
  added_at: string
  added_by: AddedByProps
  album: AlbumProps
  artists: ArtistProps[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  episode?: boolean
  explicit: boolean
  external_ids: {
    isrc: string
  }
  external_urls: ExternalUrlsProps
  href: string
  id: string
  is_local: boolean
  name: string
  popularity: number
  preview_url?: string
  track_number: number
  type: string
  uri: string
}

export interface SearchTrackProps {
  id: string
  name: string
  popularity: number
  artists: {
    name: string
  }[]
  duration_ms: number
  album: {
    name: string
    images: {
      url: string
      width: number
      height: number
    }[]
  }
}
