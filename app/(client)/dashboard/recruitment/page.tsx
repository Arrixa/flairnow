import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { Button } from '@/app/components/ui/button';
import { Plus, LayoutList, LayoutGrid } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/app/components/ui/toggle-group'
import { capitaliseFirstLetter } from "@/lib/capitiliseFirstLetter";
import JobsGridComp from '../../_components/jobs/jobsGrid/JobsGrid';

async function getData() {
  try {
    // Fetch all job data from API endpoint
    const response = await fetch('/api/recruitment/job-posting');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    } 
    // Read the response body as text
    const responseBody = await response.text();
    // Check if the body is empty
    if (!responseBody) {
      throw new Error('Empty response received');
    }
    // Parse the response body as JSON
    const data = JSON.parse(responseBody);
    // Continue processing the data
    return data;
  } catch (error) {
    console.error('Error fetching job data:', error);
  }
};


const Page = async () => {
  const jobsData = await getData();
  console.log(jobsData, 'Jobs fetched values');

  return (
    <main className='flex flex-col items-left w-full lg:p-10 md:p-6 p-4'>
      <h1 className="text-3xl text-left font-semibold my-4 pt-8">Recruitment dashboard</h1>
      <Card className='w-fit py-2 px-4'>
        <Link href="/dashboard/recruitment/jobs/create">
          <CardContent className='flex p-2 '>
            Create a new job posting &nbsp;<Plus /> 
          </CardContent>
        </Link>
      </Card>
      <Card className='flex items-center justify-between mt-2'>
        <CardHeader>
          <CardTitle>Job postings</CardTitle>
          <CardDescription>Manage your job postings</CardDescription>
        </CardHeader>
        <CardContent className=''>
          <ToggleGroup type="single">
            <ToggleGroupItem value="bold" aria-label="Toggle list view">
              List view &nbsp;<LayoutList />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle grid view">
              Grid view &nbsp;<LayoutGrid />
            </ToggleGroupItem>
          </ToggleGroup>
        </CardContent>
      </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          {jobsData?.map((job: any) => (
            <Link key={job.id} href={`/dashboard/recruitment/jobs/${job.id}`}>
              <JobsGridComp key={job.id} job={job} />   
            </Link>
          ))}
          <div>
           
          </div>
        </div>
    </main>
  )
};

export default Page;

              {/* <Card className='h-auto'>
                <CardHeader>
                  <CardTitle>{job?.title}</CardTitle>      
                  <CardDescription><Badge variant="outline" className='py-1'>{job?.status}</Badge></CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{job.company.companyName}</p>
                  <p>{job?.location}</p>
                  <p>{capitaliseFirstLetter(job?.workPlace)}</p>
                </CardContent>
              </Card> */}