import SignInForm from "@/app/components/SignInForm";
import Link from "next/link";

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

const SigninPage = ({ searchParams }: Props) => {
  console.log({ searchParams });

  return (
    <div className="flex items-center justify-center flex-col py-10">
      <SignInForm  />
      <div className="flex justify-center items-center py-2">
      <p className="p-2">Don&apos;t have an account?</p>
      <Link className="hover:underline text-accent" href={"/auth/signup"}>
        Sign in
      </Link>
    </div>
      <Link href={"/auth/forgotPassword"} className="hover:underline">Forgot your password?</Link>
    </div>
  );
};

export default SigninPage;

// callbackUrl={searchParams.callbackUrl}