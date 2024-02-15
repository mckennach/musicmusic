'use client'

import { ImperativePanelHandle } from 'react-resizable-panels'
import { useElementSize } from 'usehooks-ts'

import { useEffect, useRef, useState } from 'react'

import { useAtom } from 'jotai'

// import { Panel } from 'react-resizable-panels'
import {
  sideBarLeftCollapsedAtom,
  sideBarRightActiveAtom,
  sideBarRightCollapsedAtom
} from '@/lib/atoms'
// import { sideBarLeftCollapsedAtom } from '@/lib/atoms'
import { cn } from '@/lib/utils'

import { ResizableHandle, ResizablePanel } from '@/components/ui/resizable'

import { PanelProps } from '@/types/database.ds'

interface SidebarProps extends PanelProps {
  side: 'left' | 'right'
  minSize: number
}

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
  const [sideBarActive, setSideBarActive] = useAtom(sideBarRightActiveAtom)

  const [sideBarRightCollapsed, setSidebarRightCollaposed] = useAtom(
    sideBarRightCollapsedAtom
  )
  const [isResizing, setIsResizing] = useState(false)
  const [panelClasses, setPanelClasses] = useState<string[]>([])
  const [containerClasses, setContainerClasses] = useState<string[]>([])
  const [squareRef, { width, height }] = useElementSize()
  const panelRef = useRef<ImperativePanelHandle>(null)

  useEffect(() => {
    if (side === 'left') {
      setPanelClasses([sideBarLeftCollapsed ? 'max-w-[68px]' : ''])
    }
  }, [side, sideBarLeftCollapsed, sideBarRightCollapsed])

  useEffect(() => {
    if (isResizing) {
      setTimeout(() => {
        setIsResizing(false)
      }, 100)
    }
    document.documentElement.style.setProperty(
      `--${side}-sidebar-width`,
      `${width}px`
    )
  }, [isResizing, width, side])

  useEffect(() => {
    if (sideBarLeftCollapsed && side === 'left') {
      panelRef.current?.collapse()
    } else if (!sideBarLeftCollapsed && side === 'left') {
      panelRef.current?.expand()
    } else if (sideBarRightCollapsed && side === 'right') {
      panelRef.current?.collapse()
    } else if (!sideBarRightCollapsed && side === 'right') {
      panelRef.current?.expand()
    }
  }, [side, sideBarLeftCollapsed, sideBarRightCollapsed, panelRef])

  const handleCollapse = () => {
    if (side === 'left') setSidebarLeftCollaposed(true)
    if (side === 'right') setSidebarRightCollaposed(true)
  }

  const handleExpand = () => {
    if (side === 'left') setSidebarLeftCollaposed(false)
    if (side === 'right') setSidebarRightCollaposed(false)
  }

  return (
    <>
      {side === 'right' && (
        <ResizableHandle
          className={cn(
            'hover:bg-gray-500/80 mx-1 bg-transparent',
            !sideBarActive ? 'hidden' : ''
          )}
        />
      )}
      <ResizablePanel
        {...props}
        ref={panelRef}
        minSize={minSize}
        onCollapse={handleCollapse}
        onExpand={handleExpand}
        onResize={() => setIsResizing(true)}
        className={cn(panelClasses, `overflow-hidden`, className)}
      >
        <aside
          ref={squareRef}
          className={cn(
            `flex h-full flex-col items-center justify-between gap-2 overflow-hidden`,
            sideBarLeftCollapsed ? 'max-w-[68px] justify-center' : ''
          )}
        >
          {children}
        </aside>
      </ResizablePanel>
      {side === 'left' && (
        <ResizableHandle className='hover:bg-gray-500/80 mx-1 bg-transparent' />
      )}
    </>
  )
}

Sidebar.displayName = 'Sidebar'

export { Sidebar }
