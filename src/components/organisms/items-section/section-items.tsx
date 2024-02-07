'use client'
import { CardButtonVertical } from '@/components/molecules/cards/card-button'
import { CardButtonSkeleton } from '@/components/ui/card-button'
import { columnCountAtom } from '@/lib/atoms'
import { MyItemsKeys, MyItemsResult } from '@/types/database.ds'
import {
  Artist,
  Artists,
  FollowedArtists,
  MaxInt,
  Page,
  RecentlyPlayedTracksPage,
  SavedAlbum,
  SavedShow,
  SimplifiedAlbum,
  SimplifiedPlaylist
} from '@spotify/web-api-ts-sdk'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
function SectionItems<const T extends readonly MyItemsKeys[]>({
  data,
  type,
  limit,
  ...props
}: {
  data: MyItemsResult<readonly MyItemsKeys[]>
  type: readonly MyItemsKeys[]
  limit: MaxInt<50>
}) {
  const count = useAtom(columnCountAtom)[0]
  const router = useRouter()

  if (type[0] === 'top-artists') {
    // console.log('FOLLOWING', (data[type[0]] as FollowedArtists))
    return (
      <>
        {(data[type[0]] as Page<Artist>).items
          ?.slice(0, count)
          .map((item, i) => (
            <CardButtonVertical
              onClick={() => router.push(`/artist/${item.id}`)}
              className='card-section__item'
              key={i}
              imageSrc={item?.images[0]?.url}
              imageAlt={item?.name + ' cover image'}
              imageClassName='rounded-full'
              title={item?.name}
              label={'Artist'}
              showPlayButton={false}
            />
          ))}
      </>
    )
  }

  if (type[0] === 'following') {
    // console.log('FOLLOWING', (data[type[0]] as FollowedArtists))
    return (
      <>
        {(data[type[0]] as FollowedArtists).artists.items
          ?.slice(0, count)
          .map((item, i) => (
            <CardButtonVertical
              onClick={() => router.push(`/artist/${item.id}`)}
              className='card-section__item'
              key={i}
              imageSrc={item?.images[0]?.url}
              imageAlt={item?.name + ' cover image'}
              imageClassName='rounded-full'
              title={item?.name}
              label={'Artist'}
              showPlayButton={false}
            />
          ))}
      </>
    )
  }

  if (type[0] === 'shows') {
    return (
      <>
        {(data[type[0]] as Page<SavedShow>).items
          ?.slice(0, count)
          .map((item, i) => (
            <CardButtonVertical
              onClick={() => router.push(`/playlist/${item.show.id}`)}
              className='card-section__item'
              key={i}
              imageSrc={item?.show.images[0]?.url}
              imageAlt={item?.show.name + ' cover image'}
              title={item?.show.name}
              label={item?.show.publisher}
              showPlayButton={false}
            />
          ))}
      </>
    )
  }

  if (type[0] === 'albums') {
    return (
      <>
        {(data[type[0]] as Page<SavedAlbum>).items
          ?.slice(0, count)
          .map((item, i) => (
            <CardButtonVertical
              onClick={() => router.push(`/album/${item.album.id}`)}
              className='card-section__item'
              key={i}
              imageSrc={item?.album.images[0]?.url}
              imageAlt={item?.album.name + ' cover image'}
              title={item?.album.name}
              label={item?.album.artists[0]?.name}
              showPlayButton={true}
            />
          ))}
      </>
    )
  }

  if (type[0] === 'playlists') {
    return (
      <>
        {(data[type[0]] as Page<SimplifiedPlaylist>).items
          ?.slice(0, count)
          .map((item, i) => (
            <CardButtonVertical
              onClick={() => router.push(`/playlist/${item.id}`)}
              className='card-section__item'
              key={i}
              imageSrc={item.images[0]?.url}
              imageAlt={item.name + ' cover image'}
              title={item.name}
              label={item.owner.display_name}
              showPlayButton={true}
            />
          ))}
      </>
    )
  }

  if (type[0] === 'recently-played') {
    const arr = (data[type[0]] as RecentlyPlayedTracksPage).items
    // console.log('RECENTLY', arr);
    return (
      <>
        {arr
          // .filter(
          //   (obj, index) =>
          //     index ===
          //     arr.findIndex(
          //       (o) =>
          //         obj.track.album.artists[0].name ===
          //         o.track.album.artists[0].name
          //     )
          // )
          ?.slice(0, count)
          .map((item, i) => (
            <CardButtonVertical
              onClick={() => router.push(`/album/${item.track.album.id}`)}
              className='card-section__item'
              key={i}
              imageSrc={item['track'].album.images[0]?.url}
              imageAlt={item.track.album.name + ' cover image'}
              title={item.track.name}
              label={item.track.album.artists[0]?.name}
              showPlayButton={true}
            />
          ))}
      </>
    )
  }

  if (type[0] === 'discography') {
    const arr = (data[type[0]] as Page<SimplifiedAlbum>).items
    return (
      <>
        {arr?.slice(0, count).map((item, i) => (
          <CardButtonVertical
            onClick={() => router.push(`/album/${item.id}`)}
            className='card-section__item'
            key={i}
            imageSrc={item.images[0]?.url}
            imageAlt={item.name + ' cover image'}
            title={item.name}
            label={
              <span className='capitalize'>
                {item.release_date.split('-')[0]} • {item.album_type}
              </span>
            }
            showPlayButton={true}
          />
        ))}
      </>
    )
  }

  if (type[0] === 'related-artists') {
    const arr = (data[type[0]] as Artists).artists
    return (
      <>
        {arr
          ?.slice(0, count)
          .map((item, i) => (
            <CardButtonVertical
              onClick={() => router.push(`/artist/${item.id}`)}
              className='card-section__item'
              key={i}
              imageSrc={item.images[0]?.url}
              imageAlt={item.name + ' cover image'}
              imageClassName='rounded-full'
              title={item.name}
              label={'Artist'}
              showPlayButton={true}
            />
          ))}
      </>
    )
  }

  Array(6)
    .fill(0)
    .map((_, i) => (
      <CardButtonSkeleton className='card-section__item' key={i} />
    ))
  // return (
  // )
}

SectionItems.displayName = 'SectionItems'

export { SectionItems }
