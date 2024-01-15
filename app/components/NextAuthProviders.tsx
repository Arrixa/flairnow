import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Image from "next/image";

const NextAuthProviders = () => {
  const googleSignIn = async () => {
    const result = await signIn("google", {
      callbackUrl: "/",
    });
    console.log({ result });
  };
  return (
    <div className="flex justify-center items-center p-4 border-t m-3">
      <Button onClick={googleSignIn}>
        <Image src="/google.svg" alt="Google logo" width={40} height={40}></Image>
        Sign in with Google
        </Button>
    </div>
  );
};

export default NextAuthProviders;
