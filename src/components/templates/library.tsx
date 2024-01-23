'use client'

import { useAtom } from 'jotai'

import { sideBarLeftCollapsedAtom } from '@/lib/atoms'
import { cn } from '@/lib/utils'

import { LibraryHeading } from '@/components/molecules/main-sidebar/library-heading'
import { Card } from '@/components/ui/card'

export function SidebarLibrary({ children }: { children: React.ReactNode }) {
  const [sideBarLeftCollapsed] = useAtom(sideBarLeftCollapsedAtom)

  return (
    <Card
      className={cn(
        `flex h-full w-full flex-col gap-2 overflow-hidden border-none`,
        sideBarLeftCollapsed && 'gap-0'
      )}
    >
      <LibraryHeading />
      <div
        className={cn(
          'h-full overflow-hidden px-2 pb-0',
          sideBarLeftCollapsed && 'px-0'
        )}
      >
        {children}
      </div>
    </Card>
  )
}
