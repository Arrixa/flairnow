import { prisma } from "@/lib/prisma"; 
import { excludedDomains } from "@/lib/excludedDomains";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { triggerSessionUpdate } from "@/utils/sessionTrigger";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

type Email = string;

function extractEmailDomain(email: Email): string {
  const [user, domain] = email.toLowerCase().split('@');
  const domainParts = domain.split('.');
  // Check if the domain is not in the excluded list
  console.log(domainParts)
  if (!excludedDomains.includes(domainParts[0])) {
    return domainParts[0];
  } 
  const isolatedDomain = domainParts[0];
  console.log(isolatedDomain)
  return isolatedDomain;
}

const isDomainInExcludedList = (domain: string): boolean => {
  return excludedDomains.includes(domain);
}

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const { emailVerified, image, id, ...userInfo } = reqBody;
    // console.log(reqBody)

    // Check if user email exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: {
        email: userInfo.email
      }
    })
    if (!existingUserByEmail) {
      return NextResponse.json({ user: null, message: "Please signin with a email link before creating a profile"})
    }
    const user = await prisma.user.update({
        where: {
          id: existingUserByEmail.id,
        },
        data: {
          ...userInfo,
        },
      });

    // Check if client domain exists
    const domain = extractEmailDomain(user.email);
    console.log("domain", domain)
    
    let roles = [];
    let client;
    let clientUser;

    // Check if the domain is part of the excluded list (public domains)
    const isPublicDomain = isDomainInExcludedList(domain);
    console.log(isPublicDomain)
    if (isPublicDomain) {
      NextResponse.json({ user: user, message: "User profile created successfully"}, { status: 201 })
    } else {
  
      const existingClientByDomain = await prisma.client.findUnique({
        where: { 
          domain: domain 
        },
      });

      if (!existingClientByDomain) {
        client = await prisma.client.create({ 
          data: { 
            domain: domain 
          } 
        });
        roles.push(Role.ADMIN, Role.EMPLOYEE);
      } else {
        client = existingClientByDomain;
        roles.push(Role.EMPLOYEE);
      }
  
      if (roles.length === 0) {
        // If roles are not assigned, assume some default role, e.g., USER
        roles.push(Role.UNASSIGNED);
      }
  
      console.log('Roles:', roles);
      console.log('Client:', client);
  
      // New record in ClientUser table
      clientUser = await prisma.clientUser.create({
        data: {
          client: { connect: { id: client.id } },
          user: { connect: { id: user.id } },
          role: roles,
        },
      });     
    }

    const updatedInfo = {
      ...user,
      ...client,
      ...clientUser,
    }

    if (updatedInfo) {
      await triggerSessionUpdate()
    }

    return NextResponse.json({ updatedInfo, message: "User and client profile created successfully"}, { status: 201 })

  } catch (error) {
    console.error("Error during profile creation:", error);
    return NextResponse.json({ message: "Something went wrong"}, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const userData = await getUserData(request);

    // Respond with the user data
    return Response.json(userData);
  } catch (error) {
    console.error("Error during handling GET request:", error);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}

async function getUserData(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return { message: "User does not exist" };
  }

  // Extract and return the relevant data
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    image: user.image,  
  }
}