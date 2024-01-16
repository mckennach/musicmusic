'use client'
import { sideBarLeftCollapsedAtom } from '@/lib/atoms'
import { useAtom } from 'jotai'
import { useEffect, useRef } from 'react'

// Components
import { Header } from '@/components/header'
import { Player } from '@/components/player'
import { Sidebar } from '@/components/sidebar'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'

// Utils
import { SidebarLibrary } from '@/components/sidebar/library/library'
import { SidebarNav } from '@/components/sidebar/navigation/main-nav'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ImperativePanelHandle } from 'react-resizable-panels'

export default function MainView({ children }: { children: React.ReactNode }) {
  const [sideBarLeftCollapsed, setSidebarLeftCollaposed] = useAtom(
    sideBarLeftCollapsedAtom
  )
  const panelRef = useRef<ImperativePanelHandle>(null)
  useEffect(() => {
    // console.log(sideBarLeftCollapsed);
    if (sideBarLeftCollapsed) {
      panelRef.current?.collapse()
    } else {
      panelRef.current?.expand()
    }
  }, [sideBarLeftCollapsed])

  return (
    <>
      <ResizablePanelGroup
        direction='horizontal'
        className='h-[91vh] max-h-[91vh] overflow-hidden  p-2 pb-0'
      >
        <ResizablePanel
          ref={panelRef}
          order={1}
          collapsible={true}
          collapsedSize={6}
          onCollapse={() => {
            setSidebarLeftCollaposed(true)
          }}
          onExpand={() => {
            setSidebarLeftCollaposed(false)
          }}
          minSize={20}
          maxSize={35}
          defaultSize={sideBarLeftCollapsed ? 6 : 30}
          className={cn(
            sideBarLeftCollapsed
              ? `min-w-[65px] max-w-[65px]`
              : `min-w-[200px] max-w-[375px]`,
            `h-[91vh] overflow-hidden`
          )}
        >
          <Sidebar>
            <SidebarNav />
            <SidebarLibrary />
          </Sidebar>
        </ResizablePanel>
        <ResizableHandle className='hover:bg-foreground/50 mx-1 bg-transparent' />
        <ResizablePanel order={2} className='relative h-[91vh]'>
          <Header />
          <main className='h-full max-h-[91vh] overflow-hidden'>
            <Card className='h-full overflow-x-hidden overflow-y-scroll border-none @container'>
              {children}
            </Card>
          </main>
        </ResizablePanel>
        <ResizableHandle className='hover:bg-foreground/50 w-0.5 bg-transparent' />
        <ResizablePanel
          order={3}
          collapsible={true}
          collapsedSize={0}
          minSize={0}
          maxSize={25}
          defaultSize={0}
          className='h-[91vh] max-h-[91vh] overflow-hidden'
        >
          <Sidebar>Sidebar 2</Sidebar>
        </ResizablePanel>
      </ResizablePanelGroup>
      <Player className='h-[9vh] max-h-[9vh] min-h-[9vh] px-2' />
    </>
  )
}
