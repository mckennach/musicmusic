'use client'

import {
  CardButton,
  CardButtonImage,
  CardButtonPlayButton,
  CardButtonText
} from '@/components/ui/card-button'
import { CardSection, CardSectionHeading } from '@/components/ui/card-section'
import { cn, queryCheck } from '@/lib/utils'
import {
  Artist,
  ItemTypes,
  SearchResults,
  SimplifiedAlbum,
  SimplifiedPlaylist,
  Track
} from '@spotify/web-api-ts-sdk'
// import { useEffect, useState } from 'react'
import { recentSearchesAtom } from '@/lib/atoms'
import { AuthSession } from '@/types/database.ds'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
// import { SearchResults } from '../../../app/(main)/search/[query]/page';
interface TopResultProps {
  session: AuthSession | null
  results: SearchResults<ItemTypes[]>
  query: string
  className?: string
}

type SaveSearchItem = Artist | SimplifiedAlbum | SimplifiedPlaylist
type Keys = 'artists' | 'albums' | 'tracks' | 'playlists'
export function SearchTopResult({
  results,
  className,
  query,
  session
}: TopResultProps) {
  const [topResult, setTopResult] = useState<
    Artist | SimplifiedAlbum | SimplifiedPlaylist | Track | null
  >(null)
  const [recentSearches, setRecentSearches] = useAtom(recentSearchesAtom)
  const [topResultType, setTopResultType] = useState<Keys>('artists')
  const router = useRouter()

  useEffect(() => {
    if (results && query) {
      if (results) {
        const map = Object.keys(results)
          .map((key) => {
            const score =
              results[key as keyof typeof results]?.items[0] &&
              queryCheck(
                results[key as keyof typeof results]?.items[0]?.name,
                query
              )
            return {
              key,
              score
            }
          })
          .reduce((prev, curr) => {
            if (curr.score > prev.score) {
              return curr
            }
            return prev
          })
        // setTopResultType(map.key as Keys)
        // setTopResult(results[map.key as keyof typeof results]?.items[0] as Artist | SimplifiedAlbum | SimplifiedPlaylist);

        const albumScore =
          results['albums']?.items[0] &&
          queryCheck(results['albums']?.items[0]?.name, query)
        const artistScore =
          results['artists']?.items[0] &&
          queryCheck(results['artists']?.items[0]?.name, query)

        if (albumScore < artistScore) {
          setTopResult(
            results['albums']?.items[0] as
              | Artist
              | SimplifiedAlbum
              | SimplifiedPlaylist
          )
          setTopResultType('albums')
        } else {
          setTopResult(
            results['artists']?.items[0] as
              | Artist
              | SimplifiedAlbum
              | SimplifiedPlaylist
          )
          setTopResultType('artists')
        }
      }
    }
  }, [results, query])

  useEffect(() => {}, [topResult, topResultType])

  const handleClick = (toSave: SaveSearchItem) => {
    setRecentSearches((prev) => [toSave, ...prev])
    router.push(`/${toSave.type}/${toSave.id}`)
  }

  if (!topResult) return null

  return (
    <div className={cn('', className)}>
      <CardSection>
        <CardSectionHeading>
          <h2 className='text-white font-bold text-2xl'>Top result</h2>
        </CardSectionHeading>
        {topResult && topResultType === 'artists' && (
          <>
            <CardButton
              className='!p-5'
              onClick={
                topResult
                  ? () => handleClick(topResult as Artist as Artist)
                  : undefined
              }
            >
              <CardButtonImage
                src={
                  (topResult as Artist).images[0].url
                    ? (topResult as Artist).images[0].url
                    : undefined
                }
                alt={'Cover'}
                icon='music'
                className={cn(topResultType === 'artists' && 'rounded-full')}
              />
              <CardButtonText
                title={topResult.name ? topResult.name : ''}
                titleClassName='text-white font-bold text-[2rem] truncate'
                label={<>Artist</>}
              />
              <CardButtonPlayButton
                contextUri={topResult.uri}
                fade={true}
                fadeDir='up'
                className='bottom-4 right-4'

                // className='transform -translate-x-1 -translate-y-8 opacity-0 group-hover:opacity-100 group-hover:-translate-y-10 transition-all duration-300 ease-in-out'
              />
            </CardButton>
          </>
        )}

        {topResult && topResultType === 'albums' && (
          <>
            <CardButton
              className='!p-5'
              onClick={
                topResult
                  ? () => handleClick(topResult as Artist as Artist)
                  : undefined
              }
            >
              <CardButtonImage
                src={
                  (topResult as SimplifiedAlbum).images[0].url
                    ? (topResult as SimplifiedAlbum).images[0].url
                    : undefined
                }
                alt={'Cover'}
                icon='music'
                // className={cn(topResultType === 'artist' && 'rounded-full')}
              />
              <CardButtonText
                title={topResult.name ? topResult.name : ''}
                titleClassName='text-white font-bold text-[2rem] truncate'
                label={
                  <>
                    Album
                    {' • '}
                    {(topResult as SimplifiedAlbum).artists[0].name}
                  </>
                }
              />
              <CardButtonPlayButton
                contextUri={topResult.uri}
                className='bottom-4 right-4'
                fade={true}
                fadeDir='up'
                // className='transform -translate-x-1 -translate-y-8 opacity-0 group-hover:opacity-100 group-hover:-translate-y-10 transition-all duration-300 ease-in-out'
              />
            </CardButton>
          </>
        )}

        {topResult && topResultType === 'tracks' && (
          <>
            <CardButton
              className='!p-5'
              onClick={
                topResult
                  ? () => handleClick(topResult as Artist as Artist)
                  : undefined
              }
            >
              <CardButtonImage
                src={
                  (topResult as Track).album.images[0].url
                    ? (topResult as Track).album.images[0].url
                    : undefined
                }
                alt={'Cover'}
                icon='music'
                // className={cn(topResultType === 'artist' && 'rounded-full')}
              />
              <CardButtonText
                title={topResult.name ? topResult.name : ''}
                titleClassName='text-white font-bold text-[2rem] truncate'
                label={
                  <>
                    Song
                    {' • '}
                    {(topResult as Track).artists[0].name}
                  </>
                }
              />
              <CardButtonPlayButton
                contextUri={topResult.uri}
                fade={true}
                fadeDir='up'
                className='bottom-4 right-4'
                // className='transform -translate-x-1 -translate-y-8 opacity-0 group-hover:opacity-100 group-hover:-translate-y-10 transition-all duration-300 ease-in-out'
              />
            </CardButton>
          </>
        )}
      </CardSection>
    </div>
  )
}

{
  /* <>
{topResultType === 'artist' && <span>Artist</span>}
{topResultType === 'album' && (
  <span>
    {(topResult.items[0].release_date?.slice(0, 4)}
    {' • '}
    {(topResult as SimplifiedAlbum).artists?.length > 0
      ? (topResult as SimplifiedAlbum).artists[0]?.name
      : 'Unknown Artist'}
  </span>
)}
</> */
}
