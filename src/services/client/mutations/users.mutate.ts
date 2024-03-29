import spotify from '@/lib/spotify-sdk'

import { ErrorMessage } from '@/types/database.ds'

export async function followOrUnfollowPlaylist(
  playlist_id: string,
  type: 'follow' | 'unfollow'
): Promise<void> {
  try {
    if (type === 'unfollow')
      return await spotify.currentUser.playlists.unfollow(playlist_id)
    return await spotify.currentUser.playlists.follow(playlist_id)
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error)
  }
}

export async function followOrUnfollowArtistsOrUsers(
  ids: string[],
  type: 'artist' | 'user',
  followOrUnfollow: 'follow' | 'unfollow'
) {
  try {
    if (followOrUnfollow === 'unfollow')
      return await spotify.currentUser.followArtistsOrUsers(ids, type)
    return await spotify.currentUser.unfollowArtistsOrUsers(ids, type)
  } catch (error: unknown) {
    throw new Error((error as ErrorMessage).error)
  }
}
