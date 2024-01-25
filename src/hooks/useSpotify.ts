// import spotifyApi from '@/lib/spotify'
import { Artist } from '@spotify/web-api-ts-sdk'

import spotify from '@/lib/spotify-sdk'
import { formatNumber } from '@/lib/utils'

import { toast } from 'sonner'

import { LibraryItem, LibraryProps } from '@/types/database.ds'

export function useSpotify() {
  return {
    checkIfItemIsSaved: async (
      id: string,
      type: 'tracks' | 'episodes' | 'albums' | 'artists' | 'playlists'
    ) => {
      if (type === 'tracks') {
        const isSaved = await spotify.currentUser.tracks.hasSavedTracks([id])
        return isSaved[0]
      }

      if (type === 'episodes') {
        const isSaved = await spotify.currentUser.episodes.hasSavedEpisodes([
          id
        ])
        return isSaved[0]
      }

      if (type === 'albums') {
        const isSaved = await spotify.currentUser.albums.hasSavedAlbums([id])
        return isSaved[0]
      }

      if (type === 'playlists') {
        const isSaved = await spotify.currentUser.playlists.isFollowing(id, [
          id
        ])
        return isSaved[0]
      }

      if (type === 'artists') {
        const isSaved =
          (await spotify.currentUser.followedArtists()).artists.items.filter(
            (artist: Artist) => artist.id === id
          ).length > 0
        return isSaved
      }

      spotify.currentUser.followedArtists

      return false
    },
    createLibraryItems: (library: LibraryProps) => {
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
      return libraryItems?.sort((a, b) =>
        a.id.localeCompare(b.id)
      ) as LibraryItem[]
    },
    getActiveDevice: async () => {
      const devices = await spotify.player?.getAvailableDevices()
      if (!devices) return null
      const activeDevice = devices.devices.find((device) => device.is_active)
      return activeDevice ? activeDevice : devices.devices[0]
    },
    getPlaybackState: async () => {
      const state = await spotify.player?.getPlaybackState()
      return state
    },
    fetchLibrary: async () => {
      const playlists = await spotify.currentUser.playlists.playlists()
      const artists = await spotify.currentUser.followedArtists()
      const episodes = await spotify.currentUser.episodes.savedEpisodes()
      const albums = await spotify.currentUser.albums.savedAlbums()
      const tracks = await spotify.currentUser.tracks.savedTracks()
      return {
        playlists,
        artists,
        episodes,
        albums,
        tracks
      } as LibraryProps
    },
    startResumePlayback: async (
      deviceId: string,
      contextUri?: string,
      uris?: string[],
      offset?: number | string,
      position?: number
    ) => {
      spotify.player
        ?.startResumePlayback(
          deviceId,
          contextUri,
          uris,
          {
            position: offset
          },
          position
        )
        .then(() => {
          console.log('Playback started!!')
        })
        .catch((e) => {
          toast.error(
            'Error playing track, make sure Spotify Device is open and try again.',
            {
              action: {
                label: 'Open Spotify',
                onClick: () => {
                  window.open('https://open.spotify.com/', '_blank')
                }
              }
            }
          )
        })
    },
    saveItem: async (
      id: string,
      type: 'tracks' | 'episodes' | 'albums' | 'artist' | 'playlists' | 'user'
    ) => {
      if (type === 'tracks') {
        spotify.currentUser.tracks
          .saveTracks([id])
          .then(() => {
            toast.success('Song saved to your library!')
          })
          .catch((e) => {
            toast.error('Error saving song to your library. Try again.')
          })
      }

      if (type === 'episodes') {
        spotify.currentUser.episodes
          .saveEpisodes([id])
          .then(() => {
            toast.success('Episode saved to your library!')
          })
          .catch((e) => {
            toast.error('Error saving episode to your library. Try again.')
          })
      }

      if (type === 'albums') {
        spotify.currentUser.albums
          .saveAlbums([id])
          .then(() => {
            toast.success('Album saved to your library!')
          })
          .catch((e) => {
            toast.error('Error saving album to your library. Try again.')
          })
      }

      if (type === 'playlists') {
        spotify.currentUser.playlists
          .follow(id)
          .then(() => {
            toast.success('Playlist saved to your library!')
          })
          .catch((e) => {
            toast.error('Error saving playlist to your library. Try again.')
          })
      }

      if (type === 'artist' || type === 'user') {
        spotify.currentUser
          .followArtistsOrUsers([id], type)
          .then(() => {
            toast.success('Artist saved to your library!')
          })
          .catch((e) => {
            toast.error('Error saving artist to your library. Try again.')
          })
      }
    },
    unsaveItem: async (
      id: string,
      type: 'tracks' | 'episodes' | 'albums' | 'artist' | 'playlists' | 'user'
    ) => {
      if (type === 'tracks') {
        return await spotify.currentUser.tracks.removeSavedTracks([id])
      }

      if (type === 'episodes') {
        return await spotify.currentUser.episodes.removeSavedEpisodes([id])
      }

      if (type === 'albums') {
        return await spotify.currentUser.albums.removeSavedAlbums([id])
      }

      if (type === 'playlists') {
        return await spotify.currentUser.playlists.unfollow(id)
      }

      if (type === 'artist' || type === 'user') {
        return await spotify.currentUser.unfollowArtistsOrUsers([id], type)
      }
    }
  }
}
