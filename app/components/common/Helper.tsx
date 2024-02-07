// How to update session on the client side
"use client"
import { Button } from '@/app/components/ui/button';
import { useSession } from 'next-auth/react';

const Helper = () => {
  const { data: session, update } = useSession();
  // Only works if you add if(trigger === 'update'){ return {...token, ...session}} to the JWT callback in nextauth route
  async function updateSession() {
    await update({
      ...session?.user,
      firstName: "UPDATE", lastName: "SESSION"
    })
  }
  return (
    <div>
      <Button onClick={updateSession}>Update Session</Button>
    </div>
  )
}

export default Helper
