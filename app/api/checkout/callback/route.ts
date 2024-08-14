import { NextRequest, NextResponse } from "next/server";

import { PaymentCallbackData } from "@/@types/yookassa";
import { OrderSuccess } from "@/components/shared/email-templates/order-success";
import { prisma } from "@/prisma/prisma-client";
import { CartItemDTO } from "@/services/dto/cart.dto";
import { sendEmail } from "@/utils/helpers";
import { OrderStatus } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" });
    }

    const isSucceeded = body.object.status === "succeeded";

    await prisma.order.update({
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
      where: {
        id: order.id,
      },
    });

    const items = JSON.parse(order?.items as string) as CartItemDTO[];

    if (isSucceeded) {
      await sendEmail(order.email, "Next Pizza / Ваш заказ успешно оформлен 🎊", OrderSuccess({ items, orderId: order.id }));
    }
  } catch (error) {
    console.log("[ROUTE ERROR]:", error);
    return NextResponse.json({ error: "Serve error" });
  }
}
