import { authOptions } from '@/lib/auth/auth-options'
import { fetchArtist } from '@/services/server/queries/artists.queries'
import { AuthSession } from '@/types/database.ds'
import type { Artist } from '@spotify/web-api-ts-sdk'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import React from 'react'

export const metadata: Metadata = {
  title: 'Spotify - Web Player: Music for everyone',
  description:
    'Spotify is a digital music service that gives you access to millions of songs.'
}

export default async function ArtistLayout({
  params,
  children
}: {
  params: { id: string }
  children: React.ReactNode
}) {
  const session: AuthSession | null = await getServerSession(authOptions)
  const artist: Artist | null = session
    ? await fetchArtist(params.id, session)
    : null

  if (!artist) return null
  return <>{children}</>
}
