import { PrismaClient, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import fs from "fs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  let json_response = {
    status: "",
    message: {},
    data: {},
    code: 200,
  };

  const data = await req.formData();
  let prdcd: any = data.get("prdcd");

  const res = await prisma.produkItem.findMany({
    where: {
      prdcd: {
        contains: prdcd,
        mode: "insensitive",
      },
    },
  });

  const prd_type = res[0].prd_type;
  console.log(res[0].prd_type, res[0].prd_thumbnail[0]);

  res[0].prd_thumbnail.map((val: string) => {
    fs.unlink(`./public/${prd_type}/${val}`, (err) => {
      if (err) {
        json_response.status = "ERR";
        json_response.message = err.message;
        json_response.code = 500;
        console.log(err);
      } else {
        console.log("file " + val + " deleted");
      }
    });
  });

  res[0].prd_asset.map((val: string) => {
    fs.unlink(`./public/${prd_type}/${val}`, (err) => {
      if (err) {
        json_response.status = "ERR";
        json_response.message = err.message;
        json_response.code = 500;
        console.log(err);
      } else {
        console.log("file " + val + " deleted");
      }
    });
  });

  await prisma.produkItem
    .delete({
      where: {
        prdcd: prdcd,
      },
    })
    .then((data) => {
      console.log(data, "deleted");

      json_response.status = "OK";
      json_response.data = data ? data : [];
      json_response.message = {
        message: "Delete Success",
      };
    })
    .catch((e) => {
      console.log(e);
      json_response.status = "ERR";
      json_response.message = e.message;
      return NextResponse.json(json_response);
    });

  return NextResponse.json(json_response, { status: json_response.code });
}
