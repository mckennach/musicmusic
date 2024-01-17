
import { Card } from "@components/ui/card"

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className='h-full  overflow-hidden'>
      
      <Card className='h-full overflow-x-hidden overflow-y-scroll border-none @container'>
          <div className="min-h-16"/>
        {children}
      </Card>
    </main>
  )
}