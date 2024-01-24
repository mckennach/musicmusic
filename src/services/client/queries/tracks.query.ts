import type {
  Artist,
  AudioAnalysis,
  AudioFeatures,
  FollowedArtists,
  Market,
  MaxInt,
  Page,
  SavedTrack,
  Track,
  User,
  UserProfile
} from '@spotify/web-api-ts-sdk'

import spotify from '@/lib/spotify-sdk'
import { formatNumber } from '@/lib/utils'

import { UserTopItemParams } from '@/types/auth.ds'
import type {
  ErrorMessage,
  ItemType,
  LibraryItem,
  LibraryProps,
  Limit,
  Offset,
  TimeRange
} from '@/types/database.ds'

export async function getTrack(id: string, market?: Market): Promise<Track> {
  try {
    return await spotify.tracks.get(id, market)
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error)
  }
}

export async function getSeveralTracks(
  ids: string[],
  market?: Market
): Promise<Track[]> {
  try {
    return await spotify.tracks.get(ids, market)
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error)
  }
}

export async function getUsersSavedTracks(
  limit?: Limit,
  offset?: Offset,
  market?: Market
): Promise<Page<SavedTrack>> {
  try {
    return await spotify.currentUser.tracks.savedTracks(limit, offset, market)
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error)
  }
}

export async function checkUsersSavedTracks(ids: string[]): Promise<boolean[]> {
  try {
    return await spotify.currentUser.tracks.hasSavedTracks(ids)
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error)
  }
}

export async function checkSeveralTracksAudioFeatures(
  ids: string[]
): Promise<AudioFeatures[]> {
  try {
    return await spotify.tracks.audioFeatures(ids)
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error)
  }
}

export async function checkTracksAudioFeatures(
  id: string
): Promise<AudioFeatures> {
  try {
    return await spotify.tracks.audioFeatures(id)
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error)
  }
}

export async function getSeveralTracksAudioAnalysis(
  id: string
): Promise<AudioAnalysis> {
  try {
    return await spotify.tracks.audioAnalysis(id)
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error)
  }
}
