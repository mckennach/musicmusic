// import Link from 'next/link'
import { useAtom } from 'jotai'

import { sideBarLeftCollapsedAtom } from '@/lib/atoms'

import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

export function LibraryActions() {
  const [sideBarLeftCollapsed, setSidebarLeftCollaposed] = useAtom(
    sideBarLeftCollapsedAtom
  )

  if (sideBarLeftCollapsed) {
    return (
      <div className='flex items-center justify-center p-1.5 mb-2'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setSidebarLeftCollaposed(!sideBarLeftCollapsed)}
              className='text-base/80 !hover:bg-transparent flex w-full justify-center font-bold hover:text-base after:hover:bg-transparent hover:after:opacity-0 transition-all duration-300 ease-in-out !scale-100'
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
            className='text-base/80 !hover:bg-transparent flex justify-center gap-2 !px-1.5 font-bold  !hover:after:bg-transparent hover:after:opacity-0 transition-all duration-300 ease-in-out'
            // className='text-[#b3b3b3] hover:text-white !hover:bg-transparent flex justify-start gap-3 !px-1.5 font-bold hover:text-base after:hover:bg-transparent hover:after:opacity-0 transition-all duration-300 ease-in-out !scale-100'
            variant='ghost'
            size='sm'
            scale={false}
          >
            <Icon name='library' size={24} /> <span>Library</span>
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
