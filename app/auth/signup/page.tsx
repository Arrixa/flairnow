import SignUpForm from "@/app/components/SignUpForm";
import Image from "next/image";
import Link from "next/link";

const SignupPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-2 mx-auto py-10 xl:w-3/4 lg:w-3/4 md:w-8/12 sm:w-full ">
    {/* Desktop-only image */}
    <div className="hidden md:block">
      <Image
        src="/undraw_job_hunt.svg"
        alt="Image"
        width={500} 
        height={300} 
        style={{objectFit: "cover"}}
      />
    </div>
    <div className="flex flex-col justify-center items-center xl:w-1/2 lg:w-1/2 mx-auto ">
      <div className="py-5">
        <h2 className="text-3xl font-bold text-center py-5">Sign up</h2>
        <div className="flex justify-center items-center">
          <h3>Create your &nbsp;</h3>
          <span> 
            <Image
            src="/FlairNow-Logo-Full-Text.png"
            alt="Image"
            width={80} 
            height={50}
            />
          </span>
          <h3>&nbsp; account.</h3></div>
      </div>
      <div className="w-full md:w-auto"> 
        <SignUpForm />
      </div>
    <div className="flex justify-center items-center py-2">
      <p className="p-2">Already have an account?</p>
      <Link className="hover:underline text-accent" href={"/auth/signin"}>
        Sign in
      </Link>
    </div>
    </div>
  </div>
  );
};

export default SignupPage;