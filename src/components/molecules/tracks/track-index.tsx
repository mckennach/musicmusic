import { TrackListColumn } from '@/components/ui/track-list'
import { cn } from '@/lib/utils'
import { Play } from 'lucide-react'
import * as React from 'react'
const TrackIndex = React.forwardRef<any, any>(({ index, isSelected }, ref) => {
  return (
    <TrackListColumn
      ref={ref}
      role='gridcell'
      className='grid-item relative track-index'
      aria-colindex={1}
    >
      <div className='track-index__container'>
        <span
          className={cn(
            'track-index__number',
            'text-sm opacity-100  transition-opacity duration-300',
            isSelected ? 'opacity-0' : 'group-hover:opacity-0'
          )}
        >
          {index + 1}
        </span>
        <button
          className={cn(
            'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300',
            isSelected ? 'opacity-100' : 'group-hover:opacity-100'
          )}
        >
          <Play color='white' fill='white' size={18} />
        </button>
      </div>
    </TrackListColumn>
  )
})

TrackIndex.displayName = 'TrackIndex'

export { TrackIndex }
