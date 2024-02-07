import {
  asyncAvailableDevicesAtom,
  availableDevicesAtom,
  sessionAtom
} from '@/lib/atoms'
import { transferPlayBack } from '@/services/server'
import { useAtom } from 'jotai'
import { Laptop2, Smartphone, Speaker } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer'

interface DeviceModalProps {
  open: boolean
  onOpenChange?: (open: boolean) => void
  displayName?: string
}

export function DeviceModal({ ...props }: DeviceModalProps) {
  const [session] = useAtom(sessionAtom)
  const router = useRouter()
  // const [deviceModalOpen, setDeviceModalOpen] = useAtom(deviceModalOpenAtom)
  const [availableDevices, setAvailableDevices] = useAtom(availableDevicesAtom)
  const [, syncActiveDevice] = useAtom(asyncAvailableDevicesAtom)

  const handleDeviceChange = async (device: SpotifyApi.UserDevice) => {
    if (device && device.id && session) {
      const playback = await transferPlayBack(session, [device.id], false)
      if (playback) {
        router.refresh()
        // syncActiveDevice()
      }
    }
  }
  return (
    <Drawer
      {...props}
      // open={open}
      // open={open}
      // onOpenChange={(open) => {
      //   // setDeviceModalOpen(open)
      // }}
    >
      <DrawerContent>
        <DrawerHeader className='flex flex-col items-center justify-center'>
          <DrawerTitle className='text-2xl md:text-4xl text-spotify'>
            Select a device
          </DrawerTitle>
          <DrawerDescription>Select a device to play music</DrawerDescription>
        </DrawerHeader>
        <div className='max-w-lg mx-auto flex flex-col items-center justify-center'>
          {availableDevices &&
            availableDevices.map((device) => (
              <Button
                variant='link'
                className='flex gap-2 justify-start'
                onClick={() => handleDeviceChange(device)}
                key={device.id}
              >
                {device.type.toLowerCase() === 'computer' && (
                  <Laptop2 size={22} />
                )}
                {device.type.toLowerCase() === 'smartphone' && (
                  <Smartphone size={22} />
                )}
                {device.type.toLowerCase() === 'speaker' && (
                  <Speaker size={22} />
                )}
                {device.name}
              </Button>
            ))}
        </div>
        <DrawerFooter>
          {/* <Button variant="ghost" onClick={() => setDeviceModalOpen(false)}>Cancel</Button>
          <Button>Save</Button> */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
