// Components
// import { Sidebar } from '@/components/sidebar'
// Utils
import { Session } from 'next-auth'

import {
  LibraryNav,
  SidebarNav,
  SidebarSignIn
} from '@/components/molecules/main-sidebar'
import { Sidebar, SidebarLibrary } from '@/components/templates'

export function MainSidebar({
  defaultLayout,
  session
}: {
  defaultLayout: number[]
  session: Session | null
}) {
  return (
    <Sidebar
      side='left'
      order={1}
      collapsible={true}
      collapsedSize={6}
      minSize={20}
      maxSize={35}
      defaultSize={defaultLayout[0]}
      id='Sidebar-Left'
    >
      <SidebarNav />
      <SidebarLibrary>
        {session ? <LibraryNav /> : <SidebarSignIn />}
      </SidebarLibrary>
    </Sidebar>
  )
}
