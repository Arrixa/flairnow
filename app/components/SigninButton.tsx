"use client";

import { Button } from "@nextui-org/react";
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
          {/* <Button as={Link} href={"/api/auth/signin"}>Sign in</Button> */}
          <Button onClick={() => signIn()}>Sign in</Button>
          <Button as={Link} href={"/auth/signup"}>
            Sign up
          </Button>
        </>
      )}
    </div>
  );
};

export default SigninButton;