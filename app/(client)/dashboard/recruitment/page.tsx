import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { BookPlus, FileCog } from 'lucide-react';
import JobPostForm from '../../_components/jobs/JobPostForm';

const page = () => {
  return (
    <main className='flex flex-col items-left w-full lg:p-10 md:p-6 p-4'>
      <h1 className="text-3xl text-left ml-10 font-semibold my-4 py-2">Recruitment</h1>
      <div className='w-full'>
        <Tabs defaultValue="post" className="">
          <TabsList>
          <TabsTrigger value="post" className=" ml-6">
            <BookPlus /> <span className='hidden md:flex'>&nbsp;Create</span>
          </TabsTrigger>
          <TabsTrigger value="review" className="">
            <FileCog /><span className='hidden md:flex'> &nbsp;Review</span>
          </TabsTrigger>
          <TabsTrigger value="publish" className="">
            <FileCog /><span className='hidden md:flex'> &nbsp;Publish</span>
          </TabsTrigger>
          </TabsList>
          <TabsContent value="post">
            <JobPostForm />
          </TabsContent>
          <TabsContent value="review"></TabsContent>
          <TabsContent value="publish"></TabsContent>
        </Tabs>
      </div>   
    </main>
  )
}

export default page
