import { prisma } from "@/prisma/prisma-client";
import { authOptions } from "@/utils/constants/auth-options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: any, res: any) {
  try {
    const user = await getServerSession(req, res, authOptions);

    if (!user) {
      return NextResponse.json({ message: "Вы не авторизованы" }, { status: 401 });
    }

    const data = await prisma.user.findUnique({
      select: {
        email: true,
        fullname: true,
        password: false,
      },
      where: {
        id: Number(user.user.id),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log("[ROUTE ERROR]:", error);
    return NextResponse.json({ message: "Что-то пошло не так" }, { status: 500 });
  }
}
