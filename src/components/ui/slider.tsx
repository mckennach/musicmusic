'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'

import * as React from 'react'

import { cn } from '@/lib/utils'

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  trackClassName?: string
  rangeClassName?: string
  thumbClassName?: string
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    { className, rangeClassName, trackClassName, thumbClassName, ...props },
    ref
  ) => (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        'group relative flex w-full touch-none select-none items-center',
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          `relative h-1 w-full grow overflow-hidden rounded-full bg-slider`,
          trackClassName
        )}
      >
        <SliderPrimitive.Range
          className={cn(
            'absolute h-full bg-slider-range group-hover:bg-slider-range-active group-active:bg-slider-range-active',
            rangeClassName
          )}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn(
          'block h-3 w-3 rounded-full bg-slider-thumb outline-none transition-colors disabled:pointer-events-none disabled:opacity-50',
          'opacity-0 active:opacity-100 group-hover:opacity-100',
          thumbClassName
        )}
      />
    </SliderPrimitive.Root>
  )
)
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
