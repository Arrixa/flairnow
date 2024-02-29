// 'use client'
// import { useSearchParams, useParams } from 'next/navigation'
import JobCard from '@/app/(client)/_components/jobs/JobCard'
// import { useEffect, useState } from 'react';

const JobDetailsPage = ({ params }: any) => {
  // const params = useParams();
  // console.log(params, 'Params from use params');
  // const searchParams = useSearchParams();
  // const jobId = searchParams.get('id');
  // console.log(jobId, 'Job ID from search params');

  return (
    <div>
      <h1>Job Details</h1>
      <p>Job ID: {params.id}</p>
      <JobCard jobId={params.id} />
    </div>
  );
};

export default JobDetailsPage;
