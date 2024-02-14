'use client'
import {
  ChevronLeft,
  ChevronRight,
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
        const logoHeight = 182;
        // Calculate the remaining height
        const remainingHeight = windowHeight - userCardHeight - logoHeight;
        // Set the ScrollArea height
        setScrollAreaHeight(remainingHeight);
      }
    };
    // Calculate initial height
    calculateScrollAreaHeight();
    // Recalculate on window resize
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
    return <SidebarItemRenderer userRoles={userRoles} />;
  };

  
  return (
    <div className={`bg-secondary text-foreground relative h-full min-h-screen w-[240px] ${isMenuOpen ? 'transition-all ease-in-out duration-300 left-0' : 'transition-none left-[-180px]'}`}>
      <div className="flex flex-col h-full">
        <Link href='/'>
          <div className="ml-6 my-4">
            {renderLogo()}
          </div>
        </Link>
        {/* Dashboard Label */}
        <div className="mb-4">
          <span className="text-lg font-bold ml-6">Dashboard</span>
        </div>

        {/* Sidebar Items */}
        <ScrollArea ref={scrollAreaRef} style={{ height: `${scrollAreaHeight}px` }} 
        // className="h-[`${scrollAreaHeight}px`]"
        > 
          {renderSidebarItems()}
        </ScrollArea>

        {/* UserCard */}
        <UserCard session={session} />

        {/* Sign Out */}
        <div className="mt-4 ml-6">
          <button className="flex items-center cursor-pointer" onClick={handleSignOut}>
            <span>Sign out</span>
            <LogOut className="absolute right-0 mr-4 h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="absolute top-0 right-0">
        <button
          className="p-2"
          onClick={handleToggleMenu}
        >
          {isMenuOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>
    </div>
  );
};


export default SidebarComp;
