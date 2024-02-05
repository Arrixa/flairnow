"use client";

import { Session } from "next-auth";
import { Button } from "../../../components/ui/button";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SquareUserRound } from "lucide-react";

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
      {session.user.username ? (
        <>
          {session?.clientUser.role ? (
            <Button variant="flairnowOutline">
              <Link href="/dashboard/employee-profile">{`${session.user.username}`}</Link>
            </Button>

          ) : (
            <Button variant="flairnowOutline">
              <Link href="/profile">{`${session.user.username}`}</Link>
            </Button>
          )}
          <Button onClick={handleSignOut}>Sign out</Button>
        </>
      ) : (
        <SquareUserRound />
      )}
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