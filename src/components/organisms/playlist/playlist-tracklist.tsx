import { Clock } from 'lucide-react'

import { TrackListHeaderItems } from '@/components/organisms/track-list'

const headerItems: TrackListHeaderItems[] = [
  {
    title: '#',
    value: 'index',
    className: 'w-6'
  },
  {
    title: 'Title',
    value: 'title'
  },
  {
    title: 'Album',
    value: 'album'
  },
  {
    title: 'Date added',
    value: 'date'
  },
  {
    title: 'Length',
    value: 'length',
    icon: <Clock size={16} className='mr-8' />
  }
]

export default async function PlaylistTracklist({ id }: { id: string }) {
  return <></>
}
