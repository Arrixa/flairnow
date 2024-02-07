import Image from "next/image";
import Link from "next/link";
import EmailSignIn from "../../_components/auth/EmailSignin";
import { Label } from "@/app/components/ui/label";


const SigninPage = () => {

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-2 mx-auto py-10 xl:w-3/4 lg:w-10/12 md:w-10/12 sm:w-full ">
    {/* Desktop-only image */}
      <section className="hidden md:block">
        <Image
          src="/images/undraw_sign_in.svg"
          alt="Image"
          width={500} 
          height={300} 
          style={{objectFit: "cover"}}
        />
      </section>
      <section className="flex flex-col justify-center items-center xl:w-1/2 lg:w-2/3 w-3/4 mx-auto ">
        <div className="py-5">
          <div className="flex flex-row justify-center items-center">
            <h2 className="text-3xl font-bold text-center py-5">Get started!</h2>
          </div>
          <div className="flex items-center justify-center ">
            <h3 className="px-8 text-md align-text-bottom text-center">Enter your email to get a sign in link sent to your inbox.</h3>
          </div>
        <div className="w-full md:w-auto mt-10"> 
          <EmailSignIn />
        </div>
        <div className="flex items-center justify-center">
        <Label className="px-3 m-6 text-center text-sm">By continuing you agree to the FlairNow <Link href="/terms" className='hover:underline text-primary'>Terms </Link>and <Link href="/policy" className='hover:underline text-primary'>Privacy Policy </Link></Label>
        </div>
      </div>
    </section>
  </main>
  );
};

export default SigninPage;
