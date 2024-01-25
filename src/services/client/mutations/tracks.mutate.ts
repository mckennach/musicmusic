import spotify from '@/lib/spotify-sdk'

import { ErrorMessage } from '@/types/database.ds'

export async function saveTracks(ids: string[]): Promise<void> {
  try {
    await spotify.currentUser.tracks.saveTracks(ids)
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error)
  }
}

export async function removeTracks(ids: string[]): Promise<void> {
  try {
    await spotify.currentUser.tracks.removeSavedTracks(ids)
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error)
  }
}
