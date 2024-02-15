import {
  LibraryNav,
  SidebarNav,
  SidebarSignIn
} from '@/components/molecules/main-sidebar'
import { Sidebar, SidebarLibrary } from '@/components/templates'

import { AuthSession } from '@/types/database.ds'

export function MainSidebar({
  defaultLayout,
  session
}: {
  defaultLayout: number[]
  session: AuthSession | null
}) {
  return (
    <Sidebar
      side='left'
      order={1}
      collapsible={session ? true : false}
      collapsedSize={6}
      minSize={20}
      maxSize={30}
      defaultSize={session ? defaultLayout[0] : 20}
      id='Sidebar-Left'
    >
      <SidebarNav />
      <SidebarLibrary>
        {session ? <LibraryNav /> : <SidebarSignIn />}
      </SidebarLibrary>
    </Sidebar>
  )
}
