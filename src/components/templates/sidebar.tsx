'use client'

import { ImperativePanelHandle } from 'react-resizable-panels'
import { useElementSize } from 'usehooks-ts'

import { useEffect, useRef, useState } from 'react'

import { useAtom } from 'jotai'

// import { Panel } from 'react-resizable-panels'
import { sideBarLeftCollapsedAtom } from '@/lib/atoms'
// import { sideBarLeftCollapsedAtom } from '@/lib/atoms'
import { cn } from '@/lib/utils'

import { ResizableHandle, ResizablePanel } from '@/components/ui/resizable'

import { PanelProps } from '@/types/database.ds'

interface SidebarProps extends PanelProps {
  side: 'left' | 'right'
  minSize: number
}

interface Panel extends ImperativePanelHandle {}
interface Panel extends HTMLDivElement {}

const Sidebar = ({
  children,
  className,
  side,
  minSize,
  ...props
}: SidebarProps) => {
  const [sideBarLeftCollapsed, setSidebarLeftCollaposed] = useAtom(
    sideBarLeftCollapsedAtom
  )
  const [isResizing, setIsResizing] = useState(false)
  const [squareRef, { width, height }] = useElementSize()
  const panelRef = useRef<ImperativePanelHandle>(null)

  useEffect(() => {
    if (isResizing) {
      setTimeout(() => {
        setIsResizing(false)
      }, 100)
    }
    document.documentElement.style.setProperty(
      '--left-sidebar-width',
      `${width}px`
    )
  }, [isResizing, width])

  useEffect(() => {
    if (sideBarLeftCollapsed) {
      panelRef.current?.collapse()
    } else {
      panelRef.current?.expand()
    }
  }, [sideBarLeftCollapsed, panelRef])

  return (
    <>
      <ResizablePanel
        {...props}
        ref={panelRef}
        minSize={minSize}
        onCollapse={() => setSidebarLeftCollaposed(true)}
        onExpand={() => setSidebarLeftCollaposed(false)}
        onResize={() => setIsResizing(true)}
        className={cn(
          // sideBarLeftCollapsed && side === 'left'
          //   ? `min-w-[65px] max-w-[65px]`
          //   : `min-w-[200px] max-w-[375px]`,
          `overflow-hidden`,
          className
        )}
      >
        <aside
          ref={squareRef}
          className={cn(
            `flex h-full flex-col items-center justify-between gap-2 overflow-hidden`
          )}
        >
          {children}
        </aside>
      </ResizablePanel>
      <ResizableHandle className='hover:bg-gray-500/80 mx-1 bg-transparent' />
    </>
  )
}

Sidebar.displayName = 'Sidebar'

export { Sidebar }
