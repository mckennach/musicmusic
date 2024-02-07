import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { ImageLoaderProps } from 'next/image'

/*
  ====================
  THIS PROJECT USES
  ====================
*/

import { MyItemsKeys } from '@/types/database.ds'

export const myItemKeys: MyItemsKeys[] = [
  'albums',
  'episodes',
  'tracks',
  'playlists',
  'shows',
  'following',
  'recently-played',
  'audiobooks'
]

export const randomColors = [
  'rgb(0, 100, 80)',
  'rgb(30, 50, 100)',
  'rgb(48, 96, 200)',
  'rgb(39, 133, 106)',
  'rgb(152, 112, 104)',
  'rgb(224, 112, 120)',
  'rgb(192, 112, 0)',
  'rgb(120, 160, 208)',
  'rgb(136, 32, 32)',
  'rgb(120, 16, 24)',
  'rgb(0, 56, 64)',
  'rgb(132, 0, 231)',
  'rgb(80, 55, 80)',
  'rgb(232, 17, 91)',
  'rgb(20, 138, 8)',
  'rgb(225, 17, 140)'
]

/* ====================
  DEV UTILS
======================  */

export const toKebabCase = (string: string) =>
  string
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .trim()

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function queryCheck(str1 = '', str2 = '') {
  const track = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null))
  for (let i = 0; i <= str1.length; i += 1) {
    track[0][i] = i
  }
  for (let j = 0; j <= str2.length; j += 1) {
    track[j][0] = j
  }
  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator // substitution
      )
    }
  }
  return track[str2.length][str1.length]
}

function unique(arr: []) {
  const result = arr.filter((element, index) => arr.indexOf(element) === index)

  return result
}

/* ====================
  URLS
======================  */

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function slugify(str: string) {
  return String(str)
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-') // remove consecutive hyphens
}

/* ====================
  IMAGE
======================  */

export const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const imageUrl = new URL(src)
  return imageUrl.search
    ? `${src}&w=${width}&q=${quality || 75}`
    : `${src}?w=${width}&q=${quality || 75}`
}

/* ====================
  TIME
======================  */

export const millisToMinutesAndSeconds = (
  millis: number,
  withText?: boolean
) => {
  const minutes: any = Math.floor(millis / 60000)
  const seconds: any = ((millis % 60000) / 1000).toFixed(0)
  // const result = seconds == 60 ?minutes + 1 + ":00"
  if (withText) {
    return minutes + ' min ' + (seconds < 10 ? '0' : '') + seconds + ' sec'
  }
  return seconds == 60
    ? minutes + 1 + ':00'
    : minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}

export const getTimeLeft = (progress: number, duration: number) => {
  let difference_ms = duration - progress
  let milliseconds = difference_ms % 1000 // milliseconds that are less than one second
  difference_ms = (difference_ms - milliseconds) / 1000 // convert to seconds

  let seconds = difference_ms % 60 // seconds that are less than one minute
  difference_ms = (difference_ms - seconds) / 60 // convert to minutes

  let minutes = difference_ms % 60 // minutes that are less than one hour
  difference_ms = (difference_ms - minutes) / 60 // convert to hours

  let hours = difference_ms % 24

  if (hours > 0) {
    return `${hours} hr ${minutes} min left`
  }

  if (minutes > 0) {
    return `${minutes} min ${seconds} sec left`
  }

  if (seconds > 0) {
    return `${seconds} sec left`
  }

  return 'Played'
}

/* ====================
  DATES
======================  */

export function formatDate(input?: string | number): string {
  const date = !input ? new Date() : new Date(input)
  const isToday = new Date().toDateString() == date.toDateString()
  const yesterday = isYesterday(date)

  if (isToday) return 'Today'
  if (yesterday) return 'Yesterday'

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export function formatTime(input?: string | number, showAmPm = true): string {
  const date = !input ? new Date() : new Date(input)
  const timeString = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric'
  })

  if (showAmPm) return timeString

  return timeString.replace(/(am|pm)/i, '').trim()
}

function isYesterday(date: Date) {
  if (!(date instanceof Date)) {
    throw new Error('Invalid argument: you must provide a "date" instance')
  }

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  )
}

/* ====================
  NUMBERS
======================  */

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat('en-IN', {
    maximumSignificantDigits: 4
  }).format(number)
}
