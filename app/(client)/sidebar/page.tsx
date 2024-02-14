'use client'
import SidebarComp from "../_components/sidebar/Sidebar";
import { useSession } from "next-auth/react";
import { Session } from '@/lib/interfaces';

const Sidebar = ({ session }: { session: Session }) => {
  const { data: sessionData } = useSession();
  const userRoles = sessionData?.role;

  return (
    <div className="w-fit">
      <SidebarComp userRoles={userRoles || []} session={session} />
    </div>
  );
};

export default Sidebar;
