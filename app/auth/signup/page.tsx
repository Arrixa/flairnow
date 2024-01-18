import SignUpForm from "@/app/components/SignUpForm";
import Link from "next/link";

const SignupPage = () => {
  return (
    <div className="grid grid-cols-1justify-center items-center gap-3">
      <div className="flex justify-center items-center">
        <p className="p-2 text-lg font-bold">Already signed up?</p>
        <Link className="hover:underline" href={"/auth/signin"}>Sign in</Link>
      </div>
      <SignUpForm />
    </div>
  );
};

export default SignupPage;