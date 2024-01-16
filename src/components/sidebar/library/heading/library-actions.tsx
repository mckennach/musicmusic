import { sideBarLeftCollapsedAtom } from '@/lib/atoms'
import { useAtom } from 'jotai'
// import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

import Icon from '@/components/ui/icon'

export function LibraryActions() {
  const [sideBarLeftCollapsed, setSidebarLeftCollaposed] = useAtom(
    sideBarLeftCollapsedAtom
  )

  if (sideBarLeftCollapsed) {
    return (
      <div className='flex items-center justify-center p-1.5'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setSidebarLeftCollaposed(!sideBarLeftCollapsed)}
              className='text-base/80 !hover:bg-transparent flex w-full justify-center font-bold hover:text-base after:hover:bg-transparent'
              variant='ghost'
              size='sm'
            >
              <Icon name='library' size={24} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side='right'>Expand your library</TooltipContent>
        </Tooltip>
      </div>
    )
  }

  return (
    <div className='flex justify-between px-3'>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => setSidebarLeftCollaposed(!sideBarLeftCollapsed)}
            className='text-base/80 !hover:bg-transparent flex justify-start gap-3 !px-1.5 font-bold hover:text-base after:hover:bg-transparent'
            variant='ghost'
            size='sm'
          >
            <Icon name='library' size={24} /> Library
          </Button>
        </TooltipTrigger>
        <TooltipContent side='top'>Collapse your library</TooltipContent>
      </Tooltip>

      <div className='flex items-center'>
        <Button
          className='h-8 w-8 rounded-full p-2'
          variant='ghost'
          size='icon'
        >
          <Icon name='plus' size={16} />
        </Button>
        <Button
          className='h-8 w-8 rounded-full p-2'
          variant='ghost'
          size='icon'
        >
          <Icon name='arrow-right' size={16} />
        </Button>
      </div>
    </div>
  )
}
