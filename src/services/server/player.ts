'use server'

import { AuthSession } from '@/types/database.ds'

export async function play(
  session: AuthSession,
  device_id: string,
  context_uri?: string,
  offset?: number,
  position_ms?: number
) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL!}/api/spotify/player/play/${device_id}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: session.user?.access_token,
        context_uri,
        offset: {
          position: offset
        },
        position_ms
      })
    }
  )

  const data = await response.json()

  return data
}

export async function pause(
  session: AuthSession,
  device_id: string,
  context_uri?: string,
  offset?: number,
  position_ms?: number
) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL!}/api/spotify/player/pause/${device_id}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: session.user?.access_token,
        context_uri,
        offset: {
          position: offset
        },
        position_ms
      })
    }
  )

  const data = await response.json()

  return data
}

export async function fetchPlaybackState(session: AuthSession) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL!}/api/spotify/player/playback`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: session.user?.access_token
      })
    }
  )

  const data = await response.json()

  return data
}

export async function seekToPosition(
  session: AuthSession,
  position_ms: number,
  device_id?: string
) {}

export async function transferPlayBack(
  session: AuthSession,
  device_ids: string[],
  play: boolean
) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL!}/api/spotify/player/playback`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: session.user?.access_token,
        device_ids,
        play
      })
    }
  )

  const data = await response.json()
  return data
}
