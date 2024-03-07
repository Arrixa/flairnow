import React from 'react';
import { Badge } from '@/app/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { capitaliseFirstLetter } from "@/lib/capitiliseFirstLetter";
import { JobsGridProps } from '@/lib/interfaces';

const JobsGridComp: React.FC<JobsGridProps> = ({ job }) => (
  <Card className='flex flex-col h-full'>
    <CardHeader>
      <CardTitle>{job?.title}</CardTitle>      
      <CardDescription><Badge variant="outline" className='py-1'>{capitaliseFirstLetter(job?.status)}</Badge></CardDescription>
    </CardHeader>
    <CardContent>
      <p>{job.company.companyName}</p>
      <p>{job?.location}</p>
      <p>{capitaliseFirstLetter(job?.workPlace)}</p>
    </CardContent>
  </Card>
);

export default JobsGridComp;
