'use client'

import { PanelProps } from '@/types'
import { ImperativePanelHandle } from 'react-resizable-panels'

import React from 'react'

import { Header } from '@/components/organisms/header'
import {
  Main,
  MainContainer,
  MainContent,
  MainHost,
  MainResizeObserver,
  MainScrollSpacer,
  MainScrollSpacerChild,
  MainUnderView,
  MainViewport
} from '@/components/ui/main-containers'
import { ResizablePanel } from '@/components/ui/resizable'

// import '@/styles/main.css'

interface MainProps {
  children: React.ReactNode
  className?: string
}

const MainView = React.forwardRef<ImperativePanelHandle, PanelProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <ResizablePanel ref={ref} className='relative' {...props}>
        <Main>
          <Header />
          <MainContainer className='main-view-container'>
            <MainUnderView />
            <MainHost>
              <MainResizeObserver />
              <MainContainer className='main-view-container__padding'>
                <MainViewport className='overflow-y-scroll'>
                  <MainContent>
                    <MainScrollSpacer />
                    <MainScrollSpacerChild>
                      <main
                        tabIndex={-1}
                        aria-label='Main Content :)'
                        id='Main'
                      >
                        {children}
                      </main>
                    </MainScrollSpacerChild>
                  </MainContent>
                </MainViewport>
              </MainContainer>
            </MainHost>
          </MainContainer>
        </Main>
      </ResizablePanel>
    )
  }
)

MainView.displayName = 'MainView'

export { MainView }
