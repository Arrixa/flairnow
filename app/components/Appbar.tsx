import SigninButton from "./SigninButton";
import Link from "next/link";
import { Home } from 'lucide-react';
import { ModeToggle } from "./ModeToggle";

const Appbar = () => {
  return (
    <nav className=' bg-slate-700 py-2 border-b border-s-zinc-200 flex flex-row w-full z-10 top-0'>
      <div className='container flex items-center gap-4'>
        <Link href='/'>
          <Home className="text-slate-100 hover:text-sky-400" />
        </Link>
          <Link className="text-sm text-slate-100 hover:text-sky-400" href={"/profile"}>
            User Profile
          </Link>
          <Link className="text-sm text-slate-100 hover:text-sky-400" href={"/admin"}>
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