'use client'

import { Artist } from '@spotify/web-api-ts-sdk'

import React, { createContext, useContext, useEffect } from 'react'

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
  }, [artist, setBannerImage])

  return (
    <ArtistContext.Provider value={null}>{children}</ArtistContext.Provider>
  )
}

export const useArtistContext = () => useContext(ArtistContext)
