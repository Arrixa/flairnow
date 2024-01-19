import SigninButton from "./SigninButton";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";

const Appbar = () => {
  return (
    <nav className=' bg-secondary py-2 flex flex-row w-full z-10 top-0'>
      <div className='container flex items-center gap-4'>
        <Link href='/'>
          <Image
            src="/FlairNow-Logo.png"
            alt="Image"
            width={30} 
            height={30}
          />
        </Link>
          <Link className="text-sm text-slate-100 hover:text-accent" href={"/profile"}>
            User Profile
          </Link>
          <Link className="text-sm text-slate-100 hover:text-accent" href={"/admin"}>
            Admin Dashboard
          </Link>
      </div>
      <div className='container flex items-center gap-4'>
        <div className="flex flex-row ml-auto gap-4">
          <ModeToggle />
          <SigninButton />
        </div>
      </div>
    </nav>
  );
};

export default Appbar;