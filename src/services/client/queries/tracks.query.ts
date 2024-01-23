import spotify from '@/lib/spotify-sdk'
import { formatNumber } from '@/lib/utils'
import type { ItemType, Offset, Limit, TimeRange, LibraryItem, LibraryProps, ErrorMessage } from '@/types/database.ds';
import type { AudioFeatures, AudioAnalysis,  Artist, FollowedArtists, MaxInt, Page, Track, User, UserProfile, Market, SavedTrack } from '@spotify/web-api-ts-sdk'
import { UserTopItemParams } from '@/types/auth.ds';

export async function getTrack (id: string, market?: Market): Promise<Track> {
  try {
    return await spotify.tracks.get(id, market);
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error);
  }
}

export async function getSeveralTracks(ids: string[], market?: Market): Promise<Track[]> {
  try {
    return await spotify.tracks.get(ids, market)
    
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error);
  }
}

export async function getUsersSavedTracks(limit?: Limit, offset?: Offset, market?: Market): Promise<Page<SavedTrack>> {
  try {
    return await spotify.currentUser.tracks.savedTracks(limit, offset, market);
    
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error);
  }
}

export async function checkUsersSavedTracks(ids: string[]): Promise<boolean[]> {
  try {
    return await spotify.currentUser.tracks.hasSavedTracks(ids);
   
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error);
  }
} 

export async function checkSeveralTracksAudioFeatures(ids: string[]): Promise<AudioFeatures[]> {
  try {
    return await spotify.tracks.audioFeatures(ids);
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error);
  }
}

export async function checkTracksAudioFeatures(id: string): Promise<AudioFeatures> {
  try {
    return await spotify.tracks.audioFeatures(id);
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error);
  }
}

export async function getSeveralTracksAudioAnalysis(id: string): Promise<AudioAnalysis> {
  try {
    return await spotify.tracks.audioAnalysis(id);
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error);
  }
}


