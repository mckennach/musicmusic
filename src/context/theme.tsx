'use client'

import { randomColors } from '@/lib/utils'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
// import { createContext } from 'react';
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const path = usePathname()
  useEffect(() => {
    const randomColor =
      randomColors[Math.floor(Math.random() * randomColors.length)]
    document.documentElement.style.setProperty(
      '--random-color',
      `${randomColor}`
    )
  }, [path])
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
