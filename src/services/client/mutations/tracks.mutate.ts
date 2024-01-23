import spotify from '@/lib/spotify-sdk'
import { formatNumber } from '@/lib/utils'
import type { ItemType, Offset, Limit, TimeRange, LibraryItem, LibraryProps } from '@/types/database.ds';
import type { Artist, MaxInt } from '@spotify/web-api-ts-sdk'
import { UserTopItemParams } from '@/types/auth.ds';
import { ErrorMessage } from '@/types/database.ds';


export async function saveTracks(ids: string[]): Promise<void> {
  try {
    await spotify.currentUser.tracks.saveTracks(ids);
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error);
  }
}

export async function removeTracks(ids: string[]): Promise<void> {
  try {
    await spotify.currentUser.tracks.removeSavedTracks(ids);
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error);
  }
}