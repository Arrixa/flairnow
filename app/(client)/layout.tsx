import { getServerSession } from 'next-auth';
import { authOptions } from "@/utils/authOptions";
import Sidebar from './sidebar/page';
import MenuBar from './_components/navbar/MenuBar';
import { Providers } from '@/app/providers'


const ClientLayout = async ({ 
  children,
  }: {
    children: React.ReactNode
  }) => {

  // FTM-2 / FTM-20 27.
  const session = await getServerSession(authOptions);
    return (
      <Providers>
        <div className='bg-secondary'>
          <div className='w-fit'><MenuBar /></div>
          <div className='flex'>
            <Sidebar session={session} />
            <main className="flex-grow">
              {children}
            </main>
          </div>
        </div>
      </Providers>
    );
  };

export default ClientLayout;
