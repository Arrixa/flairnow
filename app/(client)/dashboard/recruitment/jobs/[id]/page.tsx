'use client'
import { useParams, useSearchParams } from 'next/navigation'
// import { useEffect, useState } from 'react';
import JobCard from '@/app/(client)/_components/jobs/JobCard'
import { useRouter } from 'next/router';

const JobDetailsPage = ({ params }: any) => {
  const searchParams = useSearchParams();
  
  // Extracting values from the search parameters
  const { id } = useParams();
  const title = searchParams.get('title');
  const location = searchParams.get('location');
  const workPlace = searchParams.get('workplace');
  const company = searchParams.get('company');

  return (
    <>
      <JobCard jobId={id} title={title} location={location} workPlace={workPlace} company={company} />
    </>
  );
};

export default JobDetailsPage;
