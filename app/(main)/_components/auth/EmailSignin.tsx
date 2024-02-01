'use client'

import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'

interface FormDataEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement & {
    email: HTMLInputElement;
  };
}

export default function EmailSignIn() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  async function handleSubmit(event: FormDataEvent) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const email = formData.get('email')
    signIn('resend', { email, callbackUrl })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='space-y-2'>
        <Input
          id='email'
          name='email'
          type='email'
          // label='Sign in with your email'
          placeholder='hello@me.com'
          autoComplete='email'
          required
        />
      </div>
      <Button
        type='submit'
        variant='flairnow'
        className='mt-3 w-full'
      >
        Continue with email
      </Button>
    </form>
  )
}