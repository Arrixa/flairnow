import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import AdminDashboard from '../../_components/dashboard/AdminDashboard';
import { BookPlus, FileCog } from 'lucide-react';

const AdminDashboardPage = async () => {

  return (
    <main className='mx-20 w-3/4 lg:1/2 xl:1/2'>
      <h1 className="text-2xl text-left ml-10 font-semibold my-4 pt-8">Company settings</h1>
      <div className='w-full flex flex-start'>
        <Tabs defaultValue="info" className="w-full">
          <TabsList>
          <TabsTrigger value="info" className="info-trigger ml-6 items-end">
            <BookPlus /> <span className='hidden md:flex'>&nbsp;Company information</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="info-trigger items-end hidden sm:flex">
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
