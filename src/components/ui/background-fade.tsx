'use client'

import React, { useEffect } from 'react'

import { cn } from '@/lib/utils'

// import * from '@videsk/tailwind-random-color';

interface BackgroundFadeProps {
  className?: string
}

const colors = [
  'rgb(0, 100, 80)',
  'rgb(48, 96, 200)',
  'rgb(83, 83, 83)',
  'rgb(152, 112, 104)',
  'rgb(224, 112, 120)',
  'rgb(192, 112, 0)',
  'rgb(120, 160, 208)',
  'rgb(136, 32, 32)',
  'rgb(120, 16, 24)',
  'rgb(0, 56, 64)'
]

const BackgroundFade = React.forwardRef<HTMLDivElement, BackgroundFadeProps>(
  ({ className, ...props }, ref) => {
    // const [hex, setHex] = React.useState('#000000')
    useEffect(() => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      document.documentElement.style.setProperty(
        '--random-color',
        `${randomColor}`
      )
    }, [])
    // useEffect(() => {
    //   const randomColor = Math.floor(Math.random() * 16777215).toString(16)
    //   setHex(`#${randomColor}`)
    //   document.documentElement.style.setProperty(
    //     '--random-color',
    //     `#${randomColor}`
    //   )
    // }, [])

    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          `bg-[var(--random-color,black)]`,
          `background-fade`,
          className
        )}
      />
    )
  }
)

BackgroundFade.displayName = 'BackgroundFade'

export { BackgroundFade }
