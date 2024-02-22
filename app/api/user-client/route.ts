import { prisma } from "@/lib/prisma"; 
import { NextRequest, NextResponse } from "next/server";
import { extractEmailDomain, isDomainInExcludedList } from "@/lib/extractDomain";
import { Role } from "@/lib/interfaces";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { emailVerified, image, id, ...userInfo } = reqBody;


    // Check if user email exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: {
        email: userInfo.email
      }
    })
    if (!existingUserByEmail) {
      return NextResponse.json({ user: null, message: "Please signin with a email link before creating a profile"})
    }
    // FTM-2 / FTM-17 8. Update user profile 
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
    console.log(isPublicDomain);

    if (isPublicDomain) {
      // Return the updated session without creating clientUser and client
      NextResponse.json({ message: "User profile created successfully"}, { status: 201 })
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
        // If roles are not assigned, assume some default role
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
    // FTM-2 / FTM-17 9. Return updated user information
    return NextResponse.json({ updatedInfo, message: "User and client profile created successfully"}, { status: 201 })

  } catch (error) {
    console.error("Error during profile creation:", error);
    return NextResponse.json({ message: "Something went wrong"}, { status: 500 });
  }
}