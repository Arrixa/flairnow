// Needs to check what the clientId is
// Pass the ClientId to ensure only the information of each client is rendered
// Token is encrypted - use instead of session

import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Sidebar from './sidebar/page';
import { redirect } from 'next/navigation';

const ClientLayout = async ({ 
  children,
  }: {
    children: React.ReactNode
  }) => {

  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.clientUser.role || !session.clientUser.role.includes("EMPLOYEE")) redirect("/auth/validate-auth");
  else {
    return (
      <div className="flex w-full">
        <main className="flex w-full">
          <Sidebar />
          {children}
        </main>
      </div>
    );
  };
}

export default ClientLayout;
