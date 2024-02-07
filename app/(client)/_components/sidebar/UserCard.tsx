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
  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="bg-secondary p-6 rounded-b-md border-r-4 border-secondary h-[120px] w-full">
      {session && session.user ? (
        <div className="flex flex-row gap-2">
          <div className="border rounded-full">
            <Image
              alt="avatar"
              src="/Avatar.png"
              width={80}
              height={80}
            ></Image>
          </div>
          <div className="min-w-fit">
            <h4 className="text-lg font-medium min-w-fit">{`${session.user.firstName} ${session.user.lastName}`}</h4>
            <Separator />
            <p>{`${session.client?.domain ? capitalizeFirstLetter(session.client.domain) : ''}`}</p>
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