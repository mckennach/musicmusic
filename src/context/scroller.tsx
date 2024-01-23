'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import React, {
  createContext,
  HTMLAttributes,
  useEffect,
  useState
} from 'react'
import { useRef } from 'react'

import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [completed, setCompleted] = useState(false)
  const container = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    console.log('PAINTED')
  }, [pathname])

  useGSAP(
    () => {
      console.log(completed)
      gsap
        .timeline({
          scrollTrigger: {
            scroller: '.main-view-container__viewport',
            trigger: '.main-view-container__scroll-spacer-child',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1
            // markers: true
          }
        })
        .set('.header', {
          '--top-bar-opacity': 0
        })
        .to('.header', {
          '--top-bar-opacity': 1
        })
      if (pathname.includes('/playlist')) {
        gsap
          .timeline({
            scrollTrigger: {
              scroller: '.main-view-container__viewport',
              trigger: '.track-list',
              start: 'top +=64',
              end: 'bottom bottom',
              scrub: 0.6
              // markers: true
            }
          })
          .set('.track-list__grid.heading', {
            borderBottomColor: 'hsla(0, 0%, 100%, 0.1)'
          })
          .to('.track-list__grid.heading', {
            borderBottomColor: 'hsla(0, 0%, 100%, 0)'
          })
          .set('.track-list-heading', {
            '--top-bar-opacity': 0
          })
          .to('.track-list-heading', {
            '--top-bar-opacity': 1
          })
      }
    },
    {
      dependencies: [completed],
      revertOnUpdate: true,
      scope: container
    }
  )

  return (
    <div className='' ref={container}>
      {children}
    </div>
  )
}
