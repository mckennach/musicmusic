// Components
import { useState } from 'react'

import { useAtom } from 'jotai'

import { activeLibFilterAtom, sidebarSearchInputAtom } from '@/lib/atoms'
// Utils
import { cn } from '@/lib/utils'

import Icon from '@/components/ui/icon'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

export function LibrarySearch() {
  const [activeLibFilter] = useAtom(activeLibFilterAtom)
  const [searchVisible, setSearchVisible] = useState(false)
  // const [filterInputValue, setFilterInputValue] = useState('');
  // const [inputValue, setInputValue] = useState('');
  const [searchInput, setSearchInput] = useAtom(sidebarSearchInputAtom)

  // useEffect(() => {
  //   console.log(searchInput)
  // }, [searchInput])
  // const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
  //   setSearchInput(e.target.value)
  // }

  return (
    <div className='group relative flex-auto pr-4'>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => setSearchVisible(true)}
            className={cn(
              `z-20 p-1`,
              searchVisible
                ? `z-40 bg-transparent text-white`
                : `hover:bg-tinted-highlight bg-transparent hover:text-white`,
              `cursor-pointer border-none outline-none focus:outline-none`,
              `absolute left-0 top-1/2 flex h-auto w-auto -translate-x-0 -translate-y-1/2 transform items-center rounded-full`
            )}
          >
            <Icon name='search' size={`15`} />
          </button>
        </TooltipTrigger>
        <TooltipContent>Search in your library</TooltipContent>
      </Tooltip>
      <label className='sr-only' htmlFor='Search-Library'>
        Search in Your Library
      </label>
      <input
        id='Search-Library'
        type='text'
        className={cn(
          `relative z-20`,
          `bg-tinted-highlight text-white outline-none`,
          `w-48 rounded-md py-1.5 pl-0 text-xs focus:pl-6 active:pl-6`,
          searchVisible && `w-full pl-6 focus:pl-6 active:pl-6`,
          searchInput.length > 0
            ? 'w-full'
            : `w-[23px] focus:w-full active:w-full opacity-0 focus:opacity-100 active:opacity-100`
        )}
        onFocus={() => setSearchVisible(true)}
        placeholder='Search in Your Library'
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </div>
  )
}
