import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/utils/helpers/update-cart-total-amount";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const data = (await req.json()) as { quantity: number };

    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "cart token not found" });

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });
    if (!cartItem) return NextResponse.json({ error: "cart item not found" });

    await prisma.cartItem.update({
      where: { id },
      data: { quantity: data.quantity },
    });

    const updatedUserCart = await updateCartTotalAmount(token);
    return NextResponse.json(updatedUserCart);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "cart do not be update." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);

    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "cart token not found" });

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!cartItem) return NextResponse.json({ error: "cart item not found" });

    await prisma.cartItem.delete({
      where: { id },
    });

    const updatedUserCart = await updateCartTotalAmount(token);
    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "item can't be removed" }, { status: 500 });
  }
}
