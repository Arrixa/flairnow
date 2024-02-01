import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function POST(req: Request, res: Response) {
  try {
    const reqBody = await req.json();
    console.log("reqBody", reqBody)
    const email = reqBody.email
    console.log("email", email);

    // Check if the email is unique
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    const isUnique = !existingUser;
    console.log(isUnique)
  
    return NextResponse.json({ isUnique });
  } catch (error) {
      console.error("Error during updating client information:", error);
      return NextResponse.json({ message: "Something went wrong"}, { status: 500 });
    }
  } 