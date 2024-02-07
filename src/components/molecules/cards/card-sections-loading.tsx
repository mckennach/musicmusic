'use client'

import { CardButtonSkeleton } from '@/components/ui/card-button'
import { columnCountAtom } from '@/lib/atoms'
import { useAtom } from 'jotai'
// import { CardSection as CardSectionContainer, CardSectionItems } from "@/components/ui/card-section"
import { CardSection } from './card-sections'
interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  dir: 'row' | 'column'
  limit?: number
}
export function CardSectionsLoading({
  dir,
  limit = 6,
  ...props
}: CardSectionProps) {
  const [count] = useAtom(columnCountAtom)
  return (
    <CardSection
      role='presentation'
      dir={dir}
      className='component-shelf'
      {...props}
    >
      {Array.from({ length: count }, (_, i) => (
        <CardButtonSkeleton key={i} dir={dir} />
      ))}
    </CardSection>
  )
}
