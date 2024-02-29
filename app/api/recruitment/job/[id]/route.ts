import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  console.log('Request:', request);
  const id = request.url.split('/').pop();
  console.log('Job ID:', id);
  // console.log('Job ID:', jobId);
  // const jobId = request.params.id;
  // const { id } = request.params;
  try {
    const jobData = await getJobData(id);
    // const { id } = request.query;
    // console.log('Job ID:', id);
    // const jobData = await getJobData(id as string);
    // Respond with the job data
    console.log('Job data:', jobData);
    return NextResponse.json(jobData);
  } catch (error) {
    console.error("Error during handling GET request:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

async function getJobData(jobId: string) {

  const job = await prisma.jobPosting.findUnique({
    where: {
      id: jobId,
    },
  });

  if (!job ) {
    return { message: "No job postings found for this client" };
  }

  // Extract and return the relevant data for each job
  return {
    id: job.id,
    title: job.title,
    description: job.description,
    department: job.department,
    location: job.location,
    salary: job.salary,
    qualifications: job.qualifications,
    employmentType: job.employmentType,
    workPlace: job.workPlace,
    postedBy: job.postedBy,
    workHours: job.workHours,
    status: job.status,
    clientId: job.clientId,
    company: job.client,
  };
}