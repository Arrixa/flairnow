"use client";

import { Button } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

const SigninButton = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-2">
      {session && session.user ? (
        <>
          <Link href={"/profile"}>{`${session.user.fullname}`}</Link>
          <Link
            className="text-sky-500 hover:text-sky-600 transition-colors"
            href={"/api/auth/signout"}
          >
            Sign out
          </Link>
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