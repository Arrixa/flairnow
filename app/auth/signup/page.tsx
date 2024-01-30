import SignUpForm from "@/app/components/SignUpForm";
import Image from "next/image";
import Link from "next/link";

const SignupPage = () => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-2 mx-auto py-10 xl:w-3/4 lg:w-10/12 md:w-10/12 sm:w-full ">
      {/* Desktop-only image */}
      <section className="hidden md:block">
        <Image
          src="/undraw_sign_up.svg"
          alt="Image"
          width={500} 
          height={300} 
          style={{objectFit: "cover"}}
        />
      </section>
      <section className="flex flex-col justify-center items-center xl:w-1/2 lg:w-2/3 mx-auto ">
        <div className="py-5">
          <h2 className="text-3xl font-bold text-center py-10">Sign up</h2>
          <div className="flex items-center justify-center">
            <h3 className="text-lg align-text-bottom">Create your &nbsp;</h3>
            <span className="inline-block align-text-bottom"> 
              <Image
              src="/FlairNow-Logo-Full-Text.svg"
              alt="Image"
              width={80} 
              height={50}
              />
            </span>
            <h3 className="text-lg align-text-bottom">&nbsp; account.</h3></div>
          </div>
        <div className="w-full md:w-auto"> 
          <SignUpForm />
        </div>
      <div className="flex justify-center items-center py-2">
        <p className="p-2">Already have an account?</p>
        <Link className="hover:underline text-primary" href={"/auth/signin"}>
          Sign in
        </Link>
      </div>
      </section>
    </main>
  );
};

export default SignupPage;