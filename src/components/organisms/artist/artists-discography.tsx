// 'use client'
// import { AuthSession } from '@/types/database.ds'
// import { Artist, Page, SimplifiedAlbum } from '@spotify/web-api-ts-sdk'
// import { useEffect, useState } from 'react'
// // import { getArtistsDiscography } from '@/services/server/queries/artists.queries'
// import { CardButton } from '@/components/molecules/cards/card-button'
// import { CardButtonSkeleton } from '@/components/ui/card-button'
// import {
//   CardSection,
//   CardSectionHeading,
//   CardSectionItems
// } from '@/components/ui/card-section'
// import { fetchArtistsDiscography } from '@/services/server/queries'
// import { Button } from '@/components/ui/button'
// import { cn } from '@/lib/utils'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import { ItemSection } from '../items-section/section-container'
// interface FilterProps {
//   label: string
//   value: string
// }

// export function ArtistDiscography({
//   session,
//   artist,
//   id
// }: {
//   session: AuthSession | null
//   artist: Artist | null
//   id: string
//   // fetchDiscography: (
//   //   id: string,
//   //   session: AuthSession | null
//   // ) => Promise<Page<SimplifiedAlbum>>
// }) {
//   const router = useRouter()
//   const [discog, setDiscog] = useState<Page<SimplifiedAlbum> | null>(null)
//   const [cardCount, setCardCount] = useState<number>(5)
//   const [types, setTypes] = useState<FilterProps[]>([
//     {
//       label: 'Popular Releases',
//       value: 'popular-releases'
//     }
//   ])
//   const [selectedType, setSelectedType] = useState<string>('popular-releases')
//   useEffect(() => {
//     if (!id || !session) return
//     fetchArtistsDiscography(id, session).then((result) => {
//       setDiscog(result)
//     })
//   }, [id, session])

//   useEffect(() => {
//     if (discog) {
//       discog?.items.filter(
//         (value, index, array) => array.indexOf(value) === index
//       )

//       discog.items
//         .map((item) => item.album_group)
//         .filter((value, index, array) => array.indexOf(value) === index)
//         .forEach((item) => {
//           if (item && !types.find((type) => type.value === item)) {
//             setTypes((prev) => [
//               ...prev,
//               {
//                 label:
//                   item.replace(/-/g, ' ').charAt(0).toUpperCase() +
//                   item.replace(/-/g, ' ').slice(1),
//                 value: item
//               }
//             ])
//           }
//         })
//     }
//   }, [discog, types])

//   const handleFilter = (type: FilterProps) => {
//     setSelectedType(type.value)
//   }

//   return (
//     <section className='relative' role='presentation'>
//       <div className='content-spacing space-y-4'>
//         <ItemSection
//           title='Discography'
//           session={session}
//           type={['albums']}
//           slug='albums'
//           limit={6}
//           offset={0}
//         />
//       </div>
//     </section>
//   )

//   // return (
//   //   <section className='relative' role='presentation'>
//   //     <div className='content-spacing space-y-4'>
//   //       <CardSection>
//   //         {discog && discog.items && (
//   //           <CardSectionHeading>
//   //             <div className='w-full'>
//   //               <div className='w-full flex justify-between items-center'>
//   //                 <h2 className='text-white font-bold text-3xl'>Popular</h2>
//   //                 <Link
//   //                   href={`/sections/${session?.user?.id}/recently-played`}
//   //                   className='text-sm font-semibold text-subdued hover:underline'
//   //                 >
//   //                   Show all
//   //                 </Link>
//   //               </div>
//   //               <div className='flex gap-2 mt-4'>
//   //                 {types.map((type) => (
//   //                   <Button
//   //                     key={type.value}
//   //                     className={cn(
//   //                       `h-8 !w-max rounded-full p-2 text-xs font-semibold  text-foreground`,
//   //                       `bg-tinted-base hover:bg-tinted-higlight active:bg-tinted-press`,
//   //                       selectedType === type.value &&
//   //                         `bg-primary text-primary-foreground hover:bg-primary/80 active:bg-primary-press`
//   //                     )}
//   //                     size='sm'
//   //                     onClick={() => handleFilter(type)}
//   //                   >
//   //                     {type.label}
//   //                   </Button>
//   //                 ))}
//   //               </div>
//   //             </div>
//   //           </CardSectionHeading>
//   //         )}
//   //         <CardSectionItems
//   //           gridCols={cardCount}
//   //           gap={3}
//   //           className={cn(`grid-cols-5`)}
//   //         >
//   //           {discog && discog.items && session ? (
//   //             <>
//   //               {discog.items?.slice(0, cardCount).map((item, i) => (
//   //                 <CardButton
//   //                   key={i}
//   //                   dir='column'
//   //                   onClick={() => router.push(`/${item?.type}/${item.id}`)}
//   //                   title={item?.name}
//   //                   label={
//   //                     <span>
//   //                       {item?.release_date?.slice(0, 4)}
//   //                       {' • '}
//   //                       {item?.artists?.length > 0
//   //                         ? item?.artists[0]?.name
//   //                         : 'Unknown Artist'}
//   //                     </span>
//   //                   }
//   //                   imageSrc={item?.images[0]?.url}
//   //                   imageAlt={item?.name + ' cover image'}
//   //                   imageIcon='music'
//   //                   imageClassName='w-full h-full'
//   //                 />
//   //               ))}
//   //             </>
//   //           ) : (
//   //             <>
//   //               {Array(cardCount)
//   //                 .fill(0)
//   //                 .map((_, i) => (
//   //                   <CardButtonSkeleton
//   //                     key={i}
//   //                     dir='column'
//   //                     imageClassName='w-full h-full'
//   //                   />
//   //                 ))}
//   //             </>
//   //           )}
//   //         </CardSectionItems>
//   //       </CardSection>
//   //     </div>
//   //   </section>
//   // )
// }
