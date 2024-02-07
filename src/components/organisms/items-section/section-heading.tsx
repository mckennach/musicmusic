import { AuthSession, MyItemsKeys } from '@/types/database.ds'
import Link from 'next/link'
import React from 'react'
import { ArtistDiscographyHeading } from '../artist/artist-discography-heading'

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  title: string
  data: any
  type: readonly MyItemsKeys[]
  showFilter?: boolean
  session: AuthSession
  url?: string
}

const SectionHeading = React.forwardRef<HTMLDivElement, SectionHeadingProps>(
  ({ id, title, data, type, showFilter, session, url, ...props }, ref) => {
    if (type[0] === 'discography' && showFilter)
      return (
        <div className='flex flex-col w-full' ref={ref}>
          <div className='flex justify-between items-center'>
            <h2 className='text-white font-bold text-2xl'>Discography</h2>
            {url && (
              <Link
                href={url}
                className='text-sm font-semibold text-subdued hover:underline'
              >
                Show all
              </Link>
            )}
          </div>
          {data && showFilter && (
            <ArtistDiscographyHeading data={data[type[0]]} />
          )}
        </div>
      )

    return (
      <>
        <h2 className='text-white font-bold text-2xl'>{title}</h2>
        {url && (
          <Link
            href={url}
            className='text-sm font-semibold text-subdued hover:underline'
          >
            Show all
          </Link>
        )}
      </>
    )
  }
)

SectionHeading.displayName = 'SectionHeading'

export { SectionHeading }
