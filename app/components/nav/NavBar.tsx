import SigninButton from "./SigninButton";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const NavBar = async () => {
  const session = await getServerSession(authOptions);
  
  return (
    <nav className=' bg-background border-b-4 border-secondary py-2 flex flex-row z-10 top-0 w-full'>
      <div className='container flex items-center' >
        {session?.clientUser.role ? (
          <Link href="/dashboard/employee-profile">
              <Image
              src="/FlairNow-Logo.svg"
              alt="Logo"
              width={40} 
              height={40}
            />
          </Link>
        ) : (
          <Link href='/'>
            <Image
              src="/FlairNow-Logo.svg"
              alt="Logo"
              width={40} 
              height={40}
            />
          </Link>
        )}    
      </div>
      <div className='container flex items-center gap-4'>
        <div className="flex flex-row ml-auto gap-4">
          <ModeToggle />
          <SigninButton session={session}/>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;