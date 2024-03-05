import { JobCardProps } from "@/lib/interfaces";
import prisma from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { Department } from "@/lib/interfaces";
import { NextResponse } from "next/server";
 
// FTM-15

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const session = await getServerSession(authOptions);
    const clientId = await session?.clientUser.clientId;
    const userId = await session?.user.id;
    console.log("session user and client id in job posting route", userId, clientId)
    console.log("reqBody in job posting route", reqBody)
    // if (session?.jobPosting) {
    //   const jobId = session?.jobPosting?.id;
    //   const job = await prisma.jobPosting.findUnique({
    //     where: {
    //       id: jobId,
    //     },
    //   });
    //   if (job) {
    //     const updateJob = await prisma.jobPosting.update({
    //       where: {
    //         id: jobId,
    //       },
    //       data: {
    //         ...reqBody
    //       },
    //     });
    //     return NextResponse.json({ updateJob, message: "Job posting updated successfully" }, { status: 202 });
    // }
    // } else {}
    let department = '';
    
    if (department.length === 0) {
      // If department is not assigned, assume some default role
      department = Department.UNSPECIFIED;
    } else {
      department = reqBody.department;
    }
    const { experience, ...jobPost } = reqBody;

    const experienceRegex = /(\d+)–?(\d+)?/;
    const match = experience.match(experienceRegex);
    const experienceMin = parseInt(match[1], 10);
    const experienceMax = match[2] ? parseInt(match[2], 10) : null;
    console.log("Experience Min:", experienceMin);
    console.log("Experience Max:", experienceMax);

    
    const createJob = await prisma.jobPosting.create({
        data: {
          status: "DRAFT",
          company: { connect: { id: clientId } },
          postedBy: { connect: { id: userId } },
          department: department,
          experienceMin: experienceMin,
          experienceMax: experienceMax,
          ...jobPost
        },
        
      });
      return NextResponse.json({ createJob, message: "Job posting created successfully"}, { status: 202 })
    // }
  } catch (error) {
    console.error("Error during creating job posting:", error);
    return NextResponse.json({ message: "Something went wrong"}, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const jobData = await getJobsData(request);
    // Respond with the job data
    return Response.json(jobData);
  } catch (error) {
    console.error("Error during handling GET request:", error);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}

async function getJobsData(request: Request) {
  const session = await getServerSession(authOptions);
  const clientId = await session?.client.id;
  const jobs = await prisma.jobPosting.findMany({
    where: {
      clientId: clientId,
    },
    include: {
      company: true, // Include the related company data
    },
  });

  if (!jobs || jobs.length === 0) {
    return { message: "No job postings found for this client" };
  }

  // Extract and return the relevant data for each job
  const processedJobs = jobs.map((job: JobCardProps) => ({
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
  }));
  console.log("processedJobs", processedJobs);

  return processedJobs;
}