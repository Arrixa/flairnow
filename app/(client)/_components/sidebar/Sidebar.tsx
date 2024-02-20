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
import renderLogo from "@/app/components/common/logos/LogoFullText";
import renderSquareLogo from "@/app/components/common/logos/LogoSquare";
import { SidebarCompProps } from "@/lib/interfaces";


const SidebarComp: React.FC<SidebarCompProps> = ({ userRoles, session }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const router = useRouter();
  const [scrollAreaHeight, setScrollAreaHeight] = useState<number | undefined>(undefined);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check screen size on mount
    const handleResize = () => {
      const isLargeScreen = window.innerWidth >= 768;
      setIsMenuOpen(isLargeScreen);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const calculateScrollAreaHeight = () => {
      if (scrollAreaRef.current) {
        const windowHeight = window.innerHeight;
        const userCardHeight = 120;
        const logoHeight = 167;
        const remainingHeight = windowHeight - userCardHeight - logoHeight;
        setScrollAreaHeight(remainingHeight);
      }
    };
    calculateScrollAreaHeight();
    const handleResize = () => {
      calculateScrollAreaHeight();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <div className={`bg-brand text-foreground relative h-full `}>
      <div className="flex flex-col h-full">
        <Link href='/'>
          {isMenuOpen ? (
            <div className="ml-4">
              {renderLogo()}
            </div>
          ) : (
            <div className="m-4 mt-10">
              {renderSquareLogo()}
            </div>
          )}
        </Link>
        {/* Dashboard Label */}
        <div className="mb-4 ml-4">
          {isMenuOpen ? <span className="text-lg font-bold">Dashboard</span> : <></>}
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
      </div>
      
      <div className="absolute top-0 right-0">
        <button
          className="p-2 hover:scale-125"
          onClick={handleToggleMenu}
        >
          {isMenuOpen ? <ChevronsLeft size={24} /> : <ChevronsRight className="mr-6" size={24} />}
        </button>
      </div>
    </div>
  );
};


export default SidebarComp;
