import React from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

interface HeaderSearchProps extends React.HTMLAttributes<HTMLDivElement> {}

const HeaderSearch = React.forwardRef<HTMLDivElement, HeaderSearchProps>(
  ({ ...props }, ref) => {
    const pathName = usePathname()
    const router = useRouter()

    return (
      <div {...props} ref={ref}>
        <div className='flex gap-2 items-center'>
          <div className='relative basis-[360px]'>
            <form className='group'>
              <fieldset className='relative'>
                <Label htmlFor='search' className='sr-only'>
                  Search
                </Label>
                <Input
                  className={cn(
                    'rounded-full ring-none focus:ring-0 focus:outline-none focus-within:ring-0 focus-within:outline-none focus-visible:ring-white focus-visible:outline-none',
                    'bg-[#242424] text-white placeholder-subdued-foreground',
                    'py-1.5 pl-9'
                  )}
                  autoCorrect='off'
                  id='search'
                  type='search'
                  placeholder='What do you want to listen to?'
                  onChange={(e) => router.push(`/search/${e.target.value}`)}
                  onCut={() => router.push('/search')}
                  onKeyUp={(e) =>
                    router.push(`/search/${e.currentTarget.value}`)
                  }
                  onPaste={(e) =>
                    router.push(`/search/${e.clipboardData.getData('Text')}`)
                  }
                  defaultValue={
                    pathName.split('/search/')[1]
                      ? decodeURI(pathName.split('/search/')[1])
                      : ''
                  }
                />
                <Search
                  size={18}
                  className={cn(
                    'absolute top-1/2 left-3 transform -translate-y-1/2 text-subdued-foreground',
                    'group-focus-within:text-white group-focus-visible:text-white group-active:text-white'
                  )}
                />
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    )
  }
)

HeaderSearch.displayName = 'HeaderSearch'

export { HeaderSearch }
