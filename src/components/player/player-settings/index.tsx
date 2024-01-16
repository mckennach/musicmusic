import React from 'react'
import { useAtomValue } from 'jotai'
import { sessionAtom } from '@/lib/atoms'
import {
  DevicesButton,
  FullScreenButton,
  NowPlayingButton,
  QueueButton
} from './setting-buttons'
import { VolumeControl } from './volume'

interface PlayerSettingsProps extends React.HTMLAttributes<HTMLDivElement> {}

const PlayerSettings = React.forwardRef<HTMLDivElement, PlayerSettingsProps>(
  ({ ...props }, ref) => {
    const session = useAtomValue(sessionAtom);
    return (
      <div ref={ref} {...props}>
        <div className='flex grow justify-end'>
          {session ? (
            <>
              <NowPlayingButton />
              <QueueButton />
              <DevicesButton />
              <VolumeControl />
              <FullScreenButton />
            </>
              
          ) : (
            <></>
          )}
        
        </div>
      </div>
    )
  }
)

PlayerSettings.displayName = 'PlayerSettings'

export { PlayerSettings }
