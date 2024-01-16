import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import React from 'react'

type VolumeProps = React.ComponentProps<typeof Slider>
// interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {}

const VolumeBar = React.forwardRef<HTMLDivElement, VolumeProps>(
  ({ className, ...props }, ref) => {
    return <Slider max={100} step={1} className={cn(className)} {...props} />
  }
)

VolumeBar.displayName = 'VolumeBar'

export { VolumeBar }
