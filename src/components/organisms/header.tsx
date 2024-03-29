'use client'

import { GsapContext, GsapContextProps } from '@/context'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
// import '@/styles/header.css'
import { signIn, useSession } from 'next-auth/react'

import { useContext, useEffect, useRef, useState } from 'react'

import { usePathname } from 'next/navigation'

import { Bell, Users } from 'lucide-react'

import { HeaderUserDropdown } from '@/components/molecules/header/header-user-dropdown'
import { Button } from '@/components/ui/button'
// Components
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { HeaderNavigation } from '../molecules/header/header-navigation'
import { HeaderSearch } from '../molecules/header/header-search'

gsap.registerPlugin(ScrollTrigger)

export function Header() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const gsapRef = useContext(GsapContext)
  // const gsapRef = useGsapContext();
  const headerRef = useRef<HTMLDivElement>(null)
  const [ref, setRef] = useState<GsapContextProps>()
  const handleSignIn = () => {
    signIn('spotify', {
      callbackUrl: `${process.env.NEXT_PUBLIC_URL!}/`
    })
  }

  useEffect(() => {
    if (gsapRef?.current) {
      setRef(gsapRef)
    }
  }, [gsapRef])

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            scroller: '.main-view-container__viewport',
            trigger: '.main-view-container__scroll-spacer',
            start: 'top+=100 top',
            end: 'bottom+=100 bottom',
            scrub: 1.5
            // markers: true
          }
        })
        .set('.header', {
          '--top-bar-opacity': 0
        })
        .to('.header', {
          '--top-bar-opacity': 1
        })
    },
    {
      scope: ref
    }
  )

  return (
    <header
      data-testid='topbar'
      aria-label='Topbar navigation'
      className='header animate-bar-opacity'
      // className='header absolute top-0 z-20 w-full min-h-16'
      role='banner'
    >
      <div className='flex items-center gap-2 justify-between w-full'>
        <HeaderNavigation />
        {pathname.includes('/search') && <HeaderSearch className='flex-grow' />}

        {session ? (
          <div className='flex items-center gap-2'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className='h-7 w-7 rounded-full'
                  variant='secondary'
                  size='icon'
                  scale={true}
                >
                  <Bell size={15} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>What&apos;s new</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className='h-7 w-7 rounded-full'
                  variant='secondary'
                  size='icon'
                  scale={true}
                >
                  <Users size={15} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Friend Activity</TooltipContent>
            </Tooltip>
            <HeaderUserDropdown session={session} />
          </div>
        ) : (
          <div>
            <Button size='sm' className='rounded-full' onClick={handleSignIn}>
              Log in
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
