import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { CreateToken } from "../../../../utility/JWTTokenHelper";

export async function POST(req, res) {
  try {
    const prisma = new PrismaClient();
    let data = await req.json();

    const result = await prisma.users.findUnique({ where: data });

    if (result.length === 0) {
      return NextResponse.json({ status: "fail", data: result });
    } else {
      let token = await CreateToken(result["email"], result["id"]);
      let expireDuration = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const cookieString = `token=${token};expires=${expireDuration.toUTCString()};path=/`;

      return NextResponse.json(
        { status: "success", data: token },
        { status: 200, headers: { "set-cookie": cookieString } }
      );
    }
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
