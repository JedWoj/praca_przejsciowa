import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const storage = await prisma.storage.findMany({
    include: {
      _count: true,
      parts: true,
      products: true,
    },
  });

  return NextResponse.json({ data: storage });
}
