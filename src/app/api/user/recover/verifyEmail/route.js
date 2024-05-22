import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { SendEmail } from "../../../../utility/EmailUtility";

export async function GET(req, res) {
  try {
    const prisma = new PrismaClient();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const count = await prisma.users.count({ where: { email: email } });

    if (count === 1) {
      const code = Math.floor(100000 + Math.random() * 900000);
      const text = `Your OTP code is: ${code}`;
      const subject = "next news verification OTP";

      await SendEmail(email, text, subject);

      const result = await prisma.users.update({
        where: { email: email },
        data: { otp: code.toString() },
      });

      return NextResponse.json({ status: "success", data: result });
    } else {
      return NextResponse.json({ status: "fail", data: "NO USER FOUND" });
    }
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
