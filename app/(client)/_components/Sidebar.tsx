'use client';

import { Sidebar } from 'flowbite-react';
import { useSession } from 'next-auth/react';
import { HiAdjustmentsHorizontal, HiArrowLeftOnRectangle, HiArrowRightOnRectangle, HiArrowSmallRight, HiBriefcase, HiBuildingOffice, HiCog8Tooth, HiInbox, HiUser } from 'react-icons/hi2';

const SidebarComp = () => {
  const { data: session } = useSession();
  const userRoles = session?.clientUser.role ?? [];

  interface SidebarItem {
    role: string;
    icon: React.ComponentType;
    label: string;
    href: string;
  }

  // Define a list of possible sidebar items with their associated roles
  const sidebarItems: SidebarItem[] = [
    { role: 'ADMIN', icon: HiBuildingOffice, label: 'Admin dashboard', href: '/dashboard/admin' },
    { role: 'EMPLOYEE', icon: HiBriefcase, label: 'Recruitment', href: '#' },
    { role: 'EMPLOYEE', icon: HiInbox, label: 'Inbox', href: '#' },
    { role: 'ADMIN', icon: HiUser, label: 'Users', href: '#' },
    { role: 'EMPLOYEE', icon: HiAdjustmentsHorizontal, label: 'Preferences', href: '#' },
    { role: 'EMPLOYEE', icon: HiCog8Tooth, label: 'Settings', href: '#' },
    { role: 'EMPLOYEE', icon: HiArrowRightOnRectangle, label: 'Sign out', href: '#' },
  ];

  // Get all unique roles of the user
  const uniqueRoles: string[] = userRoles.filter((role: string, index: number, roles: string[]) => roles.indexOf(role) === index);

  // Filter sidebar items based on the user's roles
  const filteredSidebarItems: SidebarItem[] = sidebarItems.filter(item => uniqueRoles.includes(item.role));

  return (
    <Sidebar aria-label="Client dashboard sidebar" className='border-none w-auto m-4'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
        {filteredSidebarItems.length > 0 ? (
            filteredSidebarItems.map((item, index) => (
              <Sidebar.Item key={index} href={item.href} icon={item.icon}>
                {item.label}
              </Sidebar.Item>
            ))
          ) : (
            <Sidebar.Item href="#" icon={HiArrowSmallRight}>
              No Access
            </Sidebar.Item>
          )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default SidebarComp

