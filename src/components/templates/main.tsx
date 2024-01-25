'use client'

import { GsapContextProps, useGsapContext } from '@/context'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ImperativePanelHandle } from 'react-resizable-panels'

import React, { useEffect, useState } from 'react'

import { Header } from '@/components/organisms/header'
import {
  Main,
  MainContainer,
  MainContent,
  MainHost,
  MainResizeObserver,
  MainScrollSpacer,
  MainScrollSpacerChild,
  MainViewport
} from '@/components/ui/main-containers'
import { ResizablePanel } from '@/components/ui/resizable'

import { HeroBannerImage } from '../molecules/hero/hero-banner-image'

import { PanelProps } from '@/types/database.ds'

interface MainProps {
  children: React.ReactNode
  className?: string
}

const MainView = React.forwardRef<ImperativePanelHandle, PanelProps>(
  ({ children, className, ...props }, ref) => {
    const gsapRef = useGsapContext()
    const [mainRef, setRef] = useState<GsapContextProps>()

    useEffect(() => {
      if (gsapRef?.current) {
        setRef(gsapRef)
      }
    }, [gsapRef])

    useGSAP(
      () => {
        gsap.timeline({
          scrollTrigger: {
            scroller: '.main-view-container__viewport',
            start: 'top top',
            end: 'bottom bottom',
            pin: true

            // markers: true
          }
        })
      },
      {
        scope: mainRef,
        dependencies: [mainRef]
      }
    )

    return (
      <ResizablePanel ref={ref} className='relative' {...props}>
        <Main ref={gsapRef}>
          <Header />
          <MainContainer className='main-view-container'>
            <HeroBannerImage />
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
