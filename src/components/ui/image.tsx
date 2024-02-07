'use client'

import { imageLoader } from '@/lib/utils'
import Image, { ImageProps } from 'next/image'
import React from 'react'

const LoadedImage = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ src, alt, ...props }, ref) => {
    return (
      <Image src={src} alt={alt} loader={imageLoader} ref={ref} {...props} />
    )
  }
)

LoadedImage.displayName = 'LoadedImage'

export { LoadedImage }
