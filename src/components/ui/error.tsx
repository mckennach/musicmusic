'use client'
import { useStore } from '@/hooks'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
// import { ToastAction } from '@/components/ui/toast'
import { toast } from 'sonner'
// import { ToastAction } from "@/components/ui/toast"
// import { useToast } from '@/components/ui/use-toast'
import { errorAtom, errorMessageAtom, deviceModalOpenAtom } from '@/lib/atoms'
import { useAtom } from 'jotai'

export function Error() {
  // const { toast } = useToast()
  const router = useRouter()
  const store = useStore();
  const [deviceModalOpen, setDeviceModalOpen] = useAtom(deviceModalOpenAtom);
  const { data: session, status }: any = useSession()
  const [error, setError] = useAtom(errorAtom)
  const [errorMessage, setErrorMessage] = useAtom(errorMessageAtom)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [action, setAction] = useState({
    label: '',
    onClick: () => {}
  })

  const [showMessage, setShowMessage] = useState<boolean>(false)

  useEffect(() => {
    if(showMessage) return;
    if (error) {
      if (errorMessage === 'no-device') {
        setTitle('No Device Found.')
        setDescription(
          'No Device Found, Please Open Spotify on a Device and play to activate.'
        )
        setAction({
          label: 'Open Spotify',
          onClick: () => {
            window.open('https://open.spotify.com/', '_blank')
            setError(false)
            setErrorMessage('');
            setDeviceModalOpen(true);
          }
        })
        setShowMessage(true)
      }

      if (errorMessage === 'unauthorized') {
        setTitle('Unauthorized.')
        setDescription('Click update to reauthorize.')
        setAction({
          label: 'Login',
          onClick: () => {
            store.reAuth()
          }
        })
        setShowMessage(true)
      }
    }
  }, [error, errorMessage, showMessage, setError, setErrorMessage, setShowMessage, setDeviceModalOpen, store])

  useEffect(() => {
    if (error && showMessage) {
      toast.error(title, {
        description,
        action,
        duration: 100000,
        onDismiss: () => {
          setShowMessage(false)
        }
      })
    }
  }, [showMessage, title, description, action, error, setShowMessage])

  return null
}
