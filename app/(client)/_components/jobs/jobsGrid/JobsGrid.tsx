import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';

interface JobsGridProps {
  jobsData: Array<{ id: string; title: string; companyName: string; location: string }>;
}

const JobsGridComp: React.FC<JobsGridProps> = ({ jobsData }) => {
  console.log(jobsData);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      {jobsData?.map((job) => (
        <Link key={job.id} href={`/dashboard/recruitment/jobs/${job.id}`}>
            <Card>
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription>{job.companyName}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{job.location}</p>
              </CardContent>
            </Card>
        </Link>
      ))}
    </div>
  );
};

export default JobsGridComp;
