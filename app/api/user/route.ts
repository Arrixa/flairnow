import { prisma } from "@/lib/prisma"; 
import { excludedDomains } from "@/lib/excludedDomains";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

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
    const { emailVerified, image, id, ...user } = reqBody;
    // console.log(reqBody)

    // Check if user email exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: {
        email: user.email
      }
    })
    if (!existingUserByEmail) {
      return NextResponse.json({ user: null, message: "Please signin with a email link before creating an account"})
    }
    const updateUser = await prisma.user.update({
        where: {
          id: existingUserByEmail.id,
        },
        data: {
          ...user,
        },
      });

    // Check if client domain exists
    const domain = extractEmailDomain(user.email);
    console.log("domain", domain)
    
    let roles = [];
    let client;

    // Check if the domain is part of the excluded list (public domains)
    const isPublicDomain = isDomainInExcludedList(domain);
    console.log(isPublicDomain)
    if (isPublicDomain) {
      NextResponse.json({ user: updateUser, message: "User account created successfully"}, { status: 201 })
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
      const newClientUser = await prisma.clientUser.create({
        data: {
          client: { connect: { id: client.id } },
          user: { connect: { id: updateUser.id } },
          role: roles,
        },
      });     
    }

    // Fetch the updated user and client information
    const updatedUser = await prisma.user.findUnique({
      where: { id: updateUser.id },
    });

    const updatedClient = await prisma.client.findUnique({
      where: { id: client.id },
    });

    // Combine user and client information
    const updatedInfo = {
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        // Add other user properties as needed
      },
      client: {
        id: updatedClient.id,
        domain: updatedClient.domain,
        // Add other client properties as needed
      },
    };

    // Trigger a session update by making a request to the dedicated endpoint
    const updateTriggerUrl = `${process.env.NEXTAUTH_URL}/api/auth/update-session`;
    await fetch(updateTriggerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updatedInfo }),
    });

    return NextResponse.json({ user: updateUser, message: "User and client account created successfully"}, { status: 201 })

  } catch (error) {
    console.error("Error during user account creation:", error);
    return NextResponse.json({ message: "Something went wrong"}, { status: 500 });
  }
}

// Trigger a session update
// export async function sessionUpdate () {
//   const updateTriggerUrl = `${process.env.NEXTAUTH_URL}/api/auth/callback/update`;
//   await fetch(updateTriggerUrl, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ userId: updateUser.id }), // Pass any relevant data
//   });

// }