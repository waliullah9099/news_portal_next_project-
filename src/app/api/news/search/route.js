import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const keyword = parseInt(searchParams.get("keyword"));
    const prisma = new PrismaClient();

    const result = await prisma.news_list.findMany({
      where: { title: { contains: "keyword" } },
      select: {
        id: true,
        title: true,
        short_des: true,
        image1: true,
        image2: true,
        image3: true,
      },
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
