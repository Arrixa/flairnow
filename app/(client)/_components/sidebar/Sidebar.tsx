'use client'
import {
  ChevronsLeft,
  ChevronsRight,
  LogOut,
} from "lucide-react"
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { signOut } from "next-auth/react";
import UserCard from "./UserCard";
import SidebarItemRenderer from "./SidebarItems";
import { SidebarCompProps } from "@/lib/interfaces";
import { capitaliseFirstLetter } from '@/lib/capitiliseFirstLetter';
import { CldImage } from 'next-cloudinary';


const SidebarComp: React.FC<SidebarCompProps> = ({ userRoles, session }) => {
  const router = useRouter();
  const [scrollAreaHeight, setScrollAreaHeight] = useState<number | undefined>(undefined);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const user = session?.user;
  const logoCloudUrl = `https://res.cloudinary.com/dsbvy1t2i/image/upload/v1707912829/${user.userDomain}.png`;
  const [logoUrl, setLogoUrl] = useState<string>(logoCloudUrl);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isLargeScreen = window.innerWidth >= 1500;
      setIsMenuOpen(isLargeScreen);
      calculateScrollAreaHeight();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    calculateScrollAreaHeight();
  }, [scrollAreaHeight]);

  const calculateScrollAreaHeight = () => {
    if (scrollAreaRef.current) {
      const windowHeight = window.innerHeight;
      const userCardHeight = 120;
      const logoHeight = 167;
      const remainingHeight = windowHeight - userCardHeight - logoHeight;
      setScrollAreaHeight(remainingHeight);
    }
  };
  
  const handleToggleMenu = () => {
      setIsMenuOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
    router.replace('/');
  };

  const renderSidebarItems = () => {
    return <SidebarItemRenderer userRoles={userRoles} isMenuOpen={isMenuOpen} />;
  };

  
  return (
    <div className='bg-brand text-foreground relative h-full'>
      <div className={`flex flex-col h-full ${isMenuOpen ? 'sticky' : ''}`} style={{ left: isMenuOpen ? '0' : '-200px', top: '0', bottom: '0', height: '100vh' }}>
        <Link href='/'>
          <CldImage alt={`${user?.userDomain} logo`} src={logoUrl} width={40} height={40} className={`object-cover mt-10 ${isMenuOpen ? 'ml-6' : 'ml-2'}`} />         
        </Link>
        {/* Dashboard Label */}
        <div className="my-4 ml-6">
          {isMenuOpen ? <span className="text-lg font-bold">{capitaliseFirstLetter(user?.userDomain)}</span> : <></>}
        </div>

        {/* Sidebar Items */}
        <ScrollArea ref={scrollAreaRef} style={{ height: `${scrollAreaHeight}px` }} 
        > 
          {renderSidebarItems()}
        </ScrollArea>

        {/* UserCard */}
        <UserCard session={session} isMenuOpen={isMenuOpen} />

        {/* Sign Out */}
        <div className="my-4 ml-4">
          <button className="flex items-center cursor-pointer" onClick={handleSignOut}>
            <LogOut className="h-5 w-5 hover:scale-125" />
            {isMenuOpen ? <span className="ml-2">Sign out</span> : <></>}
          </button>
        </div>

      <div className="absolute top-0 right-0">
        <button
          className="p-2 hover:scale-125"
          onClick={handleToggleMenu}
        >
          {isMenuOpen ? <ChevronsLeft size={24} /> : <ChevronsRight className="mr-3 mb-3" size={24} />}
        </button>
      </div>
      </div>
    </div>
  );
};


export default SidebarComp;
