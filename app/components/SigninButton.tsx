"use client";

import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const SigninButton = () => {
  const { data: session } = useSession();
  const clientId = session?.clientUser?.clientId;
  const role = session?.clientUser.role;
  console.log(session?.user, session?.clientUser, 'sesssion & role in sign in btn')


  return (
    <div className="flex items-center gap-2">
      {session && session.user ? (
        <>
          {/* {role ? (
            <Link href="/employee-profile">{`${session.user.name}`}</Link>
          ) : (
            <Link href="/profile">{`${session.user.name}`}</Link>
          )} */}
          <Link href="/profile">{`${session.user.name}`}</Link>
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