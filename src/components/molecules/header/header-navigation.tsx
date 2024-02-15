'use client'

// Components
import { useSession } from 'next-auth/react'

import { useEffect, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import { useAtom } from 'jotai'

import { forwardRoutesAtom, previousRoutesAtom } from '@/lib/atoms'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

export function HeaderNavigation() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, status } = useSession()
  const [previousRoutes, setPreviousRoutes] = useAtom(previousRoutesAtom)
  const [forwardRoutes, setForwardRoutes] = useAtom(forwardRoutesAtom)
  const [canGoForward, setCanGoForward] = useState(false)
  const [canGoBack, setCanGoBack] = useState(false)

  useEffect(() => {
    if (pathname !== previousRoutes[previousRoutes.length - 1]) {
      setPreviousRoutes([...previousRoutes, pathname])
    }
  }, [pathname, previousRoutes, setPreviousRoutes])

  useEffect(() => {
    if (previousRoutes.length > 0) {
      setCanGoBack(true)
    } else {
      setCanGoBack(false)
    }
  }, [previousRoutes])

  useEffect(() => {
    if (forwardRoutes.length > 0) {
      setCanGoForward(true)
    } else {
      setCanGoForward(false)
    }
  }, [forwardRoutes])
  const handleGoForward = () => {
    if (forwardRoutes.length > 0) {
      const route = forwardRoutes.pop()
      setForwardRoutes(forwardRoutes)
      setPreviousRoutes([...previousRoutes, pathname])
      router.forward()
    }
  }

  const handleGoBack = () => {
    if (previousRoutes.length > 0) {
      const route = previousRoutes.pop()
      setPreviousRoutes(previousRoutes)
      setForwardRoutes([...forwardRoutes, pathname])
      router.back()
    }
  }

  return (
    <div className='flex items-center gap-2'>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => handleGoBack()}
            disabled={!canGoBack}
            className='h-7 w-7 rounded-full'
            variant='secondary'
            size='icon'
          >
            <ChevronLeft size={20} />
          </Button>
        </TooltipTrigger>
        <TooltipContent align='start'>Go back</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => handleGoForward()}
            disabled={!canGoForward}
            className='h-7 w-7 rounded-full'
            variant='secondary'
            size='icon'
          >
            <ChevronRight size={20} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Go forward</TooltipContent>
      </Tooltip>
    </div>
  )
}
