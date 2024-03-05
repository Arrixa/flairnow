'use client'
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import Link from 'next/link';
import { LayoutGrid, LayoutList, Plus } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/app/components/ui/toggle-group';
import { capitaliseFirstLetter } from "@/lib/capitiliseFirstLetter";
import JobsGridComp from '../../_components/jobs/jobsGrid/JobsGrid';

const JobsDashboard = () => {
  const [jobsData, setJobsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/recruitment/job-posting');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        } 
        const data = await response.json();
        setJobsData(data);
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchData();
  }, []);

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
        {jobsData.length > 0 ? (
          jobsData.map((job: any) => (
            <Link key={job.id} href={`/dashboard/recruitment/jobs/${job.id}&title=${job.title}&location=${job.location}&workplace=${job.workPlace}&company=${job.company.companyName}`}>
              <JobsGridComp key={job.id} job={job} />   
            </Link>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </main>
  );
};

export default JobsDashboard;
