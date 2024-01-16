import { ImageProps } from '.'
import { ArtistProps } from './artists.types'
export interface IAlbumDisplay {
  images: ImageProps[]
  name: string
}

export interface AlbumProps {
  album_type: string
  artists: ArtistProps[]
  available_markets: string[]
  external_urls?: {
    spotify?: string
  }
  href: string
  images: ImageProps[]
  name: string
  id: string
  release_date: string
  release_date_precision: string
  total_tracks: number
  type: string
  uri: string
}

export interface AlbumItemProps {
  album: AlbumProps
  added_at: string
}

export interface AlbumsProps {
  href: string
  items: AlbumItemProps[]
  limit: number
  next: string
  offset: number
  previous: string
  total: number
}
