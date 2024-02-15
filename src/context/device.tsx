'use client'

import { useEffect } from 'react'

import { activeDeviceAtom, availableDevicesAtom } from '@/lib/atoms'
import { AuthSession } from '@/types/database.ds'
import { Devices } from '@spotify/web-api-ts-sdk'
import { useAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'

export function DevicesProvider({
  children,
  devices,
  session
}: {
  children: React.ReactNode
  session: AuthSession | null
  devices: Devices | null
}) {
  const [, setAvailableDevices] = useAtom(availableDevicesAtom)
  const [, setActiveDevice] = useAtom(activeDeviceAtom)
  useHydrateAtoms([[availableDevicesAtom, devices?.devices || []]])

  useEffect(() => {
    const activeDevice =
      devices?.devices && devices.devices.filter((device) => device.is_active)
    if (activeDevice) {
      setActiveDevice(activeDevice[0])
    } else {
      setActiveDevice(null)
    }
  }, [session, devices, setActiveDevice, setAvailableDevices])

  return <>{children}</>
}
