import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET(request: NextRequest) {
  const type: any = request.nextUrl.searchParams.get("type");

  const existingRecord = await prisma.produk.findMany({
    where: {
      title: {
        contains: type,
        mode: "insensitive",
      },
    },
    select: {
      items: {
        include: {
          prd_desc: true,
        },
      },
    },
  });

  return NextResponse.json({
    data: existingRecord[0],
  });
}
