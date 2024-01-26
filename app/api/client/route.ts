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
    // if (result) return "success";
    // else throw new Error("Something went wrong!");
    return NextResponse.json({ updateClient, message: "User created successfully"}, { status: 202 })
  } catch (error) {
    console.error("Error during updating client information:", error);
    return NextResponse.json({ message: "Something went wrong"}, { status: 500 });
  }
}