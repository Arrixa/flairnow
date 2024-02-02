"use client"
import Image from "next/image";
import { Button } from "../components/ui/button";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, update } = useSession();
  // Only works if you add if(trigger === 'update'){ return {...token, ...session}} to the JWT callback in nextauth route
  async function updateSession() {
    await update({
      ...session?.user,
      username: "UPDATE SESSION"
    })
  }
  return (
    <main className="p-10">
      <div className='flex items-center justify-center'>
        <Image
          src="/FlairNow-Logo-Full.svg"
          alt="Image"
          // fill={true}
          width={300}
          height={100}
        />
        {/* How to update session on the client side */}
        {/* <div>
          <Button variant='flairnow' onClick={updateSession}>
            Update session
          </Button>
          <Button variant='flairnow' onClick={() => console.log({ session })}>
            Log session
          </Button>
        </div> */}
      </div>
    </main>
  )
}
