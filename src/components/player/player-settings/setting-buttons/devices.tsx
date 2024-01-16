import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useAtom } from 'jotai'
import React from 'react'
// import Icon from '@/components/ui/icon'
import { activeDeviceTypeAtom } from '@/lib/atoms'
import { cn } from '@/lib/utils'
import { Laptop2, MonitorSpeaker, Smartphone, Speaker } from 'lucide-react'
interface DevicesButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

const DevicesButton = React.forwardRef<HTMLButtonElement, DevicesButtonProps>(
  ({ className, ...props }, ref) => {
    const [activeDevice, setActiveDevice] = useAtom(activeDeviceTypeAtom)
    return (
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                // onClick={() => setDevicesButtonState(!DevicesButtonState)}
                ref={ref}
                size='icon'
                {...props}
                className={cn(
                  `h-8 w-8 rounded-full p-2`,
                  `bg-transparent text-foreground opacity-70 hover:bg-transparent hover:opacity-100 active:bg-transparent`,
                  activeDevice !== 'no-device' &&
                    'text-spotify opacity-100 hover:scale-100',
                  activeDevice !== 'no-device' &&
                    'after:absolute after:bottom-0 after:left-1/2 after:z-[-1] after:h-1 after:w-1 after:translate-x-[-50%] after:rounded-full after:bg-spotify after:opacity-100'
                )}
                scale={true}
              >
                {activeDevice === 'no-device' && <MonitorSpeaker size={16} />}
                {activeDevice === 'computer' && <Laptop2 size={16} />}
                {activeDevice === 'smartphone' && <Smartphone size={16} />}
                {activeDevice === 'speaker' && <Speaker size={16} />}
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side='top' align='center'>
            Connect to a device
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent side='top' align='center'>
          <DropdownMenuItem>DEVICE</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)

DevicesButton.displayName = 'DevicesButton'

export { DevicesButton }
