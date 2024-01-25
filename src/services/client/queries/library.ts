// import spotifyApi from '@/lib/spotify'
import { formatNumber } from '@/lib/utils'

import { LibraryItem, LibraryProps } from '@/types/database.ds'

export async function createLibraryItems(
  library: LibraryProps
): Promise<LibraryItem[]> {
  const libraryItems: LibraryItem[] = []
  if (library.artists?.artists.items) {
    library.artists.artists.items.forEach((artist) => {
      libraryItems.push({
        name: artist.name,
        id: artist.id,
        type: 'artist',
        href: `/artist/${artist.id}`,
        imageSrc: artist.images ? artist.images[0].url : undefined,
        label: 'Artist',
        icon: 'music',
        pinned: false
      })
    })
  }

  if (library.albums?.items) {
    library.albums.items.forEach((album) => {
      libraryItems.push({
        name: album?.album.name,
        id: album?.album?.id,
        type: 'album',
        href: `/album/${album?.album?.id}`,
        imageSrc:
          album?.album?.images && album?.album?.images[0]
            ? album?.album.images[0].url
            : undefined,
        label: album.album?.artists
          ? `Album · ${album.album?.artists?.map((artist) => artist?.name).join(', ')}`
          : 'Artist',
        icon: 'music',
        pinned: album?.album?.id === '5jNA5QJJl8BynLKtyrkhGj'
      })
    })
  }

  if (library.playlists?.items) {
    library.playlists?.items.forEach((playlist) => {
      libraryItems.push({
        name: playlist.name,
        id: playlist.id,
        type: 'playlist',
        href: `/playlist/${playlist.id}`,
        imageSrc:
          playlist.images && playlist?.images[0]?.url
            ? playlist.images[0].url
            : undefined,
        label: `Playlist · ${playlist.owner.display_name}`,
        icon: 'music',
        pinned: playlist.id === '6Nl3hMavo46ycpByCdULqO'
      })
    })
  }

  if (library.tracks?.items) {
    libraryItems.push({
      name: 'Liked Songs',
      id: 'tracks',
      type: 'tracks',
      href: `/collection/tracks`,
      imageSrc: undefined,
      label: `Playlist · ${formatNumber(library.tracks.total as number)} songs`,
      pinned: true,
      icon: 'heart',
      iconFilled: true
    })
  }

  if (library.episodes?.items) {
    libraryItems.push({
      name: 'Episodes',
      id: 'episodes',
      type: 'episodes',
      href: `/collection/your-episodes`,
      imageSrc: undefined,
      label: `Saved & downloaded episodes`,
      pinned: true,
      icon: 'bookmark'
    })
  }
  return libraryItems?.sort((a, b) => a.id.localeCompare(b.id)) as LibraryItem[]
}
