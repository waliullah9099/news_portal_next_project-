import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const catID = parseInt(searchParams.get("catID"));
    const prisma = new PrismaClient();

    const result = await prisma.comments.findMany({
      where: { postID: postID },
      include: { users: { select: { firstName: true, lastName: true } } },
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
