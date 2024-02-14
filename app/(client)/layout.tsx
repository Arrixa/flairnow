import { getServerSession } from 'next-auth';
import { authOptions } from "@/utils/authOptions";
import Sidebar from './sidebar/page';

const ClientLayout = async ({ 
  children,
  }: {
    children: React.ReactNode
  }) => {

  const session = await getServerSession(authOptions);
    return (
      <div className="flex w-full">
        <Sidebar />
        <main className="flex-grow">
          {children}
        </main>
      </div>
    );
  };

export default ClientLayout;
