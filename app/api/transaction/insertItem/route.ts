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

  try {
    const data = await req.formData();
    let prdcd: any = data.get("prdcd");
    let prd_name: any = data.get("prd_name");
    let prd_category: any = data.get("prd_category");
    let prd_type: any = data.get("prd_type");
    let prd_thumbnail: any = data.get("prd_thumbnail");
    let prd_asset: string[] = [];
    let prd_best: any = data.get("prd_best");
    let size_1: any = data.get("size_1");
    let size_2: any = data.get("size_2");
    let key_type: any = data.get("key_type");
    let variant: any = data.get("variant");
    let superiority: any = data.get("superiority");
    let usecase: any = data.get("usecase");
    let note: any = data.get("note");
    let type: any = data.get("type");
    let prd_id: number = 0;

    let prd_type_abbr =
      prd_type == "Aluminium"
        ? "ALM"
        : prd_type == "Millennial"
        ? "MLN"
        : prd_type.replace(/\s/g, "");

    data.forEach(async (formDataEntryValue, key) => {
      if (
        typeof formDataEntryValue === "object" &&
        "arrayBuffer" in formDataEntryValue
      ) {
        const file = formDataEntryValue as unknown as Blob;
        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(`public/${prd_type_abbr}/${file.name}`, buffer);
        console.log(`${file.name} Downloaded`);
      } else {
        key === "prd_asset[]" && prd_asset.push(formDataEntryValue.toString());
      }
    });

    switch (prd_type_abbr) {
      case "ALM":
        prd_id = 2;
        break;
      case "MLN":
        prd_id = 3;
        break;
      case "PVC":
        prd_id = 4;
        break;
      case "UPVC":
        prd_id = 5;
        break;
      case "PVCUV":
        prd_id = 6;
        break;
      case "SD":
        prd_id = 7;
        break;
      case "SS":
        prd_id = 8;
        break;
      case "KM":
        prd_id = 9;
        break;
      case "AP":
        prd_id = 10;
        break;
      default:
        break;
    }

    console.log(prd_id, "prd_id");
    await prisma.produkItem
      .create({
        data: {
          produk: {
            connect: {
              id: prd_id,
            },
          },
          prdcd: prdcd,
          prd_name: prd_name,
          prd_category: prd_category,
          prd_type: prd_type_abbr,
          prd_bestseller: JSON.parse(prd_best),
          prd_desc: {
            create: [
              {
                size1: size_1.split(","),
                size2: size_2.split(","),
                key_type: key_type,
                variant: variant,
                superiority: superiority.split(","),
                usecase: usecase.split(","),
                note: note,
                type: type.split(","),
              },
            ],
          },
          prd_asset: prd_asset.length > 0 ? prd_asset : undefined,
          prd_thumbnail: prd_thumbnail ? [prd_thumbnail] : undefined,
        },
      })
      .then((data) => {
        console.log(data);

        json_response.status = "OK";
        json_response.data = data ? data : [];
        json_response.message = {
          message: "Insert Success",
        };
      })
      .catch((e) => {
        console.log(e);
        json_response.status = "ERR";
        json_response.message = e.message;
        json_response.code = 500;
        return NextResponse.json(json_response);
      });
  } catch (e: any) {
    console.log(e);
    json_response.status = "ERR";
    json_response.message = e.message;
    json_response.code = 500;
  }

  return NextResponse.json(json_response, { status: json_response.code });
}
