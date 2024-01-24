// Needs to check what the clientId is
// Pass the ClientId to ensure only the information of each client is rendered
// Token is encrypted - use instead of session

import { getServerSession } from 'next-auth';
import Sidebar from './_components/Sidebar';
import { authOptions } from '../api/auth/[...nextauth]/route';

const ClientLayout = async ({ 
  children,
  }: {
    children: React.ReactNode
  }) => {
    const session = await getServerSession(authOptions);

  return (
    <div className="flex">
      {session?.clientUser?.clientId && session?.clientUser?.role && (
        <Sidebar />
      )}
      <main className="flex-grow p-4">{children}</main>
    </div>
  );
};

export default ClientLayout;
