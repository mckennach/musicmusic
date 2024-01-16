import { Device } from '@spotify/web-api-ts-sdk'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { errorAtom, errorMessageAtom, sessionAtom } from '.'
// ====================
// Devices Atoms
// ====================

export const deviceModalOpenAtom = atom(false);

export const asyncAvailableDevicesAtom = atom(null, async (get, set) => {
  const accessToken = get(sessionAtom)?.user?.access_token
  if (!accessToken) return null
  // return;
  const resp = await fetch('https://api.spotify.com/v1/me/player/devices', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  })
  if (resp.status !== 200) {
    if (resp.status === 204) {
      set(noDeviceFoundAtom, true)
      set(errorMessageAtom, 'no-device')
      set(errorAtom, true)
      return
    }

    if (resp.status === 401 || resp.status === 403) {
      set(errorMessageAtom, 'unauthorized')
      set(errorAtom, true)
      return
    }

    if (resp.status === 429) {
      set(errorMessageAtom, 'limit')
      set(errorAtom, true)
      return
    }

    set(noDeviceFoundAtom, true)
    set(errorMessageAtom, 'no-device')
    set(errorAtom, true)
    return
  }
  const data: {
    devices: Device[]
  } = await resp.json()
  return set(availableDevicesAtom, data?.devices)
})

export const availableDevicesAtom = atomWithStorage<Device[] | null>(
  'devices',
  null
)
export const activeDeviceAtom = atom<Device | null>((get) => {
  const availableDevices = get(availableDevicesAtom)
  if (!availableDevices || availableDevices.length === 0) return null
  const activeDevice = availableDevices.find((device) => device.is_active)
  if (activeDevice) return activeDevice
  return null
})
export const activeDeviceTypeAtom = atom<
  'no-device' | 'computer' | 'speaker' | 'smartphone'
>((get) => {
  const activeDevice = get(activeDeviceAtom)
  if (!activeDevice) return 'no-device'
  if (activeDevice.type === 'Computer') return 'computer'
  if (activeDevice.type === 'Speaker') return 'speaker'
  if (activeDevice.type === 'Smartphone') return 'smartphone'
  return 'no-device'
})

export const noDeviceFoundAtom = atom(false)
