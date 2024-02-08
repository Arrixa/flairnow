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
    <div className="mx-auto bg-background h-[100px] w-full">
      {session && session.user ? (
        <div className="flex flex-row gap-2 p-2 ml-4">
          <div className="min-w-fit">
            <h4 className="text-lg font-medium text-foreground min-w-fit">{`${session.user.firstName} ${session.user.lastName}`}</h4>
            <Separator />
            <p className="text-foreground">{`${session.client?.domain ? capitalizeFirstLetter(session.client.domain) : ''}`}</p>
          </div>
          <div className="border rounded-full">
            <Image
              alt="avatar"
              src="/Avatar.png"
              width={60}
              height={60}
            ></Image>
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