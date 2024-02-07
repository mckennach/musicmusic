import { getServerSession } from 'next-auth'

import { CardSectionsLoading } from '@/components/molecules/cards/card-sections-loading'
import { HomeTopItems } from '@/components/organisms/home/top-container'
import { ItemSection } from '@/components/organisms/items-section/section-container'
import { BackgroundFade } from '@/components/ui/background-fade'
import { AuthSession, MyItemsKeys } from '@/types/database.ds'
import { Suspense } from 'react'
import { authOptions } from '../../lib/auth/auth-options'
// import { ResponseKeys } from '../../../types/database.ds';
export default async function HomePage<
  const T extends readonly MyItemsKeys[]
>() {
  const session: AuthSession | null = await getServerSession(authOptions)
  const keys = [
    'artists',
    'albums',
    'tracks',
    'episodes',
    'shows',
    'playlists'
  ] as readonly MyItemsKeys[]
  return (
    <>
      <BackgroundFade className='h-[350px]' />
      <section className='isolate pt-2 flex flex-col' data-testid='home'>
        <div className='content-spacing flex flex-wrap gap-6 pt-2'>
          <Suspense fallback={<CardSectionsLoading dir='row' />}>
            <HomeTopItems session={session} />
          </Suspense>
          <Suspense fallback={<CardSectionsLoading dir='column' />}>
            <ItemSection
              title='Recently played'
              session={session}
              endpoint='spotify/me/2/player/recently-played?limit=8&offset=0'
              type={['recently-played']}
              headingUrl={`/section/${session?.user.id}/recently-played`}
              fields={{ limit: 7, offset: 0 }}
              limit={7}
              offset={0}
            />
          </Suspense>
          <Suspense fallback={<CardSectionsLoading dir='column' />}>
            <ItemSection
              title='Your favorite artists'
              session={session}
              endpoint='spotify/me/2/top/artists?limit=8&offset=0&time_range=long_term'
              headingUrl={`/section/${session?.user.id}/artists`}
              type={['top-artists']}
              limit={7}
              fields={{ type: 'artist', limit: 7 }}
            />
          </Suspense>
          <Suspense fallback={<CardSectionsLoading dir='column' />}>
            <ItemSection
              title='Jump back in'
              session={session}
              endpoint='spotify/me/2/albums?limit=8&offset=0'
              headingUrl={`/section/${session?.user.id}/albums`}
              type={['albums']}
              limit={7}
              fields={{ limit: 7, offset: 0 }}
            />
          </Suspense>
          <Suspense fallback={<CardSectionsLoading dir='column' />}>
            <ItemSection
              title='Your playlists'
              session={session}
              endpoint='spotify/me/2/playlists?limit=8&offset=0'
              headingUrl={`/section/${session?.user.id}/playlists`}
              type={['playlists']}
              limit={7}
              fields={{ limit: 7, offset: 0 }}
            />
          </Suspense>

          <Suspense fallback={<CardSectionsLoading dir='column' />}>
            <ItemSection
              title='Your shows'
              session={session}
              endpoint='spotify/me/2/shows?limit=8&offset=0'
              headingUrl={`/section/${session?.user.id}/shows`}
              type={['shows']}
              limit={7}
              fields={{ limit: 7, offset: 0 }}
            />
          </Suspense>
        </div>
      </section>
    </>
  )
}
