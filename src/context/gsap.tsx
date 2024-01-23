'use client'

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import React, { createContext, useContext, useRef } from 'react'

export type GsapContextProps = React.RefObject<HTMLDivElement>
gsap.registerPlugin(ScrollTrigger)

export const GsapContext = createContext<GsapContextProps | null>(null)

export function GsapProvider({ children }: { children: React.ReactNode }) {
  const gsapRef = useRef<HTMLDivElement>(null)
  return <GsapContext.Provider value={gsapRef}>{children}</GsapContext.Provider>
}

export const useGsapContext = () => useContext(GsapContext)
