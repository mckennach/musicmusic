'use client'

import React, { createContext, useContext } from 'react'

import { useAtom } from 'jotai'

import { searchQueryAtom } from '@/lib/atoms'

export type SearchContextProps = {}

export const SearchContext = createContext<SearchContextProps | null>(null)

export function SearchProvider({
  children,
  query
}: {
  children: React.ReactNode
  query: string
}) {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)

  // useEffect(() => {}, [searchQuery]);

  return (
    <SearchContext.Provider value={null}>{children}</SearchContext.Provider>
  )
}

export const useSearchContext = () => useContext(SearchContext)
