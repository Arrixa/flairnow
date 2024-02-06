import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: NextRequest, res: NextResponse) {
  if (req.method !== "GET")
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });

  const session = await getServerSession(authOptions);
  const userId = session?.user.id || null;

  if (!userId) {
    return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { image: true }, 
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const imageUrl = user.image || null;

    return NextResponse.json({ imageUrl }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching user data" }, { status: 500 });
  }
}
