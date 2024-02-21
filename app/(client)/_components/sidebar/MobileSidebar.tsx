'use client'
import {
  LogOut,
  Menu,
} from "lucide-react"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import UserCard from "./UserCard";
import { SidebarCompProps } from "@/lib/interfaces";
import { CldImage } from 'next-cloudinary';import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { capitaliseFirstLetter } from '@/lib/capitiliseFirstLetter';
import IconRenderer from "./Icons";


const MobileSidebar: React.FC<SidebarCompProps> = ({ userRoles, session }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = session?.user;
  const router = useRouter();
  const logoUrl = `https://res.cloudinary.com/dsbvy1t2i/image/upload/v1707912829/${user.userDomain}.png`;

  const handleToggleMenu = () => {
    setIsMenuOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
    router.replace('/');
  };

    const sidebarItems = [
      { role: 'EMPLOYEE', label: 'Profile', href: '/dashboard/employee-profile' },
      { role: 'ADMIN', label: 'Admin dashboard', href: '/dashboard/admin' },
      { role: 'EMPLOYEE', label: 'Recruitment', href: '#' },
      { role: 'EMPLOYEE', label: 'Inbox', href: '#' },
      { role: 'ADMIN', label: 'Users', href: '#' },
      { role: 'EMPLOYEE', label: 'Preferences', href: '#' },
      { role: 'EMPLOYEE', label: 'Settings', href: '#' },
    ];
  
    let uniqueRoles: string[] = [];
    let filteredSidebarItems;
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
  
    // Get all unique roles of the user
    if (userRoles) {
      uniqueRoles = userRoles?.filter((role: string, index: number, roles: string[]) => roles.indexOf(role) === index);
    }
  
    // Filter sidebar items based on the user's roles
    if (sidebarItems) {
      filteredSidebarItems = sidebarItems.filter((item) => uniqueRoles.includes(item.role));
    }
  
    const getIconComponent = (iconName: string) => {
      return <IconRenderer iconName={iconName} />;
    };


  return (
    <DropdownMenu>
      <div className="flex items-center justify-between text-foreground">
        <DropdownMenuTrigger
          className="p-2 hover:scale-125"
          onClick={handleToggleMenu}
        >
          <Menu size={24} />
        </DropdownMenuTrigger>
        {isMenuOpen && (
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <Link href='/'>
                <CldImage alt={`${user?.userDomain} logo`} src={logoUrl} width={40} height={40} className="object-cover ml-5 my-2" />
              </Link>
              <span className="text-lg font-bold ml-4">{capitaliseFirstLetter(user?.userDomain)}</span>
            </DropdownMenuLabel>
            {filteredSidebarItems?.map((item, index) => (
              <DropdownMenuItem key={index}>
                <Link href={item.href} className="flex gap-4">
                  {getIconComponent(item.label)}
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem>
              <UserCard session={session} isMenuOpen={isMenuOpen} />
            </DropdownMenuItem>
            <DropdownMenuItem className="my-4">
              <button className="flex items-center cursor-pointer ml-4" onClick={handleSignOut}>
                <LogOut className="h-5 w-5 hover:scale-125" />
                <span className="ml-2">Sign out</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </div>
    </DropdownMenu>
  );
};

export default MobileSidebar;

