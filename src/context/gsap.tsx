'use client'

import React, { createContext, useContext, useRef } from 'react'

export type GsapContextProps = React.RefObject<HTMLDivElement>

export const GsapContext = createContext<GsapContextProps | null>(null)

export function GsapProvider({ children }: { children: React.ReactNode }) {
  const gsapRef = useRef<HTMLDivElement>(null)
  return <GsapContext.Provider value={gsapRef}>{children}</GsapContext.Provider>
}

export const useGsapContext = () => useContext(GsapContext)
