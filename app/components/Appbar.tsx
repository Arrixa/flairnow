import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle
} from "@/app/components/ui/navigation-menu"
import SigninButton from "./SigninButton";
import Link from "next/link";
import { Home } from 'lucide-react';
import { buttonVariants } from './ui/button';

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
        <div className="ml-auto gap-4">
          <SigninButton />
        </div>
      </div>
    </nav>

    // <Navbar isBordered maxWidth={'full'}>
    //   <NavbarContent className="sm:flex gap-4" justify="center">
    //     <NavbarItem className="flex gap-4 p-10">
    //       <Link className="text-gray-800 hover:text-sky-400" href={"/"}>
    //         Home
          // </Link>
          // <Link className="text-gray-800 hover:text-sky-400" href={"/profile"}>
          //   User Profile
          // </Link>
          // <Link className="text-gray-800 hover:text-sky-400" href={"/admin"}>
          //   Admin Dashboard
          // </Link>
    //     </NavbarItem>
    //   </NavbarContent>
    //   <NavbarContent justify="end">
    //     <NavbarItem>
    //       <SigninButton />
    //     </NavbarItem>
    //   </NavbarContent>
    // </Navbar>
  );
};

export default Appbar;