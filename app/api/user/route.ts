import { prisma } from "@/lib/prisma"; 
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { emailVerified, id, ...userInfo } = reqBody;

    // Check if user email exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: {
        email: userInfo.email
      }
    })
    if (!existingUserByEmail) {
      return NextResponse.json({ user: null, message: "Please signin again with a email link"})
    }
    // FTM-2 / FTM-19 6. Update user profile 
    const user = await prisma.user.update({
        where: {
          id: existingUserByEmail.id,
        },
        data: {
          ...userInfo,
        },
      });

    const updatedInfo = {
      ...user,
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
    // console.log('User data:', userData);
    // Respond with the user data
    return Response.json(userData);
  } catch (error) {
    console.error("Error during handling GET request:", error);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}

async function getUserData(request: Request) {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return { message: "User email is undefined" };
  }
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });
  const clientUser = await prisma.clientUser.findFirst({
    where: {
      userId: user.id,
    },
  })

  if (!user) {
    return { message: "User does not exist" };
  }

  if (clientUser) {
    return { 
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,  
      userDomain: user.userDomain,
      role: clientUser?.role,
      userId: clientUser.userId,
      clientId: clientUser?.id,
     };
  }

  // Extract and return the relevant data
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    image: user.image,  
    userDomain: user.userDomain,
  }
}