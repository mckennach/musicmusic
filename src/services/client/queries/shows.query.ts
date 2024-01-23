import spotify from '@/lib/spotify-sdk'
import { formatNumber } from '@/lib/utils'
import type { ItemType, Offset, Limit, TimeRange, LibraryItem, LibraryProps, ErrorMessage } from '@/types/database.ds';
import type { Artist, FollowedArtists, MaxInt, Market, Page, Show, SimplifiedEpisode, Episode, SavedTrack, SavedAlbum, SavedEpisode, SavedShow, Track, User, UserProfile } from '@spotify/web-api-ts-sdk'
import { UserTopItemParams } from '@/types/auth.ds';

export async function getShow(id: string, market: Market): Promise<Show> {
  try {
    return await spotify.shows.get(id, market)
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error);
  }
}

export async function getShows(ids: string[], market: Market): Promise<Show[]> {
  try {
    return await spotify.shows.get(ids, market)
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error);
  }
}

export async function getShowEpisodes(id: string, market?: Market, limit?: Limit, offset?: Offset): Promise<Page<SimplifiedEpisode>> {
  try {
    return await spotify.shows.episodes(id, market, limit, offset)
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error);
  }
}

export async function getUsersSavedShows(limit?: Limit, offset?: Offset): Promise<Page<SavedShow>> {
  try {
    return await spotify.currentUser.shows.savedShows(limit, offset)
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error);
  }
}
