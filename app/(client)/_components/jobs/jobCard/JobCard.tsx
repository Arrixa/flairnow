'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Label } from '@/app/components/ui/label'
import { JobCardProps, JobBannerProps } from '@/lib/interfaces'
import { useEffect, useState } from 'react';
import { Skeleton } from '@/app/components/ui/skeleton';
import { capitaliseFirstLetter } from '@/lib/capitiliseFirstLetter';
import { format } from 'date-fns';
import Badges from '@/app/components/common/Badges';
import { Badge } from '@/app/components/ui/badge';
import HTMLReactParser from 'html-react-parser'
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';


//{ formData, setIsEditMode } : { formData?: JobForm, setIsEditMode: React.Dispatch<React.SetStateAction<boolean>> }

const JobCard = ({ jobId, title, location, workPlace, company }: JobBannerProps) => {
  const [jobData, setJobData] = useState<JobCardProps>();
  console.log(jobId, 'Job ID in job card');
  
  const formattedDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "y-MM-dd 'at' h:mm");
  };

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

  console.log(jobData, 'Job data in job card');

  return (
    <section className="flex flex-col w-full p-2">
      <Card className=''>
      <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{company}</CardDescription>
          <CardDescription>{location}</CardDescription>
        </CardHeader>
      </Card>
      {jobData ? (
      <>
        <Card className='py-4 mt-2'>
          <CardContent>
            <Label>Job title:</Label>
            <p>{jobData?.title}</p>
          </CardContent>
          <CardContent>
            <Label>Job id:</Label>
            <p>{jobData?.id}</p>
          </CardContent>
          <CardContent>
            <Label>Company name:</Label>
            <p>{jobData?.company?.companyName}</p>
          </CardContent>
          <CardContent>
            <Label>Company department:</Label>
            <p>{jobData?.department}</p>         
          </CardContent>
          <CardContent>
            <Label>Job description:</Label>
            <p>{HTMLReactParser(jobData?.description)}</p>
          </CardContent>
          <CardContent>
            <Label>Employment type:</Label>
            <p>{capitaliseFirstLetter(jobData?.employmentType)}</p>
          </CardContent>
          <CardContent>
            <Label>Work place:</Label>
            <p>{capitaliseFirstLetter(jobData?.workPlace)}</p>
          </CardContent>
          <CardContent>
            <Label>Expected job level:</Label>
            <p>{capitaliseFirstLetter(jobData?.jobLevel)}</p>
          </CardContent>
          <CardContent>
            <Label>Expected experience:</Label>
            <p>{jobData?.experienceMin}-{jobData?.experienceMax}</p>
          </CardContent>
          <CardContent>
            <Label>Number of positions:</Label>
            <p>{jobData?.positionsNumber}</p>
          </CardContent>
          <CardContent>
            <Label>Required skills:</Label>
            <p ><Badges items={jobData?.skills} item={''} index={0}/></p>
          </CardContent>  
          <CardContent>
            <Label>Expected salary:</Label>
            <p>{jobData?.salary}</p>
          </CardContent>
        </Card>
        <Card className='py-4 mt-2'>
        <CardContent>
            <Label>Status:</Label>           
            <p><Badge variant="outline" className='py-1'>{capitaliseFirstLetter(jobData?.status)}</Badge></p>
          </CardContent>
          <CardContent>
            <Label>Posted by:</Label>
            <p>{jobData?.postedBy.firstName} {jobData?.postedBy.lastName}</p>
          </CardContent>
          <CardContent>
            <Label>Last update:</Label>
            <p>{formattedDate(jobData?.updatedAt)}</p>
          </CardContent>
        </Card>
        <div className="flex flex-col-reverse md:flex-row justify-between">
          <Button variant='flairnowOutline' className='my-4 text-md'>        
            <Link href='/dashboard/recruitment'>
              Return
            </Link>
          </Button>
          <Button className='my-4 text-md'>Edit</Button>
          <Button variant='flairnowOutline' className='my-4 text-md'>Continue</Button>
        </div>
      </>
      ) : (
        <Card className=" flex items-center justify-center flex-col bg-background py-4 mt-2'">
          <CardTitle className="text-4xl py-6 text-center">Loading...</CardTitle>
          <CardContent>
            <Skeleton className="w-[200px] h-[40px] rounded-full my-10" />
          </CardContent>
        </Card>
      )}
    </section>
  )
}

export default JobCard;
