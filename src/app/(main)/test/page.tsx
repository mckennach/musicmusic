'use client'

import { Card } from '@/components/ui/card'
import { libraryAtom, libraryItemsAtom } from '@/lib/atoms'
import { useAtom } from 'jotai'
export default function Test() {
  const [library, setLibrary] = useAtom(libraryAtom)
  const [libraryItems, setLibraryItems] = useAtom(libraryItemsAtom)

  return (
    <div className='space-y-2 px-4 py-24 text-xs'>
      <Card className='bg-card p-2 text-card-foreground'>
        <pre>
          <code>{JSON.stringify(libraryItems, null, 2)}</code>
        </pre>
      </Card>

      <Card className='bg-card p-2 text-card-foreground'>
        <pre>
          <code>{JSON.stringify(library, null, 2)}</code>
        </pre>
      </Card>
    </div>
  )
}
