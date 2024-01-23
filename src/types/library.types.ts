import dynamicIconImports from 'lucide-react/dynamicIconImports'

import { ImageProps } from '.'

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

export interface Library {
  tracks: LibraryItemProps[]
  episodes: LibraryItemProps[]
  playlists: LibraryItemProps[]
  albums: LibraryItemProps[]
  artists: LibraryItemProps[]
}

// export interface LibraryProps {
//   type: string
//   items: LibraryItemProps[]
// }

export interface LibraryItemProps {
  id: string
  name: string
  images: ImageProps[] | null
  description: string
  owner?: {
    display_name: string
    external_urls: {
      spotify: string
    }
    href: string
    id: string
    type: string
    uri: string
  }
  url?: string
  total: number
  type: string
  pinned: boolean
}
