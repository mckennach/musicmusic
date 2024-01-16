// import { useAtom } from 'jotai'
// import { currentUserAtom } from '@/lib/atoms';
import { Button } from '@/components/ui/button'
export default function Home() {
  // const [currentUser, setCurrentUser] = useAtom(currentUserAtom)
  return (
    <div className='flex flex-col space-y-2 p-4 py-24'>
      <h1>Weclome</h1>
      <Button variant='default'>test</Button>
      <Button variant='destructive'>test</Button>
      <Button variant='ghost'>test</Button>
      <Button variant='link'>test</Button>
      <Button variant='outline'>test</Button>
      <Button variant='secondary'>test</Button>
    </div>
  )
}
