'use client'
 
import { Button } from './components/ui/button';
import { useEffect } from 'react'
import { Card, CardContent, CardFooter, CardTitle } from './components/ui/card'
import Link from 'next/link'
import renderLogo from './components/common/logos/LogoFull'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <Card className="p-5 my-10 flex flex-col bg-background w-2/3 lg:w-1/3 mx-auto">
      <CardTitle className="text-4xl py-4 text-center">Something went wrong!</CardTitle>
      <CardContent className="mx-auto mt-4">
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
      </CardContent>
      <CardFooter className="mx-auto">
        <Link href='/'>
          <span className="p-6">
            {renderLogo()}
          </span>
        </Link>
      </CardFooter>
    </Card>
  )
}