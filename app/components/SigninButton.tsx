"use client";

import { Session } from "next-auth";
import { Button } from "./ui/button";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SigninBtnProps {
  session?: Session | null, 
  onClick?: () => void;
}

const SigninButton: React.FC<SigninBtnProps> = ({ session }) => {
  const router = useRouter(); 

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' }); 
    router.replace('/'); 
  };

  return (
    <div className="flex items-center gap-2">
      {session && session.user ? (
        <>
          {session.role ? (
            <Link href="/dashboard/employee-profile">{`${session.user.username}`}</Link>
          ) : (
            <Link href="/profile">{`${session.user.username}`}</Link>
          )}
          <Button onClick={handleSignOut}>Sign out</Button>
        </>
      ) : (
        <>
          <Button onClick={() => signIn()}>Sign in</Button>
          <Button variant="flairnowOutline">
            <Link href="/auth/signup">Sign up</Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default SigninButton;