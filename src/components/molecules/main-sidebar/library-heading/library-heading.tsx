import { useAtom } from 'jotai'

import { sessionAtom, sideBarLeftCollapsedAtom } from '@/lib/atoms'
import { cn } from '@/lib/utils'

// import Link from 'next/link'
import { LibraryActions } from './library-actions'
import { LibraryFilter } from './library-filter'
import { LibrarySearch } from './library-search'
import { LibrarySort } from './library-sort'

export function LibraryHeading() {
  const [session] = useAtom(sessionAtom)
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
