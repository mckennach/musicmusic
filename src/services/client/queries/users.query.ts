import type {
  Artist,
  FollowedArtists,
  Page,
  Track,
  User,
  UserProfile
} from '@spotify/web-api-ts-sdk'

import spotify from '@/lib/spotify-sdk'

import type {
  ErrorMessage,
  ItemType,
  Limit,
  Offset,
  TimeRange
} from '@/types/database.ds'

export async function getCurrentUsersProfile(): Promise<UserProfile> {
  try {
    return await spotify.currentUser.profile()
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error)
  }
}

export async function getUsersProfile(user_id: string): Promise<User> {
  try {
    return await spotify.users.profile(user_id)
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error)
  }
}

export async function getUsersTopItems(
  type: ItemType,
  time_range: TimeRange,
  limit: Limit,
  offset: Offset
): Promise<Page<Artist | Track>> {
  try {
    const topItems = await spotify.currentUser.topItems(
      type,
      time_range,
      limit,
      offset
    )
    return topItems
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error)
  }
}

export async function getFollowedArtists(
  after?: string,
  limit?: Limit
): Promise<FollowedArtists> {
  try {
    const followedArtists = await spotify.currentUser.followedArtists(
      after,
      limit
    )
    return followedArtists
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error)
  }
}

export async function checkIfFollowsArtistsOrUsers(
  ids: string[],
  type: 'artist' | 'user'
): Promise<boolean[]> {
  try {
    const follows = await spotify.currentUser.followsArtistsOrUsers(ids, type)
    return follows
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error)
  }
}

export async function checkIfFollowsPlaylists(
  playlistId: string,
  ids: string[]
): Promise<boolean[]> {
  try {
    const follows = await spotify.currentUser.playlists.isFollowing(
      playlistId,
      ids
    )
    return follows
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error)
  }
}
