'use client'

import { Sidebar } from '@/components/templates'
import {
  activeDeviceAtom,
  nowPlayingViewAtom,
  sideBarRightActiveAtom
} from '@/lib/atoms'
import { AuthSession } from '@/types/database.ds'
import { useAtom } from 'jotai'
// import { SidebarHeading } from '@/components/molecules/now-playing-view/heading'
import { useEffect } from 'react'
import { NowPlayingSideBarView } from '../now-playing-view'

export function SecondarySidebar({
  defaultLayout,
  session
}: {
  defaultLayout: number[]
  session: AuthSession | null
}) {
  const [sideBarRightActive, setSideBarRightActive] = useAtom(
    sideBarRightActiveAtom
  )
  const [nowPlayingView, setNowPlayingView] = useAtom(nowPlayingViewAtom)
  const [activeDevice] = useAtom(activeDeviceAtom)
  useEffect(() => {
    if (session) {
      setSideBarRightActive(nowPlayingView)
    }
  }, [
    sideBarRightActive,
    nowPlayingView,
    session,
    setSideBarRightActive,
    setNowPlayingView
  ])

  if (!session || !sideBarRightActive || !activeDevice) return null
  return (
    <Sidebar
      side='right'
      order={3}
      collapsible={false}
      minSize={20}
      maxSize={30}
      defaultSize={30}
      id='Sidebar-Right'
    >
      {nowPlayingView && (
        // <></>
        <NowPlayingSideBarView />
      )}
    </Sidebar>
  )
}
