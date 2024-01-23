'use client'

// Components
import { ResizablePanelGroup } from '@/components/ui/resizable'

// Utils

export function MainLayout({ children }: { children: React.ReactNode }) {
  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
  }

  return (
    <ResizablePanelGroup
      onLayout={onLayout}
      id='Main-Panel-Group'
      direction='horizontal'
      className='overflow-hidden main-area bg-background'
    >
      {children}
    </ResizablePanelGroup>
  )
}
