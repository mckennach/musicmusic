import {
  Artist,
  Page,
  SavedAlbum,
  SavedEpisode,
  SavedTrack,
  SimplifiedPlaylist
} from '@spotify/web-api-ts-sdk'

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

export interface LibraryProps {
  artists: Page<Artist>
  albums: Page<SavedAlbum>
  playlists: Page<SimplifiedPlaylist>
  tracks: Page<SavedTrack>
  episodes: Page<SavedEpisode>
}

export * from './albums.types'
// export * from './artists.types'
export * from './auth.types'
export * from './episodes.types'
export * from './image.types'
export * from './library.types'
export * from './playlists.types'
// export * from './spotify.types'
export * from './tracks.types'
export * from './ui.types'
export * from './user.types'
