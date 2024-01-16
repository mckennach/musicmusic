import { ImageProps } from './image.types'
import { TrackProps } from './tracks.types'

export interface PlaylistsProps {
  href: string
  items: PlaylistProps[]
  limit: number
  next: string
  offset: number
  previous: string
  total: number
}

export interface PlaylistProps {
  collaborative: boolean
  description: string
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  images: ImageProps[]
  name: string
  followers: {
    href: string
    total: number
  }
  owner: {
    display_name: string
    external_urls: {
      spotify: string
    }
    href: string
    id: string
    type: string
    uri: string
  }
  primary_color: null
  public: null
  snapshot_id: string
  tracks: {
    href: string
    total: number
    items: TrackProps[]
  }
  type: string
  uri: string
}
