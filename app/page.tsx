import { buttonVariants } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1 className='text-4xl py-5'>Home</h1>
      <Link className={buttonVariants()} href='admin'>Open admin dashboard</Link>
    </main>
  )
}
