import type { Artist, MaxInt } from '@spotify/web-api-ts-sdk'

import spotify from '@/lib/spotify-sdk'
import { formatNumber } from '@/lib/utils'

import { UserTopItemParams } from '@/types/auth.ds'
import type {
  ItemType,
  LibraryItem,
  LibraryProps,
  Limit,
  Offset,
  TimeRange
} from '@/types/database.ds'
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
