import LoginForm from "@/app/components/form/LoginForm";
import Link from "next/link";

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

const LoginPage = ({ searchParams }: Props) => {
  console.log({ searchParams });

  return (
    <div className='w-full'>
      <LoginForm  />
      <Link className="ext-center text-sm mt-2 text-blue-500 hover:underline" href={"/auth/forgotPassword"}>Forgot your password?</Link>
    </div>
  );
};

export default LoginPage;

/*
callbackUrl={searchParams.callbackUrl}
*/