'use client'
import {
  CardSection as CardSectionContainer,
  CardSectionHeading,
  CardSectionItems
} from '@/components/ui/card-section'
import { columnCountAtom, rowCountAtom } from '@/lib/atoms'
import { useAtomValue } from 'jotai'
import React from 'react'

interface CardSectionRowProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: string | React.ReactNode
  items?: React.ReactNode
  itemsClassName?: string
  dir?: 'row' | 'column'
}

interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: string | React.ReactNode
  itemsClassName?: string
  dir?: 'row' | 'column'
}

const CardSection = React.forwardRef<HTMLDivElement, CardSectionProps>(
  ({ heading, children, itemsClassName, dir = 'column', ...props }, ref) => {
    const rowCount = useAtomValue(rowCountAtom)
    const columnCount = useAtomValue(columnCountAtom)
    return (
      <CardSectionContainer
        as='section'
        role='presentation'
        dir={dir}
        className='component-shelf'
      >
        <CardSectionHeading>{heading}</CardSectionHeading>
        <CardSectionItems
          dir={dir}
          className={itemsClassName}
          gridCols={6}
          // gridCols={dir === 'row' ? rowCount : columnCount}
        >
          {children}
        </CardSectionItems>
      </CardSectionContainer>
    )
  }
)

CardSection.displayName = 'CardSection'

export { CardSection }
