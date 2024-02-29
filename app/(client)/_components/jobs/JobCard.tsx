'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Label } from '@/app/components/ui/label'
import { JobForm } from '@/lib/interfaces'
import { useEffect, useState } from 'react';


//{ formData, setIsEditMode } : { formData?: JobForm, setIsEditMode: React.Dispatch<React.SetStateAction<boolean>> }

const JobCard = ({ jobId }) => {
  // if (!jobId) {
  //   // Handle the case when jobData is undefined
  //   return <div>Loading...</div>;
  // }
  const [jobData, setJobData] = useState();
  console.log(jobId, 'Job ID in job card');

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`/api/recruitment/job/${jobId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jobDetails = await response.json();
        setJobData(jobDetails);
        console.log('Job Details:', jobDetails);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    if (jobId) {
      fetchJobDetails();
    } else {
      console.log('Job ID is not available yet.');
    }
  }, [jobId]);

  // Conditionally render based on jobData availability
  if (!jobId || !jobData) {
    return <div>Loading...</div>;
  }

  console.log(jobData, 'Job data in job card');
  
  return (
    <section className="flex flex-col w-full">
    <Card>
      <CardHeader>
        <CardTitle>Review job post</CardTitle>
        {/* Add icons */}
        <CardDescription>{jobData?.title}</CardDescription>
        {/* <CardDescription>{jobData?.company?.companyName}</CardDescription> */}
        <CardDescription>{jobData?.location}</CardDescription>
      </CardHeader>
    </Card>
    <Card className='py-2 mt-2'>
      <CardContent>
        <Label>Job title:</Label>
        <p>{jobData?.title}</p>
      </CardContent>
      <CardContent>
        <Label>Company name:</Label>
        {/* <p>{jobData?.company?.companyName}</p> */}
      </CardContent>
      <CardContent>
        <Label>Company department:</Label>
        <p>{jobData?.department}</p>
      </CardContent>
      <CardContent>
        <Label>Job description:</Label>
        <p>{jobData?.description}</p>
      </CardContent>
      <CardContent>
        <Label>Employment type:</Label>
        <p>{jobData?.employmentType}</p>
      </CardContent>
      <CardContent>
        <Label>Work place:</Label>
        <p>{jobData?.workPlace}</p>
      </CardContent>
      <CardContent>
        <Label>Required qualifications:</Label>
        <p>{jobData?.qualifications}</p>
      </CardContent>
      <CardContent>
        <Label>Required skills:</Label>
        {/* Skill badges */}
      </CardContent>
      <CardContent>
        <Label>Salary range:</Label>
        <p>{jobData?.salary}</p>
      </CardContent>
    </Card>
  </section>
  )
}

export default JobCard
