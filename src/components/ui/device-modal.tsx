import React from 'react';
import { useAtom } from 'jotai';
import { asyncAvailableDevicesAtom, deviceModalOpenAtom, availableDevicesAtom } from '@/lib/atoms';
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Laptop2, MonitorSpeaker, Smartphone, Speaker } from 'lucide-react'
import { useSpotify } from '@/hooks';

const DeviceModal = ({ ...props }) => {
  const spotify = useSpotify();``
  const [deviceModalOpen, setDeviceModalOpen] = useAtom(deviceModalOpenAtom);
  const [availableDevices, setAvailableDevices] = useAtom(availableDevicesAtom);
  const [, syncActiveDevice] = useAtom(asyncAvailableDevicesAtom);
  
  
  
  const handleDeviceChange = async (device: SpotifyApi.UserDevice) => {
    if(device && device.id) { 
      await spotify.transferMyPlayback([device.id]);
      await syncActiveDevice();
      setDeviceModalOpen(false);
    }
  }
  return (
    <Drawer open={deviceModalOpen} onOpenChange={(open) => {
      setDeviceModalOpen(open);
    }}>
      <DrawerContent>
        <DrawerHeader className="flex flex-col items-center justify-center">
          <DrawerTitle className="text-2xl text-spotify">Select a device</DrawerTitle>
          <DrawerDescription>Select a device to play music</DrawerDescription>
        </DrawerHeader>
        <div className="max-w-lg mx-auto flex flex-col items-center justify-center">
          {availableDevices && availableDevices.map((device) => (
            <Button
            variant="link"
            className="flex gap-2 justify-start"
            onClick={() => handleDeviceChange(device)}
              key={device.id}>
              {device.type.toLowerCase() === 'computer' && <Laptop2 size={22} />}
              {device.type.toLowerCase() === 'smartphone' && <Smartphone size={22} />}
              {device.type.toLowerCase() === 'speaker' && <Speaker size={22} />}
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

export { DeviceModal }