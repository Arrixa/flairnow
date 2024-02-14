'use client'
import SidebarComp from "../_components/sidebar/Sidebar";
import { useSession } from "next-auth/react";
import { Session } from '@/lib/interfaces';

const Sidebar = () => {
  const { data: session } = useSession();
  const userRoles = session?.role;

  return (
    <div className="w-fit">
      <SidebarComp userRoles={userRoles || []} />
    </div>
  );
};

export default Sidebar;
