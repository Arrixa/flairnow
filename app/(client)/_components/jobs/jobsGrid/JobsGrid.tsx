import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';

interface JobsGridProps {
  job: Array<{ id: string; title: string; company: { companyName: string }; location: string }>;
}

const JobsGridComp: React.FC<JobsGridProps> = ({ job }) => (
      <Card>
        <CardHeader>
          <CardTitle>{job?.title}</CardTitle>
          <CardDescription>{job.company.companyName}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{job?.location}</p>
          <p>{job?.workPlace}</p>
        </CardContent>
      </Card>
);

export default JobsGridComp;
