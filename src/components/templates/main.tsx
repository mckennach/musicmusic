'use client'

import { useGsapContext } from '@/context'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/src/ScrollTrigger'
import { ImperativePanelHandle } from 'react-resizable-panels'

import React, { useEffect, useRef, useState } from 'react'
import { useElementSize } from 'usehooks-ts'
gsap.registerPlugin(ScrollTrigger)

import {
  Main,
  MainContainer,
  MainContent,
  MainHost,
  MainScrollSpacer,
  MainScrollSpacerChild,
  MainViewport
} from '@/components/molecules/main/main-containers'
import { Header } from '@/components/organisms/header'
import { MainResizeObserver } from '../molecules/main/resize-observer'

import { ResizablePanel } from '@/components/ui/resizable'

import { HeroBannerImage } from '../molecules/hero/hero-banner-image'

import { PanelProps } from '@/types/database.ds'

const MainView = React.forwardRef<ImperativePanelHandle, PanelProps>(
  ({ children, className, ...props }, ref) => {
    const gsapRef = useGsapContext()
    const [size, setSize] = useState(0)
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
        '--main-panel-width',
        `${width}px`
      )
    }, [isResizing, width])

    return (
      <ResizablePanel
        onResize={() => setIsResizing(true)}
        ref={ref}
        className='relative'
        {...props}
      >
        <Main ref={gsapRef}>
          <Header />
          <MainContainer className='main-view-container' ref={squareRef}>
            <HeroBannerImage />
            <MainHost>
              <MainResizeObserver />
              <MainContainer className='main-view-container__padding'>
                <MainViewport className='overflow-y-scroll bg-scroll-cover'>
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
