export const millisToMinutesAndSeconds = (millis: number) => {
  const minutes: any = Math.floor(millis / 60000)
  const seconds: any = ((millis % 60000) / 1000).toFixed(0)
  // const result = seconds == 60 ?minutes + 1 + ":00"
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
