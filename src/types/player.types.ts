import { TrackProps } from '.'

export type RepeatStateTypes = 'off' | 'track' | 'context'
export type ShuffleStateTypes = boolean

export interface DeviceProps {
  id: string
  is_active: boolean
  is_private_session: boolean
  is_restricted: boolean
  name: string
  type: string
  volume_percent: number
  supports_volume: boolean
}

export interface CurrentlyPlayingProps {
  device: DeviceProps
  shuffle_state: boolean
  repeat_state: string
  context: any
  timestamp: number
  progress_ms: number
  item: TrackProps
  currently_playing_type: string
  actions: any
  is_playing: boolean
}

export interface PlaybackProps {
  device: DeviceProps
  shuffle_state: boolean
  repeat_state: string
  context: any
  timestamp: number
  progress_ms: number
  item: TrackProps
  currently_playing_type: string
  actions: any
  is_playing: boolean
}
