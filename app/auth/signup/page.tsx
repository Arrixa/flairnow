import SignUpForm from "@/app/components/SignUpForm";
import Link from "next/link";

const SignupPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-3">
      <div className="md:col-span-2 flex justify-center items-center">
        <p className="text-center p-2 text-xl font-extrabold">Already signed up?</p>
        <Link href={"/auth/signin"}>Sign in</Link>
      </div>
      <SignUpForm />
    </div>
  );
};

export default SignupPage;