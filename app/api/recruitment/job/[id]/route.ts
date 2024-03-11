import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.url.split('/').pop();
  // console.log('Request:', request);
  // console.log('Job ID:', id);
  // const jobId = request.nextUrl.searchParams.get('id');
  // console.log('Job ID from search params:', jobId);
  // const jobId = request.params.id;
  // const { id } = request.params;
  // const { id } = request.query;
  try {
    const jobData = await getJobData(id as string);
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
    include: {
      company: true, // Include the related company data
      postedBy: true, // Include the related user data
      department: true,
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
    jobLevel: job.jobLevel,
    employmentType: job.employmentType,
    workPlace: job.workPlace,
    postedBy: job.postedBy,
    workHours: job.workHours,
    status: job.status,
    skills: job.skills,
    company: job.company,
    positionsNumber: job.positionsNumber,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
    experienceMin: job.experienceMin,
    experienceMax: job.experienceMax,
    startDate: job.startDate,
    endDate: job.endDate,
    dueDate: job.dueDate,
    closingDate: job.closingDate,
  };
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    
    const publishJob = await prisma.jobPosting.update({
      where: {
        id: reqBody.id,
      },
      data: {
        publishedAt: reqBody.publishedAt,
        status: 'PUBLISHED',
      },
    });
      return NextResponse.json({ publishJob, message: "Job posting updated successfully"}, { status: 202 })
    // }
  } catch (error) {
    console.error("Error during creating job posting:", error);
    return NextResponse.json({ message: "Something went wrong"}, { status: 500 });
  }
}