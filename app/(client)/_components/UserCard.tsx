"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface UserCardProps {
  // role: string[];
  session?: Session | null, 
  onClick?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ session }) => {
  return (
    <div className="bg-secondary p-6 rounded-b-md border-r-4 border-secondary">
      {session && session.user ? (
        <div className="flex flex-row gap-6">
          <div className="border rounded-full">
            <Image
              alt="avatar"
              src="/Avatar.png"
              width={60}
              height={60}
            ></Image>
            {/* <Avatar className="border m-2">
              <AvatarImage src="/Avatar.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar> */}
          </div>
          <div>
            <h4 className="text-lg font-semibold">{`${session.user.username}`}</h4>
            <Separator />
            <p>{`${session.client?.domain}`}</p>
          </div>
        </div>
      ) : (
        <>
          <Button onClick={() => signIn()}>Sign in</Button>
        </>
      )}
    </div>
  )
}

export default UserCard