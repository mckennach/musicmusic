import { useAtom } from 'jotai'

import { sideBarLeftCollapsedAtom } from '@/lib/atoms'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
// import Link from 'next/link'
import { LibraryActions } from './library-actions'
import { LibraryFilter } from './library-filter'
import { LibrarySearch } from './library-search'
import { LibrarySort } from './library-sort'

export function LibraryHeading() {
  const { data: session } = useSession()
  const [sideBarLeftCollapsed, setSidebarLeftCollaposed] = useAtom(
    sideBarLeftCollapsedAtom
  )

  return (
    <header className='flex flex-col gap-2 pt-2'>
      <LibraryActions />
      {!sideBarLeftCollapsed && session && (
        <>
          <div
            className={cn(
              'overflow-hidden px-4',
              sideBarLeftCollapsed && 'px-0'
            )}
          >
            <LibraryFilter />
          </div>

          <div className='flex items-center justify-between overflow-hidden px-4'>
            <LibrarySearch />
            <LibrarySort />
          </div>
        </>
      )}
    </header>
  )
}
