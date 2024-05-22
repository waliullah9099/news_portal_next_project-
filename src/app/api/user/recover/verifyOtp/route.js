import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const prisma = new PrismaClient();
  const data = await req.json();

  const count = await prisma.users.count({ where: data });

  if (count === 1) {
    return NextResponse.json({ status: "success", data: "Validate OTP Code" });
  } else {
    return NextResponse.json({ status: "fail", data: "Invalid OTP Code" });
  }

  try {
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
