'use client'
import { useSearchParams } from 'next/navigation'
import JobCard from '@/app/(client)/_components/jobs/JobCard'

const JobDetailsPage = () => {
  const searchParams = useSearchParams();
  const jobId = searchParams.get('id');

  return (
    <div>
      <h1>Job Details</h1>
      <JobCard jobId={jobId} />
    </div>
  );
};

export default JobDetailsPage;
