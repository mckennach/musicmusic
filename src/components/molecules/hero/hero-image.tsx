import React from 'react'

const HeroImageContainer = React.forwardRef<HTMLDivElement, any>(
  ({ className, ...props }, ref) => {
    return (
      <div className={`hero-image-container ${className}`} ref={ref} {...props}>
        {props.children}
      </div>
    )
  }
)

HeroImageContainer.displayName = 'HeroImageContainer'

export { HeroImageContainer }
