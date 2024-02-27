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
    const jobData = await getJobData(request);

    // Respond with the job data
    return Response.json(jobData);
  } catch (error) {
    console.error("Error during handling GET request:", error);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}

async function getJobData(request: Request) {
  const session = await getServerSession(authOptions);
  const clientId = session?.clientUser.clientId
  const client = await prisma.client.findUnique({
    where: {
      id: clientId,
    },
  });

  console.log('Processed client data:', {
    domain: client.domain,
    id: client.id,
    logo: client.logo,
    companyName: client.companyName,
    website: client.website,
    description: client.description,
    countryCode: client.countryCode,
    phoneNumber: client.phoneNumber,
    streetNo: client.streetNo,
    streetAddress: client.streetAddress,
    province: client.province,
    zipCode: client.zipCode,
    country: client.country,
  });

  if (!client) {
    return { message: "Client does not exist" };
  }

  // Extract and return the relevant data
  return {
    id: client?.id,
    domain: client?.domain,
    companyName: client?.companyName,
    website: client?.website,
    description: client?.description,
    countryCode: client?.countryCode,
    phoneNumber: client?.phoneNumber,
    streetNo: client?.streetNo,
    streetAddress: client?.streetAddress,
    province: client?.province,
    zipCode: client?.zipCode,
    country: client?.country,
    logo: client.logo,
  };
}