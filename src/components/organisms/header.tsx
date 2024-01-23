'use client'

import { Button } from '@components/ui/button'
import { signIn, useSession } from 'next-auth/react'

import { Bell, Users } from 'lucide-react'

// import '@/styles/header.css'
import { HeaderUserDropdown } from '@/components/molecules/header/header-user-dropdown'
// Components
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

import { HeaderNavigation } from '../molecules/header/header-navigation'

export function Header() {
  const { data: session, status } = useSession()

  const handleSignIn = () => {
    signIn('spotify', {
      callbackUrl: '/'
    })
  }

  return (
    <header
      data-testid='topbar'
      aria-label='Topbar navigation'
      className='header animate-bar-opacity'
      // className='header absolute top-0 z-20 w-full min-h-16'
      role='banner'
    >
      <div className='flex items-center justify-between w-full'>
        <HeaderNavigation />
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
