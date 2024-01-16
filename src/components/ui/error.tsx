'use client'
import { useStore } from '@/hooks'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
// import { ToastAction } from '@/components/ui/toast'
import { toast } from 'sonner'
// import { ToastAction } from "@/components/ui/toast"
// import { useToast } from '@/components/ui/use-toast'
import { errorAtom, errorMessageAtom } from '@/lib/atoms'
import { useAtom } from 'jotai'

export function Error() {
  // const { toast } = useToast()
  const router = useRouter()
  const store = useStore()
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
            setErrorMessage('')
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
            // if(session && session.user && status === 'authenticated') {
            //   const reAuth = store.reAuth(session);
            //   if(reAuth) {
            //     router.refresh();
            //     // store.update(session);
            //   }
            // }
          }
        })
        setShowMessage(true)
      }

    }
  }, [error, errorMessage])

  useEffect(() => {
    if (error && showMessage) {
      toast.error(title, {
        description,
        action
      })
      setShowMessage(false)
    }
  }, [showMessage, title, description, action, error])

  return null
}
