'use client'

import { Artist } from '@spotify/web-api-ts-sdk'

import { GsapContextProps, useGsapContext } from '@/context'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import React, { createContext, useContext, useEffect, useState } from 'react'

import { useAtom } from 'jotai'

import { bannerImageAtom } from '@/lib/atoms'

export type ArtistContextProps = {
  bannerImage: Artist['images'][0] | null
}

export const ArtistContext = createContext<ArtistContextProps | null>({
  bannerImage: null
})

export function ArtistProvider({
  artist,
  children
}: {
  artist: Artist
  children: React.ReactNode
}) {
  const [bannerImage, setBannerImage] = useAtom(bannerImageAtom)

  useEffect(() => {
    if (artist && artist.images.length > 0) {
      setBannerImage(artist.images.sort((a, b) => b.width - a.width)[0].url)
    }
  }, [artist])

  const gsapRef = useGsapContext()
  const [ref, setRef] = useState<GsapContextProps>()

  useEffect(() => {
    if (gsapRef?.current) {
      setRef(gsapRef)
    }
  }, [gsapRef])

  useGSAP(
    () => {
      if (!bannerImage || !pathname.includes('/artist')) return null
      gsap
        .timeline({
          scrollTrigger: {
            scroller: '.main-view-container__viewport',
            trigger: '.under-header',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 2
            // markers: true
          }
        })
        .set('.hero-banner-image', {
          '--scroll': 0
        })
        .to('.hero-banner-image', {
          '--scroll': 0.06
        })

      gsap
        .timeline({
          scrollTrigger: {
            scroller: '.main-view-container__viewport',
            trigger: '.under-header',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1
            // markers: true
          }
        })
        .set('.main-view-container__under-main-view', {
          '--top-bar-opacity': 0
        })
        .to('.main-view-container__under-main-view', {
          '--top-bar-opacity': 1
        })
    },
    {
      scope: ref,
      dependencies: [ref]
    }
  )

  return (
    <ArtistContext.Provider value={null}>{children}</ArtistContext.Provider>
  )
}

export const useArtistContext = () => useContext(ArtistContext)
