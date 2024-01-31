import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import AdminDashboardForm from '../../_components/dashboard/AdminDashboardForm';
import { checkAccessAndRedirect } from '@/lib/redirects';

const AdminDashboardPage = async () => {
  const session = await getServerSession(authOptions);
  await checkAccessAndRedirect('/dashboard/admin');


  return (
    <main className='mx-20 w-3/4 lg:1/2 xl:1/2'>
      <h1 className="text-2xl text-left ml-14 font-semibold my-4 pt-6">Company settings</h1>
      <div className='w-full flex flex-start'>
        <Tabs defaultValue="info" className="w-full">
          <TabsList>
            <TabsTrigger value="info" className="info-trigger  ml-10">Company information</TabsTrigger>
            <TabsTrigger value="preferences" className="info-trigger">Preferences</TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <AdminDashboardForm session={session} />
          </TabsContent>
          <TabsContent value="preferences"></TabsContent>
        </Tabs>
      </div>   
    </main>
  );
};

export default AdminDashboardPage;
