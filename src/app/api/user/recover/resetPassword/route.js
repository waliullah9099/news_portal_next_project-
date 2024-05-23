import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const prisma = new PrismaClient();
  const data = await req.json();

  const count = await prisma.users.count({
    where: { email: data["email"], otp: data["otp"] },
  });

  if (count === 1) {
    await prisma.users.update({
      where: { email: data["email"] },
      data: { otp: "0", password: data["password"] },
    });

    return NextResponse.json({
      status: "success",
      data: "Password reset success",
    });
  } else {
    return NextResponse.json({ status: "fail", data: "Password reset fail" });
  }

  try {
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
