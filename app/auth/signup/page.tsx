import SignUpForm from "@/app/components/SignUpForm";
import Image from "next/image";
import Link from "next/link";

const SignupPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-2 mx-auto py-10 xl:w-3/4 lg:w-3/4 md:w-8/12 sm:w-full ">
    {/* Desktop-only image */}
    <div className="hidden md:block">
      <Image
        src="/undraw_career_development.svg"
        alt="Image"
      width={500} 
      height={300} 
      objectFit="cover"
      />
    </div>
  
    <div className="flex flex-col justify-center items-center xl:w-1/2 lg:w-1/2 mx-auto ">
      <div className="flex justify-center items-center">
        <p className="p-2 text-lg font-bold">Already signed up?</p>
        <Link className="hover:underline" href={"/auth/signin"}>
          Sign in
        </Link>
      </div>
      <div className="w-full md:w-auto"> 
      <SignUpForm />
    </div>
    </div>
  </div>
  );
};

export default SignupPage;