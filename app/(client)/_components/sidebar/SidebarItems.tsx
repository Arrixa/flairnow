import React, { useState } from 'react';
import Link from 'next/link';
import IconRenderer from './Icons';
import { Skeleton } from '@/app/components/ui/skeleton';
import TooltipIconRenderer from './TooltipIcons';
import { TooltipProvider } from '@/app/components/ui/tooltip';

const SidebarItemRenderer = ({ userRoles, isMenuOpen }: { userRoles: string[]; isMenuOpen: boolean }) => {
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

  const getTooltipIconComponent = (iconName: string) => {
    return <TooltipIconRenderer iconName={iconName} />;
  };

  const handleItemClick = (label: string) => {
    setSelectedItem(label === selectedItem ? null : label);
  };

  return (
    <>
    {filteredSidebarItems ? (
      filteredSidebarItems.map((item, index) => (
        <Link key={index} href={item.href} className=''>
          <div className={`flex items-center py-4 p-2 cursor-pointer hover:bg-muted active:bg-teal-400 ${selectedItem === item.label ? 'bg-muted' : 'hover:bg-muted'} transition-all`}
          onClick={() => handleItemClick(item.label)}
          >
            {isMenuOpen ? (
              <>
                {getIconComponent(item.label)}
                <span className="ml-2 leading-5">{item.label}</span>
              </>
            ) : (
              <TooltipProvider>
                {getTooltipIconComponent(item.label)}
              </TooltipProvider>
            )}
          </div>
        </Link>
      ))
    ) : (
      <Skeleton>Loading...</Skeleton>
    )}
  </>
  );
};

export default SidebarItemRenderer;

