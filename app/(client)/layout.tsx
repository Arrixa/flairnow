// Needs to check what the clientId is
// Pass the ClientId to ensure only the information of each client is rendered
// Token is encrypted - use instead of session

import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import SidebarComp from './_components/Sidebar';
import { signOut, useSession } from 'next-auth/react';

const ClientLayout = async ({ 
  children,
  }: {
    children: React.ReactNode
  }) => {
  
  const session = await getServerSession(authOptions);
  const userRoles = session?.clientUser?.role ?? [];


  return (
    <div className="flex">
      <SidebarComp userRoles={userRoles} />
      <main className="flex-grow p-4">{children}</main>
    </div>
  );
};

export default ClientLayout;
