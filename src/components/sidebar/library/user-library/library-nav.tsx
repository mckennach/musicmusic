import { Button } from '@/components/ui/button'
import {
  activeLibFilterAtom,
  libraryItemsAtom,
  sessionAtom,
  sideBarLeftCollapsedAtom,
  sidebarSortByAtom
} from '@/lib/atoms'
import { cn } from '@/lib/utils'
import { useAtom, useAtomValue } from 'jotai'
import { signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { LibraryItem as LibraryNavItem } from './library-item'
import { LibrarySkeleton } from './library-skeleton'

import { LibraryItem } from '@/types'

export function LibraryNav({}) {
  const [session] = useAtom(sessionAtom)
  const [sortBy] = useAtom(sidebarSortByAtom)
  const [activeLibFilter] = useAtom(activeLibFilterAtom)
  const libraryItems = useAtomValue(libraryItemsAtom)
  const [library, setLibrary] = useState([] as LibraryItem[])
  const [sideBarLeftCollapsed] = useAtom(sideBarLeftCollapsedAtom)

  useEffect(() => {
    if (!libraryItems) return
    if (activeLibFilter === 'playlists') {
      setLibrary(libraryItems.filter((item) => item.type === 'playlist'))
    } else if (activeLibFilter === 'artists') {
      setLibrary(libraryItems.filter((item) => item.type === 'artist'))
    } else if (activeLibFilter === 'albums') {
      setLibrary(libraryItems.filter((item) => item.type === 'album'))
    } else if (activeLibFilter === 'tracks') {
      setLibrary(libraryItems.filter((item) => item.type === 'tracks'))
    } else {
      setLibrary(
        libraryItems
          .sort((a, b) => {
            const aPinned = a.pinned ? -1 : 1
            const bPinned = b.pinned ? -1 : 1
            return aPinned - bPinned
          })
          .sort((a, b) => {
            const tracks = a.type === 'tracks' ? -1 : 1
            const tracks2 = b.type === 'tracks' ? -1 : 1
            return tracks - tracks2
          })
      )
    }
  }, [libraryItems, activeLibFilter, sortBy])

  if (!session)
    return (
      <div className='flex flex-col items-center justify-start mt-16 w-full h-full'>
        <Button onClick={() => signIn()} className='rounded-full'>
          Sign in to view your library
        </Button>
      </div>
    )

  return (
    <nav
      role='navigation'
      className={cn(
        `h-full overflow-x-hidden overflow-y-scroll`,
        sideBarLeftCollapsed && `justify-center p-1.5`
      )}
    >
      <div className='flex flex-col justify-start overflow-hidden pb-1 text-left'>
        {library && library.length > 0
          ? library.map((item) => {
              return <LibraryNavItem key={item.id} {...item} />
            })
          : Array(12)
              .fill(0)
              .map((_, i) => <LibrarySkeleton key={i} />)}
      </div>
    </nav>
  )
}