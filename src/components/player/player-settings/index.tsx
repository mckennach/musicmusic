import React from 'react'
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
    return (
      <div ref={ref} {...props}>
        <div className='flex grow justify-end'>
          <NowPlayingButton />
          <QueueButton />
          <DevicesButton />
          <VolumeControl />
          <FullScreenButton />
        </div>
      </div>
    )
  }
)

PlayerSettings.displayName = 'PlayerSettings'

export { PlayerSettings }
