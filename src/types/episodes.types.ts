import { ExternalUrlsProps, ImageProps } from '.'

export interface EpisodesProps {
  href: string
  limit: number
  next: string
  offset: number
  previous: string
  items: EpisodeProps[]
  total: number
}

export interface ResumePointProps {
  fully_played: boolean
  resume_position_ms: number
}

export interface EpisodeProps {
  audio_preview_url: string
  description: string
  duration_ms: number
  explicit: boolean
  external_urls: ExternalUrlsProps
  href: string
  id: string
  images: ImageProps[]
  is_externally_hosted: boolean
  is_playable: boolean
  language: string
  languages: string[]
  name: string
  release_date: string
  release_date_precision: string
  resume_point: ResumePointProps
  type: string
  uri: string
}
