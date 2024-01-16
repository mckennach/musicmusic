import { AlbumProps, TrackProps } from '.'

export interface Artist {
  external_urls: {
    spotify: string
  }
  followers: {
    href: string
    total: number
  }
  genres: string[]
  href: string
  id: string
  images: {
    height: number
    url: string
    width: number
  }[]
  name: string
  popularity: number
  type: string
  uri: string
}

export interface ArtistProps {
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  name: string
  type: string
  uri: string
  items: Artist[]
}

export interface ArtistsProps {
  artists: Artist[]
}

export interface FollowedProps {
  artists: FollowedArtistsProps
}

export interface FollowedArtistsProps {
  href: string
  items: Artist[]
  limit: number
  next: string
  offset: number
  previous: string
  total: number
}

export interface ArtistAlbumsProps {
  href: string
  items: AlbumProps[]
  limit: number
  next: string
  offset: number
  previous: string
  total: number
}

export interface ArtistTopTracksProps {
  tracks: TrackProps[]
}

export interface ArtistRelatedArtistsProps {
  artists: ArtistProps[]
}
