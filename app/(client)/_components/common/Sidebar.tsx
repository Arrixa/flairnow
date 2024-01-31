'use client';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Sidebar } from 'flowbite-react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HiAdjustmentsHorizontal, HiArrowRightOnRectangle, HiArrowSmallRight, HiBriefcase, HiBuildingOffice, HiCog8Tooth, HiInbox, HiUser, HiUsers } from 'react-icons/hi2';
interface SidebarCompProps {
  userRoles: string[];
  onClick?: () => void;
}

const SidebarComp: React.FC<SidebarCompProps> = ({ userRoles })  => {
  const router = useRouter(); 

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' }); 
    router.replace('/'); 
  };

  // Define a list of possible sidebar items with their associated roles
  const sidebarItems = [
    { role: 'EMPLOYEE', icon: HiUser, label: 'Profile', href: '/dashboard/employee-profile' },
    { role: 'ADMIN', icon: HiBuildingOffice, label: 'Admin dashboard', href: '/dashboard/admin' },
    { role: 'EMPLOYEE', icon: HiBriefcase, label: 'Recruitment', href: '#' },
    { role: 'EMPLOYEE', icon: HiInbox, label: 'Inbox', href: '#' },
    { role: 'ADMIN', icon: HiUsers, label: 'Users', href: '#' },
    { role: 'EMPLOYEE', icon: HiAdjustmentsHorizontal, label: 'Preferences', href: '#' },
    { role: 'EMPLOYEE', icon: HiCog8Tooth, label: 'Settings', href: '#' },
    { role: 'EMPLOYEE', icon: HiBriefcase, label: 'Recruitment', href: '#' },
    { role: 'EMPLOYEE', icon: HiInbox, label: 'Inbox', href: '#' },
    { role: 'ADMIN', icon: HiUsers, label: 'Users', href: '#' },
    { role: 'EMPLOYEE', icon: HiAdjustmentsHorizontal, label: 'Preferences', href: '#' },
    { role: 'EMPLOYEE', icon: HiCog8Tooth, label: 'Settings', href: '#' },

  ];

  // Get all unique roles of the user
  const uniqueRoles: string[] = userRoles.filter((role: string, index: number, roles: string[]) => roles.indexOf(role) === index);

  // Filter sidebar items based on the user's roles
  const filteredSidebarItems = sidebarItems.filter(item => uniqueRoles.includes(item.role));

  return (
    <div className='border-r-4 border-secondary h-auto'>
      <Sidebar aria-label="Client dashboard sidebar" className='border-none w-auto m-4'>
        <Link href='/dashboard'>
          <Image
            src="/FlairNow-Logo-Full-Text.svg"
            alt="Text logo"
            width={150} 
            height={90} 
          />
        </Link>
        <Sidebar.Items>
        <ScrollArea className="h-[600px]">
          <Sidebar.ItemGroup>
          {filteredSidebarItems.length > 0 ? (
              filteredSidebarItems.map((item, index) => (
                <Sidebar.Item key={index} href={item.href} icon={item.icon}>
                  {item.label}
                </Sidebar.Item>
              ))
              
            ) : (
              <Sidebar.Item href="#" icon={HiArrowSmallRight}>
                No role access
              </Sidebar.Item>
            )}
             <button className="flex items-center mr-5 py-2" onClick={handleSignOut}>
              <HiArrowRightOnRectangle className="mx-2" />
              Sign out
            </button>
          </Sidebar.ItemGroup>
          </ScrollArea>
        </Sidebar.Items>
      </Sidebar>
    </div>
  )
}

export default SidebarComp;

