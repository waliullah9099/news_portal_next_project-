import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    let headerList = headers();
    let id = parseInt(headerList.get("id"));

    const prisma = new PrismaClient();

    const result = await prisma.comments.findMany({
      where: { userID: id },
      include: {
        news_list: { select: { title: true } },
      },
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}

export async function POST(req, res) {
  try {
    let headerList = headers();
    let id = parseInt(headerList.get("id"));
    const data = await req.json();
    data.userID = id;

    const prisma = new PrismaClient();

    const result = await prisma.comments.create({
      data,
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}

export async function DELETE(req, res) {
  try {
    let headerList = headers();
    let user_id = parseInt(headerList.get("id"));
    const data = await req.json();
    const comment_id = parseInt(data["id"]);

    const prisma = new PrismaClient();

    const result = await prisma.comments.delete({
      where: {
        AND: [{ userID: user_id }, { id: comment_id }],
      },
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
