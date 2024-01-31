import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    console.log(reqBody)
    const session = await getServerSession(authOptions);
    const clientId = session?.clientUser?.clientId
    const client = await prisma.client.findUnique({
      where: {
        id: clientId,
      },
    });
    if (!client) return "Client does not exist"

    const updateClient = await prisma.client.update({
      where: {
        id: clientId,
      },
      data: {
        ...reqBody
      },
    });
    return NextResponse.json({ updateClient, message: "User created successfully"}, { status: 202 })
  } catch (error) {
    console.error("Error during updating client information:", error);
    return NextResponse.json({ message: "Something went wrong"}, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const clientData = await getClientData(request);
    console.log('Received client data from API endpoint:', clientData);

    // Respond with the client data
    return Response.json(clientData);
  } catch (error) {
    console.error("Error during handling GET request:", error);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}

// Helper function to fetch client data (replace this with your actual logic)
async function getClientData(request: Request) {
  const session = await getServerSession(authOptions);
  const clientId = session?.clientUser?.clientId;
  const client = await prisma.client.findUnique({
    where: {
      id: clientId,
    },
  });

  console.log('Processed client data:', {
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
  };
}