import React from 'react';
import Link from 'next/link';
import IconRenderer from './Icons';
import { Skeleton } from '@/app/components/ui/skeleton';

const SidebarItemRenderer = ({ userRoles }: { userRoles: string[] }) => {
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
    <>
      {filteredSidebarItems ? (
        filteredSidebarItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <div className="flex items-center my-8 cursor-pointer ml-4">
              <span className="ml-2 leading-5">{item.label}</span>
              {getIconComponent(item.label)}
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

