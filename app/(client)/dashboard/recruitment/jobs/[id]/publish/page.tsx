'use client'
import PublishJob from '@/app/(client)/_components/jobs/jobPublish/PublishJob'
import React, { useState } from 'react'
import { useParams, } from 'next/navigation'
import { JobCardProps, JobBannerProps } from '@/lib/interfaces'


const PublishPage = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState<JobCardProps>();

  return (
    <>
      {/* <PublishJob id={id} /> */}
    </>
  )
}

export default PublishPage
