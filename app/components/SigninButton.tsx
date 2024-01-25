"use client";

import { Session } from "next-auth";
import { Button } from "./ui/button";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

interface SigninBtnProps {
  role: string[];
  session?: Session | null, 
  onClick?: () => void;
}

const SigninButton: React.FC<SigninBtnProps> = ({ role, session }) => {

  return (
    <div className="flex items-center gap-2">
      {session && session.user ? (
        <>
          {role ? (
            <Link href="/dashboard/employee-profile">{`${session.user.name}`}</Link>
          ) : (
            <Link href="/profile">{`${session.user.name}`}</Link>
          )}
          <Button onClick={() => signOut()}>Sign out</Button>
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