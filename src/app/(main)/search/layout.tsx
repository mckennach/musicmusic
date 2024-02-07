import type { Metadata } from 'next'
import React from 'react'

import { SearchProvider } from '@/context/search'

export const metadata: Metadata = {
  title: 'Chrap - Search',
  description:
    'Search for your favorite artists, songs, albums, podcasts, and more.'
}

export default async function SearchLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { query: string }
}) {
  return <SearchProvider query={params.query}>{children}</SearchProvider>
}
