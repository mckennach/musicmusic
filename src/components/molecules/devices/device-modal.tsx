import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer'
import { availableDevicesAtom, deviceModalOpenAtom } from '@/lib/atoms'
import { useAtom } from 'jotai'
import { useSession } from 'next-auth/react'
import { DeviceButton } from './device-button'

interface DeviceModalProps {
  open: boolean
  onOpenChange?: (open: boolean) => void
  displayName?: string
}

export function DeviceModal({ ...props }: DeviceModalProps) {
  const { data: session } = useSession()

  const [availableDevices] = useAtom(availableDevicesAtom)
  const [deviceModalOpen, setDeviceModalOpen] = useAtom(deviceModalOpenAtom)
  return (
    <Drawer {...props} open={deviceModalOpen}>
      <DrawerContent className='min-h-1/2'>
        <DrawerHeader className='flex flex-col items-center justify-center'>
          <DrawerTitle className='text-2xl md:text-4xl text-spotify'>
            Select a device
          </DrawerTitle>
          <DrawerDescription>Select a device to play music</DrawerDescription>
        </DrawerHeader>
        <div className='max-w-lg mx-auto flex flex-col items-center justify-center'>
          {availableDevices &&
            availableDevices.map((device) => (
              <DeviceButton
                variant='ghost'
                className='flex gap-2 justify-start'
                key={device.id}
                device={device}
              />
            ))}
        </div>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
