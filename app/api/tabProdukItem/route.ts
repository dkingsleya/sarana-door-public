import { PrismaClient, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const category: any = request.nextUrl.searchParams.get("category");

  switch (category) {
    case "pintu":
      const JenisPintu = await prisma.jenisProduk.findMany({
        where: {
          title: {
            contains: category,
            mode: "insensitive",
          },
        },
        select: {
          products: true,
        },
      });
      return NextResponse.json(JenisPintu[0]);
    case "jendela":
      const JenisJendela = await prisma.jenisProduk.findMany({
        where: {
          title: {
            contains: category,
            mode: "insensitive",
          },
        },
        select: {
          products: true,
        },
      });
      return NextResponse.json(JenisJendela.length > 0 ? JenisJendela[0] : []);
    case "aksesoris":
      const JenisAksesoris = await prisma.jenisProduk.findMany({
        where: {
          title: {
            contains: category,
            mode: "insensitive",
          },
        },
        select: {
          products: true,
        },
      });
      return NextResponse.json(
        JenisAksesoris.length > 0 ? JenisAksesoris[0] : []
      );
    default:
      const JenisFeatured = await prisma.jenisProduk.findMany({
        where: {
          title: {
            contains: "pintu",
            mode: "insensitive",
          },
        },
        select: {
          products: {
            orderBy: {
              title: "desc",
            },
          },
        },
      });
      return NextResponse.json(
        JenisFeatured.length > 0 ? JenisFeatured[0] : []
      );
  }
}
