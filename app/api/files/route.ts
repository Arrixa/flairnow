import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  res: NextResponse
) {
  if (req.method !== "GET")
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });

  const files = await prisma.file.findMany();

  return NextResponse.json({ files }, { status: 201 });
}
