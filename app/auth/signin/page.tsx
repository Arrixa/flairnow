import SignInForm from "@/app/components/SignInForm";
import Image from "next/image";
import Link from "next/link";

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

const SigninPage = ({ searchParams }: Props) => {
  console.log({ searchParams });

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-2 mx-auto py-10 xl:w-3/4 lg:w-3/4 md:w-8/12 sm:w-full ">
    {/* Desktop-only image */}
      <section className="hidden md:block">
        <Image
          src="/undraw_sign_in.svg"
          alt="Image"
          width={500} 
          height={300} 
          style={{objectFit: "cover"}}
        />
      </section>
      <section className="flex flex-col justify-center items-center xl:w-1/2 lg:w-1/2 mx-auto ">
        <div className="py-5">
          <div className="flex flex-row justify-center items-center">
            <span><Image 
            src="/noun-hand-wave.svg"
            width={40}
            height={40}
            alt="Hand wave by Andy Horvath from 'https://thenounproject.com/browse/icons/term/hand-wave/' Noun Project (CC BY 3.0)"
            /></span> 
            <h2 className="text-3xl font-bold text-center py-5">&nbsp;Welcome back!</h2>
          </div>
          <div className="flex items-center justify-center">
            <h3 className="text-lg align-text-bottom">Login to securely access your account</h3>
          </div>
        <div className="w-full md:w-auto mt-10"> 
          <SignInForm  />
        </div>
      <div className="flex justify-center items-center py-2">
        <p className="p-2">Don&apos;t have an account?</p>
        <Link className="hover:underline text-accent" href={"/auth/signup"}>
          Sign up
        </Link>
      </div>
      </div>
    </section>
  </main>
  );
};

export default SigninPage;

// callbackUrl={searchParams.callbackUrl}