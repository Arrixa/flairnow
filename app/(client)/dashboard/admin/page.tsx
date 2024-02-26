import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import AdminDashboard from '../../_components/dashboard/AdminDashboard';
import { BookPlus, FileCog } from 'lucide-react';

const AdminDashboardPage = async () => {

  return (
    <main className='flex flex-col items-left w-full lg:p-10 md:p-6 p-4'>
      <h1 className="text-3xl text-left ml-10 font-semibold my-4 pt-8">Company settings</h1>
      <div className='w-full'>
        <Tabs defaultValue="info" className="">
          <TabsList>
          <TabsTrigger value="info" className="info-trigger ml-6">
            <BookPlus /> <span className='hidden md:flex'>&nbsp;Company information</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="info-trigger">
            <FileCog /><span className='hidden md:flex'> &nbsp;Preferences</span>
          </TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <AdminDashboard />
          </TabsContent>
          <TabsContent value="preferences"></TabsContent>
        </Tabs>
      </div>   
    </main>
  );
};

export default AdminDashboardPage;
