import { JobCardProps } from "@/lib/interfaces";
import prisma from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
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
    // } else {
      const createJob = await prisma.jobPosting.create({
        data: {
          status: "DRAFT",
          company: { connect: { id: clientId } },
          postedBy: { connect: { id: userId } },
          ...reqBody
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
    qualifications: job.qualifications,
    employmentType: job.employmentType,
    workPlace: job.workPlace,
    workHours: job.workHours,
    status: job.status,
    company: job.company,
  }));
  console.log("processedJobs", processedJobs);

  return processedJobs;
}