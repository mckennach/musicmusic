// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { cn } from '@/lib/utils'
import { A11y, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { LibraryFilterTypes } from '@/types'

interface LibraryFilterItemsProps {
  label: string
  value: LibraryFilterTypes
}

const filterItems: LibraryFilterItemsProps[] = [
  {
    label: 'Playlists',
    value: 'playlists'
  },
  {
    label: 'Podcasts & Shows',
    value: 'episodes'
  },
  {
    label: 'Albums',
    value: 'albums'
  },
  {
    label: 'Artists',
    value: 'artists'
  }
]

export function LibraryFilter() {
  return (
    <div className={cn(`relative z-30 w-full space-y-4 px-0`)}>
      <div className='relative'>
        <Button
          size='sm'
          className={cn(
            'swiper-btn-prev',
            'h-8 bg-transparent p-0',
            `absolute left-0 top-0 z-20`,
            `before:absolute before:left-0 before:top-0 before:h-full before:w-20`,
            `from-0% to-50% before:bg-gradient-to-l  before:from-transparent before:to-card before:content-[''] disabled:hidden`
          )}
        >
          <span
            className={cn(
              `bg-elevated-base`,
              `relative z-20 flex h-8 w-8 items-center justify-center rounded-full p-2 text-foreground transition-all`
            )}
          >
            <Icon name='chevron-left' size={24} />
          </span>
        </Button>
        <Button
          size='sm'
          className={cn(
            'swiper-btn-next',
            'h-8 bg-transparent p-0',
            `absolute right-0 top-0 z-20`,
            `before:absolute before:right-0 before:top-0 before:h-full before:w-20`,
            `from-0% to-50% before:bg-gradient-to-l before:from-card before:to-transparent before:content-[''] disabled:hidden`
          )}
        >
          <span
            className={cn(
              `bg-elevated-base`,
              `relative z-20 flex h-8 w-8 items-center justify-center rounded-full p-2 text-foreground transition-all`
            )}
          >
            <Icon name='chevron-right' size={24} />
          </span>
        </Button>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={8}
          slidesPerView={'auto'}
          navigation={{
            nextEl: '.swiper-btn-next',
            prevEl: '.swiper-btn-prev',
            disabledClass: 'swiper-button-disabled'
          }}
        >
          {filterItems.map((item) => {
            return (
              <SwiperSlide key={item.value} className='!w-max'>
                <Button
                  className={cn(
                    `h-8 !w-max rounded-full p-2 text-xs font-normal capitalize text-foreground`,
                    `bg-tinted-base hover:bg-tinted-higlight active:bg-tinted-press`
                  )}
                  size='sm'
                >
                  {item?.label}
                </Button>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}
