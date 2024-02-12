import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


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
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    // Fetch the updated user and client information
    const dbUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    const dbClientUser = await prisma.clientUser.findUnique({
      where: {
        userId: user.id
      }
    })

    // const dbClient = await prisma.client.findUnique({

    const emailDomain = user?.email?.toLowerCase().split('@').pop()?.split('.')[0]
    console.log(emailDomain)
    const dbClient = await prisma.client.findUnique({
      where: {
        domain: emailDomain
      }
    })


    console.log('DB DATA IN API/ROLE', dbClient, dbUser, dbClientUser, 'DB DATA IN API/ROLE')

    // const updatedInfo = {
    //   user: { ...dbUser },
    //   client: { ...dbClient },
    //   clientUser: { ...dbClientUser },
    // };
    console.log(
      dbClient.domain,
      dbUser.firstName,
      dbUser.lastName,
      dbUser.email,
      dbUser.image,  
      dbClientUser.role
      , 'updatedInfo in /api/role')
      return {
        domain: dbClient?.domain || '',
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        email: dbUser.email,
        image: dbUser.image || '',  
        role: dbClientUser?.role || [],
      };
  } catch (error) {
    return NextResponse.json({error, message: 'Error triggering session update:'}, { status: 500 });
  }
} 


// Trying to trigger a session update by making a request to the dedicated endpoint
// export async function POST() {{
//   try {
//     const session = await getServerSession(authOptions);
//     const user = session?.user;
//     const client = session?.client;
//     const clientUser = session?.clientUser;

//     // Fetch the updated user and client information
//     const dbUser = await prisma.user.findUnique({
//       where: {
//         email: user.email,
//       },
//     });

//     const emailDomain = user?.email?.toLowerCase().split('@').pop()?.split('.')[0]
//     console.log(emailDomain)
//     const dbClient = await prisma.client.findFirst({
//       where: {
//         domain: emailDomain
//       }
//     })

//     const dbClientUser = await prisma.clientUser.findFirst({
//       where: {
//         userId: user.id
//       }
//     })

//     const updatedInfo = {
//       user: { ...dbUser },
//       client: { ...dbClient },
//       clientUser: { ...dbClientUser },
//     };

//     // Trigger a session update by making a request to the dedicated endpoint
//     const updateTriggerUrl = `${process.env.NEXTAUTH_URL}/api/auth/session`;
//     // const updateTriggerUrl = `${process.env.NEXTAUTH_URL}/api/auth/update-session`;
//     await fetch(updateTriggerUrl, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(updatedInfo),
//     });
//     console.log('triggerSessionUpdate - updatedInfo:', updatedInfo);
//     console.log('Session update triggered successfully');
//   } catch (error) {
//     console.error('Error triggering session update:', error);
//   }
// };

// }