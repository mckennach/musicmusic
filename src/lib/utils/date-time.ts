export function formatDate(input?: string | number): string {
  const date = !input ? new Date() : new Date(input)
  const isToday = new Date().toDateString() == date.toDateString()
  const yesterday = isYesterday(date)

  if (isToday) return 'Today'
  if (yesterday) return 'Yesterday'

  return date.toLocaleDateString('en-US', {
    month: 'long',
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
