"use client";

import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const SigninButton = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-2">
      {session && session.user ? (
        <>
          <Link href={"/profile"}>{`${session.user.name}`}</Link>
          <Button onClick={() => signOut()}>Sign out</Button>
        </>
      ) : (
        <>
          <Button onClick={() => signIn()}>Sign in</Button>
          <Button>
            <Link href={"/auth/signup"}>
              Sign up
            </Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default SigninButton;