import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Icon from '@/components/ui/icon'
import { sidebarSortByAtom, sidebarViewAtom } from '@/lib/atoms'
import { cn } from '@/lib/utils'
import { useAtom } from 'jotai'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { useEffect, useState } from 'react'

interface LibrarySortProps {
  label: string
  value: 'recents' | 'recently-added' | 'alphabetical' | 'creator'
}

interface LibraryViewProps {
  label: string
  value: 'grid' | 'list' | 'compact'
  icon: keyof typeof dynamicIconImports
}

const librarySortOptions: LibrarySortProps[] = [
  {
    label: 'Recents',
    value: 'recents'
  },
  {
    label: 'Recently Added',
    value: 'recently-added'
  },
  {
    label: 'Alphabetical',
    value: 'alphabetical'
  },
  {
    label: 'Creator',
    value: 'creator'
  }
]

const libraryViewOptions: LibraryViewProps[] = [
  {
    label: 'Compact',
    value: 'compact',
    icon: 'align-justify'
  },
  {
    label: 'List',
    value: 'list',
    icon: 'list'
  },
  {
    label: 'Grid',
    value: 'grid',
    icon: 'layout-grid'
  }
]

export function LibrarySort() {
  const [sidebarView, setSidebarView] = useAtom(sidebarViewAtom)
  const [sidebarSortBy, setSidebarSortBy] = useAtom(sidebarSortByAtom)
  const [activeView, setActiveView] = useState<LibraryViewProps>(
    libraryViewOptions[1]
  )
  const [activeSort, setActiveSort] = useState<LibrarySortProps>(
    librarySortOptions[0]
  )

  useEffect(() => {
    const activeView = libraryViewOptions.find(
      (view) => view.value === sidebarView
    )
    activeView && setActiveView(activeView)

    const activeSort = librarySortOptions.find(
      (sort) => sort.value === sidebarSortBy
    )
    activeSort && setActiveSort(activeSort)
  }, [sidebarView, sidebarSortBy])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex items-center justify-between gap-1 text-xs font-medium tracking-tight text-subdued outline-none'>
        <span>{activeSort?.label}</span>
        <Icon name={activeView?.icon} size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent side='bottom' align='end' className='bg-[#282828]'>
        <DropdownMenuLabel className='text-2xs font-bold text-subdued'>
          Sort by
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          {librarySortOptions.map((sort) => (
            <DropdownMenuItem
              key={sort?.value}
              onClick={() => setSidebarSortBy(sort.value)}
              className={cn(
                `text-xs`,
                sort?.value === activeSort.value &&
                  '!hover:text-spotify group text-spotify'
              )}
            >
              <span className='group-hover:text-spotify'>{sort?.label}</span>
              {sort?.value === activeSort.value && (
                <DropdownMenuShortcut className='text-spotify'>
                  <Icon name='check' size={16} />
                </DropdownMenuShortcut>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className='text-2xs font-bold text-subdued'>
          View as
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          {libraryViewOptions.map((view) => (
            <DropdownMenuItem
              key={view?.value}
              onClick={() => setSidebarView(view.value)}
              className={cn(
                `text-xs`,
                view?.value === activeView.value &&
                  'group text-spotify hover:text-spotify'
              )}
            >
              <div className='flex gap-2 group-hover:text-spotify'>
                <Icon name={view?.icon} size={16} />
                <span>{view?.label}</span>
              </div>

              {view?.value === activeView.value && (
                <DropdownMenuShortcut className='text-spotify'>
                  <Icon name='check' size={16} />
                </DropdownMenuShortcut>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
