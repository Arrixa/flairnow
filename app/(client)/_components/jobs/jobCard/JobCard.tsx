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
import { useRouter } from 'next/navigation';
import PublishJob from '../jobPublish/PublishJob';
import { useToast } from "@/app/components/ui/use-toast";


//{ formData, setIsEditMode } : { formData?: JobForm, setIsEditMode: React.Dispatch<React.SetStateAction<boolean>> }

const JobCard = ({ jobId, title, location, workPlace, company }: JobBannerProps) => {
  const [jobData, setJobData] = useState<JobCardProps>();
  const { toast } = useToast()

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

  const onPublishNow = async () => {
    console.log("Publish now function called");

    try {
      const response = await fetch(`/api/recruitment/job/${jobId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          publishedAt: new Date(),
          status: 'PUBLISHED',
          id: jobId
        })
      });

      if (response.ok) {
        toast({
          description: "The job post published successfully.",
        });
        const res = await response.json();
        console.log(res, 'response data from publish now');
      } else {
        toast({
          variant: "destructive",
          title: "Publishing the job post failed.",
          description: "Please try again.",
        });
        console.error("Publishing failed");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Publishing the job post failed.",
        description: "Please try again.",
      });
      console.error("Publishing failed:", error);
    }
  };

  return (
    <section className='flex flex-col items-left w-full lg:p-10 md:p-6 p-4'>
      <h1 className="text-3xl text-left font-semibold my-4 pt-8 px-6">Job posting</h1>
      <Card className=''>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{company}</CardDescription>
          <CardDescription>{location}</CardDescription>
        </CardHeader>
      </Card>
      {jobData ? (
      <>
        <div className="flex flex-col md:flex-row w-full">
          <Card className='py-4 mt-2 md:w-1/2 md:mr-2'>
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
          </Card>
          <Card className='py-4 mt-2 md:w-1/2'>
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
              <p>{jobData?.experienceMin}-{jobData?.experienceMax} years</p>
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
        </div>
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
          <Button className='my-4 text-md' type='button' variant='flairnowOutline' onClick={onPublishNow}>
              Publish now
            </Button>
          <PublishJob jobId={jobId} />     
        </div>
      </>
      ) : (
        <Card className=" flex flex-col bg-background py-4 mt-2">
          <CardTitle className="text-4xl p-6 ">Loading...</CardTitle>
          <CardContent>
            <Skeleton className="w-[200px] h-[40px] rounded-full my-10" />
          </CardContent>
        </Card>
      )}
    </section>
  )
}

export default JobCard;
